"""Tests for Circuit IR models, validation, and the validation endpoint."""

import asyncio
import json
import unittest
from typing import Any

from pydantic import ValidationError as PydanticValidationError

from backend.circuit_ir.models import CircuitIR
from backend.circuit_ir.validation import validate_circuit
from backend.main import app


def bell_state() -> dict[str, Any]:
    return {
        "version": "1.0",
        "name": "Bell State",
        "qubits": 2,
        "classicalBits": 2,
        "operations": [
            {"gate": "H", "targets": [0], "position": 0},
            {"gate": "CX", "control": 0, "target": 1, "position": 1},
        ],
        "measurements": [0, 1],
        "metadata": {"algorithm": "bell-state"},
    }


def empty_circuit(**overrides: Any) -> dict[str, Any]:
    circuit = {
        "version": "1.0",
        "qubits": 1,
        "classicalBits": 1,
        "operations": [],
        "measurements": [],
    }
    circuit.update(overrides)
    return circuit


async def asgi_request(method: str, path: str, payload: Any) -> tuple[int, dict[str, Any]]:
    """Make a small in-process ASGI request without adding test dependencies."""

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


class CircuitIRValidationTests(unittest.TestCase):
    def assert_invalid(self, circuit: dict[str, Any], code: str) -> None:
        result = validate_circuit(CircuitIR.model_validate(circuit))
        self.assertFalse(result.valid)
        self.assertIn(code, {error.code for error in result.errors})

    def test_valid_bell_state_circuit(self) -> None:
        result = validate_circuit(CircuitIR.model_validate(bell_state()))
        self.assertTrue(result.valid)
        self.assertEqual(result.errors, [])

    def test_valid_single_qubit_gate_circuit(self) -> None:
        circuit = empty_circuit(
            operations=[{"gate": "H", "targets": [0]}],
            measurements=[0],
        )
        self.assertTrue(validate_circuit(CircuitIR.model_validate(circuit)).valid)

    def test_valid_parameterized_rotation_gate(self) -> None:
        circuit = empty_circuit(
            operations=[
                {"gate": "RX", "targets": [0], "parameters": {"theta": 1.5708}}
            ],
            measurements=[0],
        )
        self.assertTrue(validate_circuit(CircuitIR.model_validate(circuit)).valid)

    def test_invalid_zero_qubit_circuit(self) -> None:
        self.assert_invalid(empty_circuit(qubits=0, classicalBits=0), "INVALID_CIRCUIT")

    def test_invalid_qubit_index(self) -> None:
        circuit = empty_circuit(
            qubits=2,
            classicalBits=2,
            operations=[{"gate": "H", "targets": [2]}],
        )
        self.assert_invalid(circuit, "INVALID_QUBIT_INDEX")

    def test_unsupported_gate(self) -> None:
        circuit = empty_circuit(operations=[{"gate": "U3", "targets": [0]}])
        self.assert_invalid(circuit, "INVALID_GATE")

    def test_invalid_cx_with_identical_control_and_target(self) -> None:
        circuit = empty_circuit(
            qubits=2,
            classicalBits=2,
            operations=[{"gate": "CX", "control": 0, "target": 0}],
        )
        self.assert_invalid(circuit, "VALIDATION_ERROR")

    def test_missing_rotation_parameter(self) -> None:
        circuit = empty_circuit(operations=[{"gate": "RY", "targets": [0]}])
        self.assert_invalid(circuit, "INVALID_GATE_PARAMETER")

    def test_invalid_measurement_index(self) -> None:
        self.assert_invalid(empty_circuit(measurements=[1]), "INVALID_QUBIT_INDEX")

    def test_missing_operations_is_rejected_by_schema(self) -> None:
        circuit = empty_circuit()
        del circuit["operations"]
        with self.assertRaises(PydanticValidationError):
            CircuitIR.model_validate(circuit)

    def test_missing_measurements_is_rejected_by_schema(self) -> None:
        circuit = empty_circuit()
        del circuit["measurements"]
        with self.assertRaises(PydanticValidationError):
            CircuitIR.model_validate(circuit)

    def test_negative_classical_bits_are_semantically_invalid(self) -> None:
        self.assert_invalid(empty_circuit(classicalBits=-1), "INVALID_CIRCUIT")

    def test_string_rotation_parameter_is_rejected_by_schema(self) -> None:
        circuit = empty_circuit(
            operations=[
                {"gate": "RX", "targets": [0], "parameters": {"theta": "1.0"}}
            ]
        )
        with self.assertRaises(PydanticValidationError):
            CircuitIR.model_validate(circuit)

    def test_non_finite_rotation_parameter_is_rejected(self) -> None:
        circuit = empty_circuit(
            operations=[
                {"gate": "RX", "targets": [0], "parameters": {"theta": float("inf")}}
            ]
        )
        self.assert_invalid(circuit, "INVALID_GATE_PARAMETER")

    def test_missing_cx_control_is_invalid(self) -> None:
        circuit = empty_circuit(
            qubits=2,
            classicalBits=2,
            operations=[{"gate": "CX", "target": 1}],
        )
        self.assert_invalid(circuit, "INVALID_QUBIT_INDEX")

    def test_missing_cx_target_is_invalid(self) -> None:
        circuit = empty_circuit(
            qubits=2,
            classicalBits=2,
            operations=[{"gate": "CX", "control": 0}],
        )
        self.assert_invalid(circuit, "INVALID_QUBIT_INDEX")

    def test_unexpected_operation_field_is_rejected_by_schema(self) -> None:
        circuit = empty_circuit(
            operations=[{"gate": "H", "targets": [0], "foo": "bar"}]
        )
        with self.assertRaises(PydanticValidationError):
            CircuitIR.model_validate(circuit)


class CircuitValidationEndpointTests(unittest.TestCase):
    def request(self, payload: Any) -> tuple[int, dict[str, Any]]:
        return asyncio.run(asgi_request("POST", "/api/circuit/validate", payload))

    def test_valid_wrapped_bell_state_request(self) -> None:
        status, body = self.request({"circuit": bell_state()})
        self.assertEqual(status, 200)
        self.assertEqual(body, {"success": True, "data": {"valid": True, "errors": []}})

    def test_invalid_semantic_circuit_returns_structured_response(self) -> None:
        circuit = empty_circuit(operations=[{"gate": "H", "targets": [2]}])
        status, body = self.request({"circuit": circuit})
        self.assertEqual(status, 200)
        self.assertTrue(body["success"])
        self.assertFalse(body["data"]["valid"])
        self.assertEqual(body["data"]["errors"][0]["code"], "INVALID_QUBIT_INDEX")

    def test_schema_invalid_request_returns_canonical_422_error(self) -> None:
        circuit = empty_circuit()
        del circuit["operations"]
        status, body = self.request({"circuit": circuit})
        self.assertEqual(status, 422)
        self.assertEqual(body["success"], False)
        self.assertEqual(body["error"]["code"], "VALIDATION_ERROR")
        self.assertIn("details", body["error"])

    def test_raw_circuit_request_is_rejected(self) -> None:
        status, body = self.request(bell_state())
        self.assertEqual(status, 422)
        self.assertEqual(body["error"]["code"], "VALIDATION_ERROR")


if __name__ == "__main__":
    unittest.main()
