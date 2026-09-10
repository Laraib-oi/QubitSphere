# QubitSphere — User Flows

## 1. Purpose

This document defines the primary user flows for the QubitSphere MVP.

A user flow describes the sequence of actions a learner takes to accomplish a goal.

The purpose of defining these flows before implementation is to ensure that:

* Product screens have clear purposes.
* Navigation remains consistent.
* Features connect to one another.
* Codex and Claude understand the intended user journey.
* The MVP remains focused on the core learning loop.

The central QubitSphere flow is:

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
  ↓
Next Step
```

---

# 2. Primary User

The primary user is:

> **A beginner or intermediate learner studying quantum computing.**

The user should be able to enter QubitSphere without needing to understand the platform's internal architecture.

---

# 3. Primary User Goal

The primary user goal is:

> **Understand a quantum concept by learning it, experimenting with it in a circuit, observing the result, asking contextual questions, practicing, and checking their understanding.**

---

# 4. Core User Journey

The complete MVP journey is:

```text
Landing Page
     ↓
Dashboard
     ↓
Learning Module
     ↓
Lesson
     ↓
Concept
     ↓
Interactive Circuit
     ↓
Circuit Lab
     ↓
Run Circuit
     ↓
Simulation Results
     ↓
Visualization
     ↓
AI Tutor
     ↓
Circuit Modification
     ↓
Run Again
     ↓
Practice
     ↓
Assessment
     ↓
Progress
     ↓
Next Learning Step
```

This is the primary product journey.

---

# 5. Flow 1 — First Visit

## Goal

Help a new learner understand what QubitSphere is and start learning quickly.

## Flow

```text
User opens QubitSphere
        ↓
Landing Page
        ↓
Understand product value
        ↓
See learning loop
        ↓
Click "Start Learning"
        ↓
Dashboard / Learning Area
```

## Expected Outcome

The learner should understand within a short amount of time:

* What QubitSphere does
* Who it is for
* Why it is different
* What they should do next

---

# 6. Landing Page Flow

Recommended sequence:

```text
Hero
  ↓
Problem
  ↓
Solution
  ↓
Learning Loop
  ↓
Core Capabilities
  ↓
Circuit + AI Example
  ↓
Call to Action
```

## Primary CTA

```text
Start Learning
```

## Secondary CTA

```text
Explore Circuit Lab
```

The landing page should not require the learner to read a long explanation before entering the product.

---

# 7. Flow 2 — Dashboard

## Goal

Give the learner a clear next action.

## Flow

```text
Dashboard
    ↓
View Progress
    ↓
View Continue Learning
    ↓
View Recommendation
    ↓
Choose Next Action
```

Possible actions:

```text
Continue Lesson
Open Circuit Lab
Practice
Review Progress
```

## Expected Outcome

The learner should know:

> **What should I do next?**

---

# 8. Dashboard Information Hierarchy

The dashboard should prioritize:

```text
1. Current learning activity
2. Recommended next step
3. Progress
4. Recent activity
5. Quick actions
```

Do not overload the dashboard with unrelated metrics.

---

# 9. Flow 3 — Browse Curriculum

## Goal

Allow the learner to find an appropriate learning topic.

## Flow

```text
Dashboard
    ↓
Learn
    ↓
Browse Modules
    ↓
Select Module
    ↓
Browse Lessons
    ↓
Select Lesson
```

Example:

```text
Fundamentals
    ↓
Superposition
    ↓
Measurement
    ↓
Entanglement
```

---

# 10. Curriculum Ordering

The default MVP learning progression is:

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

The system may later support more personalized ordering.

---

# 11. Flow 4 — Start a Lesson

## Goal

Help the learner understand a concept.

## Flow

```text
Open Lesson
     ↓
View Lesson Introduction
     ↓
View Learning Objectives
     ↓
Read Concept Explanation
     ↓
View Example
     ↓
Try Interactive Activity
```

The learner should be encouraged to interact before moving directly to assessment.

---

# 12. Lesson Structure

A typical lesson should follow:

```text
Lesson Header
      ↓
Learning Objectives
      ↓
Explanation
      ↓
Example
      ↓
Interactive Activity
      ↓
Visualization
      ↓
AI Assistance
      ↓
Practice
      ↓
Assessment
      ↓
