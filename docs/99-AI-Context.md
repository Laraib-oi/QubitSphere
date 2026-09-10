# QubitSphere — AI Context

## 1. Purpose

This document is the primary operational context for AI coding and development agents working on QubitSphere.

It is intended to be read before making significant changes to the repository.

Primary consumers include:

* Codex
* Claude
* ChatGPT
* Other AI coding/review agents

This document summarizes the project's most important decisions.

Detailed specifications remain in the other files under:

```text
docs/
```

When this document conflicts with an older implementation detail, the current documented architecture and product requirements take priority.

---

# 2. Project Identity

## Product Name

**QubitSphere**

Use this exact spelling and capitalization.

Do not rename the product to another variation unless the project owner explicitly requests it.

---

## Project Type

AI-powered interactive quantum-learning platform.

---

## Hackathon

Smart India Hackathon 2026.

---

## Problem Statement

**AI-Based Interactive Quantum Algorithm Learning Platform**

---

# 3. One-Sentence Product Definition

> **QubitSphere is an AI-powered interactive quantum-learning platform that connects lessons, quantum circuit building, simulation, visualization, circuit-aware tutoring, practice, and assessment into one continuous learning experience.**

---

# 4. Core Product Principle

QubitSphere is not simply:

* A chatbot
* An online course
* A circuit simulator
* A quantum code editor

It is an integrated learning environment.

The central learning loop is:

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

Every major feature should support this loop.

---

# 5. Primary Differentiator

The primary differentiator is:

> **Circuit-aware AI tutoring**

The AI should understand the learner's current context, including when relevant:

* Current lesson
* Current concept
* Current circuit
* Circuit IR
* Simulation result
* Measurement data
* Practice task
* Assessment mode
* Learner progress

The learner should not have to manually copy the circuit or simulation output into an external chatbot.

---

# 6. Critical AI Rule

The most important AI architecture principle is:

> **The quantum engine calculates. The AI explains.**

The LLM is not the source of truth for quantum calculations.

The flow is:

```text
Circuit IR
   ↓
Quantum Simulator
   ↓
Verified Result
   ↓
AI Context Builder
   ↓
LLM
   ↓
Educational Explanation
```

Never reverse this relationship.

---

# 7. Quantum Truth Rule

The quantum execution layer is authoritative for:

* State calculations
* Probabilities
* Measurement counts
* Simulation output
* Execution status

The AI must not invent these values.

If a required simulation result is unavailable, the AI should say that it cannot verify the numerical result.

---

# 8. Curriculum Truth Rule

Structured curriculum data is authoritative for:

* Lesson content
* Learning objectives
* Concept definitions
* Practice instructions
* Assessment content
* Prerequisites
* Next-topic relationships

The AI may explain curriculum content but should not silently redefine official curriculum facts.

---

# 9. Circuit Truth Rule

The **Circuit IR** is the canonical logical representation of a QubitSphere circuit.

Framework-specific circuits are derived representations.

The relationship is:

```text
Circuit IR
   ↓
Execution Adapter
   ↓
Quantum Framework
```

Do not make Qiskit's internal circuit representation the frontend's source of truth.

---

# 10. Progress Truth Rule

Learner progress is authoritative in the progress system/database.

The AI may use progress to personalize explanations or recommendations.

The AI must not arbitrarily modify learner progress.

Progress updates should occur through the appropriate application service.

---

# 11. MVP Scope

The MVP is intentionally limited because the hackathon timeline is short.

## MUST HAVE

* Dashboard
* Structured learning modules
* Quantum concepts
* Circuit Lab
* Circuit IR
* Circuit validation
* Quantum simulation
* Measurement results
* Probability visualization
* State information
* Circuit-aware AI Tutor
* Practice challenge
* Basic assessment
* Basic progress
* Bell State demonstration

## MVP Algorithms

1. Bell State
2. Deutsch-Jozsa
3. Grover

Bell State is the primary demonstration.

---

# 12. MVP Priority

When time is limited, use this order:

```text
1. Circuit Lab
2. Quantum Simulation
3. Visualization
4. Circuit-aware AI
5. Learning Content
6. Practice
7. Assessment
8. Progress
9. UI Polish
```

The priority is:

> **Working vertical slice > feature quantity**

Do not sacrifice the core working flow for secondary features.

---

# 13. Primary Demo

The primary hackathon demonstration is:

```text
Lesson
  ↓
Bell State
  ↓
Circuit Lab
  ↓
Build Circuit
  ↓
Run
  ↓
View Results
  ↓
Ask AI
  ↓
Modify Circuit
  ↓
Run Again
  ↓
Observe Changed Result
  ↓
Practice
  ↓
Assessment
  ↓
Progress
```

The most important moment is:

```text
Circuit
   ↓
Simulation
   ↓
AI Explanation
```

---

# 14. Bell State Demo Circuit

The primary demonstration circuit is:

```text
q0 ── H ──●── M
          │
q1 ───────X── M
```

Conceptually:

```text
H(q0)
   ↓
CX(q0,q1)
   ↓
Measure
```

The corresponding Circuit IR should be used throughout the application.

---

# 15. Bell State Demo Question

The key AI question is:

> **Why did I get 00 and 11?**

The AI should explain the result using:

* Current lesson
* Current Circuit IR
* Verified simulation result

It should not answer from generic knowledge alone.

---

# 16. Circuit Modification Demo

After the initial Bell State execution, remove the H gate.

Then:

```text
Updated Circuit
      ↓
New Simulation
      ↓
New Result
      ↓
Updated AI Context
```

Ask:

> **Why did the result change after I removed H?**

The AI must explain the updated circuit, not the previous one.

---

# 17. Technology Stack

## Frontend

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Lucide
```

## Backend

```text
FastAPI
Python
```

## Quantum

```text
Qiskit
Qiskit Aer
```

## Database

```text
PostgreSQL
Supabase as managed option
```

## Visualization

```text
Recharts
SVG / Canvas where appropriate
```

## AI

```text
LLM API
```

## Development

```text
VS Code
Git
GitHub
Codex
Claude
```

---

# 18. Architecture

The high-level architecture is:

```text
                    QubitSphere
                         │
                  Next.js Frontend
                         │
                    FastAPI API
                         │
                    Circuit IR
                         │
                 Quantum Execution
                         │
                    Qiskit Aer
                         │
                Verified Simulation
                         │
                 Result Normalizer
                         │
                  AI Context Builder
                         │
                       LLM
                         │
                    AI Response
                         │
                    Frontend
```

Supporting systems:

```text
Curriculum
Database
Practice
Assessment
Progress
```

---

# 19. Frontend Responsibilities

The frontend is responsible for:

* Rendering the application
* User interaction
* Circuit editing
* Circuit visualization
* Lesson presentation
* Result visualization
* AI Tutor UI
* Practice UI
* Assessment UI
* Progress presentation

The frontend should not own:

* Quantum simulation
* Database credentials
* AI provider secrets
* Backend-only logic

---

# 20. Backend Responsibilities

The backend is responsible for:

* API routing
* Input validation
* Authentication/authorization
* Circuit validation
* Quantum execution requests
* Result normalization
* Curriculum access
* AI context preparation
* AI API integration
* Practice evaluation
* Assessment evaluation
* Progress updates
* Database access

---

# 21. Quantum Layer Responsibilities

The quantum layer is responsible for:

* Translating Circuit IR into executable quantum operations
* Running simulation
* Producing quantum results
* Returning execution errors
* Supporting the configured execution backend

The MVP uses Qiskit/Qiskit Aer.

---

# 22. Circuit IR

Circuit IR is the canonical framework-neutral representation of circuits.

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

---

# 23. Supported MVP Gates

Preferred MVP gate registry:

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

The UI does not need to expose every gate immediately.

Only expose gates required for the current MVP experience.

---

# 24. Circuit IR Rules

Circuit IR must be:

* JSON-compatible
* Framework-neutral
* Serializable
* Validatable
* Extensible
* Predictable

Circuit IR must not contain:

* Raw Python code
* JavaScript
* Shell commands
* Credentials
* API keys
* Executable instructions
* Framework-specific object serialization

Circuit IR is data, not executable code.

---

# 25. Circuit Validation

All circuits must be validated before execution.

Validation must check:

* Qubit count
* Classical-bit count
* Gate names
* Target indexes
* Control/target indexes
* Required parameters
* Measurement indexes
* Overall schema

Invalid circuits must not be executed.

---

# 26. Simulation

The intended flow is:

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
   ↓
Normalization
```

