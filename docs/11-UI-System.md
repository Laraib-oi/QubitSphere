# QubitSphere — UI System

## 1. Purpose

This document defines the official user-interface system for QubitSphere.

It establishes the visual language, layout principles, navigation structure, reusable UI patterns, interaction rules, responsive behavior, and primary application screens.

The purpose is to ensure that QubitSphere feels like one coherent product even when different parts of the interface are implemented at different times or by different development agents.

Codex, Claude, and other development tools should use this document when creating or modifying UI.

---

# 2. Product UI Direction

QubitSphere should feel like:

> **A modern, premium scientific learning environment.**

The interface should communicate:

* Quantum technology
* Education
* Experimentation
* Precision
* Intelligence
* Trust
* Exploration

The design should feel technically sophisticated without becoming difficult for beginners to understand.

---

# 3. Design Philosophy

The QubitSphere interface follows five principles:

## 3.1 Clarity

The learner should always understand:

* Where they are
* What they are learning
* What they can do next
* What happened after an action

---

## 3.2 Progressive Complexity

Beginners should not be overwhelmed by advanced quantum concepts or controls.

The interface should reveal complexity gradually.

Example:

```text
Basic concept
    ↓
Simple circuit
    ↓
Run
    ↓
Basic result
    ↓
Optional deeper inspection
```

---

## 3.3 Action Over Decoration

Visual design should support learning.

Do not add:

* Decorative animations with no purpose
* Excessive 3D effects
* Unnecessary glowing elements
* Large amounts of abstract quantum imagery

Interaction and understanding are more important than decoration.

---

## 3.4 Scientific Credibility

Quantum information should be presented accurately.

Visualizations should have clear labels and should not imply unsupported scientific meaning.

---

## 3.5 Consistency

Similar actions should look and behave similarly throughout QubitSphere.

For example:

```text
Primary action
→ same visual treatment

Secondary action
→ same visual treatment

Warning
→ same treatment

Success
→ same treatment
```

---

# 4. Brand Identity

## 4.1 Product Name

The product name is:

**QubitSphere**

Use this exact spelling and capitalization throughout the application.

Do not use alternative names such as:

* Qubit Sphere
* QuantumSphere
* Qubit Sphere AI
* Quantum Tutor

unless they are explicitly part of copy or a future product feature.

---

# 5. Visual Personality

QubitSphere should feel:

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

It should not feel:

```text
Childish
Overly corporate
Generic SaaS
Gaming-heavy
Visually chaotic
Overly futuristic
```

---

# 6. Color System

The UI should use a restrained scientific color palette.

Primary colors should be based around:

* Deep blue
* Blue
* Cyan/teal accents
* Neutral white
* Cool gray
* Dark navy for dark surfaces

Accent colors should be used intentionally.

Do not use many unrelated colors simply to make the interface look more "colorful."

---

# 7. Semantic Colors

Semantic colors should communicate state consistently.

### Success

Used for:

* Correct answers
* Completed lessons
* Successful circuit execution
* Passed assessments

### Warning

Used for:

* Potential circuit issues
* Incomplete learning tasks
* Non-blocking warnings

### Error

Used for:

* Invalid circuit
* Failed API request
* Simulation failure
* Invalid input

### Informational

Used for:

* Explanations
* Tips
* Guidance
* Context information

Semantic colors should remain visually distinct from the primary brand color.

---

# 8. Typography

The typography system should prioritize readability.

Recommended type hierarchy:

```text
Display
↓
Page Title
↓
Section Heading
↓
Card Heading
↓
Body
↓
Secondary Text
↓
Caption
```

Use a clean modern sans-serif family.

The implementation may use:

* Inter
* Geist
* Another equivalent high-quality sans-serif

The project should use a small number of font families.

Do not mix many unrelated fonts.

---

# 9. Mathematical Typography

Quantum notation should be visually distinguishable from ordinary prose.

Examples include:

```text
|0>
|1>
|ψ>
H
CX
α|0> + β|1>
```

Mathematical notation should remain readable on both desktop and mobile.

Where appropriate, mathematical expressions may use a dedicated math-rendering solution.

The MVP does not need a complex mathematical typesetting system unless the curriculum requires it.

---

# 10. Spacing

Use a consistent spacing scale.

The interface should generally follow a small set of spacing values instead of arbitrary margins everywhere.

Prioritize:

* Generous section spacing
* Clear card padding
* Consistent gaps between controls
* Comfortable reading width
* Sufficient spacing around circuit elements

Avoid cramped interfaces.

---

# 11. Border Radius

Use a consistent radius system.

Recommended hierarchy:

```text
Small
→ Inputs / compact controls

Medium
→ Buttons / cards

Large
→ Major panels / modal surfaces
```

Do not give every component a completely different shape.

---

# 12. Shadows and Depth

Use subtle elevation.

Prefer:

* Light borders
* Soft shadows
* Clear surface separation

Avoid extreme shadows or excessive glassmorphism.

The application should feel polished without looking ornamental.

---

# 13. Icons

Use **Lucide** icons consistently.

Icons should:

* Support meaning
* Be visually consistent
* Have accessible labels when needed
* Avoid replacing important text unnecessarily

Do not introduce multiple icon libraries without a documented reason.

---

# 14. Primary Navigation

The primary application navigation should provide access to the main product areas.

Recommended structure:

```text
QubitSphere
│
├── Dashboard
├── Learn
├── Circuit Lab
├── Algorithms
├── Practice
└── Progress
```

The exact placement may differ between desktop and mobile.

---

# 15. Navigation Principles

Navigation should make the primary learning loop easy to follow.

The learner should be able to move naturally between:

```text
Learn
  ↓
Circuit Lab
  ↓
Results
  ↓
AI Tutor
  ↓
Practice
  ↓
Progress
```

Important actions should not be hidden behind unnecessary menus.

---

# 16. Desktop Navigation

A desktop layout may use:

```text
┌─────────────────────────────────────────────────────────────┐
│ QubitSphere     Dashboard  Learn  Circuit Lab  Practice   │
│                                                Progress    │
└─────────────────────────────────────────────────────────────┘
```

A left sidebar may also be used for application-heavy areas.

The chosen pattern should remain consistent across the application.

---

# 17. Mobile Navigation

On mobile, the navigation should collapse into a compact menu.

Minimum requirement:

* Product identity
* Menu trigger
* Accessible navigation
* Clear current location

The Circuit Lab requires special responsive attention because quantum circuits are inherently spatial.

---

# 18. Application Shell

The primary application shell should provide:

```text
Global Navigation
       ↓
Main Content Area
       ↓
Optional Context Panel
```

Example:

```text
┌─────────────────────────────────────────────┐
│ Navigation                                  │
├──────────────┬──────────────────────────────┤
│              │                              │
│ Sidebar      │ Main Content                 │
│              │                              │
│              │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

---

# 19. Landing Page

The landing page introduces QubitSphere.

Its job is to explain:

1. What QubitSphere is
2. Who it is for
3. What problem it solves
4. How the learning loop works
5. What makes it different
6. How to start

A recommended structure:

```text
Hero
  ↓
Problem
  ↓
QubitSphere Solution
  ↓
Learning Loop
  ↓
Core Capabilities
  ↓
Circuit + AI Demonstration
  ↓
Why QubitSphere
  ↓
Call to Action
```

---

# 20. Hero Section

The hero should communicate the product immediately.

Recommended content hierarchy:

```text
QubitSphere

AI-powered interactive quantum learning

Learn quantum concepts.
Build circuits.
Run simulations.
Understand results with circuit-aware AI.

