"use client";

import Link from "next/link";

interface AnalysisCardProps {
  id: string;
  jobTitle: string | null;
  matchScore: number;
  createdAt: string;
}

export function AnalysisCard({ id, jobTitle, matchScore, createdAt }: AnalysisCardProps) {
  const isHigh = matchScore >= 70;
  const isMid = matchScore >= 40;
  const color = isHigh ? "#0ECB81" : isMid ? "#F0B90B" : "#F6465D";
  const label = isHigh ? "Strong" : isMid ? "Moderate" : "Weak";

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/results/${id}`}>
      <div className="card group hover:border-[#F0B90B] hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#1E2026] truncate group-hover:text-[#F0B90B] transition-colors">
              {jobTitle || "Untitled Position"}
            </p>
            <p className="text-sm text-[#848E9C] mt-1">{date}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-2xl font-bold" style={{ color }}>
              {matchScore}
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ color, backgroundColor: color + "1A" }}
            >
              {label}
            </span>
          </div>
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-[#E6E8EA] overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${matchScore}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </Link>
  );
}
