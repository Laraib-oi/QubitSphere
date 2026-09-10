# QubitSphere — Curriculum Schema

## 1. Purpose

This document defines the official curriculum structure used by QubitSphere.

The curriculum schema provides a consistent format for:

* Lessons
* Concepts
* Learning objectives
* Explanations
* Examples
* Quantum circuits
* Visualizations
* Practice activities
* Challenges
* Assessments
* Hints
* Prerequisites
* Next-topic recommendations

The objective is to make the QubitSphere curriculum:

* Structured
* Reusable
* Machine-readable
* Easy to expand
* Easy to validate
* Connected to executable quantum circuits
* Suitable for AI-assisted tutoring

---

# 2. Core Principle

QubitSphere should not store its educational content as an unstructured collection of pages.

Instead, learning content should be represented using structured curriculum data.

The intended relationship is:

```text
Curriculum Data
      ↓
Lesson
      ↓
Concept
      ↓
Example
      ↓
Circuit
      ↓
Practice
      ↓
Assessment
      ↓
Progress
```

This allows the same curriculum information to be used by:

* Learner interface
* AI tutor
* Circuit Lab
* Practice system
* Assessment system
* Progress system
* Recommendation system

---

# 3. Curriculum Hierarchy

The curriculum is organized into the following hierarchy:

```text
Course
  ↓
Module
  ↓
Lesson
  ↓
Concept
  ↓
Example
  ↓
Practice
  ↓
Assessment
```

For the MVP, the implementation does not need a sophisticated course-management system.

A practical MVP can use:

```text
Module
  ↓
Lesson
  ↓
Activities
```

where each lesson contains the information required for learning, circuit exploration, practice, and assessment.

---

# 4. Curriculum Design Goals

Every lesson should:

1. Introduce a clear concept.
2. Define measurable learning objectives.
3. Use simple explanations.
4. Connect theory to quantum behavior.
5. Connect theory to circuits where appropriate.
6. Provide an example.
7. Give the learner an opportunity to interact.
8. Provide practice.
9. Check understanding.
10. Connect naturally to the next concept.

The learner should gradually move from:

```text
Understand
   ↓
Observe
   ↓
Build
   ↓
Run
   ↓
Interpret
   ↓
Practice
   ↓
Demonstrate Understanding
```

---

# 5. MVP Curriculum

The MVP should focus on the following curriculum sequence:

```text
1. Qubits
2. Quantum States
3. Superposition
4. Quantum Gates
5. Measurement
6. Entanglement
7. Bell State
8. Deutsch-Jozsa
9. Grover's Algorithm
```

The precise ordering may be adjusted during implementation if the learner flow improves.

The MVP should not attempt to cover every topic in quantum computing.

---

# 6. Lesson Schema

The canonical lesson object is:

```json
{
  "id": "superposition-001",
  "slug": "understanding-superposition",
  "title": "Understanding Superposition",
  "shortDescription": "Learn how a qubit can exist in a combination of basis states.",
  "level": "beginner",
  "estimatedMinutes": 15,
  "moduleId": "fundamentals",
  "prerequisites": [],
  "learningObjectives": [],
  "concepts": [],
  "sections": [],
  "exampleCircuits": [],
  "practice": [],
  "assessment": [],
  "hints": [],
  "nextTopics": [],
  "metadata": {}
}
```

---

# 7. Lesson Fields

## 7.1 `id`

Unique identifier for the lesson.

Example:

```json
"id": "superposition-001"
```

The ID should remain stable once the lesson is published.

---

## 7.2 `slug`

URL-friendly identifier.

Example:

```json
"slug": "understanding-superposition"
```

The slug may be used by the frontend routing system.

---

## 7.3 `title`

Human-readable lesson title.

Example:

```json
"title": "Understanding Superposition"
```

Titles should be concise and learner-friendly.

---

## 7.4 `shortDescription`

Brief description shown in lesson cards and dashboards.

Example:

```json
"shortDescription": "Learn how a qubit can exist in a combination of basis states."
```

---

## 7.5 `level`

Indicates the expected learner level.

Supported MVP values:

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

## 7.6 `estimatedMinutes`

Approximate time required to complete the lesson.

Example:

```json
"estimatedMinutes": 15
```

This is a planning estimate, not a strict time limit.

---

## 7.7 `moduleId`

Identifies the curriculum module.

Example:

```json
"moduleId": "fundamentals"
```

---

## 7.8 `prerequisites`

List of lesson IDs or concept IDs that should normally be completed first.

