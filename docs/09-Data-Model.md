# QubitSphere — Data Model

## 1. Purpose

This document defines the official data model for the QubitSphere MVP.

The data model describes:

* What information QubitSphere stores
* How major entities relate to each other
* Which data belongs in the database
* Which data should remain derived or temporary
* How learner progress is represented
* How circuits are stored
* How lessons, practice, and assessment connect

The goal is to create a small, understandable, and extensible data model suitable for the hackathon MVP.

---

# 2. Data Model Principles

QubitSphere follows these principles:

1. Store only data required by the product.
2. Keep the MVP database small.
3. Use stable IDs for entities.
4. Keep relationships explicit.
5. Avoid duplicating the same data unnecessarily.
6. Store Circuit IR as the canonical saved circuit representation.
7. Store learner progress separately from curriculum definitions.
8. Store assessment attempts separately from assessment definitions.
9. Do not store secrets in the database.
10. Derived simulation results should not become the primary source of circuit truth.
11. Database design should support future expansion without unnecessary complexity.

---

# 3. Core Entities

The QubitSphere MVP contains the following core entities:

```text
User
 │
 ├── Progress
 ├── Circuit
 ├── Practice Attempt
 └── Assessment Attempt

Curriculum
 │
 ├── Module
 ├── Lesson
 ├── Concept
 ├── Practice
 └── Assessment

Circuit
 │
 └── Circuit IR

Practice
 │
 └── Practice Attempt

Assessment
 │
 └── Assessment Attempt
```

---

# 4. Entity Relationship Overview

The high-level relationship is:

```text
                    User
                     │
          ┌──────────┼──────────┐
          │          │          │
          ↓          ↓          ↓
       Progress   Circuit    Attempts
                              │
                        ┌─────┴─────┐
                        ↓           ↓
                    Practice     Assessment


              Curriculum
                   │
          ┌────────┼────────┐
          ↓        ↓        ↓
       Module    Lesson   Concept
                   │
             ┌─────┴─────┐
             ↓           ↓
          Practice    Assessment
```

---

# 5. User

The User entity represents a learner using QubitSphere.

## Required MVP fields

```text
id
name
email
level
createdAt
updatedAt
```

Example:

```json
{
  "id": "user-001",
  "name": "Learner",
  "email": "learner@example.com",
  "level": "beginner",
  "createdAt": "2026-09-10T00:00:00Z",
  "updatedAt": "2026-09-10T00:00:00Z"
}
```

---

# 6. User Field Definitions

## `id`

Unique identifier for the user.

This should be stable and should not change.

---

## `name`

Display name for the learner.

---

## `email`

Email address when authentication is enabled.

If the MVP uses a demonstration mode without authentication, this field may be optional in the application layer.

---

## `level`

Current learner level.

Supported values:

```text
beginner
intermediate
advanced
```

The MVP should primarily use:

```text
beginner
intermediate
```

---

## `createdAt`

Timestamp when the user record was created.

---

## `updatedAt`

Timestamp when the user record was last updated.

---

# 7. User Design Rule

The User entity should contain basic identity and learner-level information.

It should not contain:

* Passwords in plaintext
* API keys
* AI provider credentials
* Quantum-framework objects
* Large curriculum documents
* Complete circuit execution logs

Authentication-specific sensitive information should be handled by the authentication system.

---

# 8. Module

A Module groups related lessons.

Example:

```json
{
  "id": "fundamentals",
  "title": "Quantum Computing Fundamentals",
  "description": "Core concepts required to begin working with quantum circuits.",
  "level": "beginner",
  "orderIndex": 1
}
```

---

# 9. Module Fields

```text
id
title
description
level
orderIndex
metadata
```

### `id`

Stable module identifier.

### `title`

Human-readable title.

### `description`

Brief explanation of the module.

### `level`

Expected learner level.

### `orderIndex`

Defines display order.

### `metadata`

Optional structured metadata.

---

# 10. Lesson

A Lesson represents one structured learning unit.

Recommended fields:

```text
id
moduleId
slug
title
shortDescription
level
estimatedMinutes
orderIndex
content
createdAt
updatedAt
```

