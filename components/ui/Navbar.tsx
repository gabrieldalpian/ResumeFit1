"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
          : "bg-white border-b border-[#E5E7EB]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#F0B90B] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#0F1117]" fill="currentColor">
              <rect x="1" y="9" width="2.5" height="6" rx="0.5"/>
              <rect x="6.75" y="5" width="2.5" height="10" rx="0.5"/>
              <rect x="12.5" y="1" width="2.5" height="14" rx="0.5"/>
            </svg>
          </div>
          <span className="font-bold text-[#0F1117] text-[15px] tracking-tight">
            Resume<span className="text-[#F0B90B]">Fit</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/dashboard"
                    ? "text-[#0F1117] bg-[#F9FAFB]"
                    : "text-[#6B7280] hover:text-[#0F1117] hover:bg-[#F9FAFB]"
                }`}
              >
                Dashboard
              </Link>
              <Link href="/analyze" className="btn-primary text-sm ml-2">
                New Analysis
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="ml-1 px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:text-[#F6465D] hover:bg-[#FFF1F2] transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#0F1117] hover:bg-[#F9FAFB] transition-colors"
              >
                Sign in
              </Link>
              <Link href="/login?tab=register" className="btn-primary text-sm ml-2">
                Get started free
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-[#E5E7EB] bg-white overflow-hidden transition-all duration-200 ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm text-[#6B7280] py-2 font-medium" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link href="/analyze" className="btn-primary text-sm text-center" onClick={() => setMenuOpen(false)}>New Analysis</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-[#F6465D] py-2 text-left">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-[#6B7280] py-2 font-medium" onClick={() => setMenuOpen(false)}>Sign in</Link>
              <Link href="/login?tab=register" className="btn-primary text-sm text-center" onClick={() => setMenuOpen(false)}>Get started free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
