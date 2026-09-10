# QubitSphere — API Contracts

## 1. Purpose

This document defines the API contracts for the QubitSphere MVP.

The API layer provides the controlled communication boundary between:

* Frontend
* Backend application
* Curriculum
* Circuit system
* Quantum execution system
* AI Tutor
* Practice system
* Assessment system
* Progress system
* Database

The purpose of this document is to ensure that all application components communicate using predictable and documented request and response structures.

Codex, Claude, and other development tools must follow these contracts when implementing API-connected features.

---

# 2. Core API Principle

The frontend should communicate with the backend through documented APIs.

The frontend must not directly access:

* Database credentials
* Quantum simulator internals
* AI provider credentials
* Backend-only services

The intended flow is:

```text
Frontend
   ↓
FastAPI
   ↓
Application Services
   ↓
Database / Quantum Engine / AI
   ↓
FastAPI
   ↓
Frontend
```

---

# 3. API Design Goals

The API should be:

* Clear
* Predictable
* Typed
* Validated
* JSON-based
* Easy to debug
* Easy for frontend and backend agents to implement
* Extensible without unnecessary complexity

The API should prioritize reliable MVP behavior over enterprise-level API complexity.

---

# 4. API Base Path

The backend API should use a consistent base path.

Recommended:

```text
/api
```

Examples:

```text
/api/lessons
/api/circuit/validate
/api/circuit/simulate
/api/ai/tutor
/api/practice
/api/assessment
/api/progress
```

The exact deployment URL may change between development and production.

---

# 5. HTTP Methods

Use standard HTTP methods.

```text
GET
POST
PUT
PATCH
DELETE
```

For the MVP:

### GET

Retrieve data.

### POST

Create records or perform actions such as simulation.

### PATCH

Partially update data.

### DELETE

Delete user-owned resources where supported.

The MVP should avoid unnecessary use of multiple HTTP methods for the same operation.

---

# 6. Content Type

JSON is the default request and response format.

Requests should generally use:

```text
Content-Type: application/json
```

Responses should generally use:

```text
Content-Type: application/json
```

---

# 7. API Response Principles

Successful responses should have predictable structures.

Error responses should contain:

* Stable error code
* Human-readable message
* Optional structured details

Example:

```json
{
  "error": {
    "code": "INVALID_CIRCUIT",
    "message": "The circuit contains an invalid qubit index.",
    "details": []
  }
}
```

---

# 8. General Success Response

For simple operations:

```json
{
  "success": true,
  "data": {}
}
```

Not every endpoint must wrap its response in this exact structure when a more natural resource-specific response is appropriate.

Consistency is preferred.

---

# 9. General Error Response

Canonical error structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable explanation.",
    "details": []
  }
}
```

The frontend should use `code` for programmatic handling and `message` for user-facing messaging where appropriate.

---

# 10. HTTP Status Codes

Recommended status codes:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
```

The MVP does not need to implement every status code immediately.

The most commonly expected codes are:

```text
200
400
401
403
404
422
500
503
```

---

# 11. API Validation

All incoming API requests must be validated by the backend.

Validation must not rely exclusively on frontend checks.

This is particularly important for:

* Circuit IR
* User-owned circuits
* Practice submissions
* Assessment submissions
* AI tutor context
* Progress updates

FastAPI/Pydantic models should be used for request validation.

---

# 12. Authentication

Authentication may be implemented through the chosen authentication provider.

Authenticated endpoints should identify the current user through a trusted server-side mechanism.

The backend must not trust a user ID supplied by the frontend without verification.

For example, the following pattern is unsafe:

```json
{
  "userId": "someone-else",
  "circuitId": "circuit-123"
}
```

when the server simply accepts the supplied user ID.

The backend should derive or verify the authenticated user.

---

# 13. MVP Public vs Protected Endpoints

A practical MVP split is:

### Public / Read-oriented

```text
GET /api/lessons
GET /api/lessons/{id}
GET /api/concepts/{id}
GET /api/algorithms
```

### User-oriented

```text
GET /api/progress
GET /api/circuits
POST /api/circuits
PATCH /api/circuits/{id}
DELETE /api/circuits/{id}
```

### Execution

```text
POST /api/circuit/validate
POST /api/circuit/simulate
```

### AI

```text
POST /api/ai/tutor
```

