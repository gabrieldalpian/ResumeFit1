"use client";

interface ImprovementListProps {
  title: string;
  items: string[];
  icon: string;
  numbered?: boolean;
}

export function ImprovementList({ title, items, icon, numbered = false }: ImprovementListProps) {
  if (items.length === 0) return null;

  return (
    <div className="card">
      <h3 className="font-semibold text-sm flex items-center gap-1.5 mb-2.5">
        <span className="text-base">{icon}</span>
        <span>{title}</span>
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            {numbered ? (
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F0B90B1A] text-[#F0B90B] text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
            ) : (
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#848E9C] mt-1.5" />
            )}
            <span className="text-[#1E2026] text-xs leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