Example:

```json
{
  "id": "superposition-001",
  "moduleId": "fundamentals",
  "slug": "understanding-superposition",
  "title": "Understanding Superposition",
  "shortDescription": "Learn how a qubit can exist in a combination of basis states.",
  "level": "beginner",
  "estimatedMinutes": 15,
  "orderIndex": 3,
  "content": {},
  "createdAt": "2026-09-10T00:00:00Z",
  "updatedAt": "2026-09-10T00:00:00Z"
}
```

---

# 11. Lesson Relationship

Each lesson belongs to one module.

```text
Module
   │
   ├── Lesson 1
   ├── Lesson 2
   ├── Lesson 3
   └── Lesson 4
```

A lesson may reference:

* Concepts
* Example circuits
* Practice activities
* Assessments
* Prerequisite lessons
* Next lessons

These relationships may be represented using explicit relationship tables or structured references depending on the final implementation.

---

# 12. Concept

A Concept represents a specific quantum-computing idea.

Examples:

```text
Qubit
Quantum State
Superposition
Measurement
Entanglement
Hadamard Gate
Controlled-X Gate
```

Recommended fields:

```text
id
title
summary
definition
difficulty
keywords
createdAt
updatedAt
```

---

# 13. Lesson-Concept Relationship

A lesson can contain multiple concepts.

A concept can appear in multiple lessons.

Therefore this is conceptually a many-to-many relationship:

```text
Lesson
  ↕
Concept
```

Example:

```text
Superposition Lesson
       │
       ├── Superposition
       ├── Qubit
       └── Hadamard Gate
```

A junction relationship may be used if the database implementation requires normalized relational modeling.

---

# 14. Circuit

The Circuit entity represents a learner-created or saved quantum circuit.

Recommended fields:

```text
id
userId
name
circuitIR
source
lessonId
createdAt
updatedAt
```

Example:

```json
{
  "id": "circuit-001",
  "userId": "user-001",
  "name": "My Bell State",
  "circuitIR": {},
  "source": "learner",
  "lessonId": "bell-state-001",
  "createdAt": "2026-09-10T00:00:00Z",
  "updatedAt": "2026-09-10T00:00:00Z"
}
```

---

# 15. Circuit Source

The `source` field identifies why the circuit exists.

Possible values:

```text
learner
lesson
template
challenge
assessment
```

Example:

```text
learner
```

means the learner created the circuit.

---

# 16. Circuit IR Storage

The `circuitIR` field stores the canonical Circuit IR.

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

The Circuit IR specification is defined in:

```text
docs/07-Circuit-IR.md
```

---

# 17. Circuit Data Rule

The Circuit IR is the canonical logical representation of the saved circuit.

Qiskit circuit objects, compiled circuits, rendered visual objects, and simulation outputs are derived representations.

Therefore:

```text
Circuit IR
    ↓
Execution
    ↓
Simulation Result
```

not:

```text
Simulation Result
    ↓
Reconstruct Circuit
```

The original Circuit IR should always remain available for saved circuits.

---

# 18. Practice Activity

The Practice entity represents a learner activity designed to apply a concept.

Recommended fields:

```text
id
lessonId
title
type
instructions
difficulty
configuration
createdAt
updatedAt
```

Example:

```json
{
  "id": "bell-practice-001",
  "lessonId": "bell-state-001",
  "title": "Create a Bell State",
  "type": "circuit-construction",
  "instructions": "Build a two-qubit entangled state.",
  "difficulty": "beginner",
  "configuration": {}
}
```

---

# 19. Practice Types

The MVP may support:

```text
multiple-choice
concept-question
predict-result
circuit-construction
circuit-modification
result-interpretation
```

Practice behavior should be determined by the practice type.

---

# 20. Practice Configuration

Practice-specific data should be stored in a structured configuration object when appropriate.

Example:

```json
{
  "requiredQubits": 2,
  "requiredConcepts": [
    "superposition",
    "entanglement"
  ],
  "targetBehavior": "correlated-measurement-results"
}
```

This prevents the database schema from becoming unnecessarily wide for every possible practice type.