Next Step
```

Not every lesson needs every section.

The sections should be selected according to the learning objective.

---

# 13. Flow 5 — Interactive Concept Activity

## Goal

Connect the concept to an observable behavior.

Example:

```text
Concept:
Superposition

       ↓

Instruction:
Apply H to q0

       ↓

Circuit

q0 ── H ── M

       ↓

Run

       ↓

View Result
```

The learner moves from explanation to experimentation.

---

# 14. Flow 6 — Open Circuit Lab

## Goal

Allow the learner to construct or modify a quantum circuit.

## Flow

```text
Lesson
   ↓
Try Circuit
   ↓
Circuit Lab
   ↓
View Starter Circuit
   ↓
Add / Remove / Modify Gates
   ↓
Validate
   ↓
Run
```

The Circuit Lab should preserve the current learning context where possible.

---

# 15. Circuit Lab Entry States

The learner may enter the Circuit Lab in one of three states:

### Empty Circuit

```text
No operations
```

Useful for free experimentation.

### Starter Circuit

```text
Partially constructed circuit
```

Useful for guided lessons.

### Template Circuit

```text
Complete example circuit
```

Useful for algorithm exploration.

---

# 16. Flow 7 — Build a Circuit

## Goal

Construct the required quantum circuit.

The learner:

```text
Opens Gate Palette
      ↓
Selects Gate
      ↓
Selects Qubit / Position
      ↓
Gate Appears
      ↓
Circuit IR Updates
      ↓
Circuit Visualization Updates
```

For controlled operations:

```text
Select Control
      ↓
Select Target
      ↓
Create Controlled Operation
```

---

# 17. Circuit Editing

The learner should be able to:

* Add gates
* Remove gates
* Replace gates
* Modify parameters
* Modify control/target relationships where supported
* Add/remove measurements where supported
* Reset the circuit

Every meaningful modification should update the Circuit IR.

---

# 18. Circuit Validation Flow

Before simulation:

```text
Circuit IR
    ↓
Backend Validation
    ↓
Valid?
 ┌──┴──┐
No    Yes
↓      ↓
Error  Simulation
```

If invalid:

```text
Show error
   ↓
Explain issue
   ↓
Learner fixes circuit
   ↓
Validate again
```

---

# 19. Flow 8 — Run Circuit

## Goal

Execute the learner's circuit.

## Flow

```text
Click "Run Circuit"
        ↓
Show Running State
        ↓
Send Circuit IR
        ↓
Validate Backend
        ↓
Quantum Execution
        ↓
Generate Result
        ↓
Normalize Result
        ↓
Display Results
```

The learner should receive clear feedback throughout.

---

# 20. Run States

The UI should support:

### Ready

```text
Run Circuit
```

### Running

```text
Running…
```

### Success

```text
Simulation Complete
```

### Failure

```text
Simulation Failed
```

---

# 21. Flow 9 — View Simulation Results

## Goal

Help the learner understand what happened after execution.

## Flow

```text
Simulation Complete
       ↓
Measurement Counts
       ↓
Probabilities
       ↓
Visualization
       ↓
Optional State Information
```

---

# 22. Result Presentation

Prefer visual summaries first.

Example:

```text
Measurement Results

00  ███████████████████  502
11  ███████████████████  522

Shots: 1024
```

Then expose additional technical information if the learner wants it.

---

# 23. Flow 10 — Understand a Visualization

## Goal

Help the learner interpret simulation data.

Example:

```text
Histogram
   ↓
Learner notices
00 and 11 dominate
   ↓
Learner asks:
"Why?"
   ↓
AI Tutor
```

The visualization creates a concrete object for the learner to reason about.

---

# 24. Flow 11 — Ask AI About Current Circuit

## Goal

Get contextual help without leaving the application.

## Flow

```text
Learner views circuit/result
        ↓
Click "Ask AI"
        ↓
AI Tutor opens
        ↓
Current context is available
        ↓
Learner asks question
        ↓
Backend builds AI context
        ↓
LLM generates response
        ↓
