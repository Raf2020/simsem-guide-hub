import { useState, useMemo } from "react";
import { MapPin, Clock, Users, ArrowRight, Star, Globe2, ChevronDown, Search, SlidersHorizontal, X, ArrowLeft, ChevronRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { countries, tourTypes as categoryTypes } from "@/data/experiencesData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getTopLevelPlaces, getDescendants, getPlaceById, getChildren, getPlaceBreadcrumb,
  mockGuideTours, tourTypes, type Place, type GuideTour
} from "@/data/placesData";

const destinationImages: Record<string, string> = {
  "wadi-rum": "https://images.unsplash.com/photo-1580834341580-8c17a3a630c0?w=600&h=400&fit=crop",
  "petra-region": "https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=600&h=400&fit=crop",
  "amman": "https://images.unsplash.com/photo-1563235876-dd5e5db6b536?w=600&h=400&fit=crop",
  "dead-sea": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
  "aqaba": "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop",
  "jerash": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&h=400&fit=crop",
  "madaba": "https://images.unsplash.com/photo-1569429593410-b498b3fb3387?w=600&h=400&fit=crop",
  "ajloun": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
};

function getToursForDestination(destinationId: string): GuideTour[] {
  const descendants = getDescendants(destinationId);
  const descendantIds = new Set([destinationId, ...descendants.map((d) => d.id)]);
  return mockGuideTours.filter(
    (t) =>
      t.status === "published" &&
      (descendantIds.has(t.main_place_id) || t.places.some((p) => descendantIds.has(p)))
  );
}

