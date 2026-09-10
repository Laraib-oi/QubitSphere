# QubitSphere — AI Development Instructions

## Project

QubitSphere is an AI-based interactive quantum algorithm learning platform
for the Smart India Hackathon 2026.

## Source of Truth

Before making architectural or product changes, consult:

- docs/99-AI-Context.md
- docs/00-Project-Overview.md
- docs/03-MVP-Scope.md
- docs/05-Architecture.md
- docs/07-Circuit-IR.md

Detailed project documentation lives inside the docs/ directory.

## Core Product Loop

Learn → Build → Run → Visualize → Ask → Practice → Assess

## Primary Differentiator

Circuit-aware AI tutoring.

The AI must use the student's actual circuit and verified simulator
results when explaining circuit behavior.

## Critical Rule

The LLM explains.

The quantum simulation engine calculates.

Never use the LLM as the source of truth for quantum state,
measurement probability, or circuit execution.

## MVP Priority

Prioritize working features over feature quantity.

The MVP focuses on:

1. Learning
2. Circuit construction
3. Quantum simulation
4. Visualization
5. Circuit-aware AI tutoring
6. Practice/assessment
7. Progress

## MVP Algorithms

- Bell State
- Deutsch-Jozsa
- Grover

## Development Rules

- Do not invent unrelated features.
- Do not expand the MVP without approval.
- Do not modify unrelated files.
- Do not duplicate existing components.
- Reuse existing architecture and components.
- Keep business logic separate from UI.
- Keep the Circuit IR framework-neutral.
- Do not fake quantum simulation results.
- Validate quantum-related calculations using deterministic
  simulation logic.
- Prefer small, testable changes.
- Run relevant tests/checks after changes.
- Update documentation when an architectural decision changes.

## AI Coding Workflow

Before implementing a significant feature:

1. Read the relevant documentation.
2. Inspect the existing code.
3. Explain the intended change.
4. Implement only the requested scope.
5. Run validation.
6. Report files changed and validation performed.

## Hackathon Constraint

The project has a very limited hackathon timeline.

Do not sacrifice the working MVP for speculative production features.