// app/model/page.tsx
import Image from "next/image";

export default function ModelInfoPage() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center break-words">Model Information: Random Forest Classifier</h1>

      <h2 className="text-xl font-semibold mt-8">What is a Random Forest?</h2>
      <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
        A Random Forest is an <span className="font-bold">ensemble learning</span> method that builds
        many decision trees on random subsets of the training data and features. Each tree votes, and
        the forest takes the majority vote. This “bagging” approach reduces overfitting and generally
        yields a more stable model.
      </p>

      <h2 className="text-xl font-semibold mt-8">Dataset Used</h2>
      <div className="mt-2 text-gray-300 space-y-2">
        <p>
          The model was trained on the <span className="font-medium">Taiwanese Economic Journal (TEJ)</span> dataset
          for the years 1999-2009, a well-known public dataset used in bankruptcy prediction research.
        </p>
        <ul className="list-disc pl-6">
          <li>
            <span className="font-medium">Content:</span> financial ratios and indicators from thousands of
            Taiwanese companies.
          </li>
          <li>
            <span className="font-medium">Target:</span> a binary label indicating whether a company went bankrupt.
          </li>
          <li>
            <span className="font-medium">Features:</span> top 10 most predictive financial ratios selected
            during model development.
          </li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold mt-8">Model Performance</h2>
      <p className="mt-2 text-gray-300">Metrics below are from the held-out test set.</p>

      {/* Classification Report (static, illustrative) */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[360px] text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="py-2 pr-4">Class</th>
              <th className="py-2 pr-4">Precision</th>
              <th className="py-2 pr-4">Recall</th>
              <th className="py-2 pr-4">F1-Score</th>
              <th className="py-2 pr-4">Support</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            <tr>
              <td className="py-2 pr-4">Stable</td>
              <td className="py-2 pr-4">0.98</td>
              <td className="py-2 pr-4">0.97</td>
              <td className="py-2 pr-4">0.98</td>
              <td className="py-2 pr-4">1,320</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Bankrupt</td>
              <td className="py-2 pr-4">0.35</td>
              <td className="py-2 pr-4">0.55</td>
              <td className="py-2 pr-4">0.43</td>
              <td className="py-2 pr-4">44</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Accuracy</td>
              <td className="py-2 pr-4" colSpan={3}>—</td>
              <td className="py-2 pr-4">—</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Macro Avg</td>
              <td className="py-2 pr-4">0.67</td>
              <td className="py-2 pr-4">0.76</td>
              <td className="py-2 pr-4">0.70</td>
              <td className="py-2 pr-4">1,364</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Weighted Avg</td>
              <td className="py-2 pr-4">0.94</td>
              <td className="py-2 pr-4">0.97</td>
              <td className="py-2 pr-4">0.95</td>
              <td className="py-2 pr-4">1,364</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Images: responsive grid (column on mobile, row on desktop) */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="text-sm text-gray-400">Confusion Matrix</div>
          <div className="mt-4 relative w-full overflow-hidden rounded-lg border border-white/10">
            <Image
              src="/confusion_matrix_updated.png"
              alt="Confusion Matrix"
              width={600}
              height={400}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>

        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="text-sm text-gray-400">Feature Importance</div>
          <div className="relative w-full h-full overflow-hidden items-center flex">
            <Image
              src="/feature_importance_adjusted.png"
              alt="Feature Importance"
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover rounded-lg border border-white/10"
              priority={false}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="text-gray-400 text-sm">
          <strong>Disclaimer:</strong> Performance reflects a specific dataset and split. Real-world
          results may vary.
        </div>
      </div>
    </section>
  );
}