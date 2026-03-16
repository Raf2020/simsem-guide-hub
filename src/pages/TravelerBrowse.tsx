import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin, Search, Clock, DollarSign, Star, ArrowLeft, ChevronRight, SlidersHorizontal, X
} from "lucide-react";
import {
  getTopLevelPlaces, getDescendants, getPlaceById, getChildren, getPlaceBreadcrumb,
  mockGuideTours, tourTypes, type Place, type GuideTour
} from "@/data/placesData";

// Destination images (placeholder mapping)
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
          <h3 className="font-display text-xl text-card-foreground drop-shadow-lg" style={{ color: 'white' }}>{place.name}</h3>
          <p className="text-sm text-card-foreground/80 mt-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {tourCount} {tourCount === 1 ? "tour" : "tours"} available
          </p>
        </div>
      </div>
    </button>
  );
}

export default function TravelerBrowse() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  const topLevel = getTopLevelPlaces();

  // Destination page data
  const destination = selectedDestination ? getPlaceById(selectedDestination) : null;
  const childPlaces = selectedDestination ? getChildren(selectedDestination) : [];
  const allDescendantPlaces = selectedDestination ? getDescendants(selectedDestination) : [];
  const breadcrumb = selectedDestination ? getPlaceBreadcrumb(selectedDestination) : [];

  const tours = useMemo(() => {
    if (!selectedDestination) return [];
    let result = getToursForDestination(selectedDestination);

    // Filter by selected child places
    if (selectedPlaces.size > 0) {
      result = result.filter((t) =>
        t.places.some((p) => selectedPlaces.has(p)) ||
        selectedPlaces.has(t.main_place_id)
      );
    }

    // Filter by tour type
    if (selectedTypes.size > 0) {
      result = result.filter((t) => selectedTypes.has(t.tour_type));
    }

    return result;
  }, [selectedDestination, selectedPlaces, selectedTypes]);

  // Filtered destinations for search
  const filteredDestinations = topLevel.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Also search sub-places
  const searchResults = useMemo(() => {
    if (!searchQuery || selectedDestination) return [];
    const q = searchQuery.toLowerCase();
    return allDescendantPlaces.length === 0
      ? mockGuideTours.filter((t) => t.status === "published" && t.title.toLowerCase().includes(q))
      : [];
  }, [searchQuery, selectedDestination]);

  const togglePlace = (id: string) => {
    setSelectedPlaces((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const activeFilterCount = selectedPlaces.size + selectedTypes.size;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-3xl font-script text-accent">Simsem</span>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="hover:text-accent transition-colors">Home</a>
            <a href="/guide-dashboard" className="hover:text-accent transition-colors">For Guides</a>
          </nav>
        </div>
      </header>

      {!selectedDestination ? (
        /* ===================== BROWSE DESTINATIONS ===================== */
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Search */}
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl text-foreground mb-3">Where do you want to go?</h1>
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

          {/* Destination Grid */}
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
        </div>
      ) : (
        /* ===================== DESTINATION PAGE ===================== */
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Breadcrumb */}
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

          {/* Destination Header */}
          <div className="mb-6">
            <h1 className="font-display text-3xl text-foreground">{destination?.name} Tours</h1>
            <p className="text-muted-foreground mt-1">
              {tours.length} {tours.length === 1 ? "tour" : "tours"} available
              {activeFilterCount > 0 && ` (filtered)`}
            </p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <aside className="w-56 shrink-0 hidden md:block space-y-6">
              {/* Place Filters */}
              {allDescendantPlaces.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <MapPin size={14} /> Places
                  </h3>
                  <div className="space-y-1">
                    {allDescendantPlaces.slice(0, 15).map((p) => (
                      <label
                        key={p.id}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPlaces.has(p.id)}
                          onChange={() => togglePlace(p.id)}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="truncate">{p.name}</span>
                      </label>
                    ))}
                    {allDescendantPlaces.length > 15 && (
                      <p className="text-xs text-muted-foreground pl-6">+{allDescendantPlaces.length - 15} more</p>
                    )}
                  </div>
                </div>
              )}

              {/* Tour Type Filters */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <SlidersHorizontal size={14} /> Tour Type
                </h3>
                <div className="space-y-1">
                  {tourTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors"
                    >
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
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => { setSelectedPlaces(new Set()); setSelectedTypes(new Set()); }}
                >
                  <X size={14} className="mr-1" /> Clear filters
                </Button>
              )}
            </aside>

            {/* Tours Grid */}
            <div className="flex-1">
              {/* Active filter tags (mobile-friendly) */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {Array.from(selectedPlaces).map((pid) => {
                    const p = getPlaceById(pid);
                    return p ? (
                      <button
                        key={pid}
                        onClick={() => togglePlace(pid)}
                        className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full"
                      >
                        {p.name} <X size={10} />
                      </button>
                    ) : null;
                  })}
                  {Array.from(selectedTypes).map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className="inline-flex items-center gap-1 bg-accent/20 text-accent-foreground text-xs px-2.5 py-1 rounded-full"
                    >
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
        </div>
      )}
    </div>
  );
}
