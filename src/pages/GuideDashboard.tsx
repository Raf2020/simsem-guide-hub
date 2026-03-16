import { useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Plus, MapPin, Clock, DollarSign, Eye, Pencil, Trash2, Search, X, Check
} from "lucide-react";
import {
  placesData, getTopLevelPlaces, getDescendants, getPlaceById,
  mockGuideTours, tourTypes, type GuideTour, type Place
} from "@/data/placesData";

function PlaceTag({ placeId, onRemove }: { placeId: string; onRemove?: () => void }) {
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

function PlaceMultiSelect({
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

function CreateTourForm({ onClose, onSave }: { onClose: () => void; onSave: (tour: GuideTour) => void }) {
  const [title, setTitle] = useState("");
  const [mainPlaceId, setMainPlaceId] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [tourType, setTourType] = useState("");
  const [description, setDescription] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  const topLevel = getTopLevelPlaces();
  const filteredDestinations = topLevel.filter((p) =>
    p.name.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  const childPlaces = useMemo(() => {
    if (!mainPlaceId) return [];
    return getDescendants(mainPlaceId);
  }, [mainPlaceId]);

  const mainPlace = mainPlaceId ? getPlaceById(mainPlaceId) : null;

  const handleSubmit = () => {
    if (!title || !mainPlaceId || !price || !tourType) return;
    onSave({
      id: Date.now().toString(),
      title,
      main_place_id: mainPlaceId,
      places: selectedPlaces,
      price: parseFloat(price),
      duration,
      tour_type: tourType,
      description,
      status: "draft",
      created_at: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
      {/* Title */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold">Tour Title</Label>
        <Input placeholder="e.g. Petra Full Day Guided Tour" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Main Destination */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold">Main Destination</Label>
        <p className="text-xs text-muted-foreground">Where is this tour primarily located?</p>
        {mainPlace ? (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-primary/30 bg-primary/5">
            <MapPin size={16} className="text-primary" />
            <span className="font-medium text-sm">{mainPlace.name}</span>
            <span className="text-xs text-muted-foreground capitalize">({mainPlace.type})</span>
            <button
              onClick={() => { setMainPlaceId(""); setSelectedPlaces([]); }}
              className="ml-auto text-muted-foreground hover:text-destructive"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="border border-border rounded-md max-h-48 overflow-y-auto bg-popover">
              {filteredDestinations.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setMainPlaceId(p.id); setDestinationSearch(""); }}
                  className="w-full text-left px-3 py-2.5 text-sm hover:bg-accent/30 flex items-center gap-2 transition-colors"
                >
                  <MapPin size={14} className="text-accent" />
                  <span className="font-medium">{p.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto capitalize">{p.type}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Child Places */}
      {mainPlaceId && childPlaces.length > 0 && (
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold">Places Visited in This Tour</Label>
          <p className="text-xs text-muted-foreground">
            Select the specific spots your tour covers inside {mainPlace?.name}
          </p>
          <PlaceMultiSelect
            available={childPlaces}
            selected={selectedPlaces}
            onChange={setSelectedPlaces}
          />
        </div>
      )}

      {/* Price + Duration */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold">Price (USD)</Label>
          <Input type="number" placeholder="95" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold">Duration</Label>
          <Input placeholder="e.g. 8 Hours" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
      </div>

      {/* Tour Type */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold">Tour Type</Label>
        <Select value={tourType} onValueChange={setTourType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type..." />
          </SelectTrigger>
          <SelectContent>
            {tourTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold">Description</Label>
        <Textarea
          placeholder="Describe what travelers will experience..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end pt-2 border-t border-border">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!title || !mainPlaceId || !price || !tourType}>
          <Plus size={16} className="mr-1" /> Create Tour
        </Button>
      </div>
    </div>
  );
}

export default function GuideDashboard() {
  const [tours, setTours] = useState<GuideTour[]>(mockGuideTours);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredTours = tours.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tours.length,
    published: tours.filter((t) => t.status === "published").length,
    draft: tours.filter((t) => t.status === "draft").length,
  };

  const handleSave = (tour: GuideTour) => {
    setTours((prev) => [tour, ...prev]);
  };

  const handleDelete = (id: string) => {
    setTours((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setTours((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "published" ? "draft" : "published" } : t
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-card px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display text-foreground">My Tours</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage your tour listings and locations</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button><Plus size={16} className="mr-1" /> New Tour</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">Create New Tour</DialogTitle>
                </DialogHeader>
                <CreateTourForm onClose={() => setDialogOpen(false)} onSave={handleSave} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-5">
            {[
              { label: "Total Tours", value: stats.total, color: "bg-primary/10 text-primary" },
              { label: "Published", value: stats.published, color: "bg-success/10 text-success" },
              { label: "Drafts", value: stats.draft, color: "bg-warning/10 text-warning" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} px-4 py-2 rounded-lg`}>
                <span className="text-lg font-bold">{s.value}</span>
                <span className="text-xs ml-1.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="px-8 py-4 flex gap-3 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tour Cards */}
        <div className="px-8 pb-8 grid gap-4">
          {filteredTours.map((tour) => {
            const mainPlace = getPlaceById(tour.main_place_id);
            return (
              <Card key={tour.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-lg text-foreground truncate">{tour.title}</h3>
                        <Badge variant={tour.status === "published" ? "default" : "secondary"} className="text-xs shrink-0">
                          {tour.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-3">{tour.description}</p>

                      {/* Location info */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 text-sm font-medium text-primary">
                          <MapPin size={14} />
                          {mainPlace?.name || tour.main_place_id}
                        </div>
                        {tour.places.length > 0 && (
                          <span className="text-xs text-muted-foreground">→</span>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {tour.places.slice(0, 4).map((pid) => (
                            <PlaceTag key={pid} placeId={pid} />
                          ))}
                          {tour.places.length > 4 && (
                            <span className="text-xs text-muted-foreground self-center">
                              +{tour.places.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} /> ${tour.price}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {tour.duration}
                        </span>
                        <Badge variant="outline" className="text-xs">{tour.tour_type}</Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleToggleStatus(tour.id)}
                        title={tour.status === "published" ? "Unpublish" : "Publish"}
                      >
                        {tour.status === "published" ? <Eye size={14} /> : <Check size={14} />}
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(tour.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredTours.length === 0 && (
            <div className="text-center py-16">
              <MapPin size={48} className="mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No tours found</p>
              <Button variant="outline" className="mt-3" onClick={() => setDialogOpen(true)}>
                <Plus size={14} className="mr-1" /> Create your first tour
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
