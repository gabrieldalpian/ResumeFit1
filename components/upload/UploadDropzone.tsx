"use client";

import { useCallback, useState } from "react";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export function UploadDropzone({ onFileSelect, selectedFile }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type === "application/pdf") onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <label
      className={`relative flex flex-col items-center justify-center w-full h-52 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
        isDragging
          ? "border-[#F0B90B] bg-[#F0B90B08]"
          : selectedFile
          ? "border-[#0ECB81] bg-[#0ECB8108]"
          : "border-[#E6E8EA] bg-white hover:border-[#F0B90B] hover:bg-[#F0B90B05]"
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
      />

      {selectedFile ? (
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <div className="w-12 h-12 rounded-full bg-[#0ECB811A] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#0ECB81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-[#1E2026]">{selectedFile.name}</p>
            <p className="text-sm text-[#848E9C] mt-1">
              {(selectedFile.size / 1024).toFixed(1)} KB — Click to replace
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <div className="w-12 h-12 rounded-full bg-[#F0B90B1A] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#F0B90B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-[#1E2026]">
              {isDragging ? "Drop it here" : "Drop your resume here"}
            </p>
            <p className="text-sm text-[#848E9C] mt-1">or click to browse — PDF only, max 5MB</p>
          </div>
        </div>
      )}
    </label>
  );
}