Response appears
```

The learner should not manually copy the circuit or simulation output.

---

# 25. AI Context

Relevant context may include:

```text
Current Lesson
Current Concept
Current Circuit
Circuit IR
Simulation Result
Practice Context
Assessment Mode
Relevant Progress
```

Only relevant information should be included.

---

# 26. Flow 12 — Ask "Why Did I Get This Result?"

Primary question:

> **Why did I get 00 and 11?**

The flow is:

```text
Bell State Circuit
       ↓
Run
       ↓
00 / 11 Results
       ↓
Ask AI
       ↓
AI receives:
   - Bell State lesson
   - Circuit IR
   - Simulation result
       ↓
AI explains
```

The AI response should connect:

```text
H
 ↓
Superposition
 ↓
CX
 ↓
Correlation / Entanglement
 ↓
Measurement
 ↓
Observed Outcomes
```

---

# 27. Flow 13 — Explain a Gate

## Goal

Understand the purpose of an individual gate.

Example:

```text
Learner selects H
       ↓
Click "Explain"
       ↓
AI receives:
   Current lesson
   Current circuit
   Selected gate
       ↓
AI explains H
       ↓
Learner continues
```

The explanation should be connected to the gate's role in the current circuit.

---

# 28. Flow 14 — Modify the Circuit

## Goal

Encourage experimentation.

Example:

```text
Bell State Circuit
       ↓
Learner removes H
       ↓
Circuit IR changes
       ↓
Previous result becomes stale
       ↓
Learner runs again
       ↓
New result
```

The UI should clearly communicate that the previous result no longer represents the current circuit.

---

# 29. Flow 15 — Explain Changed Result

The learner asks:

> **Why did the result change after I removed H?**

The system should use:

```text
Updated Circuit IR
+
Updated Simulation Result
+
Current Lesson
```

Then:

```text
AI Context Builder
       ↓
LLM
       ↓
Updated Explanation
```

The AI must not continue discussing the old circuit.

---

# 30. Stale Result UX

After a circuit change, the UI may show:

```text
Circuit changed.

Run the circuit again to update the results.
```

Previous results may be visually marked as outdated.

---

# 31. Flow 16 — Save a Circuit

## Goal

Allow the learner to preserve their work.

## Flow

```text
Learner builds circuit
      ↓
Click Save
      ↓
Enter / confirm name
      ↓
Validate Circuit IR
      ↓
Store Circuit
      ↓
Show success
```

Example:

```text
Circuit saved.
```

---

# 32. Flow 17 — Load a Saved Circuit

## Goal

Continue previous work.

```text
Circuit Lab
    ↓
My Circuits
    ↓
Select Circuit
    ↓
Load Circuit IR
    ↓
Render Circuit
    ↓
Continue Editing
```

The loaded circuit should remain compatible with the current Circuit IR version or be migrated when necessary.

---

# 33. Flow 18 — Practice Challenge

## Goal

Apply the concept.

Example:

> **Build a Bell State.**

Flow:

```text
Open Practice
     ↓
Read Objective
     ↓
Open Circuit Lab
     ↓
Build Circuit
     ↓
Validate
     ↓
Submit
     ↓
Evaluate
     ↓
Receive Feedback
```

---

# 34. Practice With Hints

The learner may request a hint.

Flow:

```text
Learner stuck
     ↓
Show Hint
     ↓
Hint 1
     ↓
Learner retries
     ↓
Optional Hint 2
     ↓
Retry
```

Hints should guide rather than immediately provide the complete solution when appropriate.

---

# 35. Practice Submission

The backend should:

```text
Receive Submission
      ↓
Validate
      ↓
Evaluate
      ↓
Calculate Score
      ↓
Store Attempt
      ↓
Update Progress where appropriate
      ↓
Return Feedback
```

---

# 36. Practice Success

Example:

```text
Challenge Complete

Score:
100%

Feedback:
Correctly created the required two-qubit
entangled circuit.

Next:
Try the Bell State assessment.
```

---

# 37. Practice Failure

Example:

```text
Not quite yet.

Your circuit is valid, but it does not produce
the required behavior.

Hint:
Think about which gate creates superposition.
```

The exact feedback should be based on actual evaluation.

---

# 38. Flow 19 — Assessment

## Goal

Measure learner understanding.

Flow:

```text
Lesson
   ↓
Assessment
   ↓
Read Question
   ↓
Choose / Enter Answer
   ↓
Next Question
   ↓
Submit
   ↓
Evaluate
   ↓
