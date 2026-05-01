interface SectionHeaderProps {
  label?: string;
  title: string;
  description: string;
  alignment?: "center" | "left";
}

export function SectionHeader({
  label,
  title,
  description,
  alignment = "center",
}: SectionHeaderProps) {
  const alignClass = alignment === "center" ? "text-center max-w-2xl mx-auto" : "";

  return (
    <div className={`mb-12 lg:mb-16 ${alignClass}`}>
      {label && (
        <p className="text-sm font-semibold tracking-wider uppercase text-[#F0B90B] mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2026] mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-base sm:text-lg text-[#848E9C] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