[Start Learning]
[Explore Circuit Lab]
```

Do not fill the hero with excessive text.

---

# 21. Dashboard

The dashboard is the learner's home after entering the application.

It should answer:

> "What should I do next?"

Recommended dashboard structure:

```text
┌─────────────────────────────────────────────────┐
│ Welcome back                                    │
│ Continue your quantum-learning journey         │
├─────────────────────────────────────────────────┤
│ Progress                                        │
├───────────────────────┬─────────────────────────┤
│ Continue Learning     │ Recommended Next Step   │
├───────────────────────┴─────────────────────────┤
│ Recent Activity                                 │
├─────────────────────────────────────────────────┤
│ Practice / Assessment                           │
└─────────────────────────────────────────────────┘
```

---

# 22. Dashboard Components

The MVP dashboard may include:

### Progress Card

Displays:

* Overall progress
* Current learning stage
* Completed lessons

### Continue Learning Card

Displays:

* Current lesson
* Completion percentage
* Continue action

### Recommendation Card

Displays:

* Recommended next activity
* Reason for recommendation

### Recent Activity

Displays:

* Recent lesson
* Recent practice
* Recent circuit activity

### Quick Actions

Examples:

```text
Start Lesson
Open Circuit Lab
Practice
Review Progress
```

---

# 23. Learn Area

The Learn area contains the structured curriculum.

Recommended layout:

```text
Learn
│
├── Fundamentals
│   ├── Qubits
│   ├── Quantum States
│   ├── Superposition
│   ├── Quantum Gates
│   ├── Measurement
│   └── Entanglement
│
└── Algorithms
    ├── Bell State
    ├── Deutsch-Jozsa
    └── Grover
```

---

# 24. Lesson Page

A lesson page should combine explanation with interaction.

Recommended structure:

```text
Lesson Header
      ↓
Learning Objectives
      ↓
Concept Explanation
      ↓
Example
      ↓
Interactive Circuit
      ↓
Simulation / Visualization
      ↓
AI Tutor
      ↓
Practice
      ↓
Assessment
      ↓
Next Step
```

Not every lesson must include every section, but important concepts should connect naturally to an interactive activity.

---

# 25. Lesson Header

The lesson header may show:

* Lesson title
* Short description
* Difficulty
* Estimated time
* Progress
* Prerequisites when useful

Example:

```text
Understanding Superposition
Beginner · 15 min

Learn what superposition means and see how
the Hadamard gate changes a qubit.
```

---

# 26. Learning Objective Component

Learning objectives should be visible near the beginning of the lesson.

Example:

```text
By the end of this lesson, you will be able to:

✓ Explain superposition
✓ Identify the role of H
✓ Interpret simple measurement probabilities
```

This gives the learner a clear target.

---

# 27. Concept Cards

Concept cards may be used for important ideas.

Example:

```text
┌────────────────────────────┐
│ SUPERPOSITION              │
│                            │
│ A qubit can be represented │
│ as a combination of basis  │
│ states.                    │
│                            │
│ Explore →                  │
└────────────────────────────┘
```

Cards should remain concise.

---

# 28. Circuit Lab

The Circuit Lab is one of the most important screens in QubitSphere.

It should prioritize:

* Circuit visibility
* Easy gate placement
* Clear qubit lines
* Clear operation ordering
* Easy execution
* Easy result inspection
* Easy AI access

---

# 29. Circuit Lab Layout

Recommended desktop structure:

```text
┌───────────────────────────────────────────────────────┐
│ Circuit Lab                                           │
├────────────┬───────────────────────────┬──────────────┤
│ Gate       │                           │ Properties   │
│ Palette    │      Circuit Canvas       │ / Inspector  │
│            │                           │              │
│ H          │ q0 ── H ──●──── M        │ Selected     │
│ X          │          │                │ Gate         │
│ Z          │ q1 ──────X──── M          │              │
│ CX         │                           │              │
│ RX         │                           │              │
├────────────┴───────────────────────────┴──────────────┤
│ [Run Circuit] [Reset] [Save]              [Ask AI]    │
└───────────────────────────────────────────────────────┘
```

---

# 30. Circuit Lab Regions

The Circuit Lab should have four logical regions:

### Gate Palette

Available gates.

### Circuit Canvas

The visual circuit.

### Inspector

Details of the selected operation.

### Action Bar

Main controls such as:

* Run
* Reset
* Save
* Undo/Redo if implemented
* Ask AI

---

# 31. Circuit Canvas

The circuit canvas should clearly display:

* Qubit labels
* Wires
* Gate positions
* Controlled operations
* Measurements
* Operation ordering

Example:

```text
        Step 0    Step 1    Step 2