The frontend must not execute Qiskit directly.

---

# 27. Simulation Result

A normalized result may include:

```json
{
  "success": true,
  "executionId": "execution-001",
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

Actual values must come from the quantum execution layer.

---

# 28. Finite-Shot Rule

Simulation counts are sampled results.

For example:

```text
Ideal:
00 → 50%
11 → 50%
```

may produce approximately:

```text
00 → 502 / 1024
11 → 522 / 1024
```

The AI should distinguish between:

```text
Ideal probability
```

and:

```text
Observed finite-shot counts
```

---

# 29. Stale Result Rule

When the learner changes the circuit:

```text
Old Circuit
   ↓
Old Result
```

must no longer be treated as the current result.

After a meaningful circuit change:

```text
New Circuit IR
   ↓
New Simulation
   ↓
New Result
```

The AI must use the current circuit/result context.

---

# 30. AI Context

The AI Context Builder may combine:

```text
Question
+
Current Lesson
+
Current Concept
+
Circuit IR
+
Simulation Result
+
Practice Context
+
Assessment Mode
+
Relevant Progress
```

Only relevant context should be included.

Do not dump the entire database into the LLM.

---

# 31. AI Context Priority

When information conflicts, use this conceptual priority:

```text
1. Quantum execution result
2. Validated Circuit IR
3. Structured curriculum
4. Application-defined learner state
5. General model knowledge
6. LLM inference
```

For numerical quantum behavior, the simulator is authoritative.

---

# 32. AI Modes

The MVP may support:

```text
Explain
Hint
Debug
Interpret
Practice
Recommend
```

These may be logical modes rather than separate models.

---

# 33. Explain Mode

Used for:

* Concept explanations
* Gate explanations
* Circuit explanations

Example:

> What does the H gate do?

The AI should explain the gate and relate it to the current circuit where relevant.

---

# 34. Hint Mode

The AI should guide without necessarily revealing the complete solution.

Example:

```text
Hint 1:
Think about the gate that creates superposition.
```

The learner can request another hint when appropriate.

---

# 35. Debug Mode

The AI may inspect:

* Circuit IR
* Gate sequence
* Qubit configuration
* Measurements
* Simulation result

It should distinguish between confirmed structural errors and likely conceptual issues.

Do not claim certainty without sufficient evidence.

---

# 36. Interpret Mode

Used when the learner wants to understand an observed simulation result.

Typical inputs:

```text
Circuit IR
+
Simulation Result
+
Question
```

The AI should explain what the result means.

---

# 37. Practice Mode

The AI may:

* Explain instructions
* Give hints
* Ask guiding questions
* Explain learner mistakes

The AI should not automatically solve a challenge unless the product explicitly allows it.

---

# 38. Assessment Mode

Assessment behavior is different from ordinary tutoring.

During assessment:

```text
Teach
≠
Reveal Answer
```

The AI should not automatically give protected answers when assessment restrictions are enabled.

The backend owns the authoritative answer key.

---

# 39. AI No-Fabrication Rules

Never fabricate:

* Measurement counts
* Probabilities
* Statevector values
* Simulation results
* Execution status
* Assessment scores
* Learner mastery
* Backend activity

If information is missing:

> Acknowledge that it is missing.

---

# 40. AI Response Structure

Where practical, AI responses should be structured.

Conceptual response:

```json
{
  "answer": "string",
  "keyPoints": [],
  "hint": null,
  "nextStep": null
}
```

The frontend should not depend on parsing arbitrary prose to determine application behavior.

---

# 41. AI Failure Handling

### AI unavailable

The platform remains usable.

### Simulation unavailable

The AI must not invent numerical results.

### Invalid circuit

Show the learner an actionable error.

### Missing context

Do not guess.

### Malformed AI response

Safely retry or return a fallback response.

---

# 42. Database

Core MVP entities:

```text
users
modules
lessons
concepts
lesson_concepts
circuits
practices
practice_attempts
assessments
assessment_attempts
progress
```

Optional:

```text
ai_sessions
executions
```

---

# 43. Data Ownership

```text
Curriculum
→ owns educational content

