"use client";

import { useEffect, useRef, useState } from "react";
import {
  predictTicker,
  shapBarUrl,
  type PredictResponse,
  getExplain,
  type ExplainResponse,
} from "@/lib/api";
import NewsList from "@/components/NewsList";
import ContribBars from "@/components/ContribBars";
import CompanyDetails from "@/components/CompanyDetails";

function formatMarketCap(value?: number, currency?: string) {
  if (!value) return undefined;
  if (value >= 1e12) return (value / 1e12).toFixed(2) + "T" + (currency ? " " + currency : "");
  if (value >= 1e9) return (value / 1e9).toFixed(2) + "B" + (currency ? " " + currency : "");
  if (value >= 1e6) return (value / 1e6).toFixed(2) + "M" + (currency ? " " + currency : "");
  return value.toString() + (currency ? " " + currency : "");
}

export default function PredictPage() {
  const [ticker, setTicker] = useState("TSLA");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [res, setRes] = useState<PredictResponse | null>(null);
  const [explain, setExplain] = useState<ExplainResponse | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotFound(false);
    setLoading(true);
    setRes(null);
    setExplain(null);

    try {
      const data = await predictTicker(ticker.trim().toUpperCase());

      if (!data?.company || !data.company?.symbol) {
        setNotFound(true);
        return;
      }

      setRes(data);

      try {
        const ex = await getExplain(data.ticker);
        setExplain(ex);
      } catch (e) {
        console.warn("Explain failed", e);
        setExplain(null);
      }
    } catch (err: any) {
      const msg = String(err?.message || "").toLowerCase();

      // Handle "base not set" (ensureBase) case explicitly
      if (msg.includes("api base url is not set")) {
        setError(
          "Backend API base URL is not configured. Please check NEXT_PUBLIC_API_BASE in your environment."
        );
      }
      // Handle not found-ish errors
      else if (
        msg.includes("404") ||
        msg.includes("not found") ||
        msg.includes("unknown") ||
        msg.includes("invalid") ||
        msg.includes("no data") ||
        msg.includes("missing") ||
        msg.includes("could not")
      ) {
        setNotFound(true);
      } else {
        setError(err?.message || "Prediction failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const pct = res ? Math.round(res.probability * 1000) / 10 : null;
  const shapUrl = res ? shapBarUrl(res.ticker) : null;

  return (
    <section className="container mx-auto px-4 lg:px-8">
      {/* Title + subtitle */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Predict</h1>
        <p className="mt-2 text-gray-400">
          Enter a stock ticker to estimate bankruptcy probability and view company insights.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <input
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="flex-1 rounded-xl px-4 py-3 bg-white/10 border border-white/10 focus:border-emerald-400 outline-none w-full sm:w-auto"
          placeholder="e.g., AAPL"
          aria-label="Ticker"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl px-6 py-3 bg-emerald-500 text-black font-medium disabled:opacity-60 hover:bg-emerald-400 transition w-full sm:w-auto"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {/* Error (non-not-found) */}
      {error && !notFound && (
        <div className="mt-4 text-sm text-red-400 bg-red-950/40 border border-red-900/50 px-4 py-3 rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Not Found notice */}
      {notFound && (
        <div className="mt-8 rounded-2xl p-8 bg-white/5 border border-white/10 text-center">
          <div className="text-gray-400">Result</div>
          <div className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-300">
            Ticker not found. 
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Please check the symbol (e.g., AAPL, MSFT, TSLA) and try again.
          </p>
        </div>
      )}

      {/* Results */}
      {!notFound && res?.company && (
        <div className="mt-8 space-y-8">
          {/* Probability row */}
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10 text-center">
            <div className="text-gray-400">Bankruptcy Probability</div>
            <div className="text-5xl md:text-6xl font-semibold text-emerald-400 mt-2">
              {pct}%
            </div>
          </div>

          {/* Company introduction */}
          <CompanyDetails
            details={{
              name: res.company?.longName ?? res.company?.shortName,
              symbol: res.company?.symbol,
              shortName: res.company?.shortName,
              industry: res.company?.industry,
              country: res.company?.country,
              sector: res.company?.sector,
              website: res.company?.website,
              ceo: res.company?.ceo,
              summary: res.company?.summary ?? res.company?.longBusinessSummary,
              marketCap: formatMarketCap(res.company?.marketCap, res.company?.currency),
            }}
          />

          {/* SHAP & News */}
          <div className="grid md:grid-rows-2 gap-6">
            {explain ? (
              <ContribBars positive={explain.positive} negative={explain.negative} />
            ) : (
              <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
                <div className="text-sm text-gray-400">Top Features</div>
                <div className="mt-2 text-sm text-gray-400">
                  Explanation not available.
                </div>
              </div>
            )}

            {/* News section */}
            <div className="mt-8">
              <h3 className="text-sm text-gray-400 mb-3">Latest News</h3>

              {res?.news && res.news.length > 0 ? (
                <div
                  className="p-4 rounded-xl border border-white/10 bg-white/5
                             max-h-[min(520px,60vh)] overflow-y-auto"
                >
                  <NewsList items={res.news} />
                </div>
              ) : (
                <div
                  className="p-10 rounded-xl border border-white/10 bg-white/5
                             flex items-center justify-center"
                >
                  <span
                    className="font-semibold text-center
                               text-2xl sm:text-3xl md:text-4xl text-gray-500"
                  >
                    News not available.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