### Practice

```text
GET /api/practice/{id}
POST /api/practice/{id}/submit
```

### Assessment

```text
GET /api/assessment/{id}
POST /api/assessment/{id}/submit
```

---

# 14. Lesson APIs

## 14.1 List Lessons

### Endpoint

```text
GET /api/lessons
```

### Purpose

Retrieve available lessons.

### Query Parameters

Optional:

```text
moduleId
level
```

Example:

```text
GET /api/lessons?moduleId=fundamentals&level=beginner
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "qubit-001",
      "slug": "what-is-a-qubit",
      "title": "What is a Qubit?",
      "shortDescription": "Learn the basic unit of quantum information.",
      "level": "beginner",
      "estimatedMinutes": 10,
      "orderIndex": 1
    }
  ]
}
```

---

# 15. Get Lesson

### Endpoint

```text
GET /api/lessons/{lessonId}
```

### Purpose

Retrieve a complete lesson.

### Example

```text
GET /api/lessons/superposition-001
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "superposition-001",
    "slug": "understanding-superposition",
    "title": "Understanding Superposition",
    "shortDescription": "Learn how a qubit can exist in a combination of basis states.",
    "level": "beginner",
    "estimatedMinutes": 15,
    "learningObjectives": [
      "Explain superposition.",
      "Identify the role of the Hadamard gate."
    ],
    "concepts": [],
    "sections": [],
    "exampleCircuits": [],
    "practice": [],
    "assessment": [],
    "nextTopics": []
  }
}
```

---

# 16. Concept API

## Get Concept

### Endpoint

```text
GET /api/concepts/{conceptId}
```

### Purpose

Retrieve a structured concept.

### Response

```json
{
  "success": true,
  "data": {
    "id": "concept-superposition",
    "title": "Superposition",
    "summary": "A qubit can be represented as a combination of basis states.",
    "definition": "...",
    "difficulty": "beginner",
    "keywords": [
      "superposition",
      "qubit",
      "probability"
    ]
  }
}
```

---

# 17. Dashboard API

## Get Dashboard

### Endpoint

```text
GET /api/dashboard
```

### Purpose

Return the learner's dashboard data.

### Response

```json
{
  "success": true,
  "data": {
    "learner": {
      "name": "Demo Learner",
      "level": "beginner"
    },
    "overallProgress": 42,
    "continueLearning": {
      "lessonId": "entanglement-001",
      "title": "Understanding Entanglement",
      "progress": 65
    },
    "recommendation": {
      "type": "lesson",
      "id": "bell-state-001",
      "title": "Bell State",
      "reason": "Continue from your completed entanglement lesson."
    },
    "recentActivity": []
  }
}
```

---

# 18. Circuit APIs

The Circuit APIs are a core part of the QubitSphere architecture.

They must use the official Circuit IR defined in:

```text
docs/07-Circuit-IR.md
```

---

# 19. Validate Circuit

### Endpoint

```text
POST /api/circuit/validate
```

### Purpose

Validate a Circuit IR without executing it.

### Request

```json
{
  "circuit": {
    "version": "1.0",
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
}
```

### Valid Response

```json
{
  "success": true,
  "data": {
    "valid": true,
    "errors": []
  }
}
```

### Invalid Response

```json
{
  "success": true,
  "data": {
    "valid": false,
    "errors": [
      {
        "code": "INVALID_QUBIT_INDEX",
        "message": "Qubit index 3 does not exist in a 2-qubit circuit.",
        "operationIndex": 1
      }
    ]
  }
}
```

A structurally invalid circuit should not proceed to execution.

---

# 20. Simulate Circuit

### Endpoint

```text
POST /api/circuit/simulate
```

### Purpose

Execute a validated Circuit IR through the quantum simulation layer.

### Request

```json
{
  "circuit": {
    "version": "1.0",
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
  },
  "shots": 1024
}
```

---

# 21. Simulation Request Rules

The backend must:

1. Validate the Circuit IR.
2. Validate `shots`.
3. Reject invalid circuits.
4. Execute the circuit through the configured quantum backend.
5. Normalize the result.
6. Return the result to the frontend.

The frontend must never be allowed to bypass circuit validation.

---

# 22. Shots

`shots` represents the number of sampled circuit executions.

Example:

