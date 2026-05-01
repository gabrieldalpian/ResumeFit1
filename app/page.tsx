import Link from "next/link";
import { HeroMockup } from "@/components/landing/HeroMockup";
import { SampleAnalysisCard } from "@/components/landing/SampleAnalysisCard";
import { ResultsMockup } from "@/components/landing/ResultsMockup";
import { FAQ } from "@/components/landing/FAQ";

const heroStats = [
  { value: "12,847", label: "analyses this week" },
  { value: "2×",     label: "more interviews" },
  { value: "87%",    label: "candidate confidence" },
];

const companies = ["Google", "Apple", "Microsoft", "Amazon", "Meta", "Netflix", "Stripe"];

const testimonials = [
  {
    quote: "Saved me from blasting 50 applications into the void. Now I only apply when the score is above 75 — my response rate tripled.",
    name: "Marcus T.", role: "Senior Backend Engineer", rating: 5,
  },
  {
    quote: "The bullet rewrites alone are worth it. ResumeFit caught weak verbs I didn't even notice and turned bullets into metrics.",
    name: "Priya S.", role: "Frontend Developer", rating: 5,
  },
  {
    quote: "I was a self-taught dev with no clue what big tech wanted. Three analyses later I had a clear roadmap. Got a Series B offer six weeks in.",
    name: "Daniel K.", role: "Full-Stack Engineer", rating: 5,
  },
  {
    quote: "Brutally honest. It told me my resume was a 41 for the role I wanted. After two weeks of fixes I was at 79 — and I felt it.",
    name: "Emma R.", role: "ML Engineer", rating: 5,
  },
];

const sampleAnalyses = [
  {
    title: "Senior Frontend Engineer",
    company: "Big Tech · React + TS",
    score: 82,
    matching: ["React", "TypeScript", "Next.js", "Tailwind", "GraphQL"],
    missing: ["AWS", "Docker"],
  },
  {
    title: "Backend Engineer",
    company: "Series B · Go + AWS",
    score: 67,
    matching: ["PostgreSQL", "REST APIs", "Microservices"],
    missing: ["Go", "AWS Lambda", "Kafka"],
  },
  {
    title: "ML Engineer",
    company: "AI Startup · PyTorch",
    score: 91,
    matching: ["PyTorch", "Python", "MLOps", "Transformers", "CUDA"],
    missing: ["Triton"],
  },
];

const advantages = [
  {
    title: "Save valuable time",
    description: "Know whether to apply in under 10 seconds, not after a week of silence.",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: "ATS-optimized insights",
    description: "Surfaces the exact keywords modern ATS scanners and recruiters screen for.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    title: "Your data stays private",
    description: "Encrypted in transit and at rest. Never shared, never sold, never used for ads.",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0110 1.944 11.954 11.954 0 0117.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: "Built for engineers",
    description: "Calibrated for frontend, backend, mobile, ML, DevOps, and platform roles.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
  },
  {
    title: "Track your progress",
    description: "Re-run after each resume edit and watch your match score climb over time.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: "Powered by Gemini AI",
    description: "Google's latest model reads between the lines — like a senior recruiter would.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/><rect x="4" y="4" width="16" height="16" rx="2"/>
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your resume",
    description: "Drop your PDF into the dropzone. We extract and parse the text instantly.",
  },
  {
    number: "02",
    title: "Paste the job description",
    description: "Copy any role from LinkedIn, Greenhouse, or Lever. More detail = better results.",
  },
  {
    number: "03",
    title: "Get your match analysis",
    description: "Score, skill gaps, strengths, weaknesses, and an AI-rewritten bullet — in seconds.",
  },
];

