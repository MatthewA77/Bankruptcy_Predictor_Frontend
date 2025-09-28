// components/ContribBars.tsx
"use client";

import type { ExplainItem } from "@/lib/api";

function Bar({ item, max }: { item: ExplainItem; max: number }) {
  const pct = max > 0 ? Math.round((item.abs / max) * 100) : 0;
  const base =
    item.direction === "increase"
      ? "bg-rose-500/80"
      : "bg-emerald-500/80";

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm">
        <span className="truncate">{item.feature}</span>
        <span className="ml-2 text-gray-400">{item.value.toFixed(4)}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`${base} h-2`}
          style={{ width: `${pct}%` }}
          aria-label={`${item.feature} ${pct}%`}
        />
      </div>
    </div>
  );
}

export default function ContribBars({
  positive,
  negative,
}: {
  positive: ExplainItem[];
  negative: ExplainItem[];
}) {
  const maxAbs = Math.max(
    0,
    ...positive.map((i) => i.abs),
    ...negative.map((i) => i.abs)
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
        <div className="text-sm text-gray-400">Increase Bankruptcy Probability</div>
        <div className="mt-4">
          {positive.length ? (
            positive.map((it) => <Bar key={it.feature} item={it} max={maxAbs} />)
          ) : (
            <div className="text-sm text-gray-400">No positive contributors.</div>
          )}
        </div>
      </div>

      <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
        <div className="text-sm text-gray-400">Decrease Bankruptcy Probability</div>
        <div className="mt-4">
          {negative.length ? (
            negative.map((it) => <Bar key={it.feature} item={it} max={maxAbs} />)
          ) : (
            <div className="text-sm text-gray-400">No negative contributors.</div>
          )}
        </div>
      </div>
    </div>
  );
}