```json
{
  "shots": 1024
}
```

The backend should define a reasonable allowed range.

For example:

```text
1 ≤ shots ≤ 10000
```

unless a different implementation-specific limit is documented.

The MVP should use a sensible default when the client does not provide `shots`.

Recommended default:

```text
1024
```

---

# 23. Simulation Success Response

Example:

```json
{
  "success": true,
  "data": {
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
}
```

---

# 24. Optional Statevector Response

When statevector simulation is available:

```json
{
  "success": true,
  "data": {
    "executionId": "execution-001",
    "backend": "qiskit-aer",
    "shots": 1024,
    "statevector": [],
    "probabilities": {},
    "counts": {}
  }
}
```

The exact statevector serialization format must be defined by the implementation.

The frontend must not assume that every execution mode provides a statevector.

---

# 25. Simulation Failure

Example:

```json
{
  "success": false,
  "error": {
    "code": "SIMULATION_FAILED",
    "message": "The quantum simulator could not execute the circuit.",
    "details": []
  }
}
```

The frontend should show a human-readable error.

---

# 26. Circuit Save API

## Create Circuit

### Endpoint

```text
POST /api/circuits
```

### Request

```json
{
  "name": "My Bell State",
  "source": "learner",
  "lessonId": "bell-state-001",
  "circuitIR": {
    "version": "1.0",
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
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "circuit-001",
    "name": "My Bell State",
    "source": "learner",
    "lessonId": "bell-state-001",
    "circuitIR": {}
  }
}
```

---

# 27. List User Circuits

### Endpoint

```text
GET /api/circuits
```

### Purpose

Return circuits owned by the authenticated learner.

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "circuit-001",
      "name": "My Bell State",
      "source": "learner",
      "lessonId": "bell-state-001",
      "createdAt": "2026-09-10T12:00:00Z",
      "updatedAt": "2026-09-10T12:05:00Z"
    }
  ]
}
```

---

# 28. Get Circuit

### Endpoint

```text
GET /api/circuits/{circuitId}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "circuit-001",
    "name": "My Bell State",
    "source": "learner",
    "lessonId": "bell-state-001",
    "circuitIR": {}
  }
}
```

---

# 29. Update Circuit

### Endpoint

```text
PATCH /api/circuits/{circuitId}
```

### Request

```json
{
  "name": "Updated Bell State",
  "circuitIR": {}
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "circuit-001",
    "name": "Updated Bell State",
    "circuitIR": {}
  }
}
```

The backend must verify that the authenticated learner owns the circuit before modification.

---

# 30. Delete Circuit

### Endpoint

```text
DELETE /api/circuits/{circuitId}
```

### Success

```text
204 No Content
```

or:

```json
{
  "success": true,
  "data": null
}
```

The implementation should use one consistent convention.

---

# 31. AI Tutor API

The AI Tutor endpoint is:

```text
POST /api/ai/tutor
```

Its purpose is to answer a learner question using relevant QubitSphere context.

---

# 32. AI Tutor Request

Example:

```json
{
  "question": "Why did I get 00 and 11?",
  "lessonId": "bell-state-001",
  "circuit": {
    "version": "1.0",
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
  },
  "simulationResult": {
    "probabilities": {
      "00": 0.5,
      "11": 0.5
    },
    "counts": {
      "00": 502,
      "11": 522
    },
    "shots": 1024
  },
  "mode": "interpret"
}
```

---

# 33. AI Tutor Request Fields

## `question`

Learner's current question.

Required.

---

## `lessonId`

Current lesson identifier.

Optional for general questions.

---

## `circuit`

Current Circuit IR.

Required when the question depends on the circuit.

---

## `simulationResult`

Latest verified simulation result.

Required when the question concerns an observed numerical result.

---

## `mode`

Optional tutor mode.

Supported MVP modes:

```text
explain
hint
debug
interpret
practice
recommend
```

---

# 34. AI Tutor Success Response

Example:

```json
{
  "success": true,
  "data": {
    "answer": "Your circuit first applies H to q0, creating a superposition. The CX gate then correlates q1 with q0. That is why the simulator reports the correlated outcomes 00 and 11.",
    "keyPoints": [
      "H creates superposition.",
      "CX creates correlation between the two qubits.",
      "The simulator reports approximately equal ideal probability for 00 and 11."
    ],
    "hint": null,
    "nextStep": "Remove the H gate and run the circuit again to compare the result."
  }
}
```

---

# 35. AI Tutor Missing Simulation Result

Example request:

```json
{
  "question": "Why did I get 00 and 11?",
  "lessonId": "bell-state-001",
  "circuit": {}
}
```

The response should not invent the result.

Example:

```json
{
  "success": true,
  "data": {
    "answer": "The circuit has not been executed yet, so I cannot verify its measurement result. Run the circuit first and I can explain the observed output.",
    "keyPoints": [],
    "hint": null,
    "nextStep": "Run the circuit."
  }
}
```

---

# 36. AI Tutor Error

Example:

```json
{
  "success": false,
  "error": {
    "code": "AI_SERVICE_UNAVAILABLE",
    "message": "The AI tutor is temporarily unavailable.",
    "details": []
  }
}
```

The application must remain usable when the AI service is unavailable.

---

# 37. AI Context Rules

The backend should build AI context from trusted application data.

The AI request pipeline is:

```text
Learner Question
      ↓