---

# 21. Practice Attempt

A Practice Attempt represents one learner's attempt at a practice activity.

Recommended fields:

```text
id
userId
practiceId
circuitId
answer
score
status
feedback
startedAt
completedAt
```

Example:

```json
{
  "id": "attempt-001",
  "userId": "user-001",
  "practiceId": "bell-practice-001",
  "circuitId": "circuit-001",
  "answer": {},
  "score": 100,
  "status": "completed",
  "feedback": "Correctly created an entangled circuit.",
  "startedAt": "2026-09-10T10:00:00Z",
  "completedAt": "2026-09-10T10:07:00Z"
}
```

---

# 22. Practice Attempt Status

Supported MVP values:

```text
started
in_progress
completed
abandoned
```

---

# 23. Assessment

The Assessment entity represents a knowledge check or evaluation.

Recommended fields:

```text
id
lessonId
title
description
passingScore
questions
createdAt
updatedAt
```

Example:

```json
{
  "id": "assessment-superposition-001",
  "lessonId": "superposition-001",
  "title": "Superposition Check",
  "description": "Test your understanding of superposition.",
  "passingScore": 70,
  "questions": []
}
```

---

# 24. Assessment Questions

Questions may be stored as structured data.

Example:

```json
{
  "id": "question-001",
  "type": "multiple-choice",
  "question": "What does the Hadamard gate do to |0>?",
  "options": [
    "Leaves it unchanged",
    "Creates an equal superposition",
    "Always changes it to |1>",
    "Measures the qubit"
  ],
  "correctOption": 1,
  "explanation": "The Hadamard gate maps |0> to an equal superposition of |0> and |1>."
}
```

---

# 25. Assessment Attempt

An Assessment Attempt represents one learner's submission.

Recommended fields:

```text
id
userId
assessmentId
answers
score
passed
startedAt
completedAt
```

Example:

```json
{
  "id": "assessment-attempt-001",
  "userId": "user-001",
  "assessmentId": "assessment-superposition-001",
  "answers": {},
  "score": 80,
  "passed": true,
  "startedAt": "2026-09-10T11:00:00Z",
  "completedAt": "2026-09-10T11:08:00Z"
}
```

---

# 26. Progress

The Progress entity represents the learner's learning state.

Recommended fields:

```text
id
userId
conceptId
lessonId
status
mastery
attemptCount
lastActivityAt
completedAt
```

Example:

```json
{
  "id": "progress-001",
  "userId": "user-001",
  "conceptId": "concept-superposition",
  "lessonId": "superposition-001",
  "status": "completed",
  "mastery": 82,
  "attemptCount": 3,
  "lastActivityAt": "2026-09-10T12:00:00Z",
  "completedAt": "2026-09-10T12:00:00Z"
}
```

---

# 27. Progress Status

Supported MVP values:

```text
not_started
in_progress
completed
```

---

# 28. Mastery

`mastery` represents an approximate learner mastery value.

Recommended range:

```text
0–100
```

Example:

```text
0
```

means no demonstrated mastery.

```text
100
```

means strong demonstrated mastery.

The exact mastery algorithm does not need to be sophisticated in the MVP.

A simple score-based calculation is acceptable.

---

# 29. Progress Rule

Progress should be derived from actual learner activity.

Possible inputs include:

* Lesson completion
* Practice attempts
* Practice scores
* Assessment scores
* Challenge performance

Do not update mastery randomly.

---

# 30. Recommendation

The MVP does not require a separate Recommendation table.

Recommendations can initially be derived from:

* Curriculum prerequisites
* Next-topic relationships
* Progress
* Assessment results
* Practice performance

Example:

```text
Weak Superposition
        ↓
Review Superposition
        ↓
Practice Hadamard
        ↓
Try Bell State
```

A dedicated recommendation engine can be introduced later.

---

# 31. AI Conversation Metadata

The MVP may store limited AI interaction metadata if required.

Possible fields:

```text
id
userId
lessonId
circuitId
createdAt
```

The system may also store a summarized interaction record rather than storing every full conversation.

For example:

```json
{
  "id": "ai-session-001",
  "userId": "user-001",
  "lessonId": "bell-state-001",
  "circuitId": "circuit-001",
  "createdAt": "2026-09-10T12:30:00Z"
}
```

---

# 32. AI Conversation Rule

The MVP should avoid storing unnecessary sensitive or excessive conversation history.

Do not store:

* API keys
* Authentication tokens
* Internal system prompts unless intentionally required
* Unnecessary personal information

The primary goal is to support the learner experience.

---

# 33. Simulation Results

Simulation results are primarily **derived data**.

A basic simulation result may contain:

```json
{
  "success": true,
  "probabilities": {
    "00": 0.5,
    "11": 0.5
  },
  "counts": {
    "00": 502,
    "11": 522
  },
  "shots": 1024
}
```

Simulation results do not need to be permanently stored for every execution in the MVP.

They may exist only for the current execution unless the application has a specific reason to persist them.

---

# 34. Simulation Result Persistence

Simulation results may be persisted when useful for:

* Practice evaluation
* Assessment evaluation
* Demo history
* Debugging
* Learner circuit history

However, persistence should not be introduced solely because the database can store it.

For the MVP:

> **Persist the circuit. Derive the simulation result when needed.**

---

# 35. Result vs Circuit

The following distinction must remain clear:

```text
Circuit IR
=
What the learner built
```

```text
Simulation Result
=
What the quantum engine calculated
```

These are different entities.

---

# 36. Optional Execution Record

If execution history is needed, an Execution Record can be introduced.

Example fields:

```text
id
circuitId
backend
shots
result
createdAt
```

Example:

```json
{
  "id": "execution-001",
  "circuitId": "circuit-001",
  "backend": "qiskit-aer",
  "shots": 1024,
  "result": {},
  "createdAt": "2026-09-10T12:45:00Z"
}
```

This is optional for the MVP.

---

# 37. Core Relationship Map

The primary foreign-key relationships are conceptually:

```text
User
 │
 ├──< Progress
 ├──< Circuit
 ├──< PracticeAttempt
 └──< AssessmentAttempt

Module
 │
 └──< Lesson

Lesson
 │
 ├──< Practice
 ├──< Assessment
 └──< Progress

Practice
 │
 └──< PracticeAttempt

Assessment
 │
 └──< AssessmentAttempt

Circuit
 │
 └──< PracticeAttempt
```

Here:

```text
< 
```

means "one-to-many".

---

# 38. Many-to-Many Relationships

Some relationships may be many-to-many.

Most importantly:

```text
Lesson ↔ Concept
```

A lesson can cover several concepts.

A concept can appear in several lessons.

Other many-to-many relationships may be introduced later if necessary.

The MVP should not create unnecessary junction tables unless the relationship requires them.

---

# 39. Suggested Relational Tables

