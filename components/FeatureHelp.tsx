const defs: Record<string, string> = {
  "Net Income to Stockholder's Equity":
    "Return on Equity (ROE) — profit relative to shareholder equity.",
  "Net Value Growth Rate":
    "Change in net worth (Assets - Liabilities) vs. prior year.",
  "Persistent EPS in the Last Four Seasons":
    "Average EPS across the last four quarters.",
  "Borrowing dependency":
    "Total Liabilities / Total Assets.",
  "Per Share Net profit before tax (Yuan ¥)":
    "Pretax income per outstanding share.",
  "Total debt/Total net worth":
    "Leverage of total debt relative to net worth.",
  "Net Value Per Share (A)":
    "(Assets - Liabilities) per share.",
  "Net Income to Total Assets":
    "Return on Assets (ROA).",
  "Degree of Financial Leverage (DFL)":
    "Sensitivity of earnings to operating income.",
  "Interest Expense Ratio":
    "Interest Expense / Total Revenue.",
};

export default function FeatureHelp() {
  return (
    <div className="rounded-2xl p-6 bg-[color:var(--card)] shadow-lg">
      <div className="text-sm text-[color:var(--muted)]">Feature Glossary</div>
      <ul className="mt-4 space-y-3">
        {Object.entries(defs).map(([k, v]) => (
          <li key={k}>
            <div className="font-medium">{k}</div>
            <div className="text-sm text-[color:var(--muted)]">{v}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
