interface CompanyDetailsProps {
  details: {
    name?: string;
    symbol?: string;
    shortName?: string;
    industry?: string;
    country?: string;
    sector?: string;
    website?: string;
    ceo?: string;
    summary?: string;
  };
}

export default function CompanyDetails({ details }: CompanyDetailsProps) {
  return (
    <section className="rounded-xl p-6 text-white mt-8">
      {/* Title + Subtitle */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          {details?.name}{" "}
          {details?.symbol && (
            <span className="text-emerald-400">({details.symbol})</span>
          )}
        </h2>
        <p className="text-gray-400">
          {details?.industry}
          {details?.country ? ` · ${details.country}` : ""}
        </p>
      </div>

      {/* Grid for details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {details?.website && (
          <div>
            <h3 className="text-sm uppercase text-gray-400">website</h3>
            <a
              href={details.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              {details.website}
            </a>
          </div>
        )}

        {details?.ceo && (
          <div>
            <h3 className="text-sm uppercase text-gray-400">ceo</h3>
            <p className="font-medium">{details.ceo}</p>
          </div>
        )}

        {details?.sector && (
          <div>
            <h3 className="text-sm uppercase text-gray-400">sector</h3>
            <p className="font-medium">{details.sector}</p>
          </div>
        )}

        {/* Summary spans 2 columns */}
        {details?.summary && (
          <div className="md:col-span-2">
            <h3 className="text-sm uppercase text-gray-400">summary</h3>
            <p className="mt-1 leading-relaxed text-justify">
              {details.summary}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