Score
```

---

# 39. Assessment Types

MVP assessment may include:

```text
Multiple Choice
True / False
Concept Question
Result Interpretation
Circuit Question
```

Circuit-construction assessment can be added when practical.

---

# 40. Assessment + AI

Assessment mode must be distinct from normal tutoring.

During normal learning:

```text
AI may explain and guide.
```

During assessment:

```text
AI must follow assessment restrictions.
```

For example, it should not automatically provide the correct answer to a protected assessment question.

---

# 41. Flow 20 — Assessment Result

After submission:

```text
Assessment Complete
       ↓
Score
       ↓
Pass / Fail
       ↓
Feedback
       ↓
Next Recommendation
```

Example:

```text
Score: 80%

Passed

Recommended:
Review Measurement
```

---

# 42. Flow 21 — Progress Update

Progress can be affected by:

* Lesson completion
* Practice completion
* Practice score
* Assessment score
* Concept performance

Flow:

```text
Learner Action
      ↓
Application records result
      ↓
Progress Service
      ↓
Update learner state
      ↓
Dashboard / Progress page reflects change
```

---

# 43. Flow 22 — View Progress

## Goal

Understand learning status.

Flow:

```text
Progress
   ↓
Overall Progress
   ↓
Concept Mastery
   ↓
Lesson Completion
   ↓
Practice Performance
   ↓
Assessment Performance
   ↓
Recommended Next Step
```

The progress page should remain understandable rather than becoming an analytics dashboard.

---

# 44. Flow 23 — Recommendation

## Goal

Give the learner a sensible next action.

The MVP may use deterministic rules.

Example:

```text
Assessment:
Low Measurement Score
        ↓
Recommendation:
Review Measurement
        ↓
Practice
        ↓
Continue Learning
```

The recommendation should be explainable.

---

# 45. Flow 24 — Algorithm Exploration

## Goal

Let the learner explore a quantum algorithm.

Example:

```text
Algorithms
    ↓
Bell State
    ↓
Algorithm Overview
    ↓
Core Concept
    ↓
Example Circuit
    ↓
Run
    ↓
View Result
    ↓
Ask AI
    ↓
Practice
```

The same pattern can be used for:

* Deutsch-Jozsa
* Grover

---

# 46. Flow 25 — Bell State End-to-End

This is the most important MVP flow.

```text
Dashboard
    ↓
Bell State Lesson
    ↓
Learn Superposition
    ↓
Learn Entanglement
    ↓
Open Circuit Lab
    ↓
Build:
H + CX + Measure
    ↓
Validate
    ↓
Run
    ↓
View:
00 / 11
    ↓
View Probabilities
    ↓
Ask:
"Why did I get 00 and 11?"
    ↓
AI explains
    ↓
Remove H
    ↓
Run again
    ↓
Observe changed result
    ↓
Ask:
"Why did the result change?"
    ↓
AI explains updated circuit
    ↓
Practice
    ↓
Assessment
    ↓
Progress
```

---

# 47. Bell State Circuit

The primary circuit is:

```text
q0 ── H ──●── M
          │
q1 ───────X── M
```

The learner should understand the relationship between:

```text
H
→ Superposition
```

and:

```text
CX
→ Correlation / Entanglement
```

and:

```text
Measurement
→ Classical outcomes
```

---

# 48. Flow 26 — Return to Learning

After experimentation, the learner should be able to return to the lesson.

Example:

```text
Circuit Lab
   ↓
Back to Lesson
   ↓
Continue Lesson
```

The application should preserve enough context to avoid making the learner restart the activity.

---

# 49. Flow 27 — Error Recovery

Every major flow should provide recovery.

## API Error

```text
Error
 ↓
Explain
 ↓
Retry
```

## Simulation Error

```text
Simulation Failed
 ↓
Keep Circuit
 ↓
Retry
```

## AI Error

```text
AI Unavailable
 ↓
Continue Learning
 ↓
Retry Later
```

The application should not lose learner work unnecessarily.

---

# 50. Flow 28 — Empty States

For example, if the learner has no saved circuits:

```text
My Circuits

No saved circuits yet.

Build your first circuit in Circuit Lab.

[Open Circuit Lab]
```

The empty state should give the learner a clear next action.

---

# 51. Flow 29 — New Learner

A new learner may follow:

```text
Landing
   ↓
