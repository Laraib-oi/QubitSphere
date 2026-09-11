type ProbabilityBarsProps = {
  probabilities: Record<string, number>;
};

function formatPercentage(probability: number): string {
  return `${(probability * 100).toFixed(2).replace(/\.?0+$/, "")}%`;
}

export function ProbabilityBars({ probabilities }: ProbabilityBarsProps) {
  const entries = Object.entries(probabilities);

  if (!entries.length) {
    return <p className="muted-copy">No probabilities were returned.</p>;
  }

  return (
    <ol className="probability-list" aria-label="Simulator probabilities">
      {entries.map(([state, probability]) => {
        const percentage = probability * 100;
        const barWidth = Math.min(100, Math.max(0, percentage));

        return (
          <li
            className="probability-row"
            key={state}
            aria-label={`${state}: ${formatPercentage(probability)}`}
          >
            <code>{state}</code>
            <div className="probability-bar-track" aria-hidden="true">
              <span
                className="probability-bar"
                style={{ width: `${barWidth}%` }}
              />
            </div>
            <strong>{formatPercentage(probability)}</strong>
          </li>
        );
      })}
    </ol>
  );
}
