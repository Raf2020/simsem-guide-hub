import { useState, useRef, useEffect, useMemo } from "react";
import { Search, MapPin, Globe2, Landmark, X, Compass } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  placesData, countriesAPI, getTopLevelPlacesByCountry, getDescendants,
  type Place, type CountryInfo, type GuideTour,
} from "@/data/placesData";

export interface LocationSearchResult {
  type: "country" | "destination" | "place" | "activity";
  id: string;
  name: string;
  countryCode: string;
  countryName: string;
  parentDestinationId?: string;
  parentDestinationName?: string;
  placeType?: string;
  tourType?: string;
  tourPrice?: number;
  tourDuration?: string;
}

function getTopLevelAncestor(place: Place): Place {
  let current = place;
  while (current.parent_id) {
    const parent = placesData.find((p) => p.id === current.parent_id);
    if (!parent) break;
    current = parent;
  }
  return current;
}

function buildSearchIndex(): LocationSearchResult[] {
  const results: LocationSearchResult[] = [];

  // Countries
  countriesAPI.forEach((c) => {
    results.push({
      type: "country",
      id: c.code,
      name: c.name,
      countryCode: c.code,
      countryName: c.name,
    });
  });

  // All places
  placesData.forEach((place) => {
    const country = countriesAPI.find((c) => c.code === place.country);
    if (!country) return;
    const ancestor = getTopLevelAncestor(place);
    const isTopLevel = place.parent_id === null;

    results.push({
      type: isTopLevel ? "destination" : "place",
      id: place.id,
      name: place.name,
      countryCode: country.code,
      countryName: country.name,
      parentDestinationId: isTopLevel ? place.id : ancestor.id,
      parentDestinationName: isTopLevel ? undefined : ancestor.name,
      placeType: place.type,
    });
  });

  return results;
}

interface LocationSearchBarProps {
  onSelectCountry: (countryCode: string) => void;
  onSelectDestination: (countryCode: string, destinationId: string) => void;
  onSelectTour?: (tourId: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "hero" | "inline";
  countryFilter?: string;
  tours?: GuideTour[];
}

export function LocationSearchBar({
  onSelectCountry,
  onSelectDestination,
  onSelectTour,
  placeholder = "Search a country, city, or attraction...",
  className = "",
  variant = "inline",
  countryFilter,
  tours = [],
}: LocationSearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  // Build tour search entries
  const tourIndex = useMemo(() => {
    return tours.filter(t => t.status === "published").map((tour): LocationSearchResult => {
      const place = placesData.find(p => p.id === tour.main_place_id);
      const country = countriesAPI.find(c => c.code === place?.country);
      const ancestor = place ? getTopLevelAncestor(place) : null;
      return {
        type: "activity",
        id: tour.id,
        name: tour.title,
        countryCode: place?.country || "",
        countryName: country?.name || "",
        parentDestinationId: ancestor?.id,
        parentDestinationName: ancestor?.name,
        tourType: tour.tour_type,
        tourPrice: tour.price,
        tourDuration: tour.duration,
      };
    });
  }, [tours]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const allItems = [...searchIndex, ...tourIndex];
    return allItems
      .filter((r) => r.name.toLowerCase().includes(q))
      .filter((r) => !countryFilter || r.countryCode === countryFilter)
      .slice(0, 15);
  }, [query, searchIndex, tourIndex, countryFilter]);

  // Group results
  const grouped = useMemo(() => {
    const countries = results.filter((r) => r.type === "country");
    const destinations = results.filter((r) => r.type === "destination");
    const places = results.filter((r) => r.type === "place");
    const activities = results.filter((r) => r.type === "activity");
    return { countries, destinations, places, activities };
  }, [results]);

