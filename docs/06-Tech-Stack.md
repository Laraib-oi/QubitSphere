# QubitSphere — Technology Stack

## 1. Purpose

This document defines the official technology stack for the QubitSphere MVP.

The purpose of locking the technology stack is to prevent inconsistent technology choices during development.

Codex, Claude, and other development tools should use this document as the source of truth when creating or modifying application code.

Technology changes should not be made casually.

If a major technology change becomes necessary, the relevant documentation must be updated before implementation.

---

# 2. Technology Selection Principles

The QubitSphere MVP technology stack should follow these principles:

1. Prefer stable and well-supported technologies.
2. Prefer technologies that work well with TypeScript and Python.
3. Prefer technologies that can be implemented quickly during the hackathon.
4. Keep the architecture understandable.
5. Avoid unnecessary infrastructure.
6. Keep quantum-computing logic isolated from the frontend.
7. Keep the frontend independent from a specific quantum framework.
8. Prefer reusable open-source libraries where appropriate.
9. Optimize for a reliable end-to-end MVP rather than theoretical scalability.
10. Avoid introducing a technology unless it provides a clear benefit.

---

# 3. Official MVP Stack

The official QubitSphere MVP stack is:

| Layer                                | Technology                              |
| ------------------------------------ | --------------------------------------- |
| Frontend                             | Next.js                                 |
| Frontend Language                    | TypeScript                              |
| UI Library                           | React                                   |
| Styling                              | Tailwind CSS                            |
| UI Components                        | shadcn/ui                               |
| Icons                                | Lucide                                  |
| Backend API                          | FastAPI                                 |
| Backend Language                     | Python                                  |
| Quantum Computing                    | Qiskit                                  |
| Quantum Simulation                   | Qiskit Aer                              |
| Database                             | PostgreSQL                              |
| Managed Database Option              | Supabase                                |
| Visualization                        | Recharts + SVG/Canvas where appropriate |
| AI Integration                       | LLM API                                 |
| Version Control                      | Git                                     |
| Repository                           | GitHub                                  |
| Development Editor                   | VS Code                                 |
| AI Coding Agent                      | Codex                                   |
| Secondary AI Development/Review Tool | Claude                                  |

---

# 4. Frontend

## 4.1 Next.js

QubitSphere will use **Next.js** for the main web application.

Responsibilities include:

* Application routing
* Page rendering
* Frontend application structure
* API integration
* Web application deployment
* Frontend optimization

The frontend should remain responsible for presentation and user interaction.

It should not contain the core quantum-simulation implementation.

---

## 4.2 React

QubitSphere uses **React** as the frontend UI framework through Next.js.

React components should be used for:

* Navigation
* Dashboards
* Lessons
* Circuit Lab interface
* Circuit visualization
* AI tutor interface
* Assessments
* Progress displays
* Reusable UI components

Reusable components should be preferred over duplicated page-specific implementations.

---

## 4.3 TypeScript

The frontend will use **TypeScript**.

TypeScript should be used to define clear interfaces and types for important application data.

Important shared frontend types should include concepts such as:

* Lesson
* Circuit
* CircuitOperation
* CircuitIR
* SimulationResult
* MeasurementResult
* Challenge
* Assessment
* Progress
* AITutorContext
* AITutorResponse

Avoid using `any` unless there is a documented reason.

---

# 5. Styling and UI

## 5.1 Tailwind CSS

Tailwind CSS will be used for application styling.

It should provide:

* Layout
* Spacing
* Typography
* Responsive behavior
* Component styling
* State styling

The project should maintain a consistent visual system rather than styling every page independently.

---

## 5.2 shadcn/ui

shadcn/ui may be used for reusable interface components.

Examples include:

* Buttons
* Dialogs
* Dropdowns
* Tabs
* Cards
* Inputs
* Tooltips
* Panels
* Navigation elements

Components should be customized to fit QubitSphere's visual identity rather than being left as a generic template.

---

## 5.3 Lucide

Lucide icons should be used for standard interface icons.

Do not introduce multiple icon libraries without a clear reason.

---

# 6. Backend

## 6.1 FastAPI

QubitSphere will use **FastAPI** for the backend API.

The backend will be responsible for:

* Application APIs
* Circuit validation
* Circuit execution requests
* Simulation
* Quantum result normalization
* AI context preparation
* AI API integration
* Assessment processing
* Progress-related operations
* Database communication

The backend should act as the controlled boundary between the frontend and quantum-computing layer.

---

# 7. Backend Language

## 7.1 Python

Python will be used for backend and quantum-computing functionality.

Python is selected because the quantum ecosystem has strong Python support and because it allows the quantum execution layer to remain separate from the TypeScript frontend.

Python modules should be organized so quantum logic is not mixed into unrelated API code.

---

# 8. Quantum Computing Layer

## 8.1 Qiskit

The MVP will use **Qiskit** as the primary quantum-computing framework.

Qiskit will be responsible for translating the framework-neutral Circuit IR into executable quantum-circuit operations.

The frontend must not depend directly on Qiskit's internal circuit representation.

