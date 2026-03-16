import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Search, X } from "lucide-react";
import { getPlaceById, type Place } from "@/data/placesData";

export function PlaceTag({ placeId, onRemove }: { placeId: string; onRemove?: () => void }) {
  const place = getPlaceById(placeId);
  if (!place) return null;
  return (
    <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
      <MapPin size={12} />
      {place.name}
      {onRemove && (
        <button onClick={onRemove} className="ml-0.5 hover:text-destructive">
          <X size={12} />
        </button>
      )}
    </span>
  );
}

export function PlaceMultiSelect({
  available,
  selected,
  onChange,
}: {
  available: Place[];
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = available.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      !selected.includes(p.id)
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 min-h-[32px]">
        {selected.map((id) => (
          <PlaceTag key={id} placeId={id} onRemove={() => onChange(selected.filter((s) => s !== id))} />
        ))}
      </div>
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 h-9 text-sm"
        />
      </div>
      {search && filtered.length > 0 && (
        <div className="border border-border rounded-md max-h-40 overflow-y-auto bg-popover">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => { onChange([...selected, p.id]); setSearch(""); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-accent/30 flex items-center gap-2 transition-colors"
            >
              <MapPin size={12} className="text-muted-foreground" />
              <span>{p.name}</span>
              <span className="text-xs text-muted-foreground ml-auto capitalize">{p.type}</span>
            </button>
          ))}
        </div>
      )}
      {search && filtered.length === 0 && (
        <p className="text-xs text-muted-foreground px-1">No places found</p>
      )}
    </div>
  );
}
