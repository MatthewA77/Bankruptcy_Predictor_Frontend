import type { NewsItem } from "@/lib/api";

export default function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((news, i) => (
        <div
          key={i}
          className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          {/* Title */}
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-400 hover:underline block"
          >
            {news.title}
          </a>

          {/* Publisher + Published Date */}
          <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
            <span>{news.publisher}</span>
            <span>{news.published}</span>
          </div>

          {/* Summary */}
          {/* {news.summary && (
            <p className="text-sm text-gray-300 mt-2">{news.summary}</p>
          )} */}
        </div>
      ))}
    </div>
  );
}
