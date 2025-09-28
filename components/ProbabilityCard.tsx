export default function ProbabilityCard({ p }: { p: number }) {
  const pct = Math.round(p * 1000) / 10; // 0.1% precision
  let color = "bg-emerald-600";
  if (p >= 0.75) color = "bg-red-600";
  else if (p >= 0.5) color = "bg-orange-600";
  else if (p >= 0.3) color = "bg-amber-600";
  return (
    <div className="rounded-2xl p-6 bg-[color:var(--card)] shadow-lg">
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Bankruptcy Probability</span>
          <span className="text-4xl font-semibold text-emerald-400">{pct}%</span>
        </div>
      </div>

      <div className="mt-4 text-xs text-[color:var(--muted)]">
        This is a statistical estimate based on 10 financial ratios. Not investment advice.
      </div>
    </div>
  );
}