Backend Validation
      ↓
Curriculum Context
      +
Circuit IR
      +
Simulation Result
      +
Learner Context
      ↓
AI Context Builder
      ↓
LLM
      ↓
Response Validation
      ↓
Frontend
```

---

# 38. AI Trust Boundary

The frontend should not be trusted to supply authoritative simulation information.

For important interactions, the backend should obtain or verify the relevant result where practical.

For example:

```text
Frontend
   ↓
Circuit IR
   ↓
Backend
   ↓
Simulation Result
   ↓
AI Context
```

This reduces the chance of stale or manipulated result data being presented as verified information.

---

# 39. Practice APIs

## Get Practice

### Endpoint

```text
GET /api/practice/{practiceId}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "bell-practice-001",
    "lessonId": "bell-state-001",
    "title": "Create a Bell State",
    "type": "circuit-construction",
    "instructions": "Build a two-qubit entangled state.",
    "difficulty": "beginner",
    "configuration": {}
  }
}
```

---

# 40. Submit Practice

### Endpoint

```text
POST /api/practice/{practiceId}/submit
```

### Request

For a circuit challenge:

```json
{
  "circuitIR": {
    "version": "1.0",
    "qubits": 2,
    "classicalBits": 2,
    "operations": [],
    "measurements": [0, 1]
  }
}
```

For a multiple-choice activity:

```json
{
  "answer": 2
}
```

The actual request structure should depend on the practice type.

---

# 41. Practice Submission Flow

The backend should:

```text
Receive submission
       ↓
Validate submission
       ↓
Validate Circuit IR if applicable
       ↓
Evaluate answer
       ↓
Calculate score
       ↓
Generate feedback
       ↓
Store Practice Attempt
       ↓
Update Progress when appropriate
       ↓