Circuit System
→ owns Circuit IR

Quantum Execution
→ owns simulation results

Progress System
→ owns learner progress

Practice System
→ owns practice outcomes

Assessment System
→ owns assessment outcomes

AI System
→ owns AI session metadata
```

Do not allow unrelated systems to become the source of truth for another system's data.

---

# 44. Circuit Storage

Saved learner circuits should store Circuit IR.

Conceptual model:

```text
Circuit
├── id
├── userId
├── name
├── circuitIR
├── source
├── lessonId
├── createdAt
└── updatedAt
```

---

# 45. Curriculum

The curriculum is structured and data-driven.

Initial concepts/lessons should cover:

```text
Qubits
Quantum States
Superposition
Quantum Gates
Measurement
Entanglement
Bell State
Deutsch-Jozsa
Grover
```

Every important lesson should connect concepts to action where possible.

---

# 46. Curriculum Lesson Pattern

Preferred lesson flow:

```text
Explain
  ↓
Show
  ↓
Let learner try
  ↓
Run circuit
  ↓
Observe result
  ↓
Ask AI
  ↓
Practice
  ↓
Assess
  ↓
Continue
```

---

# 47. API Core Endpoints

Important MVP endpoints include:

```text
GET  /api/lessons
GET  /api/lessons/{lessonId}

GET  /api/concepts/{conceptId}

GET  /api/dashboard

POST /api/circuit/validate
POST /api/circuit/simulate

GET  /api/circuits
POST /api/circuits
GET  /api/circuits/{circuitId}
PATCH /api/circuits/{circuitId}
DELETE /api/circuits/{circuitId}

POST /api/ai/tutor

GET  /api/practice/{practiceId}
POST /api/practice/{practiceId}/submit

GET  /api/assessment/{assessmentId}
POST /api/assessment/{assessmentId}/submit

GET  /api/progress
GET  /api/progress/lessons/{lessonId}

GET  /api/algorithms
GET  /api/algorithms/{algorithmId}
```

---

# 48. API Rules

The API must:

* Validate input
* Use typed request/response models where practical
* Protect user-owned data
* Return stable error codes
* Keep secrets server-side
* Avoid arbitrary code execution
* Use Circuit IR for circuit operations
* Keep frontend independent from backend internals

---

# 49. Frontend API Rule

Do not scatter raw API calls across every component.

Prefer a centralized service/client structure.

Conceptually:

```text
services/
├── lessons
├── circuits
├── ai
├── practice
├── assessment
└── progress
```

The exact directory structure may vary.

---

# 50. Error Codes

Use stable error codes such as:

```text
INVALID_CIRCUIT
INVALID_GATE
INVALID_QUBIT_INDEX
INVALID_GATE_PARAMETER
SIMULATION_FAILED
SIMULATION_UNAVAILABLE

UNAUTHORIZED
FORBIDDEN

LESSON_NOT_FOUND
CIRCUIT_NOT_FOUND
PRACTICE_NOT_FOUND
ASSESSMENT_NOT_FOUND

PRACTICE_SUBMISSION_INVALID
ASSESSMENT_SUBMISSION_INVALID

AI_SERVICE_UNAVAILABLE
AI_RESPONSE_INVALID
AI_CONTEXT_INVALID