q0 ───────H────────●────────M
                   │
q1 ─────────────────X────────M
```

The visual representation should correspond to the Circuit IR.

---

# 32. Circuit Interaction

The learner should be able to:

* Select a gate
* Add a gate
* Remove a gate
* Modify supported gate parameters
* Select a control and target for controlled gates
* Run the circuit

The exact interaction model may use:

* Click-to-place
* Drag-and-drop
* Gate palette selection

The implementation should prioritize reliability over advanced gesture complexity.

---

# 33. Circuit Selection State

Selected gates should have a clear visual state.

The learner should immediately know:

> "This is the operation I am editing."

Selection must not rely on color alone.

Use additional cues such as:

* Border
* Highlight
* Inspector state
* Accessible labels

---

# 34. Circuit Errors

Circuit errors should be understandable.

Bad:

```text
ValidationError: index out of range
```

Better:

```text
This gate is targeting qubit 3, but your circuit only has
2 qubits.
```

Where possible, errors should identify:

* What is wrong
* Where it happened
* How the learner can fix it

---

# 35. Run Button

The Run Circuit action should be visually prominent.

When execution begins, show a clear state:

```text
Running…
```

After completion:

```text
Simulation Complete
```

If execution fails:

```text
Simulation Failed
```

The learner should not be left wondering whether the action worked.

---

# 36. Simulation Results Panel

Results should appear close to the circuit.

Recommended structure:

```text
Simulation Results

State
────────────────────────

Probabilities
00     50%
11     50%

Measurements
────────────────────────

00  ███████████████
11  ██████████████

Shots: 1024
Backend: Qiskit Aer
```

The data must come from the actual execution layer.

---

# 37. Result States

The results interface should support:

### Empty

```text
Run your circuit to see results.
```

### Running

```text
Running circuit…
```

### Success

Display results.

### Error

Display actionable error information.

---

# 38. Visualization System

QubitSphere visualizations should help answer:

> "What happened?"

rather than simply making the UI look impressive.

Priority visualizations:

1. Measurement histogram
2. Probability bars
3. State information
4. Circuit visualization
5. Bloch sphere when useful

---

# 39. Measurement Histogram

The measurement histogram should display basis states and observed counts.

Example:

```text
00  ██████████████████  502
11  ███████████████████ 522
```

Labels should remain readable.

---

# 40. Probability Display

Probability displays should communicate values clearly.

Example:

```text
00 ───────────── 50%
01 ──             1%
10 ──             1%
11 ───────────── 48%
```

Exact values should come from the simulation result.

---

# 41. AI Tutor Interface

The AI Tutor should feel integrated into the application rather than looking like a separate generic chatbot.

Possible layout:

```text
┌─────────────────────────────────────┐
│ QubitSphere Tutor                   │
├─────────────────────────────────────┤
│                                     │
│ Why did I get 00 and 11?            │
│                                     │
│ AI                                  │
│ Your H gate creates...              │
│                                     │
├─────────────────────────────────────┤
│ Ask about this circuit...       ↑   │
└─────────────────────────────────────┘
```

---

# 42. AI Context Indicator

Because circuit-aware tutoring is a key differentiator, the interface may indicate what context the tutor can see.

Example:

```text
Tutor context

