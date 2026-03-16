import { useState, useMemo, useRef } from "react";
import {
  MapPin, Clock, Star, Search, SlidersHorizontal, X, ArrowLeft,
  ChevronRight, ChevronDown, ArrowRight, Globe2, Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  countriesAPI, getTopLevelPlacesByCountry, getDescendants, getPlaceById,
  getPlaceBreadcrumb, mockGuideTours, tourTypes, destinationImages, placeDescriptions,
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

// ─── Destination card (mobile-native) ───
function DestinationCard({ place, tourCount, onClick }: { place: Place; tourCount: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl overflow-hidden active:scale-[0.97] transition-transform duration-150 shadow-sm"
    >
      <div className="aspect-[2/1] sm:aspect-[16/10] bg-muted relative overflow-hidden">
        <img
          src={destinationImages[place.id] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop"}
          alt={place.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-3 left-3.5 right-3.5">
          <h3 className="text-lg font-bold text-primary-foreground drop-shadow-md">{place.name}</h3>
          <p className="text-xs text-primary-foreground/70 mt-0.5">
            {tourCount} {tourCount === 1 ? "tour" : "tours"}
          </p>
        </div>
      </div>
    </button>
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
  const [filterOpen, setFilterOpen] = useState(false);

  const activeCountry = view.level !== "countries" ? countriesAPI.find((c) => c.code === view.countryCode) : null;
  const activeDestinationId = view.level === "destination" ? view.destinationId : null;
  const activeDestination = activeDestinationId ? getPlaceById(activeDestinationId) : null;
  const allDescendantPlaces = activeDestinationId ? getDescendants(activeDestinationId) : [];
  const breadcrumb = activeDestinationId ? getPlaceBreadcrumb(activeDestinationId) : [];

  const tours = useMemo(() => {
    if (!activeDestinationId) return [];
    let result = getToursForDestination(activeDestinationId);
    if (selectedPlaces.size > 0) {
      result = result.filter((t) =>
        t.places.some((p) => selectedPlaces.has(p)) || selectedPlaces.has(t.main_place_id)
      );
    }
    if (selectedTypes.size > 0) {
      result = result.filter((t) => selectedTypes.has(t.tour_type));
    }
    return result;
  }, [activeDestinationId, selectedPlaces, selectedTypes]);

  const togglePlace = (id: string) => {
    setSelectedPlaces((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleType = (type: string) => {
    setSelectedTypes((prev) => { const n = new Set(prev); n.has(type) ? n.delete(type) : n.add(type); return n; });
  };
  const clearFilters = () => { setSelectedPlaces(new Set()); setSelectedTypes(new Set()); };
  const activeFilterCount = selectedPlaces.size + selectedTypes.size;

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

      {/* ═══════ LEVEL 2: Destinations ═══════ */}
      {view.level === "country" && activeCountry && (
        <>
          <AppHeader title={activeCountry.name} onBack={goBack} />

          {/* Country hero banner */}
          <div className="relative h-36 sm:h-44 overflow-hidden">
            <img
              src={activeCountry.heroImage}
              alt={activeCountry.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-bold text-primary-foreground flex items-center gap-2">
                {activeCountry.flag} {activeCountry.name}
              </h2>
              <p className="text-xs text-primary-foreground/70 mt-0.5 line-clamp-1">
                {getCityCountForCountry(activeCountry.code)} destinations to explore
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border/30">
            <div className="relative max-w-6xl mx-auto">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Search in ${activeCountry.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-2xl border-border/50 bg-muted/50 text-sm"
              />
            </div>
          </div>

          <main className="flex-1 px-4 pt-4 pb-8 max-w-6xl mx-auto w-full">
            {(() => {
              const destinations = getTopLevelPlacesByCountry(activeCountry.code)
                .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
              return destinations.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {destinations.map((place) => (
                    <DestinationCard
                      key={place.id}
                      place={place}
                      tourCount={getToursForDestination(place.id).length}
                      onClick={() => goToDestination(activeCountry.code, place.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <MapPin size={40} className="mx-auto text-muted-foreground/30 mb-2" />
                  <p className="text-muted-foreground text-sm">No destinations match "{searchQuery}"</p>
                </div>
              );
            })()}
          </main>
        </>
      )}

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
