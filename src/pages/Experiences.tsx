import { useState, useMemo, useRef } from "react";
import {
  MapPin, Clock, Star, Search, SlidersHorizontal, X, ArrowLeft,
  ChevronRight, ChevronDown, ArrowRight, Globe2, Filter, Compass, Shield
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  countriesAPI, getTopLevelPlacesByCountry, getDescendants, getPlaceById,
  getPlaceBreadcrumb, mockGuideTours, tourTypes, destinationImages, placeDescriptions,
  experienceCategories, type ExperienceCategory,
  type Place, type GuideTour, type CountryInfo,
} from "@/data/placesData";

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

// ─── Native-style header ───
function AppHeader({ title, onBack, rightContent }: { title: string; onBack?: () => void; rightContent?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10 safe-top">
      <div className="flex items-center h-14 px-4 max-w-6xl mx-auto">
        {onBack ? (
          <button onClick={onBack} className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full active:bg-primary-foreground/10 transition-colors">
            <ArrowLeft size={22} className="text-primary-foreground" />
          </button>
        ) : (
          <span className="text-2xl font-script text-accent">Simsem</span>
        )}
        <h1 className="flex-1 text-center text-base font-semibold text-primary-foreground truncate px-2">
          {title}
        </h1>
        <div className="w-10 flex items-center justify-center">
          {rightContent}
        </div>
      </div>
    </header>
  );
}