✓ Current lesson
✓ Current circuit
✓ Simulation result
✓ Your progress
```

This reinforces the product's core differentiator.

---

# 43. AI Response Types

The UI may visually distinguish:

### Explanation

Normal tutor response.

### Hint

Guided help.

### Warning

Potential issue.

### Next Step

Suggested action.

Do not overcomplicate the presentation.

---

# 44. AI Loading State

While waiting for the AI:

```text
QubitSphere Tutor is thinking…
```

The interface should remain interactive where appropriate.

A clear loading state is required.

---

# 45. AI Error State

If the AI service fails:

```text
The tutor is temporarily unavailable.

You can still continue learning, run your circuit,
and inspect the simulation results.
```

The application must remain useful.

---

# 46. Practice Interface

Practice should feel like an extension of learning rather than a separate exam website.

Recommended structure:

```text
Challenge
──────────────

Build a Bell State.

Objective:
Create a two-qubit entangled state.

[Open Circuit Lab]

Hint
[Show Hint]

Submit
```

---

# 47. Assessment Interface

Assessment should have a clear distinction from ordinary learning assistance.

Example:

```text
Superposition Check

Question 2 of 5

What does the H gate do to |0>?

○ Leaves it unchanged
○ Creates a superposition
○ Measures the qubit
○ Converts it directly to |1>

[Previous]                    [Next]
```

---

# 48. Assessment Result

After submission:

```text
Assessment Complete

Score
80%

Status
Passed

Recommended next step
Practice entanglement
```

The result should be clear without excessive gamification.

---

# 49. Progress Page

The Progress page should answer:

> "How am I doing?"

Recommended sections:

```text
Overall Progress
       ↓
Concept Mastery
       ↓
Completed Lessons
       ↓
Practice Performance
       ↓
Assessment Performance
       ↓
Recommended Next Steps
```

---

# 50. Progress Visualization

Useful visualizations include:

* Progress percentage
* Concept mastery bars
* Lesson completion
* Practice scores
* Assessment scores

Avoid turning the page into an analytics dashboard overloaded with charts.

---

# 51. Algorithm Pages

The Algorithms area should provide quick access to:

```text
Bell State
Deutsch-Jozsa
Grover
```

Each algorithm card may show:

* Difficulty
* Concepts used
* Estimated learning time
* Start action

---

# 52. Algorithm Detail Page

Recommended structure:

```text
Algorithm
    ↓
What problem does it solve?
    ↓
Core idea
    ↓
Circuit
    ↓
Run
    ↓
Visualize
    ↓
Ask AI
    ↓
Practice
```

The learner should be able to move from theory to executable demonstration.

---

# 53. Cards

Cards should be used to group related information.

Good card uses:

* Lessons
* Recommendations
* Progress
* Practice
* Assessments
* Algorithms

Cards should not be used for every paragraph.

---

# 54. Buttons

The button system should have a small number of variants.

Recommended:

```text
Primary
Secondary
Ghost
Destructive
```

Examples:

### Primary

```text
Run Circuit
Start Learning
Submit
```

### Secondary

```text
Open Lesson
View Details
```

### Ghost

```text
Back
Cancel
More
```

### Destructive

```text
Delete Circuit
```

---

# 55. Button Rules

Buttons should:

* Describe the action clearly
* Use consistent sizing
* Have visible interaction states
* Have accessible labels
* Avoid vague labels such as "Click Here"

Prefer:

```text
Run Circuit
```

over:

```text
Go
```

---

# 56. Inputs

Inputs should have:

* Labels
* Clear placeholder text where useful
* Validation messages
* Focus states
* Error states

Do not rely only on placeholder text for important labels.

---

# 57. Forms

Forms should be:

* Short
* Structured
* Easy to scan
* Validated before submission when practical

Long forms should be broken into logical sections.

---

# 58. Tooltips

Tooltips may explain less familiar quantum or interface controls.

Examples:

```text
Hadamard
"Creates an equal superposition from |0> or |1>."
```

```text
Shots
"Number of circuit executions used to sample measurements."
```

Tooltips should supplement labels rather than replace them.

---

# 59. Modals

Use modals only when the learner needs to make a focused decision.

Good uses:

* Delete confirmation
* Circuit save dialog
* Advanced gate settings

Avoid putting entire workflows inside deeply nested modals.

---

# 60. Notifications

Notifications should communicate:

* Save success
* Simulation completion
* Errors
* Assessment submission

Keep notifications short.

Example:

```text
Circuit saved.
```

rather than a long paragraph.

---

# 61. Empty States

Every important dynamic section should have an intentional empty state.

Example:

```text
No saved circuits yet.

