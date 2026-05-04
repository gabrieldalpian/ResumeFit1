import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { MatchScoreCard } from "@/components/results/MatchScoreCard";
import type { AnalysisResult } from "@/lib/gemini";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ResultsPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const userId = (session.user as { id?: string }).id!;

  const analysis = await prisma.analysis.findFirst({
    where: { id, userId },
  });

  if (!analysis) notFound();

  const result = analysis.resultJSON as unknown as AnalysisResult;
  const date = analysis.createdAt.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isHighScore = result.matchScore >= 70;
  const isMidScore = result.matchScore >= 40 && result.matchScore < 70;
  const scoreColor = isHighScore ? "#0ECB81" : isMidScore ? "#F0B90B" : "#F6465D";

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-white via-[#F8F9FA] to-[#F3F5F8] py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/dashboard" className="text-xs text-[#848E9C] hover:text-[#1E2026] transition-colors">
                Dashboard
              </Link>
              <span className="text-[#E6E8EA]">•</span>
              <span className="text-xs text-[#1E2026] font-medium truncate max-w-xs">
                {analysis.jobTitle || "Resume Analysis"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#1E2026] leading-tight">
              {analysis.jobTitle || "Resume Analysis"}
            </h1>
            <p className="text-sm text-[#848E9C] mt-1">{date}</p>
          </div>
          <Link href="/analyze" className="btn-secondary self-start sm:self-auto flex items-center gap-2 text-sm px-6 py-2.5 whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Analysis
          </Link>
        </div>

        {/* Score + Skills Section */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Left: Score Card */}
          <div className="lg:col-span-1">
            <MatchScoreCard score={result.matchScore} />
          </div>

          {/* Right: Matching & Missing Skills */}
          <div className="lg:col-span-4 grid sm:grid-cols-2 gap-6">
            {/* Matching Skills */}
            <div className="bg-white rounded-xl border border-[#E6E8EA] p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">✅</span>
                <h2 className="text-lg font-bold text-[#1E2026]">Matching Skills</h2>
                <span className="ml-auto inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0ECB81]/10 text-[#0ECB81] text-sm font-bold">
                  {result.matchingSkills.length}
                </span>
              </div>
              <div className="space-y-2">
                {result.matchingSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.matchingSkills.map((skill, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#848E9C]">None identified.</p>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white rounded-xl border border-[#E6E8EA] p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">❌</span>
                <h2 className="text-lg font-bold text-[#1E2026]">Missing Skills</h2>
                <span className="ml-auto inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F6465D]/10 text-[#F6465D] text-sm font-bold">
                  {result.missingSkills.length}
                </span>
              </div>
              <div className="space-y-2">
                {result.missingSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#848E9C]">None identified.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Suggestions - Full Width Below */}
        <div className="bg-white rounded-xl border border-[#E6E8EA] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-lg font-bold text-[#1E2026]">Improvement Suggestions</h2>
            <span className="ml-auto inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F0B90B]/10 text-[#F0B90B] text-sm font-bold">
              {result.improvementSuggestions.length}
            </span>
          </div>
          <ul className="space-y-3">
            {result.improvementSuggestions.length > 0 ? (
              result.improvementSuggestions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F0B90B]/20 text-[#F0B90B] text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[#1E2026] text-sm leading-relaxed pt-0.5">{item}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-[#848E9C]">No suggestions.</p>
            )}
          </ul>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-white rounded-xl border border-[#E6E8EA] p-8 text-center shadow-sm">
          <h2 className="font-bold text-[#1E2026] text-xl mb-2">Ready to apply?</h2>
          <p className="text-[#848E9C] text-sm mb-6 max-w-lg mx-auto">
            Use the insights above to strengthen your resume, then run another analysis to track your improvement.
          </p>
          <Link href="/analyze" className="btn-primary px-8 py-3">
            Analyze Another Resume
          </Link>
        </div>
      </div>
    </main>
  );
}
