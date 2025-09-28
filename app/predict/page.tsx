"use client";

import { useEffect, useRef, useState } from "react";
import {
  predictTicker,
  shapBarUrl,
  type PredictResponse,
} from "@/lib/api";
import NewsList from "@/components/NewsList";
import { getExplain, type ExplainResponse } from "@/lib/api";
import ContribBars from "@/components/ContribBars";
import CompanyDetails from "@/components/CompanyDetails";


/** Measure one element's height and return [ref, height] */
function useMatchHeight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setHeight(el.getBoundingClientRect().height);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return [ref, height] as const;
}

export default function PredictPage() {
  const [ticker, setTicker] = useState("TSLA");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [res, setRes] = useState<PredictResponse | null>(null);
  const [explain, setExplain] = useState<ExplainResponse | null>(null);


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setRes(null);
    try {
      const data = await predictTicker(ticker.trim().toUpperCase());
      setRes(data);
      try {
        const ex = await getExplain(data.ticker);
        setExplain(ex);
      } catch (e) {
        // Non-fatal if explain fails
        console.warn("Explain failed", e);
        setExplain(null);
      }
    } catch (err: any) {
      setError(err?.message || "Prediction failed");
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

      {/* Error */}
      {error && (
        <div className="mt-4 text-sm text-red-400 bg-red-950/40 border border-red-900/50 px-4 py-3 rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Results */}
      {res?.company && (
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
                <div className="p-4 rounded-xl border border-white/10 bg-white/5
                                max-h-[min(520px,60vh)] overflow-y-auto">
                  {/* `res.news` should be an array of:
                      { title, link, publisher, published, summary } */}
                  <NewsList items={res.news} />
                </div>
              ) : (
                <div className="p-10 rounded-xl border border-white/10 bg-white/5
                                flex items-center justify-center">
                  <span className="font-semibold text-center
                                  text-2xl sm:text-3xl md:text-4xl text-gray-500">
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