A practical PostgreSQL implementation may contain:

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
ai_sessions
```

Optional:

```text
executions
```

---

# 40. Suggested Table: `users`

Conceptual structure:

```text
users
--------------------------------
id              UUID / string
name            text
email           text
level           text
created_at      timestamp
updated_at      timestamp
```

`id` should be the primary key.

---

# 41. Suggested Table: `modules`

```text
modules
--------------------------------
id              text
title           text
description     text
level           text
order_index     integer
metadata        json/jsonb
created_at      timestamp
updated_at      timestamp
```

---

# 42. Suggested Table: `lessons`

```text
lessons
--------------------------------
id              text
module_id       text
slug            text
title           text
short_description text
level           text
estimated_minutes integer
order_index     integer
content         json/jsonb
created_at      timestamp
updated_at      timestamp
```

---

# 43. Suggested Table: `concepts`

```text
concepts
--------------------------------
id              text
title           text
summary         text
definition      text
difficulty      text
keywords        json/jsonb
created_at      timestamp
updated_at      timestamp
```

---

# 44. Suggested Table: `lesson_concepts`

```text
lesson_concepts
--------------------------------
lesson_id       text
concept_id      text
```

The combination of:

```text
lesson_id + concept_id
```

should be unique.

---

# 45. Suggested Table: `circuits`

```text
circuits
--------------------------------
id              text
user_id         text
name            text
circuit_ir      json/jsonb
source          text
lesson_id       text
created_at      timestamp
updated_at      timestamp
```

The `circuit_ir` field should use a JSON-compatible PostgreSQL type such as JSONB.

---

# 46. Suggested Table: `practices`

```text
practices
--------------------------------
id              text
lesson_id       text
title           text
type             text
instructions     text
difficulty       text
configuration    json/jsonb
created_at       timestamp
updated_at       timestamp
```

---

# 47. Suggested Table: `practice_attempts`

```text
practice_attempts
--------------------------------
id              text
user_id         text
practice_id     text
circuit_id      text
answer          json/jsonb
score           numeric
status          text
feedback        text
started_at      timestamp
completed_at    timestamp
```

---

# 48. Suggested Table: `assessments`

```text
assessments
--------------------------------
id              text
lesson_id       text
title           text
description     text
passing_score   numeric
questions       json/jsonb
created_at      timestamp
updated_at      timestamp
```

---

# 49. Suggested Table: `assessment_attempts`

```text
assessment_attempts
--------------------------------
id              text
user_id         text
assessment_id   text
answers         json/jsonb
score           numeric
passed          boolean
started_at      timestamp
completed_at    timestamp
```

---

# 50. Suggested Table: `progress`

```text
progress
--------------------------------
id              text
user_id         text
concept_id      text
lesson_id       text
status          text
mastery         numeric
attempt_count   integer
last_activity_at timestamp
completed_at    timestamp
```

A unique constraint may be used for:

```text
user_id + concept_id + lesson_id
```

where appropriate.

---

# 51. Suggested Table: `ai_sessions`

```text
ai_sessions
--------------------------------
id              text
user_id         text
lesson_id       text
circuit_id      text
created_at      timestamp
```

Additional conversation storage may be added later if product requirements justify it.

---

# 52. Optional Table: `executions`

If execution history is needed:

```text
executions
--------------------------------
id              text
circuit_id      text
backend         text
shots           integer
result          json/jsonb
created_at      timestamp
```

This table should remain optional during the MVP.

---

# 53. Referential Integrity

The database should enforce logical relationships where appropriate.

Examples:

```text
lessons.module_id → modules.id

circuits.user_id → users.id

circuits.lesson_id → lessons.id

practice_attempts.user_id → users.id

practice_attempts.practice_id → practices.id

practice_attempts.circuit_id → circuits.id

assessment_attempts.user_id → users.id

assessment_attempts.assessment_id → assessments.id

progress.user_id → users.id

progress.lesson_id → lessons.id

progress.concept_id → concepts.id
```

The exact database behavior for deletes should be intentionally chosen.

---

# 54. Identifier Rules

IDs should be:

* Stable
* Unique
* Machine-readable
* Safe to reference in APIs

Examples:

```text
superposition-001
concept-superposition
bell-state-001
practice-bell-001
assessment-superposition-001
```

Database-generated UUIDs may be used for user-generated records.

Curriculum-defined records may use stable semantic IDs.

---

# 55. Timestamps

Important persistent entities should include creation timestamps.

Entities that can be edited should also include update timestamps.

Use a consistent timestamp format.

Store timestamps in UTC at the database level.

The frontend may convert them to the learner's local time when displayed.

---

# 56. JSON / JSONB Usage

JSONB is appropriate for flexible structured data such as:

* Circuit IR
* Lesson content
* Practice configuration
* Assessment questions
* Practice answers
* Assessment answers
* Simulation results
* Metadata

Relational columns should still be used for frequently queried core fields.

Avoid putting the entire relational data model into one enormous JSON document.

---

# 57. Normalization vs Simplicity

QubitSphere should use a pragmatic balance between relational normalization and development speed.

Normalize entities where relationships matter.

Use JSON/JSONB where the structure is naturally nested or expected to evolve.

For example:

```text
Lesson metadata → JSONB
Circuit IR → JSONB
Practice configuration → JSONB
```

while:

```text
user_id
lesson_id
practice_id
assessment_id
```

remain explicit relational fields.

---

# 58. Data Ownership

Each subsystem should have a clear ownership boundary.

```text
Curriculum
→ owns educational content

