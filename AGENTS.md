# QubitSphere — AI Development Instructions

## Project

QubitSphere is an AI-based interactive quantum algorithm learning platform for the Smart India Hackathon 2026.

## Source of Truth

Before making architectural or product changes, consult:

* `docs/99-AI-Context.md`
* `docs/00-Project-Overview.md`
* `docs/03-MVP-Scope.md`
* `docs/05-Architecture.md`
* `docs/07-Circuit-IR.md`

Detailed project documentation lives inside the `docs/` directory.

`docs/99-AI-Context.md` provides the primary operational summary for AI coding agents.

For task-specific decisions, consult the relevant detailed document. For example:

* Circuit work → `docs/07-Circuit-IR.md`
* AI work → `docs/10-AI-Tutor-Architecture.md`
* UI work → `docs/11-UI-System.md`
* API work → `docs/12-API-Contracts.md`
* Curriculum work → `docs/08-Curriculum-Schema.md`
* Database/data work → `docs/09-Data-Model.md`

Do not make major changes based only on assumptions or general best practices when project documentation already defines the requirement.

## Core Product Loop

Learn → Build → Run → Visualize → Ask → Practice → Assess

## Primary Differentiator

Circuit-aware AI tutoring.

The AI must use the student's actual circuit and verified simulator results when explaining circuit behavior.

## Critical Rule

The LLM explains.

The quantum simulation engine calculates.

Never use the LLM as the source of truth for:

* Quantum state
* Measurement probability
* Measurement counts
* Circuit execution
* Other numerical quantum results

## MVP Priority

Prioritize working features over feature quantity.

The MVP focuses on:

1. Learning
2. Circuit construction
3. Quantum simulation
4. Visualization
5. Circuit-aware AI tutoring
6. Practice and assessment
7. Progress

## MVP Algorithms

* Bell State
* Deutsch-Jozsa
* Grover

Bell State is the primary hackathon demonstration.

## Development Rules

* Do not invent unrelated features.
* Do not expand the MVP without approval.
* Do not modify unrelated files.
* Do not duplicate existing components or services.
* Reuse existing architecture and components whenever appropriate.
* Keep business logic separate from UI.
* Keep the Circuit IR framework-neutral.
* Do not fake quantum simulation results.
* Validate quantum-related calculations using deterministic/verified simulation logic.
* Prefer small, testable changes.
* Run relevant tests and checks after changes.
* Update documentation when an architectural decision changes.
* Do not introduce a new technology without a clear reason.
* Do not expose secrets in source code, client code, logs, documentation, or Git.
* Treat learner input and circuit metadata as untrusted data.
* Do not move quantum simulation into the frontend.

## AI Coding Workflow

Before implementing a significant feature:

1. Read `AGENTS.md`.
2. Read `docs/99-AI-Context.md`.
3. Read the relevant detailed documentation.
4. Inspect the existing code and repository structure.
5. Explain the intended change.
6. Identify reusable components/services.
7. Implement only the requested scope.
8. Run relevant validation, tests, and checks.
9. Report files changed.
10. Report validation performed.
11. Report important assumptions or limitations.

## Architecture Protection

The intended core flow is:

Frontend
↓
API
↓
Circuit IR
↓
Quantum Execution
↓
Verified Results
↓
AI Context
↓
LLM
↓
Explanation

Do not bypass this architecture without an explicit project decision.

## Hackathon Constraint

The project has a very limited hackathon timeline.

Do not sacrifice the working MVP for speculative production features.

Working vertical slices are more important than feature quantity.

## Final Principle

Build the smallest reliable implementation that demonstrates the QubitSphere learning loop clearly and convincingly.