Build your first circuit in Circuit Lab.

[Open Circuit Lab]
```

Empty states should tell the learner what to do next.

---

# 62. Loading States

Loading states should be visible for:

* Lessons
* Dashboard data
* Circuit execution
* AI responses
* Progress
* Assessments

Use skeletons where appropriate.

Avoid long blank screens.

---

# 63. Error States

Error states should answer three questions:

1. What happened?
2. Does it affect me?
3. What can I do next?

Example:

```text
We couldn't run this circuit.

The selected gate configuration is invalid.

Fix the highlighted gate and try again.
```

---

# 64. Accessibility

Accessibility is required for the MVP.

The interface should provide:

* Keyboard navigation
* Visible focus states
* Semantic HTML
* Accessible labels
* Sufficient text contrast
* Appropriate button sizes
* Non-color-only status indicators
* Screen-reader-friendly controls where practical

The circuit canvas requires particular attention.

---

# 65. Circuit Accessibility

Because the circuit is highly visual, it should have an accessible representation.

At minimum:

* Qubit labels should be textual.
* Gate names should be accessible.
* Selected operations should have descriptive labels.
* Important result information should also be available as text.

Example:

```text
Qubit 0:
Hadamard at step 0
Controlled-X with qubit 1 at step 1
Measurement at step 2
```

---

# 66. Responsive Design

QubitSphere should support:

* Desktop
* Laptop
* Tablet
* Mobile

The main learning experience should remain usable at smaller sizes.

---

# 67. Circuit Lab on Small Screens

The Circuit Lab may require horizontal scrolling when the circuit becomes wider than the viewport.

Do not compress the circuit until gates become unreadable.

Prefer:

```text
Scrollable Circuit Canvas
```

over:

```text
Tiny Circuit
```

---

# 68. Responsive Layout Rule

The layout may change structurally between breakpoints.

For example:

Desktop:

```text
Gate Palette | Circuit | Inspector
```

Mobile:

```text
Circuit
   ↓
Selected Gate / Inspector
   ↓
Gate Controls
```

The goal is usability, not strict visual parity.

---

# 69. Dark Mode

Dark mode may be supported if implementation time allows.

If implemented, it must be a deliberate theme rather than simply inverting colors.

Both themes should maintain:

* Readability
* Contrast
* Scientific visualization clarity
* Consistent semantic colors

---

# 70. Motion and Animation

Animations should be subtle and purposeful.

Useful animations include:

* Page transitions
* Panel opening
* Circuit gate placement
* Simulation state transitions
* Progress updates
* AI response appearance

Avoid:

* Constant background motion
* Excessive particle effects
* Long transition delays
* Distracting 3D animations

The learner should remain focused on the task.

---

# 71. Circuit Execution Animation

A future enhancement may visually indicate circuit execution.

For example:

```text
q0 ── H ──●────M
           │
q1 ────────X────M
       ↑
    Executing
```

This is optional for the MVP.

Correct execution feedback is more important than animation.

---

# 72. Information Hierarchy

Every screen should have an obvious hierarchy.

Recommended pattern:

```text
Page Purpose
      ↓
Primary Information
      ↓
Primary Action
      ↓
Supporting Information
      ↓
