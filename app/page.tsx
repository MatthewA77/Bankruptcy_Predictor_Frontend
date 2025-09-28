"use client";

import Link from "next/link";
import ParticlesBG from "@/components/ParticlesBG";

// --- Page ---
export default function HomePage() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <ParticlesBG />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          COBA-ION — Company Bankruptcy Prediction
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          Estimate bankruptcy probability from financial ratios and see the factors that drive the prediction — powered by explainable AI.
        </p>
        <div className="mt-8">
          <Link
            href="/predict"
            className="px-6 py-3 bg-emerald-500 text-black font-semibold rounded-xl shadow hover:bg-emerald-400 transition"
          >
            Try Prediction
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 mb-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="font-semibold text-lg">Accurate Models</h3>
            <p className="mt-2 text-sm text-gray-400">
              Trained on real financial data with tested feature engineering.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="font-semibold text-lg">Explainable AI</h3>
            <p className="mt-2 text-sm text-gray-400">
              SHAP values reveal top drivers behind each prediction.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="font-semibold text-lg">Professional UI</h3>
            <p className="mt-2 text-sm text-gray-400">
              Fast, responsive interface that looks great on mobile and desktop.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
