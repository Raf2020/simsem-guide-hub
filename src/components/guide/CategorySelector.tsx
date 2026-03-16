import { experienceCategories, type ExperienceCategory } from "@/data/placesData";

interface CategorySelectorProps {
  onSelect: (category: ExperienceCategory) => void;
}

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  return (
    <div className="space-y-5">
      <div className="text-center space-y-1.5">
        <p className="text-sm text-muted-foreground">What kind of experience are you proposing?</p>
      </div>
      <div className="grid gap-3">
        {experienceCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="group relative flex items-center gap-4 p-5 rounded-xl border-2 border-border bg-card text-left transition-all hover:border-primary/50 hover:shadow-md hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <span className="text-3xl shrink-0">{cat.icon}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{cat.description}</p>
              <p className="text-[11px] text-muted-foreground/60 mt-1.5">
                {cat.tourTypes.length} tour types available
              </p>
            </div>
            <span className="text-muted-foreground/30 group-hover:text-primary transition-colors text-lg">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
