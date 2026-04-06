import { useState, useMemo, useRef, useEffect } from "react";
import {
  MapPin, Clock, Star, Search, SlidersHorizontal, X, ArrowLeft,
  ChevronRight, ChevronDown, ArrowRight, Globe2, Filter, Compass, Shield
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { LocationSearchBar } from "@/components/search/LocationSearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  countriesAPI, getTopLevelPlacesByCountry, getDescendants, getPlaceById,
  getPlaceBreadcrumb, mockGuideTours, destinationImages, tourTypeImages, placeDescriptions,
  experienceCategories, type ExperienceCategory,
  type Place, type GuideTour, type CountryInfo,
} from "@/data/placesData";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop";
function getTourImage(tour: GuideTour): string {
  return tour.image || destinationImages[tour.main_place_id] || tourTypeImages[tour.tour_type] || FALLBACK_IMG;
}

function getToursForDestination(destinationId: string): GuideTour[] {
  const descendants = getDescendants(destinationId);
  const descendantIds = new Set([destinationId, ...descendants.map((d) => d.id)]);
  return mockGuideTours.filter(
    (t) => t.status === "published" &&
      (descendantIds.has(t.main_place_id) || t.places.some((p) => descendantIds.has(p)))
  );
}

function getToursForCountry(countryCode: string): GuideTour[] {
  const destinations = getTopLevelPlacesByCountry(countryCode);
  const allIds = new Set<string>();
  destinations.forEach((d) => {
    allIds.add(d.id);
    getDescendants(d.id).forEach((p) => allIds.add(p.id));
  });
  return mockGuideTours.filter(
    (t) => t.status === "published" &&
      (allIds.has(t.main_place_id) || t.places.some((p) => allIds.has(p)))
  );
}

function getCityCountForCountry(countryCode: string): number {
  return getTopLevelPlacesByCountry(countryCode).length;
}

// ─── Simsem-style header ───
function AppHeader({ title, onBack, rightContent }: { title: string; onBack?: () => void; rightContent?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 bg-[hsl(var(--foreground))] border-b border-white/10 safe-top">
      <div className="flex items-center h-14 px-4 max-w-6xl mx-auto">
        {onBack ? (
          <button onClick={onBack} className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full active:bg-white/10 transition-colors">
            <ArrowLeft size={22} className="text-white" />
          </button>
        ) : (
          <span className="text-2xl font-script text-[hsl(var(--accent))]">Simsem</span>
        )}
        <h1 className="flex-1 text-center text-base font-semibold text-white truncate px-2">
          {title}
        </h1>
        <div className="w-10 flex items-center justify-center">
          {rightContent}
        </div>
      </div>
    </header>
  );
}

