type BellStateLessonProps = {
  isComplete: boolean;
  onComplete: () => void;
};

export function BellStateLesson({ isComplete, onComplete }: BellStateLessonProps) {
  return (
    <section className="lesson-section panel" id="learn" aria-labelledby="lesson-heading">
      <div className="lesson-copy">
        <p className="eyebrow">Bell State lesson · Beginner · Five minutes</p>
        <h2 id="lesson-heading">Learn how one gate pair creates a shared result.</h2>
        <p>
          Start with two qubits at zero. H puts q0 into superposition, then CNOT applies
          an X on q1 when q0 is 1, creating correlation between the two qubits. The qubits are entangled: a measurement can be 00 or 11,
          but never the mismatched outcomes 01 or 10.
        </p>
      </div>

      <ol className="lesson-flow" aria-label="Bell State circuit sequence">
        <li>
          <span>H</span>
          <div>
            <strong>Superposition</strong>
            <small>Place H on q0.</small>
          </div>
        </li>
        <li>
          <span>CX</span>
          <div>
            <strong>Entanglement</strong>
            <small>Use q0 to control q1.</small>
          </div>
        </li>
        <li>
          <span>M</span>
          <div>
            <strong>Correlated outcomes</strong>
            <small>Observe 00 or 11.</small>
          </div>
        </li>
      </ol>

      <div className="lesson-actions">
        <button type="button" className="button button-primary" onClick={onComplete}>
          {isComplete ? "Lesson complete" : "Mark lesson complete"}
        </button>
        <a className="button button-secondary" href="#circuit-lab">
          Open Circuit Lab
        </a>
      </div>
    </section>
  );
}