  const flatResults = useMemo(() => [
    ...grouped.countries,
    ...grouped.destinations,
    ...grouped.places,
    ...grouped.activities,
  ], [grouped]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (result: LocationSearchResult) => {
    if (result.type === "country") {
      onSelectCountry(result.countryCode);
    } else if (result.type === "activity") {
      // For tours, navigate to the destination they belong to
      if (onSelectTour) {
        onSelectTour(result.id);
      } else {
        const destId = result.parentDestinationId || "";
        if (destId) onSelectDestination(result.countryCode, destId);
      }
    } else {
      const destId = result.parentDestinationId || result.id;
      onSelectDestination(result.countryCode, destId);
    }
    setQuery("");
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || flatResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(flatResults[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const isHero = variant === "hero";

  return (
    <div ref={containerRef} className={`relative z-50 ${className}`}>
      <div className="relative">
        <Search
          size={isHero ? 20 : 16}
          className={`absolute left-4 top-1/2 -translate-y-1/2 ${
            isHero ? "text-muted-foreground" : "text-muted-foreground"
          }`}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => query.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full bg-card border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
            isHero
              ? "h-14 sm:h-16 pl-12 pr-12 rounded-2xl text-base sm:text-lg shadow-xl"
              : "h-10 pl-10 pr-10 rounded-xl text-sm"
          }`}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={isHero ? 18 : 14} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && flatResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-xl shadow-2xl overflow-hidden z-50 max-h-[380px] overflow-y-auto">
          {/* Countries */}
          {grouped.countries.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] flex items-center gap-1.5">
                <Globe2 size={11} /> Countries
              </p>
              {grouped.countries.map((r, i) => {
                const globalIdx = i;
                const country = countriesAPI.find((c) => c.code === r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r)}
                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                      activeIndex === globalIdx
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted/50 text-foreground"
                    }`}
                  >
                    <span className="text-lg">{country?.flag}</span>
                    <div>
                      <span className="text-sm font-semibold">{r.name}</span>
                      <span className="text-[11px] text-muted-foreground ml-2">All tours</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Destinations */}
          {grouped.destinations.length > 0 && (
            <div className={grouped.countries.length > 0 ? "border-t border-border/30" : ""}>
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] flex items-center gap-1.5">
                <MapPin size={11} /> Destinations
              </p>
              {grouped.destinations.map((r, i) => {
                const globalIdx = grouped.countries.length + i;
                const country = countriesAPI.find((c) => c.code === r.countryCode);
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r)}
                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                      activeIndex === globalIdx
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted/50 text-foreground"
                    }`}
                  >
                    <MapPin size={14} className="text-primary shrink-0" />
                    <div className="min-w-0">
                      <span className="text-sm font-semibold">{r.name}</span>
                      <span className="text-[11px] text-muted-foreground ml-2">{country?.flag} {r.countryName}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Places (attractions, sites, etc.) */}
          {grouped.places.length > 0 && (
            <div className={(grouped.countries.length > 0 || grouped.destinations.length > 0) ? "border-t border-border/30" : ""}>
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] flex items-center gap-1.5">
                <Landmark size={11} /> Places & Attractions
              </p>
              {grouped.places.map((r, i) => {
                const globalIdx = grouped.countries.length + grouped.destinations.length + i;
                const country = countriesAPI.find((c) => c.code === r.countryCode);
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r)}
                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                      activeIndex === globalIdx
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted/50 text-foreground"
                    }`}
                  >
                    <Landmark size={14} className="text-accent shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-semibold">{r.name}</span>
                      <span className="text-[11px] text-muted-foreground ml-1.5 capitalize">· {r.placeType}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0">
                      {r.parentDestinationName}, {country?.flag}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Activities / Tours */}
          {grouped.activities.length > 0 && (
            <div className={(grouped.countries.length > 0 || grouped.destinations.length > 0 || grouped.places.length > 0) ? "border-t border-border/30" : ""}>
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] flex items-center gap-1.5">
                <Compass size={11} /> Activities & Tours
              </p>
              {grouped.activities.map((r, i) => {
                const globalIdx = grouped.countries.length + grouped.destinations.length + grouped.places.length + i;
                return (
                  <button
                    key={`tour-${r.id}`}
                    onClick={() => handleSelect(r)}
                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                      activeIndex === globalIdx
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted/50 text-foreground"
                    }`}
                  >
                    <Compass size={14} className="text-primary shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-semibold line-clamp-1">{r.name}</span>
                      <span className="text-[11px] text-muted-foreground ml-1.5 capitalize">· {r.tourType}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-primary">${r.tourPrice}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">{r.tourDuration}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* No results */}
      {open && query.trim() && flatResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-xl shadow-2xl p-6 text-center z-50">
          <MapPin size={24} className="mx-auto text-muted-foreground/40 mb-2" />
          <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