Return result
```

---

# 42. Practice Response

Example:

```json
{
  "success": true,
  "data": {
    "attemptId": "attempt-001",
    "status": "completed",
    "score": 100,
    "correct": true,
    "feedback": "Correctly created an entangled two-qubit circuit.",
    "nextStep": "Try the Bell State lesson."
  }
}
```

---

# 43. Practice Error

Example:

```json
{
  "success": false,
  "error": {
    "code": "PRACTICE_SUBMISSION_INVALID",
    "message": "The submitted circuit is invalid.",
    "details": []
  }
}
```

---

# 44. Assessment APIs

## Get Assessment

### Endpoint

```text
GET /api/assessment/{assessmentId}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "assessment-superposition-001",
    "lessonId": "superposition-001",
    "title": "Superposition Check",
    "description": "Test your understanding of superposition.",
    "passingScore": 70,
    "questions": [
      {
        "id": "question-001",
        "type": "multiple-choice",
        "question": "What does the H gate do to |0>?",
        "options": [
          "Leaves it unchanged",
          "Creates an equal superposition",
          "Measures the qubit",
          "Always creates |1>"
        ]
      }
    ]
  }
}
```

Correct answers should not be exposed to the learner before submission.

---

# 45. Submit Assessment

### Endpoint

```text
POST /api/assessment/{assessmentId}/submit
```

### Request

```json
{
  "answers": {
    "question-001": 1,
    "question-002": 3
  }
}
```

---

# 46. Assessment Submission Response

Example:

```json
{
  "success": true,
  "data": {
    "attemptId": "assessment-attempt-001",
    "score": 80,
    "passed": true,
    "correctCount": 4,
    "totalQuestions": 5,
    "feedback": "Good work. Review measurement before moving to the next topic.",
    "nextStep": {
      "type": "lesson",
      "id": "measurement-001"
    }
  }
}
```

---

# 47. Assessment Security Rule

The endpoint must not expose answer keys through normal learner-facing API responses.

The backend should keep the authoritative correct answers server-side.

Never rely on frontend-only answer validation for assessment scoring.

---

# 48. Progress APIs

## Get Progress

### Endpoint

```text
GET /api/progress
```

### Response

```json
{
  "success": true,
  "data": {
    "overallProgress": 42,
    "concepts": [
      {
        "conceptId": "concept-superposition",
        "status": "completed",
        "mastery": 82
      },
      {
        "conceptId": "concept-entanglement",
        "status": "in_progress",
        "mastery": 55
      }
    ],
    "lessons": [],
    "recentActivity": []
  }
}
```

---

# 49. Get Lesson Progress

### Endpoint

```text
GET /api/progress/lessons/{lessonId}
```

### Response

```json
{
  "success": true,
  "data": {
    "lessonId": "superposition-001",
    "status": "completed",
    "progress": 100,
    "mastery": 82,
    "attemptCount": 3
  }
}
```

---

# 50. Progress Updates

Progress should generally be updated as a consequence of application actions such as:

* Lesson completion
* Practice submission
* Assessment submission

The client should not arbitrarily set mastery by sending:

```json
{
  "mastery": 100
}
```

unless a trusted internal endpoint explicitly supports that behavior.

---

# 51. Recommendation API

A separate recommendation endpoint is optional for the MVP.

A recommendation may initially be included in:

```text
GET /api/dashboard
GET /api/progress
POST /api/practice/{id}/submit
POST /api/assessment/{id}/submit
```

Example:

```json
{
  "type": "lesson",
  "id": "measurement-001",
  "title": "Understanding Measurement",
  "reason": "Your recent assessment indicates that measurement needs more practice."
}
```

---

# 52. Algorithm APIs

## List Algorithms

### Endpoint

```text
GET /api/algorithms
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "bell-state",
      "title": "Bell State",
      "difficulty": "beginner",
      "lessonId": "bell-state-001"
    },
    {
      "id": "deutsch-jozsa",
      "title": "Deutsch-Jozsa",
      "difficulty": "intermediate",
      "lessonId": "deutsch-jozsa-001"
    },
    {
      "id": "grover",
      "title": "Grover's Algorithm",
      "difficulty": "intermediate",
      "lessonId": "grover-001"
    }
  ]
}
```

---

# 53. Get Algorithm

### Endpoint

```text
GET /api/algorithms/{algorithmId}
```

The response may include:

* Description
* Learning objectives
* Concepts
* Example Circuit IR
* Recommended lesson
* Difficulty

Example:

```json
{
  "success": true,
  "data": {
    "id": "bell-state",
    "title": "Bell State",
    "description": "A simple demonstration of quantum entanglement.",
    "difficulty": "beginner",
    "lessonId": "bell-state-001",
    "exampleCircuit": {}
  }
}
```

---

# 54. API Pagination

The MVP does not need sophisticated pagination for small curriculum datasets.

Pagination may be introduced for:

* Large circuit histories
* Large activity histories
* Large analytics datasets

If pagination is introduced, use a consistent structure.

Example:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 42
  }
}
```

---

# 55. API Filtering

Filtering should use query parameters.

Example:

```text
GET /api/lessons?level=beginner
```

Do not create separate endpoints for trivial filters.

---

# 56. API Naming Rules

Use predictable resource names.

Preferred:

```text
/api/lessons
/api/circuits
/api/practice
/api/assessment
/api/progress
```

Avoid inconsistent patterns such as:

```text
/api/getLesson
/api/doCircuit
/api/runQuantumThing
```

Action-oriented endpoints are appropriate for operations such as simulation:

```text
POST /api/circuit/simulate
```

because simulation is an operation rather than a normal CRUD resource.

---

# 57. ID Rules

API paths should use stable entity IDs.