Example:

```json
"prerequisites": [
  "qubit-001"
]
```

---

# 8. Learning Objectives

Learning objectives define what the learner should be able to do after completing the lesson.

Example:

```json
"learningObjectives": [
  "Explain what quantum superposition means.",
  "Identify the role of the Hadamard gate.",
  "Interpret simple measurement probabilities."
]
```

Objectives should use observable verbs such as:

* Explain
* Identify
* Describe
* Construct
* Interpret
* Compare
* Predict
* Apply
* Analyze

Avoid vague objectives such as:

```text
"Understand quantum computing."
```

Prefer:

```text
"Explain how the Hadamard gate changes a single-qubit state."
```

---

# 9. Concept Schema

Concepts represent the core ideas taught within a lesson.

Example:

```json
{
  "id": "concept-superposition",
  "title": "Superposition",
  "summary": "A qubit can be represented as a combination of computational basis states.",
  "keywords": [
    "superposition",
    "qubit",
    "probability"
  ]
}
```

A concept may be referenced by:

* Lessons
* AI tutor
* Quizzes
* Challenges
* Recommendations

---

# 10. Concept Fields

A concept should support:

```text
id
title
summary
definition
keywords
difficulty
prerequisites
relatedConcepts
```

Example:

```json
{
  "id": "concept-entanglement",
  "title": "Quantum Entanglement",
  "summary": "A quantum correlation between systems that cannot be described independently.",
  "definition": "Entanglement describes quantum states in which the systems share correlations that are not captured by treating each system independently.",
  "keywords": [
    "entanglement",
    "correlation",
    "Bell state"
  ],
  "difficulty": "intermediate",
  "prerequisites": [
    "concept-superposition"
  ],
  "relatedConcepts": [
    "concept-measurement"
  ]
}
```

---

# 11. Lesson Sections

Lesson content should be divided into logical sections.

Example:

```json
"sections": [
  {
    "id": "intro",
    "type": "explanation",
    "title": "What is Superposition?",
    "content": "..."
  },
  {
    "id": "example",
    "type": "interactive",
    "title": "Create Superposition",
    "content": "..."
  }
]
```

---

# 12. Supported Section Types

The MVP may support:

```text
explanation
example
interactive
circuit
visualization
question
reflection
summary
```

Future versions may add additional section types.

---

# 13. Explanation Section

Example:

```json
{
  "id": "intro",
  "type": "explanation",
  "title": "What is a Qubit?",
  "content": "A qubit is the basic unit of quantum information."
}
```

Explanation content should be written for the target learner level.

---

# 14. Example Section

Examples connect concepts to concrete situations.

Example:

```json
{
  "id": "example-01",
  "type": "example",
  "title": "A Single-Qubit Example",
  "content": "Applying H to |0> creates an equal superposition of |0> and |1>."
}
```

Examples should remain mathematically correct and should avoid unsupported claims.

---

# 15. Interactive Section

Interactive sections provide an action for the learner.

Example:

```json
{
  "id": "interactive-01",
  "type": "interactive",
  "title": "Try the Hadamard Gate",
  "instruction": "Apply an H gate to the qubit and observe the result."
}
```

The frontend may connect the section to the Circuit Lab.

---

# 16. Circuit Section

A lesson can embed or reference an executable Circuit IR example.

Example:

```json
{
  "id": "circuit-01",
  "type": "circuit",
  "title": "Create Superposition",
  "circuitId": "superposition-example-001",
  "instruction": "Run the circuit and inspect the measurement distribution."
}
```

The circuit itself should use the official Circuit IR defined in:

```text
docs/07-Circuit-IR.md
```

---

# 17. Visualization Section

A visualization section may explain quantum behavior through a visual representation.

Example:

```json
{
  "id": "visual-01",
  "type": "visualization",
  "title": "Measurement Probabilities",
  "visualizationType": "probability-bars",
  "description": "Compare the probability of observing each computational basis state."
}
```

Possible visualization types include:

```text
probability-bars
histogram
statevector
circuit
bloch-sphere
```

Only visualizations actually implemented by the application should be referenced.

---

# 18. Summary Section

Every substantial lesson should end with a concise summary.

Example:

```json
{
  "id": "summary",
  "type": "summary",
  "title": "Key Takeaways",
  "content": [
    "A qubit can exist in a superposition of basis states.",
    "The Hadamard gate creates an equal superposition from |0>.",
    "Measurement produces classical outcomes."
  ]
}
```

---

