// src/lib/api.ts
export type NewsItem = {
  title: string;
  link: string;
  publisher?: string;
  published?: string;
  summary?: string;
};

export type PredictResponse = {
  ticker: string;
  probability: number; // 0..1
  top_contributions: [string, number][];
  company?: {
    marketCap: number | undefined;
    currency: string | undefined;
    symbol: string;
    shortName?: string;
    longName?: string;
    industry?: string;
    sector?: string;
    country?: string;
    website?: string;
    ceo?: string;
    summary?: string;
    longBusinessSummary?: string;
  } | null;
  news?: NewsItem[];
};

export type ExplainItem = {
  feature: string;
  value: number;   // shap value (signed)
  abs: number;     // |value|
  direction: "increase" | "decrease";
};

export type ExplainResponse = {
  positive: ExplainItem[];
  negative: ExplainItem[];
};

// --- ensureBase helper ---
function ensureBase(): string {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE is not set. Please configure it in your .env.local or Vercel project settings."
    );
  }
  return base;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { cache: "no-store", ...init });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(text || res.statusText || `HTTP ${res.status}`);
    // @ts-expect-error propagate status
    err.status = res.status;
    throw err;
  }
  return res.json() as Promise<T>;
}

// --- API functions ---
export async function predictTicker(ticker: string): Promise<PredictResponse> {
  return request<PredictResponse>(`${ensureBase()}/predict/ticker`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticker }),
  });
}

export function shapBarUrl(ticker: string) {
  return `${ensureBase()}/shap/bar.png?ticker=${encodeURIComponent(ticker)}`;
}

export async function getExplain(ticker: string): Promise<ExplainResponse> {
  return request<ExplainResponse>(
    `${ensureBase()}/explain/${encodeURIComponent(ticker)}`
  );
}

export async function getCompany(ticker: string) {
  return request(`${ensureBase()}/company/${encodeURIComponent(ticker)}`);
}

export async function getNews(ticker: string): Promise<NewsItem[]> {
  return request<NewsItem[]>(
    `${ensureBase()}/news/${encodeURIComponent(ticker)}`
  );
}