Start Learning
   ↓
Introduction
   ↓
Qubit
   ↓
Quantum State
   ↓
Superposition
   ↓
Measurement
   ↓
Entanglement
   ↓
Bell State
```

The system should gradually increase complexity.

---

# 52. Flow 30 — Returning Learner

A returning learner should be able to:

```text
Login / Enter
      ↓
Dashboard
      ↓
Continue Learning
      ↓
Open Previous Lesson
      ↓
Continue Progress
```

The exact authentication experience may be simplified for the MVP.

---

# 53. Flow 31 — Learner Reviews Weak Concept

Example:

```text
Dashboard
   ↓
Recommendation
   ↓
Measurement Review
   ↓
Lesson
   ↓
Interactive Example
   ↓
Practice
   ↓
Assessment
```

This creates a simple remediation loop.

---

# 54. Flow 32 — Learner Explores Freely

Not every learner needs to follow a strict sequence.

A learner may:

```text
Dashboard
   ↓
Circuit Lab
   ↓
Build Any Supported Circuit
   ↓
Run
   ↓
Visualize
   ↓
Ask AI
```

The platform should allow exploration while still providing guided learning paths.

---

# 55. Flow 33 — AI Debugging

Example:

> "Why is my circuit not creating the Bell State?"

Flow:

```text
Learner asks
      ↓
AI Tutor
      ↓
Receive:
Circuit IR
+
Simulation Result
+
Lesson Context
      ↓
Identify potential issue
      ↓
Explain
      ↓
Suggest next action
```

The AI should distinguish between verified structural problems and conceptual suggestions.

---

# 56. Flow 34 — Explain Without Simulation

Example:

> "What does a Hadamard gate do?"

Flow:

```text
Question
   ↓
Current Lesson
   +
Relevant Circuit
   ↓
AI Tutor
   ↓
Conceptual Explanation
```

Simulation is not required when the question is purely conceptual.

---

# 57. Flow 35 — Explain With Simulation

Example:

> "Why did these outcomes appear?"

Flow:

```text
Question
   ↓
Current Circuit
   +
Simulation Result
   +
Lesson
   ↓
AI Context Builder
   ↓
LLM
   ↓
Grounded Explanation
```

Numerical claims must come from verified simulation data.

---

# 58. Flow 36 — Assessment Restriction

If the learner asks:

> "What is the answer?"

during an active assessment:

```text
Question
   ↓
Assessment Mode Detected
   ↓
Tutor checks policy
   ↓
Do not reveal protected answer
   ↓
Offer conceptual guidance where permitted
```

The exact policy can be simplified for the MVP.

---

# 59. Flow 37 — Circuit Save + Reopen

Complete lifecycle:

```text
Build Circuit
   ↓
Save
   ↓
Circuit stored as Circuit IR
   ↓
Leave Circuit Lab
   ↓
Return Later
   ↓
Load Circuit
   ↓
Render Circuit
   ↓
Continue
```

---

# 60. Flow 38 — Simulation + AI Context

A complete result interpretation flow is:

```text
Circuit IR
    ↓
Validate
    ↓
Simulate
    ↓
Normalized Result
    ↓
Store/retain current result
    ↓
AI Context Builder
    ↓
LLM
    ↓
Explanation
```

This is the core technical learning flow.

---

# 61. Flow 39 — Circuit Modification + Context Refresh

The application must handle modification correctly:

```text
Circuit A
   ↓
Simulation A
   ↓
AI Explanation A

Learner modifies circuit

Circuit B
   ↓
Simulation A becomes stale
   ↓
Simulation B
   ↓
AI Explanation B
```

The AI must use Circuit B and Simulation B when explaining the new state.

---

# 62. Flow 40 — Primary Judge Flow

A judge should be able to observe:

```text
Open QubitSphere
     ↓
See product value
     ↓
Open Bell State
     ↓
Learn concept
     ↓
Build circuit
     ↓
Run circuit
     ↓
See actual result
     ↓
Ask AI
     ↓
AI understands current circuit
     ↓
Modify circuit
     ↓
Result changes
     ↓
