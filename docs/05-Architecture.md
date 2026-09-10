# QubitSphere — System Architecture

## High-Level Architecture

```text
                     QubitSphere Web App
                            |
                     Next.js / React
                            |
              +-------------+-------------+
              |             |             |
         Learning API   Circuit API   AI Tutor API
              |             |             |
              |         Circuit IR        |
              |             |             |
              +-------------+-------------+
                            |
                    Execution Layer
                            |
                    Quantum Simulator
                            |
                     Result Normalizer
                            |
              +-------------+-------------+
              |             |             |
         Statevector    Histogram      Metrics
              |             |             |
              +-------------+-------------+
                            |
                      AI Context
                            |
                         AI Tutor 

Architectural Principles
Principle 1 — Circuit IR

The frontend should communicate using a framework-neutral circuit
representation.

Principle 2 — Deterministic Execution

Quantum calculations must be performed by deterministic simulation
logic.

Principle 3 — AI as Explanation Layer

The AI explains verified outputs rather than calculating quantum
mechanics itself.

Principle 4 — Separation of Concerns

UI, application logic, circuit representation, simulation and AI
logic should remain separate.

Principle 5 — Extensibility

Adding another quantum framework should require an adapter rather
than rewriting the application.
