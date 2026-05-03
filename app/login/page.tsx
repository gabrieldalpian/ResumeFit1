"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.get("tab") === "register") setTab("register");
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (tab === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Registration failed");
          return;
        }
      }

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#F0B90B] flex items-center justify-center">
            <span className="text-[#1E2026] font-bold">RF</span>
          </div>
          <span className="font-bold text-[#1E2026] text-xl">ResumeFit</span>
        </Link>
        <h1 className="text-2xl font-bold text-[#1E2026]">
          {tab === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-[#848E9C] text-sm mt-2">
          {tab === "login"
            ? "Sign in to view your analyses"
            : "Start analyzing your resume for free"}
        </p>
      </div>

      <div className="card">
        <div className="flex rounded-lg border border-[#E6E8EA] p-1 mb-6">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                tab === t
                  ? "bg-[#F0B90B] text-[#1E2026]"
                  : "text-[#848E9C] hover:text-[#1E2026]"
              }`}
            >
              {t === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "register" && (
            <div>
              <label className="block text-sm font-medium text-[#1E2026] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#1E2026] mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E2026] mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder={tab === "register" ? "Min. 8 characters" : "••••••••"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={tab === "register" ? 8 : undefined}
              className="input"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-[#F6465D0D] border border-[#F6465D33] px-4 py-3">
              <p className="text-sm text-[#F6465D]">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size={18} />
                <span>{tab === "login" ? "Signing in…" : "Creating account…"}</span>
              </>
            ) : (
              tab === "login" ? "Sign In" : "Create Account"
            )}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-[#848E9C] mt-6">
        {tab === "login" ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => { setTab(tab === "login" ? "register" : "login"); setError(""); }}
          className="text-[#F0B90B] font-semibold hover:underline"
        >
          {tab === "login" ? "Register" : "Sign In"}
        </button>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F8F9FA] px-6 py-12">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-[#848E9C]">
            <LoadingSpinner size={20} />
            <span>Loading…</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