VALIDATION_ERROR
INTERNAL_SERVER_ERROR
```

The frontend should use error codes rather than relying only on message strings.

---

# 51. UI Direction

The QubitSphere interface should feel:

```text
Modern
Scientific
Intelligent
Calm
Interactive
Precise
Educational
Premium
```

Avoid:

```text
Childish
Overly corporate
Generic SaaS
Gaming-heavy
Visually chaotic
Excessively futuristic
```

---

# 52. UI Principle

> **QubitSphere should feel less like a collection of pages and more like a continuous quantum-learning workspace.**

---

# 53. Navigation

Main application areas:

```text
Dashboard
Learn
Circuit Lab
Algorithms
Practice
Progress
```

The exact route names may evolve, but the information architecture should remain recognizable.

---

# 54. Circuit Lab UI

The Circuit Lab should provide:

```text
Gate Palette
+
Circuit Canvas
+
Inspector
+
Action Bar
```

Main actions:

```text
Run
Reset
Save
Ask AI
```

The Circuit Lab must prioritize usability and correctness over flashy effects.

---

# 55. Simulation Result UI

Show results close to the circuit.

Typical information:

```text
Simulation Results

Probabilities
00   50%
11   50%

Measurement Counts
00   ...
11   ...

Shots
1024

Backend
Qiskit Aer
```

The exact data shown depends on available results.

---

# 56. AI Tutor UI

The AI Tutor should be integrated into the workspace.

Possible context indicator:

```text
Tutor Context

✓ Current lesson
✓ Current circuit
✓ Simulation result
✓ Relevant progress
```

The learner should be able to ask questions about the current circuit without copying information manually.

---

# 57. Accessibility

The MVP should support:

* Keyboard navigation
* Visible focus states
* Semantic HTML
* Accessible labels
* Good contrast
* Status indicators beyond color alone
* Text alternatives for important circuit information

The circuit visualization needs special accessibility attention.

---

# 58. Responsive Design

The application should support:

```text
Desktop
Laptop
Tablet
Mobile
```

For the Circuit Lab, horizontal scrolling is acceptable when necessary.

Do not make the circuit so small that gates become unreadable.

---

# 59. Animation

Animations must support the experience.

Good uses:

* Gate placement
* Panel transitions
* Simulation state changes
* Progress updates
* AI response appearance

Avoid:

* Constant background animation
* Decorative particle systems
* Long transition delays
* Excessive 3D effects

---

# 60. Design System

Use centralized design decisions for:

```text
Colors
Spacing
Typography
Radius
Shadows
Breakpoints
```

Use reusable components rather than creating slightly different versions everywhere.

---

# 61. Development Rules for Codex and Claude

## Rule 1

Read:

```text
AGENTS.md
docs/99-AI-Context.md
```

before significant work.

---

## Rule 2

Read the specific detailed documentation relevant to the task.

Examples:

```text
Circuit work
→ docs/07-Circuit-IR.md

AI work
→ docs/10-AI-Tutor-Architecture.md

API work
→ docs/12-API-Contracts.md

