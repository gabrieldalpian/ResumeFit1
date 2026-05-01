import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AnalysisResult {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  strengthsForRole: string[];
  weaknessesForRole: string[];
  improvementSuggestions: string[];
  rewrittenBullet: {
    before: string;
    after: string;
  };
}

const ANALYSIS_PROMPT = (resumeText: string, jobDescription: string) => `
You are an expert technical recruiter and career coach. Analyze the following resume against the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON (no markdown, no code blocks, no extra text):

{
  "matchScore": <number 0-100>,
  "matchingSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "strengthsForRole": ["strength1", "strength2"],
  "weaknessesForRole": ["weakness1", "weakness2"],
  "improvementSuggestions": ["suggestion1", "suggestion2"],
  "rewrittenBullet": {
    "before": "<exact bullet from resume that needs improvement>",
    "after": "<improved, metrics-driven version>"
  }
}

Rules:
- Be critical and realistic. Do NOT inflate the score.
- Focus on software engineering roles.
- matchScore reflects actual keyword, skill, and experience overlap.
- No generic advice — be specific to this resume and job.
- No text outside the JSON object.
`;

export async function analyzeResumeWithGemini(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(
    ANALYSIS_PROMPT(resumeText, jobDescription)
  );
  const raw = result.response.text();

  const cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/gi, "")
    .trim();

  let parsed: AnalysisResult;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Gemini returned invalid JSON. Please try again.");
  }

  validateAnalysisResult(parsed);
  return parsed;
}

function validateAnalysisResult(data: unknown): asserts data is AnalysisResult {
  if (typeof data !== "object" || data === null)
    throw new Error("Invalid analysis result");

  const d = data as Record<string, unknown>;

  if (typeof d.matchScore !== "number" || d.matchScore < 0 || d.matchScore > 100)
    throw new Error("Invalid matchScore");
  if (!Array.isArray(d.matchingSkills)) throw new Error("Invalid matchingSkills");
  if (!Array.isArray(d.missingSkills)) throw new Error("Invalid missingSkills");
  if (!Array.isArray(d.strengthsForRole)) throw new Error("Invalid strengthsForRole");
  if (!Array.isArray(d.weaknessesForRole)) throw new Error("Invalid weaknessesForRole");
  if (!Array.isArray(d.improvementSuggestions)) throw new Error("Invalid improvementSuggestions");
  if (
    typeof d.rewrittenBullet !== "object" ||
    d.rewrittenBullet === null ||
    typeof (d.rewrittenBullet as Record<string, unknown>).before !== "string" ||
    typeof (d.rewrittenBullet as Record<string, unknown>).after !== "string"
  ) {
    throw new Error("Invalid rewrittenBullet");
  }
}
