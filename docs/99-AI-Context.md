# QubitSphere — AI Context

## 1. Project Identity

Project Name: QubitSphere

Hackathon: Smart India Hackathon 2026

Problem Statement:
AI-Based Interactive Quantum Algorithm Learning Platform

Project Type:
AI-powered interactive quantum-computing education platform.

---

## 2. Core Problem

Quantum-computing education is fragmented across:

- theory
- mathematics
- quantum circuits
- programming
- simulation
- visualization
- practice
- assessment

Beginners often learn these pieces separately instead of through one
continuous learning experience.

---

## 3. QubitSphere Solution

QubitSphere connects:

Learn
↓
Build
↓
Run
↓
Visualize
↓
Ask
↓
Practice
↓
Assess

The platform should allow a learner to understand a concept,
construct the corresponding circuit, execute it, inspect the result,
ask the AI for an explanation, practice the concept, and measure
their understanding.

---

## 4. Primary Differentiator

Circuit-aware AI tutoring.

The AI should understand:

- the current lesson
- the student's circuit
- the Circuit IR
- simulator results
- detected circuit problems
- learner progress

The AI should explain verified information rather than inventing
quantum calculations.

---

## 5. Core AI Principle

LLM = explanation, guidance, hints and personalization.

Quantum engine = circuit execution, state calculation,
measurement probabilities and numerical truth.

Never make the LLM the source of truth for quantum calculations.

---

## 6. MVP

The MVP must demonstrate one coherent learning loop.

Core features:

- Dashboard
- Learning module
- Interactive concept explanation
- Circuit Lab
- Circuit IR
- Quantum simulation
- Measurement histogram
- Probability visualization
- State visualization
- Circuit-aware AI tutor
- Practice challenge
- Assessment
- Basic progress tracking

---

## 7. MVP Algorithms

Primary:

1. Bell State
2. Deutsch-Jozsa
3. Grover

Do not attempt to fully implement a large algorithm library during
the hackathon.

---

## 8. Target User

Primary user:

Beginner/intermediate quantum-computing learner.

Secondary users:

- instructors
- universities
- researchers
- quantum developers

---

## 9. Architecture Principle

Frontend
↓
Application APIs
↓
Framework-neutral Circuit IR
↓
Quantum execution layer
↓
Simulation result
↓
Normalized result
↓
AI context
↓
AI tutor

The UI must not directly depend on a specific quantum framework.

---

## 10. Circuit IR

Circuit IR is the framework-neutral representation of a circuit.

Example:

{
  "qubits": 2,
  "operations": [
    {
      "gate": "H",
      "targets": [0]
    },
    {
      "gate": "CX",
      "control": 0,
      "target": 1
    }
  ],
  "measurements": [0, 1]
}

The Circuit IR should allow the frontend and AI system to reason
about circuits independently from Qiskit, PennyLane or another
execution framework.

---

## 11. Learning Loop

Learn
↓
Build
↓
Run
↓
Visualize
↓
Ask
↓
Practice
↓
Assess
↓
Recommend next learning step

---

## 12. MVP Demo

The ideal demonstration:

1. Open QubitSphere.
2. Open a lesson about superposition.
3. Understand the concept.
4. Open Circuit Lab.
5. Build a Bell-state circuit.
6. Run the circuit.
7. View the measurement distribution.
8. View the state/probability information.
9. Ask the AI why the result occurred.
10. AI explains the actual circuit and verified result.
11. Remove/change a gate.
12. Run again.
13. Observe the changed result.
14. Complete a challenge.
15. Update learner progress.
16. Receive a recommended next concept.

---

## 13. Product Positioning

QubitSphere is NOT:

- only an AI chatbot
- only an online course
- only a quantum circuit simulator
- only a code editor

QubitSphere is an integrated interactive quantum-learning
environment.

---

## 14. Important Competitor Context

Relevant existing ecosystems include:

- IBM Quantum
- IBM Quantum Composer
- Microsoft Quantum / Quantum Katas
- qBraid
- Quirk
- PennyLane

QubitSphere must not position itself simply as another
quantum simulator or quantum course.

The differentiator is the integrated learning loop and
circuit-aware AI guidance.

---

## 15. Development Priorities

Priority 1:
Working end-to-end demo.

Priority 2:
Quantum correctness.

Priority 3:
Circuit-aware AI.

Priority 4:
Clear and polished UX.

Priority 5:
Documentation and architecture.

Priority 6:
Additional features.

---

## 16. Hackathon Rule

Do not build everything.

Build the smallest convincing vertical slice that demonstrates:

Learn
→ Build
→ Run
→ Visualize
→ Ask
→ Practice
→ Assess

---

## 17. Current Phase

Phase 1 — Foundation and Documentation

Next phase:

MVP implementation.

---

## 18. Current Status

Documentation structure created.

Architecture not yet implemented.

Application code should not be generated until the Phase 1
architecture and MVP scope are reviewed.