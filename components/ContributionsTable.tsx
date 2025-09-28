type Props = { rows: [string, number][] };

export default function ContributionsTable({ rows }: Props) {
  if (!rows?.length) {
    return (
      <div className="rounded-2xl p-6 bg-[color:var(--card)] shadow-lg">
        <div className="text-sm text-[color:var(--muted)]">Top Drivers</div>
        <div className="mt-4 text-xs text-[color:var(--muted)]">
          SHAP explanation unavailable for this prediction.
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl p-6 bg-[color:var(--card)] shadow-lg">
      <div className="text-sm text-[color:var(--muted)]">Top Drivers (by |SHAP|)</div>
      <table className="mt-4 w-full text-sm">
        <thead className="text-[color:var(--muted)]">
          <tr>
            <th className="text-left font-medium py-2">Feature</th>
            <th className="text-right font-medium py-2">Impact</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, val]) => (
            <tr key={name} className="border-t border-white/10">
              <td className="py-2">{name}</td>
              <td className="py-2 text-right">{val.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
