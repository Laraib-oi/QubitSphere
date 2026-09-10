# QubitSphere — MVP Scope

## 1. Purpose

This document defines the official Minimum Viable Product (MVP) scope for QubitSphere.

The MVP is designed for the Smart India Hackathon 2026 timeline and should focus on delivering a small but convincing, working product rather than attempting to implement every possible feature.

The central MVP objective is:

> **Demonstrate one complete quantum-learning experience from concept to circuit to simulation to AI explanation to practice and assessment.**

The core learning loop is:

```text
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
Progress
```

---

# 2. MVP Philosophy

The QubitSphere MVP follows this principle:

> **Working vertical slice > feature quantity**

A smaller number of deeply connected features is more valuable than a large collection of incomplete features.

The MVP should therefore prioritize:

* Reliability
* Quantum correctness
* Educational clarity
* Circuit interaction
* AI contextual awareness
* Demonstrable end-to-end behavior

---

# 3. MVP Goal

The MVP should allow a learner to:

1. Enter QubitSphere.
2. Explore a structured quantum-learning module.
3. Learn a quantum concept.
4. Open an interactive circuit environment.
5. Build or modify a circuit.
6. Validate the circuit.
7. Execute the circuit through a quantum simulator.
8. View the resulting data.
9. Visualize measurement/probability results.
10. Ask the AI Tutor about the current circuit.
11. Receive an explanation based on the actual circuit and verified simulation result.
12. Modify the circuit.
13. Execute it again.
14. Observe how the result changes.
15. Complete a practice challenge.
16. Complete an assessment.
17. View learning progress.
18. Receive a sensible next-step recommendation.

---

# 4. MVP MUST-HAVE FEATURES

## 4.1 Landing Page

The landing page must communicate:

* What QubitSphere is
* Who it is for
* What problem it solves
* The core learning loop
* The primary differentiator
* How to start

Primary calls to action:

```text
Start Learning
Explore Circuit Lab
```

The landing page should be concise.

It is an introduction, not the main product experience.

---

# 5. Dashboard

The dashboard should be the learner's main starting point after entering the application.

It should provide:

* Learner status
* Overall progress
* Continue Learning
* Recommended Next Step
* Recent Activity
* Quick access to Circuit Lab

Example:

```text
Welcome back

Overall Progress
42%

Continue Learning
Understanding Entanglement
65% complete

Recommended
Try Bell State

[Continue Learning]
[Open Circuit Lab]
```

The dashboard does not need sophisticated analytics.

Its purpose is to answer:

> **What should I do next?**

---

# 6. Learning System

The MVP must contain structured learning content.

Minimum concepts:

```text
Qubit
Quantum State
Superposition
Quantum Gates
Measurement
Entanglement
```

Minimum algorithm-focused lessons:

```text
Bell State
Deutsch-Jozsa
Grover
```

The curriculum should be represented using the structured schema defined in:

```text
docs/08-Curriculum-Schema.md
```

---

# 7. Lesson Experience

A lesson should provide:

* Lesson title
* Difficulty
* Estimated time
* Learning objectives
* Concept explanation
* Examples
* Interactive content where appropriate
* Example circuit where appropriate
* Practice
* Assessment
* Next learning step

The learner should not have to read a long wall of text before interacting with a circuit.

---

# 8. Circuit Lab

The Circuit Lab is a core MVP feature.

It must allow the learner to:

* Choose or work with a circuit
* View qubit wires
* Add supported gates
* Remove gates
* Modify supported gate parameters
* Work with controlled operations
* Add measurements
* Run the circuit
* Reset the circuit
* Save the circuit when persistence is enabled

The Circuit Lab should prioritize:

> **Reliable interaction over advanced visual effects.**

---

# 9. MVP Gate Set

The initial Circuit Lab gate set should support the gates required by the MVP.

Preferred set:

```text
H
X
Y
Z
S
T
CX
RX
RY
RZ
MEASURE
```

The visible gate palette may initially expose only the subset required by the active lesson or algorithm.

The application must not expose unsupported operations simply because they exist in a future-oriented schema.

---

# 10. Circuit IR

All Circuit Lab circuits must use the official QubitSphere Circuit IR.

Circuit IR is the framework-neutral source of truth for a circuit.

Example:

```json
{
  "version": "1.0",
  "name": "Bell State",
  "qubits": 2,
  "classicalBits": 2,
  "operations": [
    {
      "gate": "H",
      "targets": [0],
      "position": 0
    },
    {
      "gate": "CX",
      "control": 0,
      "target": 1,
      "position": 1
    }
  ],
  "measurements": [0, 1]
}
```

Detailed rules are defined in:

```text
docs/07-Circuit-IR.md
```

---

# 11. Circuit Validation

Every circuit submitted for execution must be validated.

Validation should check:

* Circuit schema
* Number of qubits
* Number of classical bits
* Gate validity
* Qubit indexes
* Control/target validity
* Required parameters
* Measurement indexes

Invalid circuits must not be executed.

The backend must perform validation even if the frontend already validated the circuit.

---

# 12. Quantum Simulation

The MVP must include working quantum simulation.

Preferred execution path:

```text
Circuit IR
   ↓
Backend Validation
   ↓
Qiskit Adapter
   ↓
Qiskit Aer
   ↓
Simulation Result
```

The frontend must not directly run the quantum simulator.

---

# 13. Simulation Output

The simulation layer should provide useful information such as:

* Measurement counts
* Measurement probabilities
* Number of shots
* Execution status
* Backend information
* State information where supported

Example:

```json
{
  "success": true,
  "backend": "qiskit-aer",
  "shots": 1024,
  "probabilities": {
    "00": 0.5,
    "11": 0.5
  },
  "counts": {
    "00": 502,
    "11": 522
  }
}
```

Actual values must come from the quantum simulator.

---

# 14. Simulation Truth Rule

The simulator is the source of truth for quantum numerical results.

The application must not use fabricated demonstration numbers in place of working simulation for the main MVP path.

The AI must not invent numerical results.

---

# 15. Result Visualization

The MVP must visualize simulation results.

Required:

### Measurement Histogram

Example:

```text
00  ███████████████████
11  ███████████████████
```

### Probability Display

Example:

```text
00   50%
11   50%
```

### State Information

A useful representation of state information should be displayed where supported.

The goal is to help learners answer:

> **What happened?**

rather than simply presenting raw technical data.

---

# 16. AI Tutor

The AI Tutor is a core MVP feature.

It must be integrated with the learning environment.

The AI should be able to use relevant:

* Current lesson
* Current concept
* Current Circuit IR
* Current simulation result
* Practice context
* Learner context

The learner should be able to ask questions without manually copying context into the AI.

---

# 17. AI Tutor MVP Capabilities

Required AI capabilities:

```text
Explain
Hint
Interpret
Debug
Practice assistance
Basic recommendation
```

The AI should especially support questions such as:

```text
What does this gate do?

Why did I get 00 and 11?

Why did my result change?

Why isn't my circuit behaving as expected?

Give me a hint.
```

---

# 18. AI Responsibility Boundary

The following rule is non-negotiable:

> **The quantum engine calculates. The AI explains.**

The AI may explain:

* Quantum concepts
* Circuit structure
* Simulation outcomes
* Learner mistakes
* Practice guidance

The AI must not become the source of truth for:

* Probabilities
* Measurement counts
* Statevector values
* Execution status
* Other numerical quantum results

---

# 19. AI Context Pipeline

The intended pipeline is:

```text
Learner Question
       ↓
FastAPI
       ↓
AI Context Builder
       ↓
Curriculum
+
Circuit IR
+
Simulation Result
+
Relevant Learner Context
       ↓
LLM
       ↓
Validated Response
       ↓
Learner
```

---

# 20. AI No-Fabrication Rule

If the simulator has not produced a result, the AI must not pretend that one exists.

Example:

> "The circuit has not been executed yet, so I can't verify the numerical result."

Likewise, the AI must not claim to have executed a circuit when it did not.

---

# 21. AI Context Refresh

When the learner modifies the circuit:

```text
Old Circuit
   ↓
Old Result
```

must not remain the active context after the circuit changes.

The intended process is:

```text
Circuit Modified
      ↓
New Circuit IR
      ↓
New Simulation
      ↓
New Result
      ↓
Updated AI Context
```

This is required for trustworthy circuit-aware tutoring.

---

# 22. Practice

The MVP must include at least one meaningful practice activity.

Preferred primary challenge:

> **Build a Bell State.**

The activity should allow the learner to:

* Read instructions
* Work with the Circuit Lab
* Use hints
* Submit an answer
* Receive feedback
* Receive a score or completion result

---

# 23. Practice Types

The MVP may implement:

```text
Multiple Choice
Concept Question
Predict Result
Circuit Construction
Circuit Modification
Result Interpretation
```

At least one circuit-based practice task should be implemented.

---

# 24. Practice Evaluation

For a circuit-based challenge:

```text
Learner Circuit
      ↓
Circuit IR
      ↓
Validation
      ↓
Evaluation
      ↓
Feedback
```

Where appropriate, the circuit may also be simulated to evaluate its behavior.

The evaluation must be based on actual application data rather than arbitrary scoring.

---

# 25. Assessment

The MVP should provide at least one assessment.

The assessment can contain:

* Multiple-choice questions
* Concept questions
* Circuit interpretation questions
* Result interpretation questions

The assessment should produce:

* Score
* Pass/fail status where applicable
* Feedback
* Next-step recommendation

