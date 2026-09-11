"""Framework-isolated quantum execution services."""

from .simulator import DEFAULT_SHOTS, simulate_circuit

__all__ = ["DEFAULT_SHOTS", "simulate_circuit"]