Example:

```text
/api/lessons/superposition-001
/api/circuits/circuit-001
/api/practice/bell-practice-001
```

The API should not use display names as identifiers.

---

# 58. API Versioning

The MVP does not require complex URL versioning.

The initial API may remain:

```text
/api/...
```

If a future breaking API release is required, versioning may be introduced.

Example:

```text
/api/v2/...
```

Major API changes must be documented.

---

# 59. Idempotency

Normal GET requests should be safe and repeatable.

For operations such as circuit simulation, repeating a request may produce different sampled counts when finite shots are used.

The application should therefore treat simulation as an execution operation rather than assuming repeated responses are byte-for-byte identical.

---

# 60. Error Codes

Use stable error codes.

Example categories:

### Circuit

```text
INVALID_CIRCUIT
INVALID_GATE
INVALID_QUBIT_INDEX
INVALID_GATE_PARAMETER
SIMULATION_FAILED
SIMULATION_UNAVAILABLE
```

### Authentication

```text
UNAUTHORIZED
FORBIDDEN
```

### Resources

```text
LESSON_NOT_FOUND
CIRCUIT_NOT_FOUND
PRACTICE_NOT_FOUND
ASSESSMENT_NOT_FOUND
```

### Practice

```text
PRACTICE_SUBMISSION_INVALID
PRACTICE_EVALUATION_FAILED
```

### Assessment

```text
ASSESSMENT_SUBMISSION_INVALID
ASSESSMENT_NOT_FOUND
```

### AI

```text
AI_SERVICE_UNAVAILABLE
AI_RESPONSE_INVALID
AI_CONTEXT_INVALID
```

### General

```text
VALIDATION_ERROR
INTERNAL_SERVER_ERROR
```

---

# 61. Error Details

When useful, `details` should contain structured information.

Example:

```json
{
  "code": "INVALID_GATE_PARAMETER",
  "message": "RX requires a numeric theta parameter.",
  "details": {
    "operationIndex": 2,
    "parameter": "theta"
  }
}
```

Do not expose stack traces to the learner.

---

# 62. Internal Error Handling

Internal errors should be logged server-side.

The frontend should receive a safe public message.

Bad response:

```text
Pydantic validation traceback...
```

Good response:

```text
The circuit could not be processed right now.
```

---

# 63. API Timeouts

The application should use reasonable timeouts for:

* AI calls
* Simulation calls
* Database operations

The exact timeout values may depend on deployment.

The frontend should display a useful recovery state instead of waiting indefinitely.

---

# 64. AI Timeout Behavior

If the AI request exceeds the configured timeout:

```json
{
  "success": false,
  "error": {
    "code": "AI_SERVICE_UNAVAILABLE",
    "message": "The tutor took too long to respond. Please try again."
  }
}
```

---

# 65. Simulation Timeout Behavior

If simulation is too slow or unavailable:

```json
{
  "success": false,
  "error": {
    "code": "SIMULATION_UNAVAILABLE",
    "message": "The circuit could not be simulated right now."
  }
}
```

The frontend should retain the learner's current Circuit IR so the work is not lost.

---

# 66. Data Ownership Rules

The backend must enforce ownership for user-created resources.

Examples:

```text
Circuit
Practice Attempt
Assessment Attempt
Progress
AI Session
```

The authenticated user must only be allowed to access resources they are authorized to access.

---

# 67. Curriculum Data Rules

Curriculum APIs are primarily read-oriented for learners.

Learner-facing endpoints must not permit modification of canonical curriculum unless a separate administrative system is introduced.

---

# 68. Circuit IR Rule

Every circuit endpoint that accepts a circuit must use the official Circuit IR.

Do not create alternative circuit representations such as:

```json
{
  "gates": ["H", "CX"]
}
```

for one endpoint and:

```json
{
  "operations": []
}
```

for another.

The Circuit IR defined in:

```text
docs/07-Circuit-IR.md
```

is the canonical format.

---

# 69. AI Context Rule

The AI endpoint should receive or construct structured context rather than a giant unstructured string where possible.

Preferred:

```json
{
  "question": "...",
  "lessonId": "...",
  "circuit": {},
  "simulationResult": {},
  "mode": "interpret"
}
```

rather than:

```text
"Here is everything about the user and circuit..."
```