---

# 26. Assessment Integrity

The backend must hold the authoritative answer key.

The learner-facing API must not unnecessarily expose correct answers before submission.

During assessment, AI assistance should respect the assessment mode.

The AI should not automatically reveal protected answers.

---

# 27. Progress Tracking

The MVP should track basic learner progress.

Minimum progress information:

```text
Lesson completion
Practice completion
Practice score
Assessment score
Concept mastery
Current learning stage
```

Progress should be based on real learner activity.

The MVP does not require advanced machine-learning-based mastery prediction.

---

# 28. Recommendation

The MVP may use deterministic recommendations.

Example:

```text
Low Measurement Performance
        ↓
Review Measurement
        ↓
Practice Measurement
        ↓
Continue to next concept
```

The product must not claim that recommendations are generated by advanced adaptive AI unless that capability is actually implemented.

---

# 29. MVP Algorithms

The official MVP algorithms are:

## Bell State

Primary demonstration.

Demonstrates:

* Superposition
* Entanglement
* Measurement
* Circuit construction
* Simulation
* Visualization
* AI explanation

## Deutsch-Jozsa

Demonstrates:

* Quantum algorithm structure
* Oracle concepts
* Circuit reasoning

## Grover

Demonstrates:

* Search
* Amplitude amplification
* Algorithm-level circuit understanding

The implementations should remain small and reliable.

---

# 30. Primary Bell State Circuit

The main demo circuit is:

```text
q0 ── H ──●── M
          │
q1 ───────X── M
```

The learner should be able to build this circuit in the Circuit Lab.

---

# 31. Bell State Primary Learning Experience

The intended experience is:

```text
Learn
   ↓
Understand Superposition
   ↓
Understand Entanglement
   ↓
Build Bell State
   ↓
Run
   ↓
See Results
   ↓
Ask "Why did I get 00 and 11?"
   ↓
AI Explains
   ↓
Modify Circuit
   ↓
Run Again
   ↓
Compare Result
```

This is the central MVP demonstration.

---

# 32. MVP Demo Flow

The complete hackathon flow is:

```text
Landing
   ↓
Dashboard
   ↓
Lesson
   ↓
Circuit Lab
   ↓
Build
   ↓
Validate
   ↓
Run
   ↓
Visualize
   ↓
Ask AI
   ↓
Modify
   ↓
Run Again
   ↓
Practice
   ↓
Assessment
   ↓
Progress
```

---

# 33. MUST-HAVE Feature List

The final required MVP feature list is:

```text
✅ Landing page
✅ Dashboard
✅ Structured learning
✅ Quantum concepts
✅ Bell State lesson/demo
✅ Circuit Lab
✅ Circuit IR
✅ Circuit validation
✅ Quantum simulation
✅ Measurement histogram
✅ Probability visualization
✅ State information
✅ Circuit-aware AI Tutor
✅ Practice challenge
✅ Assessment
✅ Basic progress
✅ Basic recommendation
```

---

# 34. SHOULD-HAVE Features

Only implement these after the MUST-HAVE path is reliable.

```text
🟡 Algorithm templates
🟡 Circuit comparison
🟡 Guided multi-level hints
🟡 Bloch sphere
🟡 Code editor
🟡 Code export
🟡 Additional framework adapter
🟡 More advanced progress visualizations
🟡 Dark mode
```

These should never delay completion of the main learning loop.

---

# 35. NICE-TO-HAVE Features

These are optional extras only after the MVP is working.

```text
🟢 Advanced animations
🟢 Rich circuit editing
🟢 Additional visualizations
🟢 Advanced recommendation logic
🟢 More algorithms
```

---

# 36. OUT OF MVP

The following are explicitly outside the MVP unless the core system is already complete:

```text
❌ Real quantum hardware execution
❌ Full multi-framework support
❌ Large algorithm library
❌ Real-time collaborative editing
❌ Full instructor platform
❌ Enterprise authentication
❌ Complex gamification
❌ Leaderboards
❌ Virtual currency
❌ Kubernetes
❌ Microservice infrastructure
❌ Multi-region infrastructure
❌ Advanced quantum noise system
❌ Complex autonomous AI agents
❌ Custom-trained foundation model
```

---

# 37. MVP Non-Goals

The MVP is not intended to:

* Replace professional quantum development environments.
* Replace full quantum education programs.
* Provide production-scale quantum cloud infrastructure.
* Implement every quantum algorithm.
* Provide unrestricted AI autonomy.
* Solve every quantum-learning problem.

The MVP exists to prove the central QubitSphere concept.

---

# 38. MVP Definition of Done

The MVP should be considered functionally complete when a learner can:

## Learn

* [ ] Open a structured lesson.
* [ ] Read a clear explanation.
* [ ] Understand the lesson objective.

## Build

