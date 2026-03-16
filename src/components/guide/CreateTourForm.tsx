import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin, Search, X } from "lucide-react";
import {
  getTopLevelPlaces, getDescendants, getPlaceById,
  getTourTypesForCategory, type GuideTour, type ExperienceCategory, type Place,
  experienceCategories,
} from "@/data/placesData";
import { PlaceMultiSelect } from "./PlaceMultiSelect";

interface CreateTourFormProps {
  category: ExperienceCategory;
  onClose: () => void;
  onSave: (tour: GuideTour) => void;
  onBack: () => void;
}

export function CreateTourForm({ category, onClose, onSave, onBack }: CreateTourFormProps) {
  const [title, setTitle] = useState("");
  const [mainPlaceId, setMainPlaceId] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [tourType, setTourType] = useState("");
  const [description, setDescription] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  const categoryInfo = experienceCategories.find((c) => c.id === category)!;
  const availableTourTypes = getTourTypesForCategory(category);

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
      category,
      description,
      status: "draft",
      created_at: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
      {/* Category badge + back */}
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Change
        </button>
        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
          {categoryInfo.icon} {categoryInfo.name}
        </span>
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold">Tour Title</Label>
        <Input placeholder="e.g. Petra Full Day Guided Tour" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Tour Type — filtered by category */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold">Tour Type</Label>
        <Select value={tourType} onValueChange={setTourType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type..." />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {availableTourTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