const StarIcon = () => (
  <svg className="w-3.5 h-3.5 text-[#F0B90B]" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3 h-3 text-[#0ECB81]" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-[#E5E7EB] overflow-hidden">
        <div className="absolute inset-0 hero-bg-dots opacity-[0.35] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#0F1117] leading-[1.08] tracking-tight mb-6">
                Build a resume{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10">recruiters</span>
                  <span
                    className="absolute left-0 right-0 bottom-1 h-[14px] -z-0"
                    style={{ background: "rgba(240,185,11,0.4)" }}
                  />
                </span>{" "}
                can&apos;t ignore.
              </h1>

              <p className="text-[17px] text-[#6B7280] leading-relaxed mb-8 max-w-[420px]">
                Upload your resume, paste any job description, and get an honest AI match score with skill gaps and improvement steps — in under 10 seconds.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <Link href="/login?tab=register" className="btn-primary px-7 py-3 text-[15px]">
                  Analyze my resume — Free
                </Link>
                <Link href="/login" className="btn-secondary px-7 py-3 text-[15px]">
                  Sign in
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] pt-8 border-t border-[#E5E7EB]">
                {heroStats.map((s) => (
                  <div key={s.label} className="pr-6 last:pr-0 pl-6 first:pl-0">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#0F1117] tabular-nums tracking-tight">
                      {s.value}
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-1 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="bg-[#F9FAFB] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Rating pill */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <span className="text-sm font-bold text-[#0F1117]">4.8</span>
              <span className="text-[#9CA3AF] text-sm">· 2,847 reviews</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card flex flex-col hover:border-[#F0B90B]/40 hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="text-[#374151] text-sm leading-relaxed mb-4 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-3 border-t border-[#F3F4F6]">
                  <p className="font-semibold text-[#0F1117] text-sm">{t.name}</p>
                  <p className="text-[#9CA3AF] text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SAMPLE ANALYSES ───────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Live demo</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1117] tracking-tight mb-4">
              Honest scores for any engineering role
            </h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto leading-relaxed">
              We benchmark your resume against the exact skills and signals each role demands — no grade inflation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sampleAnalyses.map((a) => (
              <SampleAnalysisCard key={a.title} {...a} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/login?tab=register" className="btn-primary px-8 py-3 text-[15px]">
              Analyze my resume
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ADVANTAGES ────────────────────────────────────────── */}
      <section className="bg-[#F9FAFB] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1117] tracking-tight mb-4">
              Why engineers choose ResumeFit
            </h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              Built for software roles by people who&apos;ve been on both sides of the hiring table.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((a) => (
              <div
                key={a.title}
                className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#F0B90B]/50 hover:shadow-md transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F9FAFB] group-hover:bg-[#FEF9E7] border border-[#E5E7EB] flex items-center justify-center mb-4 text-[#F0B90B] transition-colors">
                  {a.icon}
                </div>
                <h3 className="font-semibold text-[#0F1117] text-[15px] mb-1.5">{a.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#F0B90B] mb-3">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-4">
              From resume to results in 3 steps
            </h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              No signup hoops. No credit card. Upload, paste, and get clarity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ffffff0a] rounded-2xl overflow-hidden border border-[#ffffff0a]">
            {steps.map((step, i) => (
              <div key={step.number} className="bg-white p-8 relative">
                <span className="inline-block text-[11px] font-bold tracking-widest text-black mb-4">
                  STEP {step.number}
                </span>
                <h3 className="text-black font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-8 -right-3.5 w-7 h-7 rounded-full bg-[#F0B90B] items-center justify-center z-10 shadow-lg">
                    <svg className="w-3 h-3 text-[#0F1117]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/login?tab=register" className="btn-primary px-8 py-3 text-[15px]">
              Start your first analysis
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-[#F9FAFB] border-t border-white/[0.06] py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-md bg-[#F0B90B] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 16 16" className="w-3 h-3 text-[#0F1117]" fill="currentColor">
                    <rect x="1" y="9" width="2.5" height="6" rx="0.5"/>
                    <rect x="6.75" y="5" width="2.5" height="10" rx="0.5"/>
                    <rect x="12.5" y="1" width="2.5" height="14" rx="0.5"/>
                  </svg>
                </div>
                <span className="font-bold text-black text-[15px] tracking-tight">
                  Resume<span className="text-[#F0B90B]">Fit</span>
                </span>
              </Link>
              <p className="text-[#6B7280] text-sm leading-relaxed max-w-[180px]">
                AI resume matching for software engineers.
              </p>
            </div>

            {[
              {
                label: "Product",
                links: [
                  { text: "Get started", href: "/login?tab=register" },
                  { text: "Sign in", href: "/login" },
                  { text: "New analysis", href: "/analyze" },
                ],
              },
              {
                label: "Resources",
                links: [
                  { text: "FAQ", href: "#" },
                  { text: "Contact", href: "#" },
                  { text: "Privacy", href: "#" },
                ],
              },
              {
                label: "Built with",
                links: [
                  { text: "Next.js · Prisma", href: "#" },
                  { text: "Gemini AI", href: "#" },
                  { text: "Tailwind CSS", href: "#" },
                ],
              },
            ].map((col) => (
              <div key={col.label}>
                <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest mb-4">{col.label}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.text}>
                      <Link href={l.href} className="text-[#6B7280] hover:text-[#F0B90B] text-sm transition-colors">
                        {l.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[#4B5563] text-xs">© 2026 ResumeFit. All rights reserved.</p>
            <p className="text-[#4B5563] text-xs">
              Company names are trademarks of their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