* [ ] Open Circuit Lab.
* [ ] Add gates.
* [ ] Remove gates.
* [ ] Modify the circuit.
* [ ] See the Circuit IR-derived circuit.

## Run

* [ ] Validate the circuit.
* [ ] Execute it.
* [ ] Receive actual simulation output.

## Visualize

* [ ] See measurement counts.
* [ ] See probabilities.
* [ ] See useful state information.

## Ask

* [ ] Open the AI Tutor.
* [ ] Ask about the current circuit.
* [ ] Receive a circuit-aware response.
* [ ] Receive an explanation based on verified simulation data.

## Experiment

* [ ] Modify the circuit.
* [ ] Execute again.
* [ ] Observe a changed result.
* [ ] Ask AI about the change.

## Practice

* [ ] Complete at least one meaningful circuit challenge.
* [ ] Receive feedback.

## Assess

* [ ] Complete an assessment.
* [ ] Receive a score.

## Progress

* [ ] See updated learner progress.
* [ ] Receive a next-step recommendation.

---

# 39. MVP Technical Definition of Done

The technical MVP is complete when:

* [ ] Frontend runs successfully.
* [ ] Backend runs successfully.
* [ ] Frontend communicates with backend through defined APIs.
* [ ] Circuit IR is implemented.
* [ ] Circuit validation is implemented.
* [ ] Qiskit/Qiskit Aer simulation works.
* [ ] Results are normalized.
* [ ] Results are visualized.
* [ ] AI receives relevant context.
* [ ] AI can explain a live/current circuit.
* [ ] Practice evaluation works.
* [ ] Assessment scoring works.
* [ ] Progress updates work.
* [ ] Critical error states are handled.
* [ ] Secrets are not exposed.

---

# 40. MVP Quality Requirements

The MVP should be:

### Functionally correct

The main interactions work.

### Quantum-correct

Simulation results are generated by the quantum engine.

### Educationally understandable

The learner can understand what they are doing.

### Visually coherent

The application feels like one product.

### AI-grounded

The AI uses current context and verified results.

### Demonstrable

The complete Bell State flow can be shown without relying on manual backend intervention.

---

# 41. MVP Reliability Priorities

When deciding what to fix first:

```text
1. Broken core functionality
2. Quantum correctness
3. AI correctness/context
4. Data/API reliability
5. UX problems
6. Visual polish
7. Optional features
```

---

# 42. Feature Addition Rule

Before adding a new feature, ask:

> Does this improve the core learning loop?

If not, it should probably not be added during the MVP phase.

A new feature must not compromise completion of:

```text
Learn
→ Build
→ Run
→ Visualize
→ Ask
→ Practice
→ Assess
```

---

# 43. Scope Protection Rule

Codex, Claude, and other AI development agents must not expand the MVP scope automatically.

An AI coding agent must not introduce additional:

* Pages
* Frameworks
* Services
* Algorithms
* Database systems
* Authentication mechanisms
* AI agents

unless requested or clearly required.

---

# 44. Architecture Protection Rule

The MVP must preserve these boundaries:

```text
Frontend
   ↓
API
   ↓
Circuit IR
   ↓
Quantum Engine
   ↓
Verified Results
   ↓
AI Context
   ↓
LLM
```

Do not bypass Circuit IR.

Do not move quantum simulation into the frontend.

Do not make the LLM responsible for numerical quantum computation.

---

# 45. MVP Demo Priority

The most important demonstration is:

```text
Bell State
   ↓
Circuit Lab
   ↓
Simulation
   ↓
Visualization
   ↓
AI Explanation
```

The second demonstration layer is:

```text
Modify Circuit
   ↓
Simulate Again
   ↓
Explain Changed Result
```

Practice, assessment, and progress complete the story.

---

# 46. Time Constraint Strategy

Because the hackathon implementation timeline is short, development should follow this order:

```text
Foundation
   ↓
Frontend Shell
   ↓
Backend
   ↓
Circuit IR
   ↓
Circuit Lab
   ↓
Simulation
   ↓
Visualization
   ↓
AI Tutor
   ↓
Practice
   ↓
Assessment
   ↓
Progress
   ↓
Polish
```

Do not spend disproportionate time polishing secondary screens before the circuit workflow works.

---

# 47. Final MVP Principle

The QubitSphere MVP is not measured by how many features it has.

It is measured by whether it convincingly demonstrates:

```text
A learner can learn something
        ↓
Build it
        ↓
Run it
        ↓
See what happened
        ↓
Ask why
        ↓
Get a grounded explanation
        ↓
Experiment again
        ↓
Practice
        ↓
Be assessed
```

The final rule is:

> **QubitSphere MVP = one reliable, integrated quantum-learning loop, demonstrated through a polished Bell State experience and supported by a clear foundation for future expansion.**
