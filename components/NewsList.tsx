// components/NewsList.tsx
import type { NewsItem } from "@/lib/api";

export default function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((news, i) => (
        <div
          key={i}
          className="p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-400 hover:underline block break-words leading-snug"
          >
            {news.title}
          </a>

          <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs text-gray-400 mt-1">
            <span className="truncate">{news.publisher}</span>
            <span className="text-right">{news.published}</span>
          </div>

          {/* If you want summaries again, re-enable below */}
          {/* {news.summary && (
            <p className="text-xs sm:text-sm text-gray-300 mt-2 break-words">{news.summary}</p>
          )} */}
        </div>
      ))}
    </div>
  );
}
