import { MapPin } from "lucide-react";
import type { Place } from "@/data/placesData";

interface ChildPlaceChipsProps {
  places: Place[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  title?: string;
  /** Limit visible chips; rest collapsed (0 = no limit) */
  maxVisible?: number;
}

/**
 * Clickable place chips for filtering tours by attraction/sub-place.
 * Improves SEO via internal linking + UX discovery.
 */
export function ChildPlaceChips({
  places,
  selectedIds,
  onToggle,
  title = "Popular places to explore",
  maxVisible = 0,
}: ChildPlaceChipsProps) {
  if (places.length === 0) return null;
  const visible = maxVisible > 0 ? places.slice(0, maxVisible) : places;

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <MapPin size={12} />
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {visible.map((p) => {
          const active = selectedIds.has(p.id);
          return (
            <button
              key={p.id}
              onClick={() => onToggle(p.id)}
              aria-pressed={active}
              className={`text-[12px] px-3 py-1.5 rounded-full border transition-all ${
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-foreground border-border/60 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {p.name}
            </button>
          );
        })}
        {maxVisible > 0 && places.length > maxVisible && (
          <span className="text-[11px] text-muted-foreground self-center px-2">
            +{places.length - maxVisible} more
          </span>
        )}
      </div>
    </div>
  );
}
