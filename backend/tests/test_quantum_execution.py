"""Focused tests for the Qiskit Aer execution layer and simulation API."""

import asyncio
import json
import math
import unittest
from typing import Any
from unittest.mock import patch

from backend.circuit_ir.models import CircuitIR
from backend.main import app
from backend.quantum.errors import SimulationFailed
from backend.quantum.qiskit_adapter import build_qiskit_circuit
from backend.quantum.simulator import simulate_circuit


def bell_state() -> dict[str, Any]:
    return {
        "version": "1.0",
        "qubits": 2,
        "classicalBits": 2,
        "operations": [
            {"gate": "H", "targets": [0]},
            {"gate": "CX", "control": 0, "target": 1},
        ],
        "measurements": [0, 1],
    }


def circuit(
    *,
    qubits: int = 1,
    classical_bits: int = 1,
    operations: list[dict[str, Any]] | None = None,
    measurements: list[int] | None = None,
) -> CircuitIR:
    return CircuitIR.model_validate(
        {
            "version": "1.0",
            "qubits": qubits,
            "classicalBits": classical_bits,
            "operations": operations or [],
            "measurements": measurements or [],
        }
    )


async def asgi_request(
    method: str,
    path: str,
    payload: Any,
) -> tuple[int, dict[str, Any]]:
    body = json.dumps(payload).encode("utf-8")
    sent_messages: list[dict[str, Any]] = []
    request_sent = False

    async def receive() -> dict[str, Any]:
        nonlocal request_sent
        if not request_sent:
            request_sent = True
            return {"type": "http.request", "body": body, "more_body": False}
        return {"type": "http.disconnect"}

    async def send(message: dict[str, Any]) -> None:
        sent_messages.append(message)

    scope = {
        "type": "http",
        "asgi": {"version": "3.0", "spec_version": "2.0"},
        "http_version": "1.1",
        "method": method,
        "path": path,
        "raw_path": path.encode("ascii"),
        "query_string": b"",
        "headers": [
            (b"host", b"testserver"),
            (b"content-type", b"application/json"),
        ],
        "scheme": "http",
        "client": ("testclient", 50000),
        "server": ("testserver", 80),
    }
    await app(scope, receive, send)

    status = next(
        message["status"]
        for message in sent_messages
        if message["type"] == "http.response.start"
    )
    response_body = b"".join(
        message.get("body", b"")
        for message in sent_messages
        if message["type"] == "http.response.body"
    )
    return status, json.loads(response_body)


