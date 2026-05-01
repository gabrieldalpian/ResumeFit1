import { PDFParse } from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  const text = result.text?.trim();

  if (!text || text.length < 50) {
    throw new Error(
      "Could not extract meaningful text from the PDF. Ensure it is not image-only or password-protected."
    );
  }
  return text;
}

export function extractJobTitle(jobDescription: string): string {
  const lines = jobDescription.split("\n").filter((l) => l.trim().length > 0);
  const firstLine = lines[0]?.trim() ?? "";
  return firstLine.length > 80 ? firstLine.slice(0, 80) + "…" : firstLine;
}
