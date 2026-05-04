"use client";

interface SkillsListProps {
  title: string;
  skills: string[];
  variant: "success" | "error" | "warning";
  icon: string;
}

const variantStyles = {
  success: {
    tag: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-[#0ECB81]",
    header: "text-[#0ECB81]",
  },
  error: {
    tag: "bg-red-50 text-red-700 border border-red-200",
    dot: "bg-[#F6465D]",
    header: "text-[#F6465D]",
  },
  warning: {
    tag: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    dot: "bg-[#F0B90B]",
    header: "text-[#F0B90B]",
  },
};

export function SkillsList({ title, skills, variant, icon }: SkillsListProps) {
  const styles = variantStyles[variant];

  if (skills.length === 0) {
    return (
      <div className="card">
        <h3 className="font-semibold text-sm flex items-center gap-1.5 mb-2">
          <span className="text-base">{icon}</span>
          <span>{title}</span>
          <span className="text-secondary text-xs font-normal ml-auto">0 items</span>
        </h3>
        <p className="text-secondary text-xs">None identified.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="font-semibold text-sm flex items-center gap-1.5 mb-2.5">
        <span className="text-base">{icon}</span>
        <span>{title}</span>
        <span className={`text-xs font-semibold ml-auto ${styles.header}`}>
          {skills.length}
        </span>
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, i) => (
          <span key={i} className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles.tag}`}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
