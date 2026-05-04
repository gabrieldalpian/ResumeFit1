"use client";

interface MatchScoreCardProps {
  score: number;
}

export function MatchScoreCard({ score }: MatchScoreCardProps) {
  const isHigh = score >= 70;
  const isMid  = score >= 40 && score < 70;
  const color  = isHigh ? "#0ECB81" : isMid ? "#F0B90B" : "#F6465D";
  const label  = isHigh ? "Strong Match" : isMid ? "Moderate" : "Weak Match";
  const bg     = isHigh ? "#ECFDF5" : isMid ? "#FEFCE8" : "#FFF1F2";
  const border = isHigh ? "#A7F3D0" : isMid ? "#FDE68A" : "#FECDD3";

  const r = 48;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="card flex flex-col items-center text-center py-7 gap-4">
      {/* Circle */}
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r={r} fill="none" stroke="#F3F4F6" strokeWidth="9" />
          <circle
            cx="55" cy="55" r={r}
            fill="none"
            stroke={color}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-extrabold leading-none text-4xl" style={{ color }}>
            {score}
          </span>
          <span className="text-xs text-[#9CA3AF] mt-1 font-medium">/ 100</span>
        </div>
      </div>

      {/* Label + blurb */}
      <div>
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: bg, color, border: `1px solid ${border}` }}
        >
          {label}
        </span>
        <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed max-w-[140px]">
          {isHigh
            ? "Strong fit. Apply with confidence."
            : isMid
            ? "Relevant experience, some gaps."
            : "Significant gaps — prep required."}
        </p>
      </div>
    </div>
  );
}