The backend may transform structured data into the final LLM prompt.

---

# 70. Frontend API Client

The frontend should use a centralized API client/service layer.

Conceptually:

```text
frontend/
└── services/
    ├── lessons.ts
    ├── circuits.ts
    ├── ai.ts
    ├── practice.ts
    ├── assessment.ts
    └── progress.ts
```

The exact folder structure may differ.

The important rule is:

> **Do not scatter raw `fetch()` calls throughout unrelated UI components.**

---

# 71. API Type Safety

Frontend TypeScript types should correspond to backend request and response models.

Examples:

```text
CircuitIR
SimulationRequest
SimulationResponse
TutorRequest
TutorResponse
PracticeSubmission
PracticeResult
AssessmentSubmission
AssessmentResult
ProgressResponse
```

Where practical, these contracts should be shared or generated from a reliable source.

---

# 72. Backend Models

FastAPI/Pydantic models should define:

* Request schemas
* Response schemas
* Validation rules
* Nested structures

The backend should not return uncontrolled dictionaries everywhere.

---

# 73. API Contract Testing

Representative API contracts should be tested.

At minimum, test:

```text
GET lesson
POST circuit validation
POST circuit simulation
POST AI tutor
GET practice
POST practice submission
GET assessment
POST assessment submission
GET progress
```

The most important test is the end-to-end circuit flow.

---

# 74. End-to-End Circuit API Flow

The primary Circuit Lab flow is:

```text
Circuit Lab
    ↓
POST /api/circuit/validate
    ↓
Valid
    ↓
POST /api/circuit/simulate
    ↓
Simulation Result
    ↓
Display Results
    ↓
POST /api/ai/tutor
    ↓
Circuit-aware Explanation
```

---

# 75. End-to-End Learning API Flow

The learning flow is:

```text
GET /api/lessons
        ↓
GET /api/lessons/{id}
        ↓
Open Circuit Activity
        ↓
POST /api/circuit/validate
        ↓
POST /api/circuit/simulate
        ↓
POST /api/ai/tutor
        ↓
POST /api/practice/{id}/submit
        ↓
POST /api/assessment/{id}/submit
        ↓
GET /api/progress
```

---

# 76. Frontend Error Mapping

The frontend should map stable error codes to useful UI states.

Example:

```text
INVALID_CIRCUIT
→ Highlight circuit problem

SIMULATION_FAILED
→ Show simulation error

AI_SERVICE_UNAVAILABLE
→ Show tutor unavailable state

UNAUTHORIZED
→ Ask learner to sign in

NOT_FOUND
→ Show resource not found
```

The frontend should not depend entirely on error message strings.

---

# 77. API Security

The API should:

* Validate input
* Enforce ownership
* Keep secrets server-side
* Reject unsupported operations
* Avoid arbitrary code execution
* Avoid exposing internal errors
* Apply sensible request limits

---

# 78. Rate Limiting

The MVP may use basic rate limiting for expensive endpoints.

Especially:

```text
POST /api/ai/tutor
POST /api/circuit/simulate
```

because these operations may consume external or computational resources.

The exact rate limits depend on the deployment environment.

---

# 79. Request Size Limits

The backend should reject unusually large requests.

This is especially relevant to:

* AI context
* Circuit payloads
* Practice submissions

The MVP should enforce reasonable limits rather than accepting unlimited JSON payloads.

---

# 80. Logging

The backend should log enough information to diagnose failures.

Logs may include:

* Endpoint
* Request ID
* User ID where appropriate
* Execution ID
* Circuit ID
* Response status
* Error code
* Duration

Do not log:

* API keys
* Passwords
* Authentication secrets
* Sensitive learner information unnecessarily

---

# 81. Request IDs

Where practical, assign a request or correlation ID.

Example:

```text
requestId: req-001
executionId: execution-001
```

This can help connect:

```text
Frontend error
    ↓
API request
    ↓
Quantum execution
    ↓
AI request
```

during debugging.

---

# 82. API and AI Trust

The API layer is part of the trust boundary.

The intended relationship is:

```text
Frontend
   ↓
Validated API
   ↓
Trusted Application Services
   ↓
Quantum / Database / AI
```

The frontend must not bypass these boundaries.

---

# 83. API and Circuit Correctness

A successful HTTP response does not automatically mean a circuit is mathematically meaningful.

