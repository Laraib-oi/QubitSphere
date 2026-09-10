# QubitSphere — System Architecture

## 1. Purpose

This document defines the high-level technical architecture of QubitSphere.

The architecture is designed around the core learning loop:

**Learn → Build → Run → Visualize → Ask → Practice → Assess**

The system should remain simple enough to implement during the Smart India Hackathon while maintaining a clean separation between:

* User interface
* Application logic
* Circuit representation
* Quantum execution
* Simulation results
* AI tutoring
* Learning and assessment data

---

# 2. Architecture Goals

The architecture should achieve the following goals:

1. Support a complete end-to-end learning experience.
2. Keep quantum computation separate from the AI layer.
3. Keep the frontend independent of a specific quantum framework.
4. Make the Circuit IR the common representation of quantum circuits.
5. Make simulation results available to visualization and AI systems.
6. Keep components modular and testable.
7. Avoid unnecessary production-level complexity.
8. Allow the system to be extended after the hackathon.

---

# 3. High-Level Architecture

The intended architecture is:

```text
┌──────────────────────────────────────────────┐
│                  Learner                     │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              QubitSphere UI                  │
│                                              │
│ Dashboard                                    │
│ Learning                                     │
│ Circuit Lab                                  │
│ Results / Visualization                      │
│ AI Tutor                                     │
│ Practice / Assessment                        │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             Application API                  │
│                                              │
│ Learning APIs                                │
│ Circuit APIs                                 │
│ Simulation APIs                               │
│ AI Tutor APIs                                 │
│ Practice / Assessment APIs                   │
│ Progress APIs                                │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             Circuit IR Layer                │
│                                              │
│ Framework-neutral circuit representation     │
└──────────────┬─────────────────┬─────────────┘
               │                 │
               ▼                 ▼
┌──────────────────────┐   ┌───────────────────┐
│ Quantum Execution    │   │ Learning / Data   │
│ Layer                │   │ Layer             │
│                      │   │                   │
│ Circuit execution    │   │ Lessons           │
│ Simulation           │   │ Progress          │
│ State calculation    │   │ Practice          │
│ Measurements         │   │ Assessment        │
└──────────┬───────────┘   └───────────────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│          Normalized Simulation Result        │
│                                              │
│ State information                            │
│ Probabilities                                │
│ Measurements                                │
│ Execution metadata                           │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                 AI Context                   │
│                                              │
│ Current lesson                               │
│ Current circuit                              │
│ Circuit IR                                   │
│ Simulation result                            │
│ Learner context                              │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                  AI Tutor                    │
│                                              │
│ Explanation                                  │
│ Guidance                                     │
│ Hints                                        │
│ Conceptual reasoning                         │
└──────────────────────────────────────────────┘
```

---

# 4. Frontend Layer

The frontend is responsible for the learner-facing experience.

The frontend should contain interfaces for:

* Dashboard
* Learning modules
* Concept explanations
* Circuit Lab
* Simulation results
* Visualizations
* AI Tutor
* Practice
* Assessment
* Progress

The frontend should focus on presentation and user interaction.

It should not contain the authoritative quantum-computation logic.

---

# 5. Dashboard

The dashboard provides the learner's main entry point.

It should display information such as:

* Current learning progress
* Available modules
* Recently completed activities
* Practice status
* Assessment status
* Recommended next step

The dashboard should remain simple in the MVP.

---

# 6. Learning Layer

The learning layer provides structured educational content.

Responsibilities include:

* Lessons
* Topics
* Concept explanations
* Algorithm explanations
* Learning progression

The learning layer should connect theoretical concepts to practical circuit activities.

For example:

```text
Superposition
     ↓
Hadamard Gate
     ↓
Circuit Activity
     ↓
Simulation
     ↓
Result Explanation
```

---

# 7. Circuit Lab Layer

The Circuit Lab is responsible for interactive circuit construction.

The learner should be able to:

* Create a circuit
* Select qubits
* Add gates
* Remove gates
* Modify gates
* Add measurements
* Run the circuit

The Circuit Lab should communicate using Circuit IR.

The UI should not directly depend on Qiskit or another specific quantum framework.

---

# 8. Circuit IR Layer

Circuit IR stands for:

**Circuit Intermediate Representation**

It is the framework-neutral representation of a quantum circuit.

Example:

```json id="t4v6qv"
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
```

The Circuit IR acts as a contract between the frontend and the quantum execution layer.

The frontend creates or modifies the Circuit IR.

The execution layer consumes the Circuit IR.

---

# 9. Quantum Execution Layer

The quantum execution layer is responsible for actual quantum computation.

Its responsibilities include:

* Validating circuit operations
* Translating Circuit IR into simulator operations
* Executing the circuit
* Calculating quantum state information
* Calculating measurement probabilities
* Performing measurement sampling
* Returning structured results

