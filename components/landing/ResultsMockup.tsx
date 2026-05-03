export function ResultsMockup() {
  return (
    <div className="relative">
      {/* Stacked card pattern */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#F0B90B] opacity-20 rounded-xl" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#1E2026] opacity-5 rounded-xl" />

      {/* Main content card */}
      <div className="card relative z-10 shadow-xl">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#E6E8EA]">
          <p className="font-semibold text-[#1E2026]">Improvement Suggestions</p>
          <span className="text-xs text-[#F0B90B] font-semibold px-2 py-1 rounded-full bg-[#F0B90B1A] border border-[#F0B90B33]">
            AI Generated
          </span>
        </div>

        {/* Suggestions list */}
        <ul className="space-y-3 mb-6">
          {[
            "Add metrics to your bullet points (e.g., reduced load time by 40%)",
            "Highlight team leadership and ownership signals",
            "Mention experience with cloud platforms (AWS, GCP, Azure)",
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F0B90B1A] text-[#F0B90B] text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-[#1E2026] text-sm leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>

        {/* Bullet rewrite preview */}
        <div className="pt-5 border-t border-[#E6E8EA]">
          <p className="text-xs font-semibold text-[#848E9C] uppercase tracking-wider mb-3">
            AI Bullet Rewrite
          </p>

          <div className="rounded-lg p-3 bg-[#F6465D0D] border border-[#F6465D33] mb-2">
            <p className="text-xs font-semibold text-[#F6465D] uppercase tracking-wider mb-1.5">
              Before
            </p>
            <p className="text-xs text-[#1E2026] leading-relaxed line-through opacity-70">
              Worked on the frontend team to improve the user experience.
            </p>
          </div>

          <div className="flex justify-center my-1">
            <svg className="w-4 h-4 text-[#848E9C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="rounded-lg p-3 bg-[#0ECB810D] border border-[#0ECB8133]">
            <p className="text-xs font-semibold text-[#0ECB81] uppercase tracking-wider mb-1.5">
              After
            </p>
            <p className="text-xs text-[#1E2026] leading-relaxed font-medium">
              Led 4-engineer frontend team to redesign onboarding flow, cutting drop-off by 38% and lifting activation 2.1×.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