Secondary Actions
```

Avoid presenting every element with equal visual weight.

---

# 73. Learning-Focused Layout Rule

When theory and interactive components appear together, the layout should make their relationship obvious.

Example:

```text
Concept Explanation
        ↓
Example Circuit
        ↓
Run
        ↓
Result
        ↓
Explanation
```

Do not place unrelated components next to one another simply to fill space.

---

# 74. AI + Circuit Relationship

The UI should make it easy to ask the AI about the current circuit.

Possible actions:

```text
[Ask AI About This Circuit]
```

or:

```text
[Explain This Gate]
```

or:

```text
[Why This Result?]
```

These contextual actions reinforce QubitSphere's primary differentiator.

---

# 75. Result-to-AI Flow

The intended visual relationship is:

```text
Circuit
   ↓
Simulation Results
   ↓
Ask AI
   ↓
Explanation
```

The learner should not need to manually copy simulation data into a chatbot.

---

# 76. Visual Trust

When information comes from the simulator, make that relationship clear.

Example:

```text
Simulation Result
Backend: Qiskit Aer
Shots: 1024
```

This can help differentiate verified runtime information from AI-generated explanation.

---

# 77. AI Trust

The AI interface should make it clear that the AI is an assistant.

Possible helper text:

```text
Tutor uses your current lesson, circuit, and simulation results
to explain what is happening.
```

This reinforces the circuit-aware architecture.

---

# 78. Design Tokens

The implementation should centralize design tokens where practical.

Token categories include:

```text
colors
spacing
radius
typography
shadows
breakpoints
```

Avoid scattering hard-coded design decisions throughout unrelated files.

---

# 79. Reusable Component Strategy

Create reusable components for repeated UI patterns.

Potential components include:

```text
Button
Card
Badge
ProgressBar
LessonCard
AlgorithmCard
CircuitCanvas
GatePalette
Gate
SimulationResults
Histogram
ProbabilityChart
TutorPanel
ChatMessage
PracticeCard
AssessmentQuestion
ProgressCard
```

The exact component list may evolve during implementation.

---

# 80. Component Rules

Reusable components should:

* Have clear responsibilities
* Avoid unnecessary internal complexity
* Accept typed props
* Be reusable across related screens
* Avoid embedding unrelated business logic

For example:

```text
SimulationResults
```

should display results.

The quantum simulator itself should not live inside the UI component.

---

# 81. UI vs Business Logic

The frontend should separate presentation from business/data logic.

Conceptually:

```text
UI Component
     ↓
Frontend Service / API Client
     ↓
Backend API
```

Do not place:

* Quantum simulation
* Database queries
* API keys
* AI provider secrets

inside visual components.

---

# 82. State Representation

UI state should distinguish between:

```text
Loading
Success
Error
Empty
```

For example, simulation results should not be represented only as:

```text
result = null
```

when the UI needs to distinguish between:

* Not run yet
* Currently running
* Failed
* Successfully completed

---

# 83. Design System Source of Truth

This document is the source of truth for:

* Visual direction
* Navigation
* Component behavior
* Major screen structure
* Interaction principles
* Accessibility requirements

The exact visual implementation may change during development, but major deviations should be intentional.

---

# 84. UI Development Rules for Codex and Claude

Codex and Claude should follow these rules:

### Rule 1

Reuse existing components before creating new ones.

### Rule 2

Do not create a new design language for each page.

### Rule 3

Keep visual hierarchy consistent.

### Rule 4

Do not add decorative effects without a clear product purpose.

### Rule 5

Do not replace functional interactions with mock UI.

### Rule 6

Use actual API data where a feature is supposed to work.

### Rule 7

Do not fabricate simulation results for visual demonstrations.

### Rule 8

Keep the Circuit Lab usable before adding visual polish.

### Rule 9

Maintain responsive behavior.

### Rule 10

Preserve accessibility.

### Rule 11

Avoid excessive animations.

### Rule 12

Do not duplicate components merely because a similar component already exists.

### Rule 13

When creating a new major component, check whether it belongs in the shared component system.

### Rule 14

Do not redesign unrelated screens while implementing one feature.

---

# 85. MVP Screen Map

The initial QubitSphere application should contain:

```text
/
├── Landing
│
├── dashboard
│
├── learn
│   └── [lesson]
│
├── circuit-lab
│
├── algorithms
│   └── [algorithm]
│
├── practice
│
└── progress
```

The exact route naming may be adjusted during implementation, but the information architecture should remain recognizable.

---

# 86. Primary CTA Hierarchy

The product should have a clear primary action on each screen.

Examples:

### Landing

```text
Start Learning
```

### Dashboard

```text
Continue Learning
```

### Lesson

```text
Try the Circuit
```

### Circuit Lab

```text
Run Circuit
```

### Practice

```text
Start Challenge
```

### Assessment

```text
Submit Assessment
```

### Progress

```text
Continue Learning
```

---

# 87. Main Demo UI

The primary hackathon demo should visually support:

```text
Lesson
  ↓