This layer is the source of truth for quantum computation.

---

# 10. Quantum Framework Isolation

The quantum execution layer should isolate the selected quantum framework from the rest of the application.

Conceptually:

```text
Frontend
   ↓
Circuit IR
   ↓
Execution Interface
   ↓
Quantum Framework / Simulator
   ↓
Normalized Result
```

The rest of the application should not need to know whether the backend uses:

* Qiskit
* PennyLane
* Another simulator
* Another quantum framework

The implementation can change without requiring a complete rewrite of the frontend.

---

# 11. Simulation Result

The execution layer should return a normalized simulation result.

A conceptual result may contain:

```json id="9q9z4r"
{
  "state": {},
  "probabilities": {},
  "measurements": {},
  "shots": 1024
}
```

The exact schema will be defined separately if required.

The important principle is that all downstream systems receive structured, verified information.

---

# 12. Visualization Layer

The visualization system consumes simulation results.

Possible visualizations include:

* Measurement histogram
* Basis-state probabilities
* Probability bars
* State information
* Circuit execution information

The visualization layer should not independently calculate quantum results.

It should display information produced by the execution layer.

---

# 13. AI Context Layer

The AI Context Layer prepares verified application information for the AI tutor.

The context may contain:

```text
Current Lesson
       +
Current Concept
       +
Current Circuit
       +
Circuit IR
       +
Simulation Result
       +
Learner Progress
       ↓
AI Context
```

This context allows the AI to answer questions about the learner's actual activity.

---

# 14. AI Tutor Layer

The AI Tutor is responsible for educational interaction.

The AI may provide:

* Explanations
* Guidance
* Hints
* Concept clarification
* Circuit interpretation
* Result interpretation
* Personalized learning assistance

The AI should use the supplied circuit and simulation context when answering circuit-related questions.

---

# 15. Critical Separation: AI vs Quantum Engine

This is one of the most important architectural rules.

```text
             QUBITSPHERE
                  │
       ┌──────────┴──────────┐
       │                     │
       ▼                     ▼
 Quantum Engine             LLM
       │                     │
       │                     │
 Calculates                 Explains
       │                     │
       ▼                     ▼
Verified Results       Educational Response
```

The quantum engine calculates.

The LLM explains.

The LLM must not be used as the authoritative source for:

* Statevectors
* Probabilities
* Measurement distributions
* Circuit execution
* Numerical quantum calculations

---

# 16. AI Request Flow

When a learner asks a circuit-related question, the intended flow is:

```text
Learner Question
       ↓
AI Tutor API
       ↓
Collect Current Context
       ↓
Current Circuit
       +
Circuit IR
       +
Verified Simulation Result
       +
Current Lesson
       ↓
AI Context
       ↓
LLM
       ↓
Educational Explanation
       ↓
Learner
```

This prevents the AI from answering circuit questions without knowing what circuit the learner is actually using.

---

# 17. Example AI Interaction

Suppose the learner has:

```text
q0 ── H ──●── M
          │
q1 ───────X── M
```

The learner asks:

> Why do I mostly get 00 and 11?

The system should provide the AI with:

* The circuit
* Circuit IR
* Simulation result
* Measurement distribution
* Relevant lesson context

The AI can then explain the relationship between:

* Hadamard operation
* Superposition
* Controlled-X
* Entanglement
* Measurement

The numerical result itself must come from the quantum execution layer.

---

# 18. Learning and Progress Data

The application should maintain learner-related information such as:

* Lessons completed
* Practice completed
* Assessment results
* Current learning stage
* Recommended next step

The data layer should remain simple for the MVP.

A relational database or suitable managed database can be used if persistent storage is required.

---

# 19. API Layer

The application API should provide clear interfaces between the frontend and backend functionality.

Conceptual API groups include:

```text
/api/learning
/api/circuits
/api/simulation
/api/ai
/api/practice
/api/assessment
/api/progress
```

The exact endpoints and request/response schemas will be defined separately in:

```text
docs/12-API-Contracts.md
```

---

# 20. Request Flow: Running a Circuit

When a learner runs a circuit:

```text
Circuit Lab
    ↓
Circuit IR
    ↓
Simulation API
    ↓
Circuit Validation
    ↓
Quantum Execution Layer
    ↓
Simulation
    ↓
Normalized Result
    ↓
Frontend
    ↓
Visualization
```

The frontend then displays the result.

---

# 21. Request Flow: Asking the AI

When a learner asks the AI:

```text
AI Tutor UI
    ↓
AI API
    ↓
Collect Context
    ↓
Circuit IR
    +
Simulation Result
    +
Lesson Context
    +
Learner Context
    ↓
AI Context Builder
    ↓
LLM
    ↓
Response
    ↓
AI Tutor UI
```

---

# 22. Request Flow: Practice

The practice workflow should be:

```text
Learning Module
      ↓
Practice Challenge
      ↓
Learner Action
      ↓
Validation
      ↓
Result
      ↓
Feedback
      ↓
Progress Update
```

Practice should reinforce the concepts taught by the learning modules.

---

# 23. Request Flow: Assessment

The assessment workflow should be:

```text
Assessment
    ↓
Learner Answers
    ↓
Validation / Scoring
    ↓
Score
    ↓
Progress Update
    ↓
Recommendation
```

The MVP assessment system should remain simple.

---

# 24. Data Flow

The overall information flow is:

```text
Learner
   ↓
Frontend
   ↓
Application API
   ↓
Circuit IR
   ↓
Quantum Execution
   ↓
Verified Result
   ↓
┌───────────────┬────────────────┐
│               │                │
▼               ▼                ▼
Visualization  AI Context     Progress
│               │
▼               ▼
Learner       AI Tutor
```

---

# 25. Error Handling

The system should handle common failures gracefully.

Examples:

### Invalid Circuit

Return a clear validation error.

### Simulation Failure

Show a user-friendly error rather than crashing the application.

### AI Failure

The circuit and simulation experience should continue working even if the AI service is temporarily unavailable.

### Unsupported Gate

Clearly identify the unsupported operation.

### Invalid API Request

Return structured validation errors.

---

# 26. Security Principles

Even though this is a hackathon MVP, basic security practices should be followed.

Do not expose:

* API keys
* Secret credentials
* Database credentials
* Private configuration

Secrets should be stored in environment variables or the deployment platform's secret-management system.

User-provided input should be validated before being processed.

---

# 27. Performance Principles

The MVP should prioritize responsiveness.

Important principles:

* Keep circuit simulations reasonably small.
* Avoid unnecessary API calls.
* Avoid sending excessive context to the AI.
* Cache static learning content where practical.
* Keep visualization data compact.
* Avoid blocking the UI unnecessarily.

---

# 28. Technology Independence

The architecture intentionally separates conceptual responsibilities from specific technologies.

The exact technology choices will be documented in:

```text
docs/06-Tech-Stack.md
```

The architecture should remain valid even if implementation technologies change.

---

# 29. Hackathon Simplification

The architecture should not become unnecessarily complex.

The MVP does NOT require:

* Microservices
* Kubernetes
* Distributed event systems
* Complex message queues
* Multi-region infrastructure
* Large-scale cloud orchestration

A modular application with clear boundaries is sufficient.

---

# 30. Architecture Principles

The following principles are mandatory:

### Principle 1 — Quantum Truth

Quantum calculations must come from the quantum execution layer.

### Principle 2 — AI Explanation

The LLM explains verified information.

### Principle 3 — Framework Neutrality

The frontend communicates through Circuit IR rather than directly depending on a quantum framework.

### Principle 4 — Separation of Concerns

UI, application logic, quantum execution, AI context, and data management should remain logically separated.

### Principle 5 — Vertical Slice

Every major feature should contribute to the core learning loop.

### Principle 6 — Simplicity

Avoid unnecessary infrastructure and abstractions during the hackathon.

### Principle 7 — Testability

Quantum logic and important application logic should be testable independently from the UI.

### Principle 8 — Extensibility

The architecture should allow additional algorithms, visualizations, and learning modules to be added later without rewriting the entire system.

---

# 31. Architecture Success Criteria

The architecture is successful if:

* The learner can interact with the frontend without knowing the backend implementation.
* The frontend communicates using Circuit IR.
* The simulator produces authoritative quantum results.
* Visualization uses simulator results.
* The AI receives the learner's actual circuit context.
* The AI can explain verified results.
* Learning, practice, assessment, and progress remain connected.
* Quantum framework implementation details remain isolated.
* The system remains simple enough to implement during the hackathon.

---

# 32. Final Architecture Summary

The QubitSphere architecture can be summarized as:

```text
              QUBITSPHERE
                   │
                   ▼
             ┌───────────┐
             │ Frontend  │
             └─────┬─────┘
                   │
                   ▼
             ┌───────────┐
             │ API Layer │
             └─────┬─────┘
                   │
                   ▼
             ┌───────────┐
             │ Circuit IR│
             └─────┬─────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Quantum Execution   │
        │      Layer          │
        └──────────┬──────────┘
                   │
                   ▼
          ┌────────────────┐
          │ Verified Result│
          └───────┬────────┘
                  │
          ┌───────┴────────┐
          ▼                ▼
 ┌────────────────┐ ┌───────────────┐
 │ Visualization  │ │ AI Context    │
 └────────────────┘ └───────┬───────┘
                             │
                             ▼
                      ┌─────────────┐
                      │ AI Tutor    │
                      └─────────────┘
```

The central architectural rule remains:

> **The quantum engine calculates. The LLM explains.**