// ─── Tour card (compact mobile) ───
function TourCard({ tour }: { tour: GuideTour }) {
  const mainPlace = getPlaceById(tour.main_place_id);
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/40 active:scale-[0.98] transition-transform duration-150 cursor-pointer">
      <div className="aspect-[16/9] bg-muted relative overflow-hidden">
        <img
          src={destinationImages[tour.main_place_id] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop"}
          alt={tour.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5">
          <span className="bg-card/90 backdrop-blur-md text-foreground text-[11px] font-medium px-2.5 py-1 rounded-full">{tour.tour_type}</span>
        </div>
        <div className="absolute bottom-2.5 right-2.5">
          <span className="bg-card/90 backdrop-blur-md text-foreground font-bold text-sm px-3 py-1 rounded-full">
            ${tour.price}
          </span>
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="text-[15px] font-semibold text-foreground mb-1 line-clamp-2 leading-snug">{tour.title}</h3>
        <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground mb-1.5">
          <MapPin size={12} className="text-primary shrink-0" />
          <span className="truncate">{mainPlace?.name}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock size={11} /> {tour.duration}</span>
          <span className="flex items-center gap-0.5 text-accent"><Star size={11} fill="currentColor" /> 4.8</span>
        </div>
        {tour.places.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-border/40">
            {tour.places.slice(0, 2).map((pid) => {
              const p = getPlaceById(pid);
              return p ? (
                <span key={pid} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{p.name}</span>
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

// ─── Bottom sheet filter (mobile) ───
function FilterSheet({
  open, onClose, allPlaces, selectedPlaces, selectedTypes, togglePlace, toggleType, clearFilters, activeCount
}: {
  open: boolean; onClose: () => void;
  allPlaces: Place[]; selectedPlaces: Set<string>; selectedTypes: Set<string>;
  togglePlace: (id: string) => void; toggleType: (type: string) => void;
  clearFilters: () => void; activeCount: number;
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
            <div className="flex flex-wrap gap-2">
              {tourTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`text-[13px] px-3 py-1.5 rounded-full border transition-colors ${
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

  // Get available tour types based on selected category
  const availableTourTypes = selectedCategory
    ? experienceCategories.find(c => c.id === selectedCategory)?.tourTypes || []
    : tourTypes as unknown as string[];

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
          <AppHeader title="Experiences" />

          {/* Search bar */}
          <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border/30">
            <div className="relative max-w-6xl mx-auto">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-2xl border-border/50 bg-muted/50 text-sm"
              />
            </div>
          </div>

          <main className="flex-1 px-4 pt-4 pb-8 max-w-6xl mx-auto w-full">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Countries</p>

            <div className="space-y-3">
              {countriesAPI
                .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((country) => {
                  const cityCount = getCityCountForCountry(country.code);
                  return (
                    <button
                      key={country.code}
                      onClick={() => goToCountry(country.code)}
                      className="group w-full text-left rounded-2xl overflow-hidden relative min-h-[140px] sm:min-h-[160px] flex items-center active:scale-[0.98] transition-transform duration-150"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${country.heroImage}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/50 to-foreground/25" />

                      <div className="relative z-10 flex items-center justify-between w-full px-5 sm:px-8 py-6">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="text-2xl mt-0.5 shrink-0">{country.flag}</span>
                          <div className="min-w-0">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-1">
                              Tours in {country.name}
                            </h2>
                            <p className="text-primary-foreground/70 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-xl">
                              {country.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <span className="hidden sm:flex items-center gap-1 text-primary-foreground/60 text-xs whitespace-nowrap">
                            <Globe2 size={12} />
                            {cityCount} cities
                          </span>
                          <div className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center">
                            <ChevronDown size={16} className="text-primary-foreground/80" />
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
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter((t) => t.title.toLowerCase().includes(q));
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
                  className="relative w-10 h-10 flex items-center justify-center rounded-full active:bg-primary-foreground/10 transition-colors"
                >
                  <Filter size={20} className="text-primary-foreground" />
                  {activeFilterCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              }
            />

            {/* Country hero banner — OTA style */}
            <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
              <img
                src={activeCountry.heroImage}
                alt={`${activeCountry.name} tours`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/5" />
              
              {/* Hero content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{activeCountry.flag}</span>
                    <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-widest">Explore</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-2 font-serif">
                    Tours in {activeCountry.name}
                  </h2>
                  <p className="text-primary-foreground/75 text-xs sm:text-sm leading-relaxed max-w-2xl line-clamp-2 mb-3">
                    {activeCountry.description.split('.')[0]}.
                  </p>
                  {/* Trust signals — E-E-A-T */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                    <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs">
                      <MapPin size={13} className="text-accent" />
                      <span>{countryDestinations.length} destinations</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs">
                      <Compass size={13} className="text-accent" />
                      <span>{countryTours.length} guided tours</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary-foreground/80 text-xs">
                      {[1,2,3,4,5].map(s => <Star key={s} size={11} className="fill-accent text-accent" />)}
                      <span className="ml-1">Top rated</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-primary-foreground/80 text-xs">
                      <Shield size={13} className="text-accent" />
                      <span>Local verified guides</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border/30">
              <div className="relative max-w-6xl mx-auto">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={`Search tours in ${activeCountry.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 rounded-2xl border-border/50 bg-muted/50 text-sm"
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
              {selectedPlaces.size === 0 && !searchQuery && (
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
                    <div className="space-y-0.5">
                      {tourTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">
                          <input type="checkbox" checked={selectedTypes.has(type)} onChange={() => toggleType(type)} className="rounded border-border text-primary focus:ring-primary" />
                          <span className="text-[13px]">{type}</span>
                        </label>
                      ))}
                    </div>
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
                className="relative w-10 h-10 flex items-center justify-center rounded-full active:bg-primary-foreground/10 transition-colors"
              >
                <Filter size={20} className="text-primary-foreground" />
                {activeFilterCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            }
          />

          {/* Destination hero */}
          <div className="relative h-32 sm:h-40 overflow-hidden">
            <img
              src={destinationImages[activeDestination.id] || activeCountry.heroImage}
              alt={activeDestination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <h2 className="text-lg font-bold text-primary-foreground">{activeDestination.name}</h2>
              <p className="text-xs text-primary-foreground/70">
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
                  <div className="space-y-0.5">
                    {tourTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">
                        <input type="checkbox" checked={selectedTypes.has(type)} onChange={() => toggleType(type)} className="rounded border-border text-primary focus:ring-primary" />
                        <span className="text-[13px]">{type}</span>
                      </label>
                    ))}
                  </div>
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
          />
        </>
      )}
    </div>
  );
};

export default ExperiencesPage;