Circuit Lab
  ↓
Simulation Results
  ↓
AI Tutor
  ↓
Practice
  ↓
Assessment
  ↓
Progress
```

The transition between these states should feel like one product.

---

# 88. Bell State Demo Layout

The Bell State demonstration should be especially polished.

Recommended structure:

```text
Bell State
──────────────────────────────────────────

Why does entanglement occur?

[Concept Explanation]

Circuit
──────────────────────────────────────────

q0 ── H ──●── M
          │
q1 ───────X── M

[Run Circuit]

Simulation Results
──────────────────────────────────────────

00  50%
11  50%

[Why This Result?]

QubitSphere Tutor
──────────────────────────────────────────

Explanation...

[Try a Challenge]
```

This should be the primary visual story for the hackathon.

---

# 89. UI Definition of Done

The UI MVP is complete when:

## General

* [ ] QubitSphere has a consistent visual identity.
* [ ] Navigation works.
* [ ] Major pages have clear purposes.
* [ ] Responsive layouts work.
* [ ] Important states have loading/error/empty handling.

## Learning

* [ ] Learner can browse lessons.
* [ ] Learner can open a lesson.
* [ ] Lesson content is readable.
* [ ] Learning objectives are visible.
* [ ] Lessons connect to interactive activities.

## Circuit Lab

* [ ] Circuit is visually understandable.
* [ ] Gates can be added.
* [ ] Gates can be removed.
* [ ] Gate selection works.
* [ ] Circuit can be run.
* [ ] Validation errors are understandable.

## Results

* [ ] Simulation results are displayed.
* [ ] Histogram/probability visualization works.
* [ ] State information is understandable.
* [ ] Results are clearly associated with the current execution.

## AI

* [ ] AI Tutor is integrated into the application.
* [ ] Learner can ask about the current circuit.
* [ ] AI context is reflected in the interface.
* [ ] Loading/error states work.
* [ ] AI does not replace verified simulation results.

## Practice and Assessment

* [ ] Practice interface works.
* [ ] Assessment interface works.
* [ ] Results are understandable.

## Progress

* [ ] Progress is visible.
* [ ] Completed activity is reflected.
* [ ] Recommended next step is understandable.

---

# 90. Performance Principles

The interface should remain responsive.

Prioritize:

* Fast initial load
* Efficient component rendering
* Lazy loading for heavy visualizations where appropriate
* Avoiding unnecessary client-side computation
* Keeping large circuit rendering manageable

The MVP does not need extreme performance optimization, but obvious UI lag should be addressed.

---

# 91. Final UI Principle

The QubitSphere interface should make the learning loop visually obvious:

```text
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

Every major screen should contribute to this loop.

The final design principle is:

> **QubitSphere should feel less like a collection of pages and more like a continuous quantum-learning workspace.**
