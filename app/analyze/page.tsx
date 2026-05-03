"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function AnalyzePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jdLen = jobDescription.trim().length;
  const canSubmit = file !== null && jdLen >= 50 && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setLoading(true);

    try {
      const form = new FormData();
      form.append("resume", file!);
      form.append("jobDescription", jobDescription);

      const res = await fetch("/api/analyze", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Analysis failed. Please try again.");
        return;
      }

      router.push(`/results/${data.id}`);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const hint = !file && !jobDescription
    ? "Upload a resume and add a job description to continue"
    : !file
    ? "Upload your resume PDF to continue"
    : jdLen < 50
    ? `Add ${50 - jdLen} more characters to the job description`
    : null;

  return (
    <main className="min-h-[calc(100vh-60px)] bg-[#F9FAFB]">
      {/* Page header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <h1 className="text-xl font-bold text-[#0F1117]">Analyze Your Resume</h1>
          <p className="text-sm text-[#9CA3AF] mt-0.5">
            Upload your PDF and paste the job description. Results in under 10 seconds.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Resume upload */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#F0B90B]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#F0B90B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="font-semibold text-[#0F1117] text-sm">Resume</h2>
              <span className="text-xs text-[#9CA3AF] ml-auto">PDF · Max 5 MB</span>
            </div>
            <UploadDropzone onFileSelect={setFile} selectedFile={file} />
          </div>

          {/* Job description */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#F0B90B]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#F0B90B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-semibold text-[#0F1117] text-sm">Job Description</h2>
              <span className={`text-xs ml-auto font-medium ${jdLen >= 50 ? "text-[#0ECB81]" : "text-[#9CA3AF]"}`}>
                {jdLen} {jdLen < 50 && `/ 50 min`}
              </span>
            </div>
            <textarea
              className="input resize-none text-sm"
              rows={8}
              placeholder="Paste the full job description here — requirements, responsibilities, and preferred qualifications give the best results…"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-[#FFF1F2] border border-[#FECDD3] px-4 py-3 flex items-start gap-3">
              <svg className="w-4 h-4 text-[#F6465D] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-[#F6465D]">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary w-full py-3.5 text-[15px] flex items-center justify-center gap-2.5"
          >
            {loading ? (
              <>
                <LoadingSpinner size={18} />
                <span>Analyzing with Gemini AI…</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Analyze Match</span>
              </>
            )}
          </button>

          {hint && !loading && (
            <p className="text-center text-xs text-[#9CA3AF]">{hint}</p>
          )}
        </form>
      </div>
    </main>
  );
}
