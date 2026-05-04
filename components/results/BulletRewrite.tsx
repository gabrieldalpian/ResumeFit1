"use client";

interface BulletRewriteProps {
  before: string;
  after: string;
}

export function BulletRewrite({ before, after }: BulletRewriteProps) {
  return (
    <div className="card">
      <h3 className="font-semibold text-sm flex items-center gap-1.5 mb-3">
        <span className="text-base">✍️</span>
        <span>AI Bullet Rewrite</span>
        <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-[#F0B90B1A] text-[#F0B90B] border border-[#F0B90B33] ml-auto">
          AI
        </span>
      </h3>
      <div className="space-y-2.5">
        <div className="rounded-lg p-3 bg-[#F6465D0D] border border-[#F6465D33]">
          <p className="text-xs font-semibold text-[#F6465D] uppercase tracking-wider mb-1.5">
            Before
          </p>
          <p className="text-xs text-[#1E2026] leading-relaxed line-through opacity-70">
            {before}
          </p>
        </div>
        <div className="flex justify-center py-1">
          <svg className="w-4 h-4 text-[#848E9C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="rounded-lg p-3 bg-[#0ECB810D] border border-[#0ECB8133]">
          <p className="text-xs font-semibold text-[#0ECB81] uppercase tracking-wider mb-1.5">
            After
          </p>
          <p className="text-xs text-[#1E2026] leading-relaxed font-medium">{after}</p>
        </div>
      </div>
    </div>
  );
}