# 19. Example Circuit Schema

Lesson example circuits should reference Circuit IR.

Example:

```json
{
  "id": "bell-state-example-001",
  "title": "Bell State",
  "purpose": "Demonstrate entanglement",
  "circuit": {
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
}
```

---

# 20. Practice Schema

Practice activities allow the learner to apply the concept.

Canonical structure:

```json
{
  "id": "practice-001",
  "type": "circuit-challenge",
  "title": "Create a Bell State",
  "instructions": "Build a two-qubit Bell-state circuit.",
  "difficulty": "beginner",
  "skills": [
    "superposition",
    "entanglement",
    "circuit-building"
  ],
  "starterCircuit": {},
  "expectedBehavior": {},
  "hints": [],
  "solution": {}
}
```

---

# 21. Practice Types

The MVP should support a small number of practice types:

```text
multiple-choice
concept-question
predict-result
circuit-construction
circuit-modification
result-interpretation
```

The implementation should begin with the simplest reliable types.

---

# 22. Circuit Construction Practice

Circuit construction challenges should define the desired behavior rather than requiring only one visual arrangement.

Example:

```json
{
  "id": "bell-challenge-001",
  "type": "circuit-construction",
  "title": "Build a Bell State",
  "instructions": "Create an entangled two-qubit state.",
  "target": {
    "qubits": 2,
    "requiredConcepts": [
      "superposition",
      "entanglement"
    ]
  }
}
```

The evaluator can inspect the learner's Circuit IR and execution behavior.

---

# 23. Predict-Result Practice

A learner may be asked to predict the outcome before executing.

Example:

```json
{
  "id": "prediction-001",
  "type": "predict-result",
  "title": "Predict the Measurement",
  "question": "What measurement distribution should this circuit produce?",
  "circuitId": "superposition-example-001",
  "options": [
    "Only 0",
    "Only 1",
    "Approximately equal 0 and 1",
    "Cannot determine"
  ],
  "correctOption": 2
}
```

Prediction exercises help connect theory with execution.

---

# 24. Circuit Modification Practice

The learner may start with an existing circuit and be asked to modify it.

Example:

```json
{
  "id": "modify-001",
  "type": "circuit-modification",
  "title": "Change the Output",
  "instructions": "Remove the Hadamard gate and run the circuit again.",
  "starterCircuit": {},
  "expectedObservation": {}
}
```

The learner should be able to see how a circuit change affects the result.

---

# 25. Assessment Schema

Assessment items are used to evaluate learning.

Canonical structure:

```json
{
  "id": "assessment-001",
  "title": "Superposition Check",
  "questions": [],
  "passingScore": 70
}
```

---

# 26. Assessment Question Schema

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

# 27. Supported Assessment Types

MVP assessment types:

```text
multiple-choice
true-false
concept-question
result-interpretation
circuit-question
```

Circuit-construction assessment may be added where useful.

---

# 28. Hint Schema

Hints should guide learners progressively.

Example:

```json
{
  "id": "hint-001",
  "level": 1,
  "text": "Think about the gate that creates superposition."
}
```

A second hint could be:

```json
{
  "id": "hint-002",
  "level": 2,
  "text": "The Hadamard gate creates an equal superposition from |0>."
}
```

Hints should avoid immediately revealing the full answer when progressive guidance is appropriate.

---

# 29. AI Tutor Curriculum Context

The curriculum system must provide structured information that the AI tutor can consume.

For a lesson, relevant AI context may include:

```json
{
  "lesson": {
    "id": "superposition-001",
    "title": "Understanding Superposition",
    "learningObjectives": [
      "Explain superposition",
      "Interpret measurement probabilities"
    ]
  },
  "concepts": [
    {
      "id": "concept-superposition",
      "title": "Superposition",
      "summary": "..."
    }
  ],
  "currentActivity": "circuit"
}
```

The AI can then combine this curriculum context with the learner's Circuit IR and simulation result.

---

# 30. Curriculum and Circuit Relationship

Quantum-learning lessons should connect concepts to actual circuits whenever possible.

For example:

```text
Lesson:
Superposition
      ↓
Concept:
Hadamard Gate
      ↓
Circuit:
H on q0
      ↓
Simulation:
0.5 |0>
0.5 |1>
      ↓
Question:
Why are both outcomes possible?
      ↓
AI Explanation
```

This is a core QubitSphere learning pattern.

---

# 31. Curriculum and AI Principle

The curriculum provides the educational knowledge.

The simulator provides the computational facts.