// ─── Tour card (Simsem OTA style) ───
function TourCard({ tour }: { tour: GuideTour }) {
  const mainPlace = getPlaceById(tour.main_place_id);
  const catInfo = experienceCategories.find(c => c.id === tour.category);
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/30 hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
         <img
          src={getTourImage(tour)}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
        {/* Tour type badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-card/90 backdrop-blur-md text-foreground text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm">{tour.tour_type}</span>
        </div>
        {/* Price badge */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-card/95 backdrop-blur-md text-foreground font-bold text-sm px-3 py-1.5 rounded-lg shadow-md">
            ${tour.price}
          </span>
        </div>
      </div>
      <div className="p-4">
        {/* Meta row */}
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <MapPin size={10} className="text-destructive" />
            {mainPlace?.name}
          </span>
          <span className="flex items-center gap-1"><Clock size={10} /> {tour.duration}</span>
          {catInfo && <span className="flex items-center gap-1">{catInfo.icon}</span>}
        </div>
        <h3 className="text-sm font-bold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{tour.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-destructive font-bold text-sm">From ${tour.price} <span className="text-[10px] font-normal text-muted-foreground">/person</span></span>
          <span className="flex items-center gap-0.5 text-[11px] text-accent"><Star size={11} fill="currentColor" /> 4.8</span>
        </div>
        {tour.places.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5 pt-2.5 border-t border-border/30">
            {tour.places.slice(0, 2).map((pid) => {
              const p = getPlaceById(pid);
              return p ? (
                <span key={pid} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{p.name}</span>
              ) : null;
            })}
            {tour.places.length > 2 && (
              <span className="text-[10px] text-muted-foreground">+{tour.places.length - 2}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Destination card (matching Simsem website style) ───
function DestinationCard({ place, tourCount, countryName, onClick }: { place: Place; tourCount: number; countryName: string; onClick: () => void }) {
  const description = placeDescriptions[place.id] || `Discover ${place.name} tours with local guides and explore the best things to do in ${place.name}, ${countryName}.`;
  return (
    <div className="rounded-2xl overflow-hidden border border-border/40 bg-card shadow-sm flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={destinationImages[place.id] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop"}
          alt={`${place.name} tours`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        {/* Tour count badge */}
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-md text-foreground text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <MapPin size={11} />
          {tourCount} {tourCount === 1 ? "tour" : "tours"}
        </div>
        {/* City name pin */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <MapPin size={12} className="text-accent" />
          <span className="text-primary-foreground font-semibold text-sm drop-shadow-md">{place.name}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold text-foreground mb-1.5">Tours in {place.name}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-3 line-clamp-3">
          {description}
        </p>
        {/* Star rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={13} className="fill-accent text-accent" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">Top rated</span>
        </div>
        {/* CTA button */}
        <button
          onClick={onClick}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.97] transition-all duration-150"
        >
          Explore {place.name}
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Grouped tour type filter (sidebar) ───
function GroupedTourTypeFilter({
  availableTypes,
  selectedTypes,
  toggleType,
  mode = "checkbox",
}: {
  availableTypes: readonly string[];
  selectedTypes: Set<string>;
  toggleType: (type: string) => void;
  mode?: "checkbox" | "pill";
}) {
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());

  const toggleCat = (catId: string) => {
    setExpandedCats((prev) => {
      const n = new Set(prev);
      n.has(catId) ? n.delete(catId) : n.add(catId);
      return n;
    });
  };

  // Only show categories that have at least one available type, dedup across categories
  const seen = new Set<string>();
  const visibleCategories = experienceCategories
    .map((cat) => {
      const types = cat.tourTypes.filter((t) => availableTypes.includes(t) && !seen.has(t));
      types.forEach((t) => seen.add(t));
      return { ...cat, types };
    })
    .filter((cat) => cat.types.length > 0);

  if (mode === "pill") {
    // Mobile bottom sheet: pills grouped by category
    return (
      <div className="space-y-4">
        {visibleCategories.map((cat) => (
          <div key={cat.id}>
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <span>{cat.icon}</span> {cat.name}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cat.types.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`text-[12px] px-2.5 py-1 rounded-full border transition-colors ${
                    selectedTypes.has(type)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border/60"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop sidebar: collapsible checkbox groups
  return (
    <div className="space-y-2">
      {visibleCategories.map((cat) => {
        const isExpanded = expandedCats.has(cat.id);
        const selectedInCat = cat.types.filter((t) => selectedTypes.has(t)).length;
        return (
          <div key={cat.id}>
            <button
              onClick={() => toggleCat(cat.id)}
              className="w-full flex items-center gap-1.5 text-left py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight size={12} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
              <span>{cat.icon}</span>
              <span className="uppercase tracking-wider">{cat.name}</span>
              {selectedInCat > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {selectedInCat}
                </span>
              )}
            </button>
            {isExpanded && (
              <div className="ml-5 space-y-0 pb-1">
                {cat.types.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-0.5 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedTypes.has(type)}
                      onChange={() => toggleType(type)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-[12px]">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Bottom sheet filter (mobile) ───
function FilterSheet({
  open, onClose, allPlaces, selectedPlaces, selectedTypes, togglePlace, toggleType, clearFilters, activeCount, availableTypes
}: {
  open: boolean; onClose: () => void;
  allPlaces: Place[]; selectedPlaces: Set<string>; selectedTypes: Set<string>;
  togglePlace: (id: string) => void; toggleType: (type: string) => void;
  clearFilters: () => void; activeCount: number; availableTypes: readonly string[];
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl max-h-[75vh] flex flex-col animate-in slide-in-from-bottom duration-300 safe-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
          <h2 className="text-lg font-bold text-foreground">Filters</h2>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-primary font-medium">Clear all</button>
            )}
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-muted">
              <X size={16} className="text-foreground" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {allPlaces.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <MapPin size={14} /> Places
              </h3>
              <div className="flex flex-wrap gap-2">
                {allPlaces.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => togglePlace(p.id)}
                    className={`text-[13px] px-3 py-1.5 rounded-full border transition-colors ${
                      selectedPlaces.has(p.id)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border/60"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <SlidersHorizontal size={14} /> Tour Type
            </h3>
            <GroupedTourTypeFilter
              availableTypes={availableTypes}
              selectedTypes={selectedTypes}
              toggleType={toggleType}
              mode="pill"
            />
          </div>
        </div>
        <div className="px-5 py-4 border-t border-border/50 safe-bottom">
          <Button onClick={onClose} className="w-full h-12 text-base rounded-2xl">
            Show results
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Category Tabs ───
function CategoryTabs({ selected, onSelect }: { selected: ExperienceCategory | null; onSelect: (cat: ExperienceCategory | null) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
          selected === null
            ? "bg-primary text-primary-foreground border-primary shadow-sm"
            : "bg-card text-muted-foreground border-border/60 hover:border-border hover:text-foreground"
        }`}
      >
        All
      </button>
      {experienceCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(selected === cat.id ? null : cat.id)}
          className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
            selected === cat.id
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card text-muted-foreground border-border/60 hover:border-border hover:text-foreground"
          }`}
        >
          <span>{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}

// ─── Main page ───

type View =
  | { level: "countries" }
  | { level: "country"; countryCode: string }
  | { level: "destination"; countryCode: string; destinationId: string };

const ExperiencesPage = () => {
  const [view, setView] = useState<View>({ level: "countries" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const activeCountry = view.level !== "countries" ? countriesAPI.find((c) => c.code === view.countryCode) : null;
  const activeDestinationId = view.level === "destination" ? view.destinationId : null;
  const activeDestination = activeDestinationId ? getPlaceById(activeDestinationId) : null;
  const allDescendantPlaces = activeDestinationId ? getDescendants(activeDestinationId) : [];
  const breadcrumb = activeDestinationId ? getPlaceBreadcrumb(activeDestinationId) : [];

  // Get available tour types: only show types that exist in actual tours at current level
  const availableTourTypes = useMemo(() => {
    // Get all unfiltered tours at current view level
    let baseTours: GuideTour[] = [];
    if (view.level === "country" && view.countryCode) {
      baseTours = getToursForCountry(view.countryCode);
    } else if (activeDestinationId) {
      baseTours = getToursForDestination(activeDestinationId);
    }
    // Filter by category if selected
    if (selectedCategory) {
      baseTours = baseTours.filter((t) => t.category === selectedCategory);
    }
    // Extract unique tour types that actually exist
    const existingTypes = new Set(baseTours.map((t) => t.tour_type));
    // Preserve category ordering
    const allOrdered = selectedCategory
      ? experienceCategories.find(c => c.id === selectedCategory)?.tourTypes || []
      : [...new Set(experienceCategories.flatMap(c => c.tourTypes))];
    return allOrdered.filter((t) => existingTypes.has(t));
  }, [view, activeDestinationId, selectedCategory]);

  const tours = useMemo(() => {
    if (!activeDestinationId) return [];
    let result = getToursForDestination(activeDestinationId);
    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }
    if (selectedPlaces.size > 0) {
      result = result.filter((t) =>
        t.places.some((p) => selectedPlaces.has(p)) || selectedPlaces.has(t.main_place_id)
      );
    }
    if (selectedTypes.size > 0) {
      result = result.filter((t) => selectedTypes.has(t.tour_type));
    }
    return result;
  }, [activeDestinationId, selectedPlaces, selectedTypes, selectedCategory]);

  const togglePlace = (id: string) => {
    setSelectedPlaces((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleType = (type: string) => {
    setSelectedTypes((prev) => { const n = new Set(prev); n.has(type) ? n.delete(type) : n.add(type); return n; });
  };
  const clearFilters = () => { setSelectedPlaces(new Set()); setSelectedTypes(new Set()); setSelectedCategory(null); };
  const activeFilterCount = selectedPlaces.size + selectedTypes.size + (selectedCategory ? 1 : 0);

  const goToCountry = (code: string) => {
    setView({ level: "country", countryCode: code });
    setSearchQuery("");
    clearFilters();
  };
  const goToDestination = (countryCode: string, destinationId: string) => {
    setView({ level: "destination", countryCode, destinationId });
    setSearchQuery("");
    clearFilters();
  };
  const goBack = () => {
    if (view.level === "destination") setView({ level: "country", countryCode: view.countryCode });
    else setView({ level: "countries" });
    clearFilters();
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* ═══════ LEVEL 1: Countries ═══════ */}
      {view.level === "countries" && (
        <>
          {/* Simsem hero */}
          <div className="relative h-[340px] sm:h-[420px]">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1600&q=80"
                alt="Authentic tours in the Arab world"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--foreground))]/90 via-[hsl(var(--foreground))]/40 to-[hsl(var(--foreground))]/10" />
            
            {/* Hero nav */}
            <div className="absolute top-0 left-0 right-0 z-10">
              <div className="flex items-center justify-between px-5 sm:px-8 py-4 max-w-6xl mx-auto">
                <span className="text-3xl font-script text-[hsl(var(--accent))]">Simsem</span>
                <div className="hidden sm:flex items-center gap-6 text-sm text-white/80">
                  <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
                  <span className="text-white font-semibold border-b-2 border-[hsl(var(--accent))] pb-0.5">Experiences</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Travel Guide</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Contact Us</span>
                </div>
              </div>
            </div>

            {/* Hero content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="max-w-6xl mx-auto">
                <span className="text-[hsl(var(--accent))] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Experiences</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white leading-tight mb-4 max-w-xl">
                  Authentic Tours with Local Guides in Egypt, Jordan & the Arab World
                </h1>
                {/* Hero location search */}
                <LocationSearchBar
                  onSelectCountry={goToCountry}
                  onSelectDestination={goToDestination}
                  placeholder="Where do you want to go? Try Petra, diving, food tour..."
                  variant="hero"
                  className="max-w-lg"
                  tours={mockGuideTours}
                />
              </div>
            </div>
          </div>

          {/* Intro text */}
          <div className="px-5 sm:px-8 py-8 max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Find top-rated tours in Egypt and Jordan, including Cairo cultural tours, Petra excursions, Wadi Rum desert experiences, food tours, and immersive local activities. Book authentic experiences led by trusted local guides across the Arab world.
            </p>
          </div>

          {/* Featured Experiences */}
          <div className="px-5 sm:px-8 pb-10 max-w-6xl mx-auto w-full">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] mb-5">Featured Experiences</p>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {mockGuideTours.slice(0, 6).map((tour) => {
                const mainPlace = getPlaceById(tour.main_place_id);
                return (
                  <div key={tour.id} className="shrink-0 w-56 sm:w-64 cursor-pointer group">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative">
                      <img
                        src={getTourImage(tour)}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-1.5">
                      <span className="flex items-center gap-0.5"><MapPin size={10} className="text-destructive" /> {mainPlace?.name}</span>
                      <span className="flex items-center gap-0.5"><Clock size={10} /> {tour.duration}</span>
                      <span className="flex items-center gap-0.5"><Star size={10} className="text-[hsl(var(--accent))]" fill="currentColor" /> 4.8</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 leading-snug mb-1.5 group-hover:text-primary transition-colors">{tour.title}</h3>
                    <span className="text-destructive font-bold text-sm">From ${tour.price} <span className="text-[10px] font-normal text-muted-foreground">/person</span></span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* "What We Offer" section */}
          <div className="text-center px-5 py-8 border-t border-border/30">
            <span className="text-[hsl(var(--accent))] text-xs font-bold uppercase tracking-[0.2em] block mb-2">What We Offer</span>
            <h2 className="text-2xl sm:text-3xl font-display text-foreground mb-3">
              Explore Experiences Across Egypt, Jordan & Beyond
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Choose from cultural tours, adventure experiences, local dining events, desert expeditions, and immersive activities led by verified guides across the Arab world.
            </p>
          </div>

          {/* Sticky search bar */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border/30">
            <div className="max-w-6xl mx-auto">
              <LocationSearchBar
                onSelectCountry={goToCountry}
                onSelectDestination={goToDestination}
                placeholder="Where do you want to go?"
                variant="inline"
              />
            </div>
          </div>

          <main className="flex-1 px-5 sm:px-8 pt-6 pb-12 max-w-6xl mx-auto w-full">
            <div className="space-y-4">
              {countriesAPI.map((country) => {
                  const cityCount = getCityCountForCountry(country.code);
                  const tourCount = getToursForCountry(country.code).length;
                  return (
                    <button
                      key={country.code}
                      onClick={() => goToCountry(country.code)}
                      className="group w-full text-left rounded-2xl overflow-hidden relative"
                    >
                      {/* Dark banner (Simsem style) */}
                      <div className="bg-[hsl(var(--foreground))] rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="text-2xl mt-0.5 shrink-0">{country.flag}</span>
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-display text-white mb-1.5">
                              Tours in {country.name}
                            </h3>
                            <p className="text-white/55 text-xs sm:text-sm leading-relaxed line-clamp-2 max-w-xl">
                              {country.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="hidden sm:block text-white/50 text-xs">{cityCount} cities</span>
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[hsl(var(--accent))]/20 transition-colors">
                            <ChevronRight size={16} className="text-white/70 group-hover:text-[hsl(var(--accent))] transition-colors" />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </main>
        </>
      )}

      {/* ═══════ LEVEL 2: Country with filters ═══════ */}
      {view.level === "country" && activeCountry && (() => {
        const countryDestinations = getTopLevelPlacesByCountry(activeCountry.code);
        const countryTours = (() => {
          let result = getToursForCountry(activeCountry.code);
          if (selectedCategory) {
            result = result.filter((t) => t.category === selectedCategory);
          }
          if (selectedPlaces.size > 0) {
            result = result.filter((t) => {
              for (const selectedId of selectedPlaces) {
                const descendants = getDescendants(selectedId);
                const allIds = new Set([selectedId, ...descendants.map(d => d.id)]);
                if (allIds.has(t.main_place_id) || t.places.some(p => allIds.has(p))) return true;
              }
              return false;
            });
          }
          if (selectedTypes.size > 0) {
            result = result.filter((t) => selectedTypes.has(t.tour_type));
          }
          return result;
        })();

        return (
          <>
            <AppHeader
              title={activeCountry.name}
              onBack={goBack}
              rightContent={
                <button
                  onClick={() => setFilterOpen(true)}
                  className="relative w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors"
                >
                  <Filter size={20} className="text-white" />
                  {activeFilterCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] text-[10px] font-bold rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              }
            />

            {/* Country hero banner — Simsem style */}
            <div className="relative h-48 sm:h-64 lg:h-72 overflow-hidden">
              <img
                src={activeCountry.heroImage}
                alt={`${activeCountry.name} tours`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--foreground))]/85 via-[hsl(var(--foreground))]/35 to-[hsl(var(--foreground))]/10" />
              
              {/* Hero content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{activeCountry.flag}</span>
                    <span className="text-[hsl(var(--accent))] text-xs font-bold uppercase tracking-[0.15em]">Explore</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-white mb-2.5">
                    Tours in {activeCountry.name}
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-2xl line-clamp-2 mb-3">
                    {activeCountry.description.split('.')[0]}.
                  </p>
                  {/* Trust signals — E-E-A-T */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <MapPin size={12} className="text-[hsl(var(--accent))]" />
                      <span>{countryDestinations.length} destinations</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <Compass size={12} className="text-[hsl(var(--accent))]" />
                      <span>{countryTours.length} guided tours</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />)}
                      <span className="ml-1">Top rated</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-white/70 text-xs">
                      <Shield size={12} className="text-[hsl(var(--accent))]" />
                      <span>Local verified guides</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border/30">
              <div className="max-w-6xl mx-auto">
                <LocationSearchBar
                  onSelectCountry={goToCountry}
                  onSelectDestination={goToDestination}
                  placeholder={`Search tours in ${activeCountry.name}...`}
                  variant="inline"
                  countryFilter={activeCountry.code}
                  tours={mockGuideTours}
                />
              </div>
            </div>

            {/* Category tabs */}
            <div className="px-4 py-3 border-b border-border/30 bg-background">
              <div className="max-w-6xl mx-auto">
                <CategoryTabs selected={selectedCategory} onSelect={(cat) => { setSelectedCategory(cat); setSelectedTypes(new Set()); }} />
              </div>
            </div>

            {/* Active filters (horizontal scroll) */}
            {activeFilterCount > 0 && (
              <div className="flex gap-1.5 px-4 py-2.5 overflow-x-auto no-scrollbar border-b border-border/30">
                {Array.from(selectedPlaces).map((pid) => {
                  const p = getPlaceById(pid);
                  return p ? (
                    <button key={pid} onClick={() => togglePlace(pid)} className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                      {p.name} <X size={10} />
                    </button>
                  ) : null;
                })}
                {Array.from(selectedTypes).map((type) => (
                  <button key={type} onClick={() => toggleType(type)} className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-xs px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                    {type} <X size={10} />
                  </button>
                ))}
                <button onClick={clearFilters} className="text-xs text-destructive font-medium px-2 whitespace-nowrap shrink-0">Clear</button>
              </div>
            )}

            <main className="flex-1 px-4 pt-6 pb-8 max-w-6xl mx-auto w-full">
              {/* Destination cards row (quick browse) */}
              {selectedPlaces.size === 0 && (
                <div className="mb-8">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Browse by destination</p>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {countryDestinations.map((place) => {
                      const destTourCount = getToursForDestination(place.id).length;
                      return (
                        <button
                          key={place.id}
                          onClick={() => goToDestination(activeCountry.code, place.id)}
                          className="group shrink-0 w-40 sm:w-44 rounded-xl overflow-hidden border border-border/40 bg-card shadow-sm active:scale-[0.97] transition-all hover:shadow-md"
                        >
                          <div className="aspect-[4/3] overflow-hidden relative">
                            <img
                              src={destinationImages[place.id] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop"}
                              alt={`${place.name} tours`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                            <span className="absolute bottom-2 left-2.5 text-primary-foreground text-sm font-semibold drop-shadow-md">{place.name}</span>
                            {destTourCount > 0 && (
                              <span className="absolute top-2 right-2 bg-card/85 backdrop-blur-sm text-foreground text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                                {destTourCount} tours
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Desktop sidebar + grid */}
              <div className="flex gap-6">
                {/* Desktop sidebar */}
                <aside className="w-52 shrink-0 hidden lg:block space-y-5">
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Destinations</h3>
                    <div className="space-y-0.5 max-h-[280px] overflow-y-auto">
                      {countryDestinations.map((p) => (
                        <label key={p.id} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">
                          <input type="checkbox" checked={selectedPlaces.has(p.id)} onChange={() => togglePlace(p.id)} className="rounded border-border text-primary focus:ring-primary" />
                          <span className="truncate text-[13px]">{p.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tour Type</h3>
                    <GroupedTourTypeFilter
                      availableTypes={availableTourTypes as readonly string[]}
                      selectedTypes={selectedTypes}
                      toggleType={toggleType}
                    />
                  </div>
                  {activeFilterCount > 0 && (
                    <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
                      <X size={14} className="mr-1" /> Clear filters
                    </Button>
                  )}
                </aside>

                {/* Tours grid */}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                    {countryTours.length} {countryTours.length === 1 ? "tour" : "tours"} in {activeCountry.name}
                    {activeFilterCount > 0 && " · filtered"}
                  </p>
                  {countryTours.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {countryTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <MapPin size={40} className="mx-auto text-muted-foreground/30 mb-2" />
                      <p className="text-muted-foreground">No tours match your filters</p>
                      <button onClick={clearFilters} className="text-sm text-primary font-medium mt-2">Clear filters</button>
                    </div>
                  )}
                </div>
              </div>
            </main>

            {/* Mobile filter bottom sheet */}
            <FilterSheet
              open={filterOpen}
              onClose={() => setFilterOpen(false)}
              allPlaces={countryDestinations}
              selectedPlaces={selectedPlaces}
              selectedTypes={selectedTypes}
              togglePlace={togglePlace}
              toggleType={toggleType}
              clearFilters={clearFilters}
              activeCount={activeFilterCount}
              availableTypes={availableTourTypes as readonly string[]}
            />
          </>
        );
      })()}

      {/* ═══════ LEVEL 3: Tours ═══════ */}
      {view.level === "destination" && activeCountry && activeDestination && (
        <>
          <AppHeader
            title={`${activeDestination.name} Tours`}
            onBack={goBack}
            rightContent={
              <button
                onClick={() => setFilterOpen(true)}
                className="relative w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors"
              >
                <Filter size={20} className="text-white" />
                {activeFilterCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            }
          />

          {/* Destination hero */}
          <div className="relative h-36 sm:h-44 overflow-hidden">
            <img
              src={destinationImages[activeDestination.id] || activeCountry.heroImage}
              alt={activeDestination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--foreground))]/80 via-[hsl(var(--foreground))]/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <span className="text-[hsl(var(--accent))] text-[10px] font-bold uppercase tracking-[0.15em] block mb-1">Explore</span>
              <h2 className="text-xl sm:text-2xl font-display text-white">{activeDestination.name}</h2>
              <p className="text-xs text-white/60 mt-0.5">
                {tours.length} {tours.length === 1 ? "tour" : "tours"}
                {activeFilterCount > 0 && " · filtered"}
              </p>
            </div>
          </div>

          {/* Category tabs */}
          <div className="px-4 py-3 border-b border-border/30 bg-background">
            <div className="max-w-6xl mx-auto">
              <CategoryTabs selected={selectedCategory} onSelect={(cat) => { setSelectedCategory(cat); setSelectedTypes(new Set()); }} />
            </div>
          </div>

          {/* Active filters (horizontal scroll) */}
          {activeFilterCount > 0 && (
            <div className="flex gap-1.5 px-4 py-2.5 overflow-x-auto no-scrollbar border-b border-border/30">
              {Array.from(selectedPlaces).map((pid) => {
                const p = getPlaceById(pid);
                return p ? (
                  <button key={pid} onClick={() => togglePlace(pid)} className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                    {p.name} <X size={10} />
                  </button>
                ) : null;
              })}
              {Array.from(selectedTypes).map((type) => (
                <button key={type} onClick={() => toggleType(type)} className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-xs px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                  {type} <X size={10} />
                </button>
              ))}
              <button onClick={clearFilters} className="text-xs text-destructive font-medium px-2 whitespace-nowrap shrink-0">Clear</button>
            </div>
          )}

          <main className="flex-1 px-4 pt-4 pb-8 max-w-6xl mx-auto w-full">
            {/* Desktop sidebar + grid */}
            <div className="flex gap-6">
              {/* Desktop sidebar (hidden on mobile — use bottom sheet instead) */}
              <aside className="w-52 shrink-0 hidden lg:block space-y-5">
                {allDescendantPlaces.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Places</h3>
                    <div className="space-y-0.5 max-h-[280px] overflow-y-auto">
                      {allDescendantPlaces.map((p) => (
                        <label key={p.id} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">
                          <input type="checkbox" checked={selectedPlaces.has(p.id)} onChange={() => togglePlace(p.id)} className="rounded border-border text-primary focus:ring-primary" />
                          <span className="truncate text-[13px]">{p.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tour Type</h3>
                  <GroupedTourTypeFilter
                    availableTypes={availableTourTypes as readonly string[]}
                    selectedTypes={selectedTypes}
                    toggleType={toggleType}
                  />
                </div>
                {activeFilterCount > 0 && (
                  <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
                    <X size={14} className="mr-1" /> Clear filters
                  </Button>
                )}
              </aside>

              {/* Grid */}
              <div className="flex-1">
                {tours.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <MapPin size={40} className="mx-auto text-muted-foreground/30 mb-2" />
                    <p className="text-muted-foreground">No tours match your filters</p>
                    <button onClick={clearFilters} className="text-sm text-primary font-medium mt-2">Clear filters</button>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* Mobile filter bottom sheet */}
          <FilterSheet
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            allPlaces={allDescendantPlaces}
            selectedPlaces={selectedPlaces}
            selectedTypes={selectedTypes}
            togglePlace={togglePlace}
            toggleType={toggleType}
            clearFilters={clearFilters}
            activeCount={activeFilterCount}
            availableTypes={availableTourTypes as readonly string[]}
          />
        </>
      )}
    </div>
  );
};

export default ExperiencesPage;
