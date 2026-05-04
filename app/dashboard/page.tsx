import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AnalysisCard } from "@/components/dashboard/AnalysisCard";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id?: string }).id!;

  type AnalysisItem = {
    id: string;
    jobTitle: string | null;
    matchScore: number;
    createdAt: Date;
  };

  const analyses: AnalysisItem[] = await prisma.analysis.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, jobTitle: true, matchScore: true, createdAt: true },
  });

  const avgScore =
    analyses.length > 0
      ? Math.round(analyses.reduce((s: number, a: AnalysisItem) => s + a.matchScore, 0) / analyses.length)
      : 0;
  const best = analyses.length > 0 ? Math.max(...analyses.map((a: AnalysisItem) => a.matchScore)) : 0;

  const scoreColor = (s: number) =>
    s >= 70 ? "#0ECB81" : s >= 40 ? "#F0B90B" : "#F6465D";

  return (
    <main className="min-h-[calc(100vh-60px)] bg-[#F9FAFB]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#0F1117]">
              {session.user.name ? `Welcome back, ${session.user.name.split(" ")[0]}` : "Dashboard"}
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-0.5">
              {analyses.length === 0
                ? "No analyses yet — run your first one below"
                : `${analyses.length} resume ${analyses.length === 1 ? "analysis" : "analyses"} on record`}
            </p>
          </div>
          <Link href="/analyze" className="btn-primary self-start sm:self-auto flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Analysis
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        {analyses.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Analyses run", value: analyses.length, suffix: "", color: "#0F1117" },
              { label: "Average score", value: avgScore, suffix: "/100", color: scoreColor(avgScore) },
              { label: "Best score", value: best, suffix: "/100", color: scoreColor(best) },
            ].map((stat) => (
              <div key={stat.label} className="card">
                <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wider mb-2">{stat.label}</p>
                <p className="text-3xl font-extrabold tracking-tight" style={{ color: stat.color }}>
                  {stat.value}
                  <span className="text-sm font-medium text-[#9CA3AF] ml-1">{stat.suffix}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Grid or empty state */}
        {analyses.length === 0 ? (
          <div className="card flex flex-col items-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F0B90B]/10 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-[#F0B90B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="font-bold text-[#0F1117] text-lg mb-2">Run your first analysis</h2>
            <p className="text-[#9CA3AF] text-sm max-w-xs mb-7 leading-relaxed">
              Upload your resume and paste a job description to see how well you match in under 10 seconds.
            </p>
            <Link href="/analyze" className="btn-primary px-7 py-2.5">
              Start Analyzing
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyses.map((a: AnalysisItem) => (
              <AnalysisCard
                key={a.id}
                id={a.id}
                jobTitle={a.jobTitle}
                matchScore={a.matchScore}
                createdAt={a.createdAt.toISOString()}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