The AI combines them to explain the learner's situation.

Conceptually:

```text
Curriculum
     +
Circuit IR
     +
Simulation Result
     +
Learner Context
     ↓
AI Tutor
```

The AI should not invent curriculum facts or simulation values that are absent from the trusted sources.

---

# 32. Prerequisite Graph

Lessons and concepts should support prerequisite relationships.

Example:

```text
Qubit
  ↓
Quantum State
  ↓
Superposition
  ↓
Quantum Gates
  ↓
Measurement
  ↓
Entanglement
  ↓
Bell State
  ↓
Deutsch-Jozsa
  ↓
Grover
```

This graph can later be used for:

* Learning recommendations
* Progress tracking
* Difficulty management
* Adaptive learning

The MVP can implement a simple ordered progression.

---

# 33. Next Topic Schema

Each lesson may specify recommended next topics.

Example:

```json
"nextTopics": [
  "measurement-001",
  "entanglement-001"
]
```

A future recommendation engine may select between them using learner performance.

For the MVP, deterministic recommendations are acceptable.

---

# 34. Difficulty

Each lesson, practice activity, and assessment may have a difficulty:

```text
beginner
intermediate
advanced
```

Difficulty should reflect the cognitive complexity of the activity rather than simply the amount of text.

---

# 35. Estimated Time

Lessons and practice activities may define approximate completion times.

Example:

```json
"estimatedMinutes": 10
```

The value is informational.

It should not prevent learners from spending more or less time.

---

# 36. Curriculum Metadata

Optional metadata may include:

```json
"metadata": {
  "version": "1.0",
  "author": "QubitSphere",
  "tags": [
    "quantum-computing",
    "beginner",
    "circuits"
  ]
}
```

Metadata should not be used to store executable code or secrets.

---

# 37. Example Complete Lesson

A simplified complete lesson might look like:

```json
{
  "id": "superposition-001",
  "slug": "understanding-superposition",
  "title": "Understanding Superposition",
  "shortDescription": "Learn how a qubit can exist in a combination of basis states.",
  "level": "beginner",
  "estimatedMinutes": 15,
  "moduleId": "fundamentals",
  "prerequisites": [
    "qubit-001"
  ],
  "learningObjectives": [
    "Explain quantum superposition.",
    "Identify the role of the Hadamard gate.",
    "Interpret simple measurement probabilities."
  ],
  "concepts": [
    "concept-superposition",
    "concept-hadamard"
  ],
  "sections": [
    {
      "id": "intro",
      "type": "explanation",
      "title": "What is Superposition?",
      "content": "..."
    },
    {
      "id": "interactive",
      "type": "interactive",
      "title": "Try the Hadamard Gate",
      "instruction": "Apply H and observe the result."
    },
    {
      "id": "summary",
      "type": "summary",
      "title": "Key Takeaways",
      "content": [
        "A qubit can exist in a superposition.",
        "The Hadamard gate creates an equal superposition from |0>."
      ]
    }
  ],
  "exampleCircuits": [
    "superposition-example-001"
  ],
  "practice": [
    "prediction-001"
  ],
  "assessment": [
    "assessment-superposition-001"
  ],
  "hints": [
    "hint-superposition-001"
  ],
  "nextTopics": [
    "measurement-001",
    "entanglement-001"
  ],
  "metadata": {
    "version": "1.0",
    "tags": [
      "superposition",
      "beginner"
    ]
  }
}
```

---

# 38. Curriculum Storage

The MVP may store curriculum content as structured JSON files or equivalent structured data.

A practical development arrangement is:

```text
content/
└── curriculum/
    ├── modules/
    ├── lessons/
    ├── concepts/
    ├── practice/
    └── assessments/
```

The exact folder arrangement may be finalized during implementation.

The important requirement is that curriculum content remains structured and version-controlled.

---

# 39. Content vs Application Logic

Curriculum content should be separated from application logic wherever practical.

For example:

```text
Curriculum Data
        ≠
React Components
        ≠
Quantum Simulator
        ≠
AI Prompt Logic
```

A lesson should describe educational content.

The application should determine how that content is rendered.

The quantum engine should execute referenced circuits.

The AI layer should use the structured content as context.

---

# 40. Content Validation

Curriculum data should be validated before being used by the application.

Validation should check:

* Required lesson fields
* Unique IDs
* Valid references
* Valid difficulty values
* Valid section types
* Valid question types
* Valid circuit references
* Valid prerequisite references
* Valid next-topic references