class QuantumExecutionTests(unittest.TestCase):
    def test_bell_state_uses_real_aer_measurement_sampling(self) -> None:
        result = simulate_circuit(CircuitIR.model_validate(bell_state()), shots=1024)

        self.assertEqual(result.shots, 1024)
        self.assertEqual(sum(result.counts.values()), 1024)
        self.assertTrue(set(result.counts).issubset({"00", "11"}))
        self.assertGreater(result.counts.get("00", 0), 0)
        self.assertGreater(result.counts.get("11", 0), 0)
        self.assertAlmostEqual(sum(result.probabilities.values()), 1.0)
        self.assertEqual(result.statevector, [])

    def test_single_qubit_h_produces_both_measurement_outcomes(self) -> None:
        result = simulate_circuit(
            circuit(operations=[{"gate": "H", "targets": [0]}], measurements=[0]),
            shots=256,
        )

        self.assertEqual(sum(result.counts.values()), 256)
        self.assertEqual(set(result.counts), {"0", "1"})
        self.assertGreater(result.probabilities["0"], 0.2)
        self.assertLess(result.probabilities["0"], 0.8)

    def test_x_gate_flips_a_qubit(self) -> None:
        result = simulate_circuit(
            circuit(operations=[{"gate": "X", "targets": [0]}], measurements=[0]),
            shots=64,
        )

        self.assertEqual(result.counts, {"1": 64})

    def test_x_on_q0_preserves_measurement_bit_order(self) -> None:
        result = simulate_circuit(
            circuit(
                qubits=2,
                classical_bits=2,
                operations=[{"gate": "X", "targets": [0]}],
                measurements=[0, 1],
            ),
            shots=64,
        )

        self.assertEqual(result.counts, {"10": 64})

    def test_x_on_q1_preserves_measurement_bit_order(self) -> None:
        result = simulate_circuit(
            circuit(
                qubits=2,
                classical_bits=2,
                operations=[{"gate": "X", "targets": [1]}],
                measurements=[0, 1],
            ),
            shots=64,
        )

        self.assertEqual(result.counts, {"01": 64})

    def test_cx_and_parameterized_rotation_execute(self) -> None:
        cx_result = simulate_circuit(
            circuit(
                qubits=2,
                classical_bits=2,
                operations=[
                    {"gate": "X", "targets": [0]},
                    {"gate": "CX", "control": 0, "target": 1},
                ],
                measurements=[0, 1],
            ),
            shots=64,
        )
        rotation_result = simulate_circuit(
            circuit(
                operations=[
                    {"gate": "RX", "targets": [0], "parameters": {"theta": math.pi}}
                ],
                measurements=[0],
            ),
            shots=64,
        )

        self.assertEqual(cx_result.counts, {"11": 64})
        self.assertEqual(rotation_result.counts, {"1": 64})

    def test_adapter_supports_all_documented_mvp_gates(self) -> None:
        qiskit_circuit = build_qiskit_circuit(
            circuit(
                qubits=2,
                classical_bits=2,
                operations=[
                    {"gate": "H", "targets": [0]},
                    {"gate": "X", "targets": [0]},
                    {"gate": "Y", "targets": [0]},
                    {"gate": "Z", "targets": [0]},
                    {"gate": "S", "targets": [0]},
                    {"gate": "T", "targets": [0]},
                    {"gate": "CX", "control": 0, "target": 1},
                    {"gate": "RX", "targets": [0], "parameters": {"theta": 0.1}},
                    {"gate": "RY", "targets": [0], "parameters": {"theta": 0.2}},
                    {"gate": "RZ", "targets": [0], "parameters": {"theta": 0.3}},
                ],
                measurements=[0, 1],
            )
        )

        self.assertEqual(qiskit_circuit.num_qubits, 2)
        self.assertEqual(qiskit_circuit.num_clbits, 2)
        self.assertEqual(qiskit_circuit.count_ops()["measure"], 2)


class SimulationEndpointTests(unittest.TestCase):
    def request(self, payload: Any) -> tuple[int, dict[str, Any]]:
        return asyncio.run(asgi_request("POST", "/api/circuit/simulate", payload))

    def test_valid_wrapped_bell_request_returns_normalized_result(self) -> None:
        status, body = self.request({"circuit": bell_state()})

        self.assertEqual(status, 200)
        self.assertTrue(body["success"])
        self.assertEqual(body["data"]["backend"], "qiskit-aer")
        self.assertEqual(body["data"]["shots"], 1024)
        self.assertEqual(sum(body["data"]["counts"].values()), 1024)
        self.assertEqual(set(body["data"]["counts"]).issubset({"00", "11"}), True)

    def test_invalid_circuit_is_rejected_before_simulation(self) -> None:
        invalid = bell_state()
        invalid["operations"][0] = {"gate": "U3", "targets": [0]}

        with patch("backend.routes.circuit.simulate_circuit") as execute:
            status, body = self.request({"circuit": invalid})

        self.assertEqual(status, 422)
        self.assertEqual(body["error"]["code"], "INVALID_CIRCUIT")
        execute.assert_not_called()

    def test_schema_invalid_request_returns_validation_error(self) -> None:
        invalid = bell_state()
        invalid["operations"][0] = {"gate": "H", "targets": [4]}
        invalid["shots"] = 0

        status, body = self.request({"circuit": invalid})

        self.assertEqual(status, 422)
        self.assertEqual(body["error"]["code"], "VALIDATION_ERROR")

    def test_simulation_failure_returns_stable_error(self) -> None:
        with patch(
            "backend.routes.circuit.simulate_circuit",
            side_effect=SimulationFailed("internal details must not leak"),
        ):
            status, body = self.request({"circuit": bell_state()})

        self.assertEqual(status, 500)
        self.assertEqual(body["error"]["code"], "SIMULATION_FAILED")
        self.assertNotIn("internal details", json.dumps(body))


if __name__ == "__main__":
    unittest.main()