Circuit System
→ owns Circuit IR

Quantum Execution
→ owns simulation results

Progress System
→ owns learner progress

Assessment System
→ owns assessment attempts

AI System
→ owns AI session metadata
```

The systems should not overwrite each other's source-of-truth data.

---

# 59. Derived Data

Some values should be treated as derived rather than primary data.

Examples:

```text
Overall progress percentage
Recommendation
Measurement histogram
Probability chart
Rendered circuit
AI explanation
```

These should normally be computed from authoritative underlying data.

For example:

```text
Circuit IR
   ↓
Simulator
   ↓
Measurement Counts
   ↓
Histogram
```

The histogram should not become the source of truth.

---

# 60. Data Validation

Application-layer and backend validation must be used.

Validate:

* IDs
* Foreign-key references
* Enum values
* Scores
* Mastery values
* Circuit IR
* Curriculum structure
* Practice answers
* Assessment answers

The database provides an additional integrity layer.

---

# 61. Score Validation

Scores should remain within the defined range.

For percentage-based scores:

```text
0 ≤ score ≤ 100
```

Invalid values should be rejected.

---

# 62. Mastery Validation

Mastery should remain within:

```text
0 ≤ mastery ≤ 100
```

The MVP can use a simple calculation based on available learning evidence.

---

# 63. Cascade Behavior

Cascade behavior should be used carefully.

For example:

Deleting a user may reasonably remove user-owned:

```text
circuits
practice_attempts
assessment_attempts
progress
ai_sessions
```

Curriculum records such as:

```text
lessons
concepts
practices
assessments
```

must not be deleted merely because a learner account is deleted.

Curriculum is shared application data.

---

# 64. Seed Data

The MVP should use structured seed data for curriculum content.

Initial seed records should cover:

```text
Modules
Lessons
Concepts
Practice
Assessments
Example Circuits
```

Seed data makes the development environment reproducible.

---

# 65. MVP Seed Curriculum

The initial learning content should support:

```text
01 — What is a Qubit?
02 — Quantum States
03 — Superposition
04 — Quantum Gates
05 — Measurement
06 — Entanglement
07 — Bell State
08 — Deutsch-Jozsa
09 — Grover
```

The most detailed seed data should support the primary Bell-State demonstration.

---

# 66. Demo User

For hackathon development, a demonstration learner profile may be provided.

Example conceptual data:

```text
Name:
Demo Learner

Level:
beginner

Progress:
Superposition — completed
Measurement — completed
Entanglement — in progress
Bell State — not started
```

This allows the dashboard and demo to show realistic progress without requiring a full onboarding system.

---

# 67. Synthetic Data

Synthetic learner data may be used for:

* Dashboard previews
* Demo progress
* Practice history
* Assessment examples
* Recommendation demonstrations

Synthetic data must not be presented as genuine learner data.

---

# 68. Privacy

The MVP should collect only information necessary for the learning experience.

Avoid storing unnecessary personal information.

Do not store:

* Passwords outside the authentication provider
* Payment information
* API secrets
* Private infrastructure credentials
* Unnecessary personal records

---

# 69. Secret Management

Secrets must not be stored in normal database records.

Examples:

```text
AI_API_KEY
DATABASE_PASSWORD
SUPABASE_SERVICE_ROLE_KEY
```

must be managed using environment variables or the deployment platform's secret-management facilities.

---

# 70. Data Access Rules

The backend must enforce ownership where user-owned data is involved.

For example:

A learner should only be able to modify their own saved circuits.

Conceptually:

```text
Authenticated User
      ↓
Circuit Request
      ↓
Check circuit.user_id
      ↓
Allow / Reject
```

Frontend checks alone are insufficient.

---

# 71. Curriculum Access

Curriculum data is generally shared read-only application content.

Learners can read:

```text
modules
lessons
concepts
practices
assessments
```

but ordinary learners should not be able to modify the canonical curriculum.

---

# 72. Circuit Ownership

Learner-created circuits should belong to the learner.

The database should therefore associate circuits with:

```text
user_id
```

Template or lesson circuits may use a nullable user ID or a separate source designation.

---

# 73. AI Context Data

The AI tutor does not need direct unrestricted database access.

A safer architecture is:

```text
Database
   ↓