For example:

```text
HTTP 200
+
valid JSON
```

does not guarantee:

```text
correct quantum behavior
```

Quantum correctness ultimately belongs to the quantum execution and validation layers.

---

# 84. API and AI Correctness

A successful LLM response does not automatically mean that its quantum claims are correct.

The AI endpoint must therefore be designed around:

```text
Verified Circuit
+
Verified Simulation Result
+
Curriculum Context
↓
AI Explanation
```

---

# 85. API Definition of Done

The API layer is MVP-ready when:

## Curriculum

* [ ] Lessons can be listed.
* [ ] Lessons can be retrieved.
* [ ] Concepts can be retrieved.

## Dashboard

* [ ] Dashboard data can be loaded.

## Circuit

* [ ] Circuit IR can be validated.
* [ ] Valid circuits can be simulated.
* [ ] Invalid circuits are rejected.
* [ ] Results are normalized.
* [ ] Learners can save circuits.

## AI

* [ ] AI tutor requests work.
* [ ] Relevant context can be provided.
* [ ] Missing simulation results do not cause fabricated answers.
* [ ] AI errors are handled gracefully.

## Practice

* [ ] Practice can be retrieved.
* [ ] Submissions can be evaluated.
* [ ] Attempts can be stored.

## Assessment

* [ ] Assessments can be retrieved.
* [ ] Answers can be submitted.
* [ ] Scores can be calculated.
* [ ] Correct answers are not exposed prematurely.

## Progress

* [ ] Progress can be retrieved.
* [ ] Practice/assessment activity can affect progress appropriately.

## Reliability

* [ ] Errors have stable codes.
* [ ] Inputs are validated.
* [ ] User-owned resources are protected.
* [ ] Secrets remain server-side.

---

# 86. API Priority for the 8-Day MVP

The implementation priority is:

### Priority 1

```text
POST /api/circuit/validate
POST /api/circuit/simulate
```

The quantum workflow must work.

### Priority 2

```text
POST /api/ai/tutor
```

The circuit-aware AI must work.

### Priority 3

```text
GET /api/lessons
GET /api/lessons/{id}
```

The learning experience must have content.

### Priority 4

```text
POST /api/practice/{id}/submit
POST /api/assessment/{id}/submit
```

The learning loop must reach practice and assessment.

### Priority 5

```text
GET /api/progress
GET /api/dashboard
```

Progress and dashboard features complete the loop.

### Priority 6

Additional convenience APIs.

---

# 87. Non-Goals

The MVP API does not require:

* GraphQL
* Complex event streaming
* WebSocket infrastructure unless needed for a specific interaction
* Microservice-to-microservice API mesh
* Enterprise API gateways
* Complex API version negotiation
* Public developer API
* Third-party OAuth provider ecosystem beyond the chosen authentication solution

The API should remain simple.

---

# 88. Future API Expansion

Future versions may add:

* Instructor APIs
* Classroom APIs
* Collaboration APIs
* Real quantum hardware execution
* Advanced analytics
* Adaptive learning
* Circuit sharing
* Versioned circuits
* Multi-backend execution
* Rich AI tool APIs

These are outside the initial MVP.

---

# 89. API Source of Truth

This document is the source of truth for the conceptual QubitSphere MVP API contracts.

The implementation may refine:

* Internal service names
* Exact database queries
* Additional optional fields
* Authentication implementation
* Deployment-specific infrastructure

However, major request/response behavior should remain consistent with this document.

---

# 90. Final API Principle

The QubitSphere API should create a clean boundary:

```text
                 QUBITSPHERE FRONTEND
                          │
                          ↓
                    DOCUMENTED API
                          │
            ┌─────────────┼─────────────┐
            ↓             ↓             ↓
        Curriculum     Circuit        AI
            │             │             │
            │        Quantum Engine     │
            │             │             │
            └─────────────┼─────────────┘
                          ↓
                       Results
                          ↓
                       Frontend
```

The final rules are:

> **Frontend requests are validated by the backend.**

> **Circuit requests use the canonical Circuit IR.**

> **Quantum results come from the quantum execution layer.**

> **AI explanations are generated from trusted context.**

> **User-owned data is protected by the backend.**

> **API contracts should remain predictable for both humans and AI coding agents.**
