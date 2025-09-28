// app/features/page.tsx
const FEATURE_DEFINITIONS: Record<string, string> = {
  "Net Income to Stockholder's Equity":
    "Also known as Return on Equity (ROE). Measures a company's profitability by revealing how much profit a company generates with the money shareholders have invested.",
  "Net Value Growth Rate":
    "Shows the percentage increase or decrease in a company's net worth (Assets - Liabilities) from one period to the next. A higher rate indicates a growing company.",
  "Persistent EPS in the Last Four Seasons":
    "The average Earnings Per Share (EPS) over the past four quarters. It indicates the consistency and stability of a company's profitability.",
  "Borrowing dependency":
    "Calculated as Total Liabilities / Total Assets. This ratio shows the extent to which a company relies on debt to finance its assets. A high ratio can indicate high risk.",
  "Per Share Net profit before tax":
    "The company's profit before taxes, divided by the number of outstanding shares. It shows profitability on a per-share basis.",
  "Total debt/Total net worth":
    "A leverage ratio that compares a company's total debt to its total net worth. It measures how much debt is used to finance the company's assets relative to the value owned by shareholders.",
  "Net Value Per Share (A)":
    "The company's net worth (Assets - Liabilities) divided by the number of outstanding shares. It represents the intrinsic value of a single share.",
  "Net Income to Total Assets":
    "Also known as Return on Assets (ROA). This ratio indicates how profitable a company is in relation to its total assets. It measures how efficiently a company is using its assets to generate earnings.",
  "Degree of Financial Leverage (DFL)":
    "Measures the sensitivity of a company's earnings per share to fluctuations in its operating income, as a result of changes in its capital structure. A high DFL means a small change in operating income will lead to a large change in earnings.",
  "Interest Expense Ratio":
    "Calculated as Interest Expense / Total Revenue. This ratio shows the proportion of a company's revenue that is used to pay the interest on its debt."
};

export default function FeatureGuidePage() {
  return (
    <section className="container mx-auto px-4 lg:px-8">
      <h1 className="text-3xl font-bold">Feature Guide</h1>
      <p className="mt-2 text-gray-400">
        Definitions for the top 10 financial ratios used by the model.
      </p>

      <div className="mt-8 space-y-6">
        {Object.entries(FEATURE_DEFINITIONS).map(([name, desc]) => (
          <div key={name} className="border-b border-white/10 pb-6">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="mt-2 text-gray-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