function TourCard({ tour }: { tour: GuideTour }) {
  const mainPlace = getPlaceById(tour.main_place_id);
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50">
      <div className="aspect-[16/10] bg-muted relative overflow-hidden">
        <img
          src={destinationImages[tour.main_place_id] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop"}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
        <h3 className="font-display text-base text-foreground mb-1.5 line-clamp-2 leading-snug">{tour.title}</h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
          <MapPin size={13} className="text-primary shrink-0" />
          <span className="truncate">{mainPlace?.name}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock size={12} /> {tour.duration}</span>
          <span className="flex items-center gap-0.5 text-accent">
            <Star size={12} fill="currentColor" /> 4.8
          </span>
        </div>
        {tour.places.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5 pt-2.5 border-t border-border/50">
            {tour.places.slice(0, 3).map((pid) => {
              const p = getPlaceById(pid);
              return p ? (
                <span key={pid} className="text-[11px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  {p.name}
                </span>
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
      className="group text-left overflow-hidden rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[16/10] bg-muted relative overflow-hidden">
        <img
          src={destinationImages[place.id] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop"}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-xl text-primary-foreground drop-shadow-lg">{place.name}</h3>
          <p className="text-sm text-primary-foreground/80 mt-0.5">
            {tourCount} {tourCount === 1 ? "tour" : "tours"} available
          </p>
        </div>
      </div>
    </button>
  );
}

const ExperiencesPage = () => {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  const topLevel = getTopLevelPlaces();
  const destination = selectedDestination ? getPlaceById(selectedDestination) : null;
  const childPlaces = selectedDestination ? getChildren(selectedDestination) : [];
  const allDescendantPlaces = selectedDestination ? getDescendants(selectedDestination) : [];
  const breadcrumb = selectedDestination ? getPlaceBreadcrumb(selectedDestination) : [];

  const tours = useMemo(() => {
    if (!selectedDestination) return [];
    let result = getToursForDestination(selectedDestination);
    if (selectedPlaces.size > 0) {
      result = result.filter((t) =>
        t.places.some((p) => selectedPlaces.has(p)) || selectedPlaces.has(t.main_place_id)
      );
    }
    if (selectedTypes.size > 0) {
      result = result.filter((t) => selectedTypes.has(t.tour_type));
    }
    return result;
  }, [selectedDestination, selectedPlaces, selectedTypes]);

  const filteredDestinations = topLevel.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePlace = (id: string) => {
    setSelectedPlaces((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type); else next.add(type);
      return next;
    });
  };

  const toggleCountry = (slug: string) => {
    setActiveCountry(activeCountry === slug ? null : slug);
  };

  const activeFilterCount = selectedPlaces.size + selectedTypes.size;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Simsem",
            url: "https://mysimsem.com",
            description: "Book authentic local travel experiences across the Arab world.",
            areaServed: countries.map((c) => c.name),
          }),
        }}
      />

      {/* ===== HERO ===== */}
      <header className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-75c0c6d33ca9?w=1600&q=80')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16">
          <p className="text-accent font-semibold tracking-widest text-sm uppercase mb-3">Experiences</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4 max-w-3xl">
            Explore the Arab World Like a Local
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mb-8">
            Authentic tours in Egypt, Jordan, Morocco & 13 more countries — guided by people who call it home.
          </p>
          <div className="flex flex-wrap gap-3">
            {categoryTypes.map((type) => (
              <a
                key={type.id}
                href={type.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/20 backdrop-blur-sm border border-card/30 text-primary-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <span>{type.icon}</span>
                {type.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ===== BROWSE TOURS (Places API) ===== */}
      <section className="py-20 bg-card border-b border-border" aria-labelledby="browse-heading">
        <div className="max-w-6xl mx-auto px-6">
          {!selectedDestination ? (
            <>
              <div className="text-center mb-10">
                <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">Browse Tours</p>
                <h2 id="browse-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                  Where do you want to go?
                </h2>
                <p className="text-muted-foreground mb-6">Discover authentic experiences with local guides across Jordan</p>
                <div className="relative max-w-md mx-auto">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 h-12 text-base rounded-full border-border/60 shadow-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDestinations.map((place) => {
                  const tourCount = getToursForDestination(place.id).length;
                  return (
                    <DestinationCard
                      key={place.id}
                      place={place}
                      tourCount={tourCount}
                      onClick={() => {
                        setSelectedDestination(place.id);
                        setSearchQuery("");
                        setSelectedPlaces(new Set());
                        setSelectedTypes(new Set());
                      }}
                    />
                  );
                })}
              </div>
              {filteredDestinations.length === 0 && (
                <div className="text-center py-16">
                  <MapPin size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">No destinations match "{searchQuery}"</p>
                </div>
              )}
            </>
          ) : (
            /* ===== DESTINATION DETAIL ===== */
            <>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5">
                <button
                  onClick={() => { setSelectedDestination(null); setSelectedPlaces(new Set()); setSelectedTypes(new Set()); }}
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  <ArrowLeft size={14} /> All Destinations
                </button>
                {breadcrumb.map((p, i) => (
                  <span key={p.id} className="flex items-center gap-1.5">
                    <ChevronRight size={12} />
                    <span className={i === breadcrumb.length - 1 ? "text-foreground font-medium" : ""}>{p.name}</span>
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <h2 className="font-display text-3xl text-foreground">{destination?.name} Tours</h2>
                <p className="text-muted-foreground mt-1">
                  {tours.length} {tours.length === 1 ? "tour" : "tours"} available
                  {activeFilterCount > 0 && " (filtered)"}
                </p>
              </div>

              <div className="flex gap-6">
                {/* Sidebar Filters */}
                <aside className="w-56 shrink-0 hidden md:block space-y-6">
                  {allDescendantPlaces.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                        <MapPin size={14} /> Places
                      </h3>
                      <div className="space-y-1">
                        {allDescendantPlaces.slice(0, 15).map((p) => (
                          <label key={p.id} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">
                            <input type="checkbox" checked={selectedPlaces.has(p.id)} onChange={() => togglePlace(p.id)} className="rounded border-border text-primary focus:ring-primary" />
                            <span className="truncate">{p.name}</span>
                          </label>
                        ))}
                        {allDescendantPlaces.length > 15 && (
                          <p className="text-xs text-muted-foreground pl-6">+{allDescendantPlaces.length - 15} more</p>
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <SlidersHorizontal size={14} /> Tour Type
                    </h3>
                    <div className="space-y-1">
                      {tourTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">
                          <input type="checkbox" checked={selectedTypes.has(type)} onChange={() => toggleType(type)} className="rounded border-border text-primary focus:ring-primary" />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>
                  {activeFilterCount > 0 && (
                    <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedPlaces(new Set()); setSelectedTypes(new Set()); }}>
                      <X size={14} className="mr-1" /> Clear filters
                    </Button>
                  )}
                </aside>

                {/* Tours Grid */}
                <div className="flex-1">
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
                      {tours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                      ))}
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
        </div>
      </section>

      {/* ===== TOUR CATEGORIES ===== */}
      <section className="py-20 bg-background border-b border-border" aria-labelledby="categories-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">What We Offer</p>
            <h2 id="categories-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Every Way to Experience the Middle East
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From intimate dining tables to desert camps under the stars — choose the experience that speaks to you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryTypes.map((type) => (
              <article key={type.id} className="group relative rounded-2xl border border-border bg-card p-6 hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{type.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{type.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COUNTRIES + CITIES ===== */}
      <main className="py-20" aria-label="Tours by Country">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-2">Destinations</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Tours Across 16 Arab Countries</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Select a country to discover tours by city, curated and led by local guides.</p>
          </div>
          <div className="space-y-6">
            {countries.map((country) => {
              const isOpen = activeCountry === country.slug;
              return (
                <section key={country.slug} id={`tours-in-${country.slug}`} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm" aria-labelledby={`country-${country.slug}`}>
                  <button onClick={() => toggleCountry(country.slug)} className="w-full text-left group relative flex items-center justify-between gap-4 p-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-expanded={isOpen} aria-controls={`cities-${country.slug}`}>
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${country.heroImage}')` }} aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-transparent" />
                    <div className="relative z-10 flex items-center gap-4 p-6 sm:p-8 flex-1">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <h3 id={`country-${country.slug}`} className="text-2xl sm:text-3xl font-bold text-primary-foreground">{country.name}</h3>
                        <p className="text-primary-foreground/75 text-sm mt-1 max-w-md hidden sm:block">{country.description}</p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center gap-3 pr-6 sm:pr-8">
                      <span className="hidden sm:flex items-center gap-1.5 text-primary-foreground/80 text-sm"><Globe2 size={14} /> {country.cities.length} cities</span>
                      <div className="w-8 h-8 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center border border-card/30">
                        <ChevronDown size={16} className={`text-primary-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </button>
                  <div id={`cities-${country.slug}`} role="region" aria-labelledby={`country-${country.slug}`} className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="p-6 sm:p-8 border-t border-border">
                      <p className="text-muted-foreground text-sm mb-6 sm:hidden">{country.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {country.cities.map((city) => (
                          <article key={city.slug} className="group rounded-xl overflow-hidden border border-border bg-background hover:shadow-xl transition-all duration-300 flex flex-col">
                            <div className="relative h-48 overflow-hidden">
                              <img src={city.photo} alt={`${city.name} — tours in ${city.name}, ${country.name}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={600} height={400} />
                              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                              <div className="absolute bottom-3 left-3 flex items-center gap-1.5"><MapPin size={12} className="text-accent" /><span className="text-primary-foreground font-semibold text-sm">{city.name}</span></div>
                              <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1"><Users size={10} /> {city.tourCount} tours</div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                              <h4 className="text-base font-bold text-foreground mb-1">Tours in {city.name}</h4>
                              <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-4">{city.description}</p>
                              <div className="flex items-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (<Star key={s} size={12} className="fill-accent text-accent" />))}
                                <span className="text-xs text-muted-foreground ml-1">Top rated</span>
                              </div>
                              {city.url.startsWith('/') ? (
                                <Link to={city.url} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200" aria-label={`Explore tours in ${city.name}`}>
                                  Explore {city.name} <ArrowRight size={14} />
                                </Link>
                              ) : (
                                <a href={city.url} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200" aria-label={`Explore tours in ${city.name}`}>
                                  Explore {city.name} <ArrowRight size={14} />
                                </a>
                              )}
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <Globe2 size={32} className="text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">More Countries Coming Soon</h3>
            <p className="text-muted-foreground text-sm">Tunisia, Oman, Kuwait, Bahrain, Palestine & more — we're expanding across the Arab world.</p>
          </div>
        </div>
      </main>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-20 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-3">Ready?</p>
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-4">Experience the Middle East Like Never Before</h2>
          <p className="text-primary-foreground/75 text-lg mb-8">Join thousands of travelers who've discovered the Arab world through the eyes of local guides.</p>
          <a href="https://mysimsem.com/experiences/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-bold text-base hover:bg-accent/90 active:scale-95 transition-all duration-200 shadow-lg">
            Browse All Experiences <ArrowRight size={18} />
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
