"""Stable errors raised by the quantum execution layer."""


class QuantumExecutionError(Exception):
    """Base class for errors that can be safely mapped to API responses."""


class SimulationUnavailable(QuantumExecutionError):
    """The configured quantum simulator dependency is not available."""


class SimulationFailed(QuantumExecutionError):
    """The simulator could not execute an otherwise valid circuit."""