UI work
→ docs/11-UI-System.md
```

---

## Rule 3

Do not invent a new architecture when an existing architecture already defines the solution.

---

## Rule 4

Do not change technologies casually.

---

## Rule 5

Do not bypass Circuit IR.

---

## Rule 6

Do not move quantum simulation into the frontend.

---

## Rule 7

Do not fabricate quantum results.

---

## Rule 8

Do not create duplicate components or duplicate services when an existing solution can be reused.

---

## Rule 9

Do not modify unrelated files while implementing a focused task.

---

## Rule 10

Keep implementation within the MVP unless explicitly instructed otherwise.

---

## Rule 11

Do not add a large dependency for a small problem.

---

## Rule 12

Do not introduce production-scale infrastructure during the MVP without explicit justification.

---

## Rule 13

Maintain TypeScript typing.

Avoid unnecessary `any`.

---

## Rule 14

Maintain backend validation.

Frontend validation does not replace backend validation.

---

## Rule 15

Keep secrets out of source code, Circuit IR, curriculum, logs, and Git.

---

## Rule 16

Do not expose system prompts or internal credentials to learners.

---

## Rule 17

Treat learner input and circuit metadata as untrusted data.

---

## Rule 18

When an architectural decision changes, update the appropriate documentation.

---

# 62. Task Execution Rule for AI Coding Agents

When asked to implement a feature:

```text
1. Read relevant documentation.
2. Inspect existing repository structure.
3. Identify reusable components/services.
4. Implement only the requested feature.
5. Preserve existing architecture.
6. Run relevant checks/tests.
7. Report files changed.
8. Report any assumptions.
```

Do not immediately rewrite large sections of the repository.

---

# 63. Before Creating a New File

Check whether an existing file already provides the required functionality.

Prefer:

```text
Extend existing component
```

over:

```text
Create duplicate component
```

unless separation is genuinely required.

---

# 64. Before Changing an API

Check:

```text
docs/12-API-Contracts.md
```

and all known consumers.

Do not silently change request or response shapes.

If a breaking change is necessary:

1. Update the API contract.
2. Update affected frontend/backend code.
3. Update tests.
4. Explain the change.

---

# 65. Before Changing Circuit IR

Check:

```text
docs/07-Circuit-IR.md
```

Circuit IR changes are high-impact.

A change can affect:

```text
Circuit Lab
Simulator
Visualization
Database
AI Tutor
Practice
Assessment
```

Therefore, do not change the IR casually.

---

# 66. Before Changing AI Behavior

Check:

```text
docs/10-AI-Tutor-Architecture.md
```

Preserve:

```text
Quantum engine
→ verified facts

AI
→ explanation
```

Do not make the LLM the source of numerical quantum truth.

---

# 67. Before Changing UI Architecture

Check:

```text
docs/11-UI-System.md
```

Reuse established:

* Components
* Layout patterns
* Navigation
* Visual language
* Interaction patterns

Do not redesign unrelated areas during focused feature work.

---

# 68. Testing Philosophy

Every major feature should have a corresponding test or verification strategy.

Prioritize testing:

```text
Circuit validation
Circuit simulation
AI context
API contracts
Practice evaluation
Assessment scoring
Progress updates
```

End-to-end tests are especially valuable for the main Bell State flow.

---

# 69. Core End-to-End Test

The most important application flow is:

```text
Create Bell Circuit
       ↓
Validate
       ↓
Simulate
       ↓
Receive Result
       ↓
Display Result
       ↓
Ask AI
       ↓
AI Uses Current Circuit + Result
       ↓
Modify Circuit
       ↓
Simulate Again
       ↓
AI Uses Updated Context
```

This flow must remain reliable.

---

# 70. Demo Reliability Rule

Before the hackathon demonstration:

* Test the primary flow repeatedly.
* Verify simulation results.
* Verify AI context.
* Verify circuit modification.
* Verify assessment.
* Verify progress.
* Verify fallback behavior.

Do not use the live demo as the first time a feature has been tested end-to-end.

---

# 71. Fallback Strategy

If AI fails:

```text
Continue:
Learning
Circuit Lab
Simulation
Visualization
Practice
Assessment
```

If simulation fails:

```text
Show clear error.
Do not fabricate results.
Retain learner circuit.
```

If database fails:

Use available local/seeded data where supported.

If prepared fallback data is used in a demonstration, clearly identify it as fallback/prepared data.

---

# 72. Security Rules

Never commit:

```text
API keys
Passwords
Tokens
Private keys
Secrets
```

Never place secrets into:

```text
Circuit IR
Curriculum
Frontend code
AI context
Git
```

Learner-facing AI should not have unrestricted access to:

```text
Filesystem
Shell
Database administration
Cloud infrastructure
Credentials
```

---

# 73. Git Rules

Before making a significant change:

```text
git status
```

After implementation:

```text
git diff
git status
```

Commit meaningful completed changes.

Do not commit:

```text
.env
credentials
temporary secrets
unnecessary generated files
```

Keep commits understandable.

---

# 74. Documentation Rules

Documentation is part of the product engineering process.

When implementation changes a documented decision:

```text
Update documentation
```

Do not allow code and architecture documents to drift indefinitely.

---

# 75. Current Phase

Current project phase:

**Phase 1 — Foundation**

The foundation documentation includes:

```text
00-Project-Overview.md
01-Problem-Statement.md
02-Product-Vision.md
03-MVP-Scope.md
04-User-Flows.md
05-Architecture.md
06-Tech-Stack.md
07-Circuit-IR.md
08-Curriculum-Schema.md
09-Data-Model.md
10-AI-Tutor-Architecture.md
11-UI-System.md
12-API-Contracts.md
13-Demo-Scenario.md
14-Evaluator-QA.md
99-AI-Context.md
```

## Current Implementation Status

Completed:

* Documentation baseline committed
* Next.js frontend scaffolded
* FastAPI backend scaffolded
* Frontend ↔ FastAPI connection working
* Circuit IR models implemented
* Circuit IR validation implemented
* `POST /api/circuit/validate` implemented
* Circuit IR tests implemented and passing

Next implementation checkpoint:

* Qiskit + Qiskit Aer execution layer
* Bell State simulation

---

# 76. Phase 1 Completion Goal

The objective of Phase 1 is not to produce an enormous amount of documentation.

The objective is to ensure that the project is:

```text
Understandable
Buildable
Consistent
Recoverable
```

The documentation should give AI coding agents enough context to implement the MVP without repeatedly rediscovering the architecture.

---

# 77. Current Development Goal

After the foundation is complete, the next goal is to move into implementation.

The implementation priority is:

```text
Repository / Project Setup
        ↓
