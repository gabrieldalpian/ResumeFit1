import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Providers } from "@/components/ui/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResumeFit — AI-Powered Resume Match Analyzer",
  description:
    "Upload your resume and paste a job description to get an instant AI-powered match score, skill gap analysis, and actionable improvement suggestions.",
  keywords: "resume, AI, job matching, skill analysis, career",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