Application Services
   ↓
Validated AI Context
   ↓
LLM
```

The AI should receive only the context required to answer the learner's question.

---

# 74. AI Context Example

A generated AI context may contain:

```json
{
  "lesson": {
    "id": "bell-state-001",
    "title": "Bell State"
  },
  "concepts": [
    "superposition",
    "entanglement"
  ],
  "circuit": {},
  "simulationResult": {
    "probabilities": {
      "00": 0.5,
      "11": 0.5
    }
  },
  "progress": {
    "mastery": 72
  }
}
```

This context is derived from multiple authoritative data sources.

---

# 75. Database Does Not Replace Application Logic

The database should store data.

It should not become responsible for:

* Quantum simulation
* AI reasoning
* Circuit rendering
* Complex recommendation logic
* Curriculum presentation
* Frontend state management

Those responsibilities belong to the application services.

---

# 76. MVP Database Priority

The minimum required persistent entities are:

```text
users
lessons
concepts
circuits
practices
practice_attempts
assessments
assessment_attempts
progress
```

The following can be deferred if time is limited:

```text
ai_sessions
executions
advanced recommendation tables
advanced analytics tables
```

---

# 77. Simple MVP Mode

If database implementation becomes a timeline risk, QubitSphere may initially use a hybrid approach.

For example:

```text
Curriculum
→ version-controlled JSON

Quantum Circuits
→ database or local persistence

Learner Progress
→ database/local persistence depending on deployment requirements
```

The architecture should allow this without changing the conceptual data model.

---

# 78. Source of Truth Map

The following source-of-truth rules apply:

```text
Curriculum Content
→ Curriculum Data

Saved Circuit
→ Circuit IR

Quantum Numerical Result
→ Quantum Simulator

Learner Progress
→ Progress Records

Practice Outcome
→ Practice Attempt

Assessment Outcome
→ Assessment Attempt

AI Explanation
→ Derived response
```

---

# 79. Data Lifecycle

A typical learner interaction may follow:

```text
Lesson
  ↓
Learner Opens Circuit Lab
  ↓
Circuit Created
  ↓
Circuit IR Stored
  ↓
Circuit Executed
  ↓
Simulation Result Generated
  ↓
AI Context Created
  ↓
AI Explanation Returned
  ↓
Practice Completed
  ↓
Practice Attempt Stored
  ↓
Assessment Completed
  ↓
Assessment Attempt Stored
  ↓
Progress Updated
```

---

# 80. Future Expansion

The data model should make it possible to add:

* Multiple quantum backends
* More algorithms
* Advanced learner profiles
* Instructor accounts
* Organizations
* Classroom groups
* Rich analytics
* Collaboration
* Advanced adaptive learning
* Real quantum hardware execution

These should not be implemented as part of the MVP unless they become necessary.

---

# 81. Non-Goals

The MVP database does not require:

* Complex event sourcing
* Distributed transactions across many services
* Data warehouses
* Big-data infrastructure
* Real-time collaborative databases
* Full enterprise multi-tenancy
* Complex audit-log infrastructure

The database should remain simple and reliable.

---

# 82. Data Model Source of Truth

This document defines the conceptual data model.

The actual implementation may refine column types or table details while preserving the relationships and ownership defined here.

Major changes should be documented before implementation.

---

# 83. Final Data Model Principle

QubitSphere should store the learner's meaningful state while deriving temporary information when possible.

The most important distinction is:

```text
Persistent Knowledge
        +
Persistent Learner State
        +
Persistent Circuit Definition
        ↓
Derived Runtime Results
        ↓
AI Explanation / Visualization
```

Therefore:

> **Store the things the learner owns or the product needs to remember. Derive the things that can be reliably regenerated.**

And the most important circuit rule remains:

> **Circuit IR is the source of truth for a saved circuit; simulation results are derived from it.**
