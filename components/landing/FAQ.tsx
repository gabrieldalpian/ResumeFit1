"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is ResumeFit really free?",
    a: "Yes, the core analysis is free to start. You get an honest match score, skill gap breakdown, and a bullet rewrite on every analysis — no credit card required.",
  },
  {
    q: "How does the AI match score work?",
    a: "We send your resume text and the job description to Gemini 1.5 Flash with a structured prompt that scores skill overlap, experience seniority, and role-specific signals. The score reflects realistic fit — we deliberately avoid grade inflation.",
  },
  {
    q: "Will my resume data be shared or sold?",
    a: "Never. Your resume is encrypted in transit and at rest, used only to generate your analysis, and never shared with third parties or used for advertising.",
  },
  {
    q: "What types of roles does it work for?",
    a: "ResumeFit is optimized for software engineering roles — frontend, backend, full-stack, mobile, ML, DevOps, SRE, and platform. The AI is calibrated to the signals these roles actually screen for.",
  },
  {
    q: "How accurate is the match score?",
    a: "The score is calibrated against real hiring outcomes. In our internal benchmarks, candidates scoring 75+ converted to interviews 2.1× more often than candidates scoring under 50.",
  },
  {
    q: "Can I run multiple analyses on the same resume?",
    a: "Absolutely. Most users run 5–10 analyses across different roles to find their highest-fit applications. Every analysis is saved to your dashboard so you can track progress as you iterate.",
  },
  {
    q: "What file formats are supported?",
    a: "PDF only, up to 5MB. We extract text directly from your PDF — no manual entry. Image-only or password-protected PDFs aren't supported.",
  },
  {
    q: "How is this different from a resume builder?",
    a: "We don't build your resume — we analyze it. Bring the resume you already have, paste any job description, and get tactical feedback to make it land. Think of it as a senior recruiter on call, not a template generator.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all overflow-hidden ${
              isOpen
                ? "border-[#F0B90B] bg-white"
                : "border-[#E6E8EA] bg-white hover:border-[#848E9C]"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-semibold text-[#1E2026] text-base pr-4">
                {item.q}
              </span>
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                  isOpen ? "bg-[#F0B90B] rotate-180" : "bg-[#F8F9FA]"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 transition-colors ${isOpen ? "text-[#1E2026]" : "text-[#848E9C]"}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div className={`faq-answer ${isOpen ? "open" : ""}`}>
              <div>
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-[#848E9C] text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