---

## 8.2 Qiskit Aer

The MVP will use **Qiskit Aer** for quantum circuit simulation.

The simulator should provide the actual computational results used by QubitSphere.

Relevant outputs may include:

* Statevector information
* Probabilities
* Measurement counts
* Circuit execution results

The simulation layer is the source of truth for numerical quantum results.

---

# 9. Quantum Framework Abstraction

Although Qiskit is the primary MVP backend, QubitSphere must maintain a framework-neutral Circuit IR.

The intended architecture is:

```text
QubitSphere Circuit Lab
        ↓
    Circuit IR
        ↓
Execution Adapter
        ↓
      Qiskit
        ↓
   Qiskit Aer
        ↓
Simulation Result
```

This separation is intentional.

It allows future quantum frameworks to be added without redesigning the entire frontend.

Possible future frameworks may include:

* PennyLane
* Cirq
* Other compatible execution systems

These are not required for the MVP.

---

# 10. Database

## 10.1 PostgreSQL

QubitSphere will use **PostgreSQL** as the primary relational database.

The database should store structured application information such as:

* Users
* Lessons
* Circuits
* Challenges
* Assessments
* Attempts
* Progress
* Relevant AI interaction metadata

The MVP should keep the data model small and focused.

---

## 10.2 Supabase

Supabase may be used as the managed PostgreSQL platform for the MVP.

Supabase can provide:

* PostgreSQL database
* Database management
* Hosted database infrastructure
* Optional authentication support
* Simple developer tooling

The application should treat PostgreSQL as the database technology and Supabase as a managed deployment option.

---

# 11. Visualization

QubitSphere will use visualization libraries appropriate to the type of information being displayed.

## 11.1 Recharts

Recharts may be used for standard application charts such as:

* Measurement histograms
* Probability bars
* Progress charts
* Assessment scores
* Learning metrics

---

## 11.2 SVG and Canvas

SVG or Canvas may be used where custom visualization is more appropriate.

Examples include:

* Quantum circuit rendering
* Custom circuit wires
* Gate symbols
* State visualizations
* Interactive scientific diagrams

The circuit visualization system should remain under QubitSphere's control rather than relying on a visualization library to define the entire circuit architecture.

---

# 12. AI Layer

## 12.1 LLM API

QubitSphere will integrate an LLM through an API.

The exact provider/model may be selected based on:

* Availability
* Cost
* Latency
* Context-window requirements
* Structured-output support
* Hackathon constraints

The model itself is not the quantum-computation engine.

---

## 12.2 AI Responsibility

The AI layer is responsible for:

* Concept explanation
* Circuit explanation
* Hints
* Personalized guidance
* Practice assistance
* Assessment assistance
* Interpretation of verified results
* Learning recommendations

The AI layer must not be treated as the source of truth for numerical quantum calculations.

---

# 13. AI Context Pipeline

The AI tutor should receive structured context.

The conceptual flow is:

```text
Learner Question
       +
Current Lesson
       +
Current Circuit
       +
Circuit IR
       +
Simulation Result
       +
Measurement Data
       +
Relevant Progress
       ↓
AI Context Builder
       ↓
LLM
       ↓
Structured AI Response
```

The purpose of this architecture is to make the AI circuit-aware and learning-aware.

---

# 14. API Communication

The frontend should communicate with the backend through documented APIs.

The frontend should not directly execute quantum simulations.

The intended flow is:

```text
Frontend
   ↓
FastAPI
   ↓
Quantum / AI / Database Services
   ↓
FastAPI Response
   ↓
Frontend
```

API contracts must be documented in:

```text
docs/12-API-Contracts.md
```

---

# 15. State Management

The MVP should avoid unnecessary global state-management complexity.

Use:

* React state for local UI state
* Server/API data for persistent application data
* URL state when appropriate
* A dedicated state-management library only when there is a demonstrated need

Do not introduce Redux or another large state-management system merely because it is common in large applications.

---

# 16. Authentication

Authentication is not a primary differentiator of QubitSphere.

For the MVP, authentication should remain simple.

Possible implementation:

* Supabase Auth
* Basic session-based authentication
* A simplified demonstration mode if authentication is unnecessary for the hackathon demo

The team should prioritize the learning experience over sophisticated authentication infrastructure.

---

# 17. File and Data Formats

The following formats should be preferred:

### JSON

Used for:

* Circuit IR
* API request/response payloads
* Structured curriculum content
* AI context
* Simulation result structures where appropriate

### TypeScript Types

Used for:

* Frontend contracts
* Shared interfaces
* UI-level data models

### Python Types / Pydantic Models

Used for:

* Backend API validation
* Request models
* Response models
* Quantum service contracts

---

# 18. Circuit IR as a System Boundary

Circuit IR is a major architectural boundary.

The Circuit Lab should produce Circuit IR.

The quantum execution layer should consume Circuit IR.

The AI context system should be able to inspect Circuit IR.

The database may store Circuit IR.

The visualization system may use Circuit IR to render the circuit.

Therefore:

