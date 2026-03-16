import { useState, useMemo } from "react";
import {
  MapPin, Clock, Star, Search, SlidersHorizontal, X, ArrowLeft,
  ChevronRight, ArrowRight, Globe2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  countriesAPI, getTopLevelPlacesByCountry, getDescendants, getPlaceById,
  getPlaceBreadcrumb, mockGuideTours, tourTypes, destinationImages,
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

// ─── Sub-components ───

function TourCard({ tour }: { tour: GuideTour }) {
  const mainPlace = getPlaceById(tour.main_place_id);
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50">
      <div className="aspect-[16/10] bg-muted relative overflow-hidden">
        <img
          src={destinationImages[tour.main_place_id] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop"}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-card/90 text-foreground backdrop-blur-sm text-xs">{tour.tour_type}</Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-card/90 backdrop-blur-sm text-foreground font-bold text-sm px-3 py-1 rounded-full">
            ${tour.price}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-base font-semibold text-foreground mb-1.5 line-clamp-2 leading-snug">{tour.title}</h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
          <MapPin size={13} className="text-primary shrink-0" />
          <span className="truncate">{mainPlace?.name}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock size={12} /> {tour.duration}</span>
          <span className="flex items-center gap-0.5 text-accent"><Star size={12} fill="currentColor" /> 4.8</span>
        </div>
        {tour.places.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5 pt-2.5 border-t border-border/50">
            {tour.places.slice(0, 3).map((pid) => {
              const p = getPlaceById(pid);
              return p ? (
                <span key={pid} className="text-[11px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{p.name}</span>
              ) : null;
            })}
            {tour.places.length > 3 && (
              <span className="text-[11px] text-muted-foreground">+{tour.places.length - 3}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DestinationCard({ place, tourCount, onClick }: { place: Place; tourCount: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-left overflow-hidden rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300 w-full"
    >
      <div className="aspect-[16/10] bg-muted relative overflow-hidden">
        <img
          src={destinationImages[place.id] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop"}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-primary-foreground drop-shadow-lg">{place.name}</h3>
          <p className="text-sm text-primary-foreground/80 mt-0.5">
            {tourCount} {tourCount === 1 ? "tour" : "tours"}
          </p>
        </div>
      </div>
    </button>
  );
}

function CountryCard({ country, tourCount, onClick }: { country: CountryInfo; tourCount: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-left overflow-hidden rounded-2xl border border-border/50 hover:shadow-xl transition-all duration-300 w-full"
    >
      <div className="aspect-[16/9] bg-muted relative overflow-hidden">
        <img
          src={country.heroImage}
          alt={country.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{country.flag}</span>
            <h3 className="text-2xl font-bold text-primary-foreground drop-shadow-lg">{country.name}</h3>
          </div>
          <p className="text-sm text-primary-foreground/75 line-clamp-2">{country.description}</p>
          <p className="text-xs text-primary-foreground/60 mt-1.5">{tourCount} tours available</p>
        </div>
      </div>
    </button>
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

  // Derived state
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
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HERO ── */}
      <header className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-75c0c6d33ca9?w=1600&q=80')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-12">
          <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">Experiences</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-primary-foreground leading-tight mb-3 max-w-3xl">
            Explore the Arab World Like a Local
          </h1>
          <p className="text-primary-foreground/80 text-base max-w-xl">
            Authentic tours in Egypt, Jordan, Morocco & beyond — guided by people who call it home.
          </p>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ═══════ LEVEL 1: Countries ═══════ */}
        {view.level === "countries" && (
          <>
            <div className="text-center mb-10">
              <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">Choose a Country</p>
              <h2 className="text-3xl font-bold text-foreground mb-3">Where do you want to go?</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Select a country to discover its cities, landmarks, and local tours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {countriesAPI.map((country) => (
                <CountryCard
                  key={country.code}
                  country={country}
                  tourCount={getToursForCountry(country.code).length}
                  onClick={() => goToCountry(country.code)}
                />
              ))}
            </div>

            {/* Coming soon */}
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
              <Globe2 size={28} className="text-muted-foreground mx-auto mb-2" />
              <h3 className="text-base font-bold text-foreground mb-1">More Countries Coming Soon</h3>
              <p className="text-muted-foreground text-sm">
                Saudi Arabia, UAE, Lebanon, Tunisia, Oman & more
              </p>
            </div>
          </>
        )}

        {/* ═══════ LEVEL 2: Destinations in Country ═══════ */}
        {view.level === "country" && activeCountry && (
          <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
              <button onClick={goBack} className="hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft size={14} /> All Countries
              </button>
              <ChevronRight size={12} />
              <span className="text-foreground font-medium flex items-center gap-1.5">
                {activeCountry.flag} {activeCountry.name}
              </span>
            </div>

            {/* Country header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
                {activeCountry.flag} Tours in {activeCountry.name}
              </h2>
              <p className="text-muted-foreground mt-1.5 max-w-xl">{activeCountry.description}</p>
            </div>

            {/* Search */}
            <div className="relative max-w-md mb-8">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Search destinations in ${activeCountry.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-full border-border/60 shadow-sm"
              />
            </div>

            {/* Destination cards */}
            {(() => {
              const destinations = getTopLevelPlacesByCountry(view.countryCode)
                .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
              return destinations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {destinations.map((place) => (
                    <DestinationCard
                      key={place.id}
                      place={place}
                      tourCount={getToursForDestination(place.id).length}
                      onClick={() => goToDestination(view.countryCode, place.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <MapPin size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">No destinations match "{searchQuery}"</p>
                </div>
              );
            })()}
          </>
        )}

        {/* ═══════ LEVEL 3: Tours in Destination ═══════ */}
        {view.level === "destination" && activeCountry && activeDestination && (
          <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
              <button
                onClick={() => setView({ level: "countries" })}
                className="hover:text-primary transition-colors"
              >
                All Countries
              </button>
              <ChevronRight size={12} />
              <button
                onClick={() => goToCountry(view.countryCode)}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                {activeCountry.flag} {activeCountry.name}
              </button>
              {breadcrumb.map((p, i) => (
                <span key={p.id} className="flex items-center gap-1.5">
                  <ChevronRight size={12} />
                  <span className={i === breadcrumb.length - 1 ? "text-foreground font-medium" : ""}>{p.name}</span>
                </span>
              ))}
            </div>

            {/* Destination header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground">{activeDestination.name} Tours</h2>
              <p className="text-muted-foreground mt-1">
                {tours.length} {tours.length === 1 ? "tour" : "tours"} available
                {activeFilterCount > 0 && " (filtered)"}
              </p>
            </div>

            <div className="flex gap-6">
              {/* Sidebar */}
              <aside className="w-56 shrink-0 hidden md:block space-y-6">
                {/* Place filters */}
                {allDescendantPlaces.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2.5 flex items-center gap-1.5">
                      <MapPin size={14} /> Places
                    </h3>
                    <div className="space-y-1 max-h-[300px] overflow-y-auto">
                      {allDescendantPlaces.map((p) => (
                        <label key={p.id} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedPlaces.has(p.id)}
                            onChange={() => togglePlace(p.id)}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="truncate">{p.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tour type filters */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2.5 flex items-center gap-1.5">
                    <SlidersHorizontal size={14} /> Tour Type
                  </h3>
                  <div className="space-y-1">
                    {tourTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedTypes.has(type)}
                          onChange={() => toggleType(type)}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        {type}
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
                {/* Active filter tags */}
                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {Array.from(selectedPlaces).map((pid) => {
                      const p = getPlaceById(pid);
                      return p ? (
                        <button key={pid} onClick={() => togglePlace(pid)} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full">
                          {p.name} <X size={10} />
                        </button>
                      ) : null;
                    })}
                    {Array.from(selectedTypes).map((type) => (
                      <button key={type} onClick={() => toggleType(type)} className="inline-flex items-center gap-1 bg-accent/20 text-accent-foreground text-xs px-2.5 py-1 rounded-full">
                        {type} <X size={10} />
                      </button>
                    ))}
                  </div>
                )}

                {tours.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <MapPin size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground text-lg">No tours match your filters</p>
                    <p className="text-sm text-muted-foreground mt-1">Try removing some filters</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* ── CTA ── */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Experience the Middle East Like Never Before</h2>
          <p className="text-primary-foreground/75 mb-6">
            Join thousands of travelers discovering the Arab world through local eyes.
          </p>
          <a
            href="https://mysimsem.com/experiences/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-bold hover:bg-accent/90 active:scale-95 transition-all shadow-lg"
          >
            Browse All Experiences <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <footer className="py-6 bg-card border-t border-border text-center">
        <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Simsem — Authentic Middle Eastern Travel Experiences</p>
      </footer>
    </div>
  );
};

export default ExperiencesPage;