AI explains change
```

This is the highest-priority product flow.

---

# 63. User Flow Priorities

When development time is limited:

### Priority 1

```text
Learn
→ Build
→ Run
→ Visualize
→ Ask
```

### Priority 2

```text
Modify
→ Run Again
→ Ask Again
```

### Priority 3

```text
Practice
→ Assess
→ Progress
```

### Priority 4

Additional navigation and convenience flows.

---

# 64. Flow Design Rules

Every important user flow should:

1. Have a clear starting point.
2. Have a clear goal.
3. Have a clear primary action.
4. Preserve relevant context.
5. Provide feedback after important actions.
6. Handle errors gracefully.
7. Avoid unnecessary navigation.
8. Avoid unnecessary forms.
9. Keep the learner focused on the learning task.

---

# 65. Context Preservation

When the learner moves between:

```text
Lesson
→ Circuit Lab
→ AI Tutor
```

the following should remain available where relevant:

```text
Current Lesson
Current Concept
Current Circuit
Current Circuit IR
Current Simulation Result
```

The learner should not need to re-enter this information manually.

---

# 66. Navigation Recovery

If the learner navigates backward:

```text
Circuit Lab
   ↓
Back
   ↓
Lesson
```

the lesson should remain at the appropriate activity or position where practical.

Do not unnecessarily reset the learner's work.

---

# 67. Unsaved Work

If the learner attempts to leave Circuit Lab with unsaved changes, the product may show:

```text
You have unsaved changes.

Leave without saving?
```

Options:

```text
Save
Discard
Cancel
```

This can be implemented if needed for the MVP.

---

# 68. Mobile User Flow

On mobile, the learning flow remains:

```text
Learn
 ↓
Circuit
 ↓
Run
 ↓
Results
 ↓
AI
```

but the layout may stack vertically.

The learner should not lose access to the primary actions.

---

# 69. Accessibility User Flow

Every major flow should be usable with keyboard navigation where practical.

Important actions such as:

```text
Run
Save
Ask AI
Submit
Next
Back
```

must have accessible controls.

---

# 70. User Flow Definition of Done

The user-flow system is considered implemented when the following core journeys are possible:

## Journey A — Learn

```text
Dashboard
→ Lesson
→ Concept
```

## Journey B — Experiment

```text
Lesson
→ Circuit Lab
→ Build
→ Run
→ Results
```

## Journey C — Ask

```text
Results
→ AI Tutor
→ Contextual Explanation
```

## Journey D — Experiment Again

```text
Modify Circuit
→ Run Again
→ New Result
→ Updated AI Explanation
```

## Journey E — Practice

```text
Practice
→ Circuit Challenge
→ Submit
→ Feedback
```

## Journey F — Assess

```text
Assessment
→ Questions
→ Submit
→ Score
```

## Journey G — Progress

```text
Activity
→ Progress Update
→ Recommendation
```

---

# 71. End-to-End MVP Flow

The entire QubitSphere MVP can be represented as:

```text
                         LANDING
                            │
                            ↓
                        DASHBOARD
                            │
                            ↓
                          LEARN
                            │
                            ↓
                         LESSON
                            │
                            ↓
                     CONCEPT EXPLANATION
                            │
                            ↓
                       CIRCUIT LAB
                            │
                            ↓
                          BUILD
                            │
                            ↓
                        VALIDATE
                            │
                            ↓
                           RUN
                            │
                            ↓
                    SIMULATION RESULT
                            │
                            ↓
                       VISUALIZE
                            │
                            ↓
                         ASK AI
                            │
                            ↓
                      EXPLANATION
                            │
                            ↓
                       MODIFY
                            │
                            ↓
                        RUN AGAIN
                            │
                            ↓
                     COMPARE RESULT
                            │
                            ↓
                        PRACTICE
                            │
                            ↓
                       ASSESSMENT
                            │
                            ↓
                        PROGRESS
                            │
                            ↓
                      NEXT STEP
```

---

# 72. Final User Flow Principle

The most important QubitSphere user-flow principle is:

> **The learner should move naturally from understanding a quantum concept to experimenting with it, observing the result, asking why, and applying that understanding in practice.**

The product should feel like one continuous learning journey:

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

The final goal is not to make the learner navigate many features.

The goal is to make the learner feel that every feature exists to help answer one question:

> **"I learned this quantum concept—but can I actually understand and use it?"**
