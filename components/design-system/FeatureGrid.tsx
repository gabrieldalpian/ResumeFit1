interface FeatureGridProps {
  columns?: 2 | 3;
  children: React.ReactNode;
}

export function FeatureGrid({ columns = 3, children }: FeatureGridProps) {
  const gridClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <div className={`grid gap-6 lg:gap-8 ${gridClass}`}>
      {children}
    </div>
  );
}
