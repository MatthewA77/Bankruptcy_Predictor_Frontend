export type PredictResponse = {
  ticker: string;
  probability: number;                 // 0..1
  top_contributions: [string, number][]; // [feature, shap]
  company?: CompanyInfo;
  news?: NewsItem[];
};

export type CompanyInfo = {
  longName?: string;
  shortName?: string;
  country?: string;
  industry?: string;
  website?: string;
  ceo?: string;
  summary?: string;
  [key: string]: any;
};

export type NewsItem = {
  title: string;
  link: string;
  publisher?: string;
  published?: string;
  summary?: string;
};

export type ExplainItem = {
  feature: string;
  value: number;   // shap value (signed)
  abs: number;     // |value|
  direction: "increase" | "decrease";
};

export type ExplainResponse = {
  ticker: string;
  contributions: ExplainItem[];
  positive: ExplainItem[];
  negative: ExplainItem[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

function ensureBase() {
  if (!API_BASE) throw new Error("Set NEXT_PUBLIC_API_BASE in .env.local (e.g., http://127.0.0.1:8000)");
}

async function safeJson(res: Response) {
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const t = await res.text().catch(() => "");
    throw new Error(`Unexpected response (not JSON): ${t.slice(0, 200)}`);
  }
  return res.json();
}

export async function predictTicker(ticker: string): Promise<PredictResponse> {
  ensureBase();
  const res = await fetch(`${API_BASE}/predict/ticker`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticker }),
    cache: "no-store",
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Predict failed: ${res.status} ${t}`);
  }
  const data: PredictResponse = await safeJson(res);

  // Fallbacks if backend didn't include company/news (optional endpoints)
  if (!data.company) {
    try {
      const c = await fetch(`${API_BASE}/company?ticker=${encodeURIComponent(ticker)}`, { cache: "no-store" });
      if (c.ok) data.company = await safeJson(c);
    } catch {}
  }
  if (!data.news) {
    try {
      const n = await fetch(`${API_BASE}/news?ticker=${encodeURIComponent(ticker)}`, { cache: "no-store" });
      if (n.ok) data.news = await safeJson(n);
    } catch {}
  }

  return data;
}

export function shapBarUrl(ticker: string) {
  ensureBase();
  return `${API_BASE}/shap/bar.png?ticker=${encodeURIComponent(ticker)}`;
}

export async function getExplain(ticker: string, k = 10): Promise<ExplainResponse> {
  const url = `${API_BASE}/explain/${encodeURIComponent(ticker)}?k=${k}`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`Explain failed: ${r.status}`);
  return r.json();
}