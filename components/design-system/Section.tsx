interface SectionProps {
  children: React.ReactNode;
  variant?: "white" | "light";
  className?: string;
}

export function Section({ children, variant = "white", className = "" }: SectionProps) {
  const bgClass = variant === "light" ? "bg-[#F8F9FA]" : "bg-white";
  return (
    <section className={`${bgClass} py-20 lg:py-24 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