```text
                 Circuit IR
                /    |     \
               /     |      \
              ↓      ↓       ↓
          Simulator  AI    Visualization
```

This makes Circuit IR one of the central data structures in QubitSphere.

---

# 19. Development Environment

The standard development environment is:

```text
Editor:
VS Code

Version Control:
Git

Repository:
GitHub

Frontend Runtime:
Node.js

Frontend Package Manager:
npm

Backend Runtime:
Python

AI Coding Agent:
Codex

AI Review/Reasoning Tool:
Claude
```

The repository should contain clear setup instructions so another developer can reproduce the development environment.

---

# 20. Project Structure

The expected high-level repository structure is:

```text
QubitSphere/
│
├── AGENTS.md
├── README.md
│
├── docs/
│   ├── 00-Project-Overview.md
│   ├── 01-Problem-Statement.md
│   ├── 02-Product-Vision.md
│   ├── 03-MVP-Scope.md
│   ├── 04-User-Flows.md
│   ├── 05-Architecture.md
│   ├── 06-Tech-Stack.md
│   ├── 07-Circuit-IR.md
│   ├── 08-Curriculum-Schema.md
│   ├── 09-Data-Model.md
│   ├── 10-AI-Tutor-Architecture.md
│   ├── 11-UI-System.md
│   ├── 12-API-Contracts.md
│   ├── 13-Demo-Scenario.md
│   ├── 14-Evaluator-QA.md
│   └── 99-AI-Context.md
│
├── frontend/
│   └── ...
│
├── backend/
│   └── ...
│
└── ...
```

The exact internal folder structure may evolve during implementation, but the frontend/backend separation should be maintained unless there is a documented reason to change it.

---

# 21. Environment Variables

Secrets and environment-specific configuration must not be committed to Git.

Examples may include:

```text
DATABASE_URL
SUPABASE_URL
SUPABASE_ANON_KEY
AI_API_KEY
```

Actual secret values must be stored in local environment configuration or the deployment platform's secret-management system.

Never commit API keys, passwords, tokens, or other credentials to the repository.

---

# 22. Dependency Rules

Before adding a new dependency, consider:

1. Is it necessary?
2. Does it solve a real MVP problem?
3. Can the problem be solved with existing technologies?
4. Does it increase maintenance complexity?
5. Does it conflict with the existing architecture?

Avoid adding libraries simply because they are popular or because an AI coding tool suggested them.

---

# 23. Architecture Rules for AI Coding Agents

Codex and Claude should follow these rules.

### Rule 1

Do not replace the official technology stack without documenting the reason.

### Rule 2

Do not move quantum simulation into the frontend.

### Rule 3

Do not bypass Circuit IR by making the UI directly dependent on Qiskit.

### Rule 4

Do not fabricate quantum results.

### Rule 5

Do not create duplicate solutions for the same responsibility.

### Rule 6

Prefer existing project components and services.

### Rule 7

Keep frontend, backend, quantum execution, database, and AI responsibilities separated.

### Rule 8

Do not introduce production-scale infrastructure unless specifically required.

### Rule 9

Keep MVP scope aligned with:

**Learn → Build → Run → Visualize → Ask → Practice → Assess**

### Rule 10

When a major architecture decision changes, update the relevant documentation.

---

# 24. Production vs MVP

The chosen technology stack is intended primarily for the MVP and hackathon demonstration.

The system should remain extensible, but production-scale concerns should not dominate implementation.

The following are intentionally deferred:

* Kubernetes
* Microservices
* Multi-region deployment
* Large distributed simulation infrastructure
* Complex event-driven architectures
* Advanced enterprise identity systems
* Full observability platforms
* Large-scale quantum-hardware orchestration

These may be considered in a future production architecture.

---

# 25. Future Technology Expansion

The architecture should leave room for future expansion.

Potential future additions include:

* Additional quantum simulators
* PennyLane
* Cirq
* Real quantum hardware backends
* Advanced visualization
* More powerful curriculum engines
* Adaptive learning
* Advanced analytics
* Instructor tools
* Collaborative circuit editing
* Cloud execution
* Richer assessment systems

These are future possibilities and are not required for the MVP.

---

# 26. Technology Decision Summary

The official QubitSphere MVP technology path is:

```text
                 QubitSphere
                      │
              Next.js + React
                      │
                 TypeScript
                      │
                 Tailwind CSS
                      │
                FastAPI Backend
                      │
                   Python
                      │
                Circuit IR
                      │
               Qiskit Adapter
                      │
                  Qiskit Aer
                      │
             Verified Simulation
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
      PostgreSQL              AI Context
          │                       │
      Supabase                    LLM
          │                       │
          └───────────┬───────────┘
                      ↓
                 QubitSphere
```

---

# 27. Final Technology Principle

The technology stack exists to support the product, not to become the product.

The primary objective is to deliver a reliable and convincing learning experience.

Therefore:

> **Use the simplest technology that preserves the intended architecture and allows the MVP to work reliably.**

The most important technical boundary is:

> **The frontend creates the circuit. Circuit IR represents it. The quantum engine calculates it. The AI explains it.**