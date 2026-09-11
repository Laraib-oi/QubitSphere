type MeasurementHistogramProps = {
  counts: Record<string, number>;
};

export function MeasurementHistogram({ counts }: MeasurementHistogramProps) {
  const entries = Object.entries(counts);

  if (!entries.length) {
    return <p className="muted-copy">No measured outcomes were returned.</p>;
  }

  const maxCount = Math.max(...entries.map(([, count]) => count), 0);

  return (
    <ol className="measurement-list" aria-label="Observed measurement counts">
      {entries.map(([state, count]) => {
        const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

        return (
          <li
            className="measurement-row"
            key={state}
            aria-label={`${state}: ${count} observed shots`}
          >
            <code>{state}</code>
            <div className="measurement-bar-track" aria-hidden="true">
              <span
                className="measurement-bar"
                style={{ width: `${barWidth}%` }}
              />
            </div>
            <strong>{count}</strong>
          </li>
        );
      })}
    </ol>
  );
}
