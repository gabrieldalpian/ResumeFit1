export function HeroMockup() {
  const score = 87;
  const circumference = 2 * Math.PI * 32;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative">
      {/* Floating accent card — top left */}
      <div className="absolute -top-4 -left-4 z-20 hidden sm:block animate-float-slow">
        <div className="card flex items-center gap-3 py-3 px-4 shadow-lg">
          <div className="w-9 h-9 rounded-full bg-[#0ECB811A] flex items-center justify-center">
            <svg className="w-4 h-4 text-[#0ECB81]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#848E9C]">Skills matched</p>
            <p className="text-[#1E2026] font-bold text-sm">12 / 14</p>
          </div>
        </div>
      </div>

      {/* Floating accent card — bottom right */}
      <div className="absolute -bottom-5 -right-4 z-20 hidden sm:block animate-float">
        <div className="card flex items-center gap-3 py-3 px-4 shadow-lg">
          <div className="w-9 h-9 rounded-full bg-[#F0B90B1A] flex items-center justify-center">
            <svg className="w-4 h-4 text-[#F0B90B]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#848E9C]">Analysis time</p>
            <p className="text-[#1E2026] font-bold text-sm">8.2 sec</p>
          </div>
        </div>
      </div>

      {/* Main mockup card */}
      <div className="card shadow-xl relative z-10 overflow-hidden hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-[#848E9C]">Position analyzed</p>
            <p className="text-[#1E2026] font-semibold text-sm">Senior Frontend Engineer</p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-[#0ECB811A] text-[#0ECB81] font-semibold border border-[#0ECB8133]">
            Strong Match
          </span>
        </div>

        {/* Score row */}
        <div className="flex items-center gap-5 pb-6 mb-6 border-b border-[#E6E8EA]">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#E6E8EA" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="32" fill="none"
                stroke="#0ECB81" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#0ECB81]">{score}</span>
            </div>
          </div>
          <div>
            <p className="text-[#848E9C] text-xs uppercase tracking-wide font-semibold">
              Match Score
            </p>
            <p className="text-[#1E2026] font-bold text-2xl mt-1">87 / 100</p>
            <p className="text-[#848E9C] text-xs mt-0.5">Top 8% of candidates</p>
          </div>
        </div>

        {/* Skills matched */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#0ECB81' }}>
            Matching Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["React", "TypeScript", "Next.js", "Tailwind", "GraphQL"].map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Skills missing */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#F6465D' }}>
            Missing Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["AWS", "Docker"].map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-medium"
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