Frontend Shell
        ↓
Backend Setup
        ↓
Circuit IR
        ↓
Circuit Lab
        ↓
Quantum Simulation
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
Demo Hardening
```

Do not prematurely build secondary features.

---

# 78. What Must Not Happen

Avoid these failure modes:

### Failure 1 — Building a Generic Chatbot

The AI must remain connected to curriculum, circuit, and verified simulation context.

### Failure 2 — Building Only a Simulator

Simulation must support the learning experience.

### Failure 3 — Overbuilding the Curriculum

Focus on the MVP concepts.

### Failure 4 — Overengineering Infrastructure

A clean modular application is sufficient.

### Failure 5 — Letting AI Coding Agents Redesign Everything

Agents should implement the documented architecture.

### Failure 6 — Fabricating Results

Quantum outputs must come from the execution layer.

### Failure 7 — Adding Features Without Updating Scope

The MVP boundary must remain protected.

---

# 79. Source-of-Truth Map

Use this map whenever unsure which system owns a decision.

```text
Product Vision
→ docs/02-Product-Vision.md

MVP Boundary
→ docs/03-MVP-Scope.md

Architecture
→ docs/05-Architecture.md

Technology
→ docs/06-Tech-Stack.md

Circuit Representation
→ docs/07-Circuit-IR.md

Curriculum
→ docs/08-Curriculum-Schema.md

Database/Data
→ docs/09-Data-Model.md

AI
→ docs/10-AI-Tutor-Architecture.md

UI
→ docs/11-UI-System.md

APIs
→ docs/12-API-Contracts.md

Demo
→ docs/13-Demo-Scenario.md

Evaluator Answers
→ docs/14-Evaluator-QA.md