Invalid curriculum records should be caught during development rather than causing unpredictable runtime behavior.

---

# 41. Curriculum Versioning

Curriculum content should support versioning.

Example:

```json
"metadata": {
  "version": "1.0"
}
```

Major curriculum changes can use a new version.

This becomes useful when lesson content changes but learner progress needs to remain understandable.

---

# 42. Content Authoring Rules

When creating new lessons:

1. Start with the learning objective.
2. Define the prerequisite concepts.
3. Explain the concept simply.
4. Provide an example.
5. Connect the concept to a circuit when appropriate.
6. Give the learner an interaction.
7. Add practice.
8. Add assessment.
9. Define hints.
10. Define the next learning step.

Do not create lessons that are only long explanations with no opportunity for interaction.

---

# 43. Quantum Accuracy Rule

All curriculum content involving quantum mechanics must be technically accurate.

In particular:

* State descriptions must be correct.
* Gate behavior must be correct.
* Measurement explanations must be correct.
* Probabilities must not be fabricated.
* Circuit examples must correspond to their stated purpose.
* Algorithm descriptions must accurately describe what the circuit does.

When an explanation depends on an actual simulation result, the application should use the quantum execution layer as the source of numerical truth.

---

# 44. AI-Generated Curriculum Rule

AI may assist with drafting curriculum content, but generated content must be reviewed before being treated as authoritative.

AI-generated educational content must not automatically become the source of truth for:

* Quantum mathematics
* Circuit behavior
* Simulation results
* Algorithm correctness

Verified references, explicit content definitions, and the quantum execution layer should remain authoritative.

---

# 45. MVP Curriculum Scope

The MVP should initially contain enough content to support the main demonstration.

Minimum lesson set:

```text
01 — What is a Qubit?
02 — Understanding Quantum States
03 — Superposition
04 — Quantum Gates
05 — Measurement
06 — Entanglement
07 — Bell State
08 — Deutsch-Jozsa
09 — Grover's Algorithm
```

Not every lesson needs the same amount of content.

The most detailed and interactive lesson should be the one used in the main demo.

---

# 46. MVP Content Priority

Content implementation priority is:

### Priority 1

Superposition

### Priority 2

Measurement

### Priority 3

Entanglement

### Priority 4

Bell State

### Priority 5

Quantum Gates

### Priority 6

Qubits and Quantum States

### Priority 7

Deutsch-Jozsa

### Priority 8

Grover

This ordering supports the primary Bell-State learning demonstration.

---

# 47. Recommended Lesson Pattern

The preferred QubitSphere lesson pattern is:

```text
1. Explain
      ↓
2. Show
      ↓
3. Let the learner try
      ↓
4. Run a circuit
      ↓
5. Observe the result
      ↓
6. Ask the AI
      ↓
7. Practice
      ↓
8. Assess
      ↓
9. Continue
```

This pattern should be reused throughout the curriculum where appropriate.

---

# 48. Relationship to Progress Tracking

Curriculum IDs should be stable enough to support progress tracking.

For example:

```text
lesson completion
practice completion
assessment result
concept mastery
```

can reference stable:

```text
lessonId
conceptId
practiceId
assessmentId
```

The progress system should not depend on display titles because titles may change.

---

# 49. Relationship to Recommendations

The recommendation system should use curriculum relationships rather than arbitrary suggestions.

For example:

```text
Weak Superposition
       ↓
Review Superposition
       ↓
Practice Hadamard Gate
       ↓
Try Bell State
```

For the MVP, recommendations can be deterministic.

A more advanced adaptive learning system can be introduced later.

---

# 50. Curriculum Source of Truth

The structured curriculum data is the canonical source for QubitSphere's educational content.

The following should be derived from or reference the curriculum data:

* Lesson pages
* Lesson cards
* Practice activities
* Assessment questions
* AI tutor context
* Recommendation metadata
* Progress references

Duplicating educational content across unrelated application files should be avoided.

---

# 51. Final Curriculum Principle

QubitSphere curriculum should connect knowledge to action.

The preferred relationship is:

```text
Concept
   ↓
Explanation
   ↓
Circuit
   ↓
Execution
   ↓
Observation
   ↓
AI Explanation
   ↓
Practice
   ↓
Assessment
```

The curriculum is therefore not simply a collection of educational articles.

It is a structured system designed to drive the complete QubitSphere learning loop.

The final principle is:

> **Every important quantum concept should have a path from explanation to interaction, and whenever appropriate, from interaction to an executable circuit and verified result.**
