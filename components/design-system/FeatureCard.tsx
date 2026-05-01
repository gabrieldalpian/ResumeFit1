interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  variant?: "outline" | "filled";
}

export function FeatureCard({
  icon,
  title,
  description,
  variant = "outline",
}: FeatureCardProps) {
  const cardClass =
    variant === "filled"
      ? "bg-[#F8F9FA] border border-[#E6E8EA]"
      : "border border-[#E6E8EA] hover:border-[#F0B90B] hover:shadow-md";

  return (
    <div
      className={`p-6 lg:p-8 rounded-xl transition-all duration-200 ${cardClass}`}
    >
      {icon && (
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-[#F0B90B1A] flex items-center justify-center mb-4 text-[#F0B90B]">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-[#1E2026] text-lg mb-2">{title}</h3>
      <p className="text-[#848E9C] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