Operational AI Context
→ docs/99-AI-Context.md
```

---

# 80. Decision Hierarchy

When deciding how to implement something, use this order:

```text
1. User-requested requirement
2. MVP scope
3. Architecture
4. Specific subsystem documentation
5. Existing implementation
6. General best practice
7. AI agent preference
```

An AI agent's preferred implementation must not override an explicit project requirement.

---

# 81. Handling Ambiguity

When a task is ambiguous:

1. Check project documentation.
2. Inspect existing implementation.
3. Prefer the simplest option consistent with the architecture.
4. Avoid changing unrelated systems.
5. Make assumptions explicit in the implementation report.

Do not create large architectural changes merely to avoid a small ambiguity.

---

# 82. Code Quality

Code should be:

* Readable
* Typed
* Modular
* Testable
* Maintainable
* Consistent with repository conventions

Prefer simple code over clever code.

---

# 83. Performance

MVP performance priorities:

```text
Fast UI
Responsive Circuit Lab
Reasonable simulation time
Reasonable AI latency
Efficient API calls
```

Do not prematurely optimize theoretical scale.

Avoid unnecessary recomputation and unnecessary AI requests.

---

# 84. Dependency Philosophy

Before adding a dependency, ask:

```text
Is it necessary?
Does it solve a real problem?
Can existing code solve it?
Does it increase complexity?
```

Avoid dependency sprawl.

---

# 85. AI Agent Communication Rule

When reporting completed work, an AI coding agent should state:

```text
What changed
Which files changed
What was tested
Any known limitations
Any assumptions
```

Do not claim tests were run if they were not.

Do not claim a feature works if it was not actually verified.

---

# 86. Project Reality Rule

The repository is the implementation source of truth.

Documentation describes intended behavior.

If code and documentation disagree:

1. Determine whether the difference is intentional.
2. If implementation is correct and documentation is outdated, update documentation.
3. If implementation violates the documented architecture, fix the implementation unless the architecture is intentionally changed.

Do not silently allow permanent divergence.

---

# 87. Definition of a Good QubitSphere Feature

A good feature:

```text
Solves a real learner problem
        ↓
Fits the MVP
        ↓
Uses existing architecture
        ↓
Works end-to-end
        ↓
Can be demonstrated
        ↓
Does not create unnecessary complexity
```

---

# 88. Definition of a Good AI Tutor Response

A good response is:

```text
Correct
+
Grounded
+
Context-aware
+
Educational
+
Appropriate to learner level
+
Actionable when useful
```

---

# 89. Definition of a Good Circuit Feature

A good circuit feature:

```text
Uses Circuit IR
      ↓
Validates correctly
      ↓
Executes through quantum layer
      ↓
Produces verified result
      ↓
Visualizes result
      ↓
Can be explained by AI
```

---

# 90. Definition of a Good Hackathon Demo

A good demo:

```text
Shows the product quickly
      ↓
Demonstrates the central problem
      ↓
Shows the working circuit
      ↓
Shows real simulation
      ↓
Shows circuit-aware AI
      ↓
Shows experimentation
      ↓
Shows learning outcome
```

Do not prioritize feature count over demonstration quality.

---

# 91. Final Non-Negotiable Rules

The following rules are non-negotiable unless the project owner explicitly changes them:

```text
1. Product name = QubitSphere.

2. QubitSphere is an integrated quantum-learning
   environment, not merely a chatbot.

3. Circuit IR is the canonical circuit representation.

4. The frontend must not directly depend on Qiskit internals.

5. Quantum calculations come from the quantum engine.

6. The AI explains verified information.

7. The AI must not fabricate simulation results.

8. Current circuit changes require current simulation context.

9. Learner input is untrusted.

10. Secrets remain server-side.

11. Assessment rules must be respected.

12. MVP scope must remain controlled.

13. Working vertical slice is more important than feature quantity.

14. Major architecture changes must be documented.

15. Existing components/services should be reused whenever possible.

16. AI coding agents must not redesign the project without justification.

17. The Bell State flow is the primary hackathon demonstration.

18. Learn → Build → Run → Visualize → Ask → Practice → Assess
    is the central product loop.
```

---

# 92. Final QubitSphere Principle

The entire project can be summarized as:

```text
                    QubitSphere

                     LEARN
                       ↓
                     BUILD
                       ↓
                      RUN
                       ↓
                  VISUALIZE
                       ↓
                      ASK
                       ↓
                   PRACTICE
                       ↓
                    ASSESS
                       ↓
                   PROGRESS
```

Underneath that experience:

```text
Circuit Lab
     ↓
Circuit IR
     ↓
Quantum Engine
     ↓
Verified Result
     ↓
AI Context
     ↓
AI Explanation
```

The final product principle is:

> **QubitSphere connects quantum knowledge to hands-on experimentation and contextual AI explanation in one continuous learning environment.**

The final technical principle is:

> **Circuit IR defines the circuit. The quantum engine calculates the result. The AI explains the verified result.**

The final development principle is:

> **Build the smallest reliable system that convincingly demonstrates the complete learning loop.**
