interface SampleAnalysisCardProps {
  title: string;
  company: string;
  score: number;
  matching: string[];
  missing: string[];
}

export function SampleAnalysisCard({
  title,
  company,
  score,
  matching,
  missing,
}: SampleAnalysisCardProps) {
  const isHigh = score >= 70;
  const isMid = score >= 40;
  const color = isHigh ? "#0ECB81" : isMid ? "#F0B90B" : "#F6465D";
  const label = isHigh ? "Strong Match" : isMid ? "Moderate" : "Weak";

  return (
    <div className="card hover:border-[#F0B90B] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#1E2026] text-base truncate">{title}</p>
          <p className="text-[#848E9C] text-xs mt-1 truncate">{company}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-3xl font-bold leading-none tabular-nums" style={{ color, fontVariantNumeric: "tabular-nums" }}>
            {score}
          </p>
          <p className="text-xs mt-1" style={{ color }}>/ 100</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="h-2 rounded-full bg-[#E6E8EA] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${score}%`, backgroundColor: color, boxShadow: `0 0 6px ${color}40` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-[#848E9C]">Match</span>
          <span className="text-xs font-semibold" style={{ color }}>
            {label}
          </span>
        </div>
      </div>

      {/* Skill summary */}
      <div className="space-y-3 pt-4 border-t border-[#E6E8EA]">
        <div className="flex items-start gap-2">
          <span className="text-xs font-semibold text-[#848E9C] mt-0.5 w-12 flex-shrink-0">
            HAS
          </span>
          <div className="flex flex-wrap gap-1">
            {matching.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
              >
                {s}
              </span>
            ))}
            {matching.length > 4 && (
              <span className="text-xs px-2 py-0.5 text-[#848E9C]">
                +{matching.length - 4}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xs font-semibold text-[#848E9C] mt-0.5 w-12 flex-shrink-0">
            NEEDS
          </span>
          <div className="flex flex-wrap gap-1">
            {missing.map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
