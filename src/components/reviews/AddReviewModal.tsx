import { useState, useMemo } from "react";
import { Experience, travellers, Traveller } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StarRating } from "@/components/ui/StarRating";
import { Upload, X, Search, Check, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: Experience | null;
  onSave: (review: {
    travellerName: string;
    travellerCountry: string;
    travellerPhoto: string;
    rating: number;
    reviewText: string;
  }) => void;
}

const travellerCountries = [
  'United States',
  'United Kingdom', 
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'Australia',
  'Canada',
  'Brazil',
  'India',
  'China',
  'South Korea',
  'Netherlands',
  'Sweden',
  'Switzerland',
  'Other'
];

export function AddReviewModal({ open, onOpenChange, experience, onSave }: AddReviewModalProps) {
  const [selectedTraveller, setSelectedTraveller] = useState<Traveller | null>(null);
  const [travellerSearchOpen, setTravellerSearchOpen] = useState(false);
  const [travellerSearch, setTravellerSearch] = useState("");
  const [isManualEntry, setIsManualEntry] = useState(false);
  
  const [travellerName, setTravellerName] = useState("");
  const [travellerCountry, setTravellerCountry] = useState("");
  const [travellerPhoto, setTravellerPhoto] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const filteredTravellers = useMemo(() => {
    if (!travellerSearch) return travellers;
    const searchLower = travellerSearch.toLowerCase();
    return travellers.filter(
      (t) =>
        t.name.toLowerCase().includes(searchLower) ||
        t.id.toLowerCase().includes(searchLower) ||
        t.email.toLowerCase().includes(searchLower)
    );
  }, [travellerSearch]);

  const handleSelectTraveller = (traveller: Traveller) => {
    setSelectedTraveller(traveller);
    setTravellerName(traveller.name);
    setTravellerCountry(traveller.country);
    setTravellerPhoto(traveller.photo);
    setPhotoPreview(traveller.photo);
    setIsManualEntry(false);
    setTravellerSearchOpen(false);
    setTravellerSearch("");
  };

  const handleManualEntry = () => {
    setSelectedTraveller(null);
    setIsManualEntry(true);
    setTravellerSearchOpen(false);
    setTravellerSearch("");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setTravellerPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    setPhotoPreview(null);
    setTravellerPhoto("");
  };

  const resetForm = () => {
    setSelectedTraveller(null);
    setIsManualEntry(false);
    setTravellerName("");
    setTravellerCountry("");
    setTravellerPhoto("");
    setPhotoPreview(null);
    setRating(5);
    setReviewText("");
    setTravellerSearch("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!travellerName || !travellerCountry || !rating || !reviewText) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSave({
      travellerName,
      travellerCountry,
      travellerPhoto: travellerPhoto || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
      rating,
      reviewText,
    });

    resetForm();
    onOpenChange(false);
    toast.success("Review added successfully!");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Review</DialogTitle>
          {experience && (
            <p className="text-sm text-muted-foreground mt-1">
              For: <span className="font-medium text-foreground">{experience.name}</span>
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Traveller Search */}
          <div className="space-y-2">
            <Label>Select Traveller *</Label>
            <Popover open={travellerSearchOpen} onOpenChange={setTravellerSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={travellerSearchOpen}
                  className="w-full justify-between font-normal"
                >
                  {selectedTraveller ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedTraveller.photo}
                        alt={selectedTraveller.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>{selectedTraveller.name}</span>
                      <span className="text-muted-foreground text-xs">({selectedTraveller.id})</span>
                    </div>
                  ) : isManualEntry ? (
                    <span className="text-muted-foreground">Manual entry mode</span>
                  ) : (
                    <span className="text-muted-foreground">Search by name or ID...</span>
                  )}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0 bg-popover border z-50" align="start">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, ID, or email..."
                      value={travellerSearch}
                      onChange={(e) => setTravellerSearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="max-h-[250px] overflow-y-auto">
                  {filteredTravellers.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No travellers found
                    </div>
                  ) : (
                    filteredTravellers.map((traveller) => (
                      <button
                        key={traveller.id}
                        type="button"
                        onClick={() => handleSelectTraveller(traveller)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left",
                          selectedTraveller?.id === traveller.id && "bg-muted"
                        )}
                      >
                        <img
                          src={traveller.photo}
                          alt={traveller.name}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{traveller.name}</span>
                            {selectedTraveller?.id === traveller.id && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {traveller.id} • {traveller.country}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
                <div className="p-2 border-t">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={handleManualEntry}
                  >
                    <UserPlus className="h-4 w-4" />
                    Enter traveller details manually
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Manual Entry Fields - Only show when manual mode or no traveller selected yet needs editing */}
          {(isManualEntry || (!selectedTraveller && !isManualEntry)) && (
            <>
              {/* Traveller Name */}
              <div className="space-y-2">
                <Label htmlFor="travellerName">Traveller Name *</Label>
                <Input
                  id="travellerName"
                  value={travellerName}
                  onChange={(e) => setTravellerName(e.target.value)}
                  placeholder="Enter traveller's full name"
                />
              </div>

              {/* Traveller Country */}
              <div className="space-y-2">
                <Label htmlFor="travellerCountry">Country *</Label>
                <Select value={travellerCountry} onValueChange={setTravellerCountry}>
                  <SelectTrigger className="bg-card">
                    <SelectValue placeholder="Select traveller's country" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border z-50">
                    {travellerCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Traveller Photo</Label>
                <div className="flex items-center gap-4">
                  {photoPreview ? (
                    <div className="relative">
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-border"
                      />
                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                      <Upload size={20} className="text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="w-auto"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Optional. JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Selected Traveller Info - Show when traveller is selected */}
          {selectedTraveller && !isManualEntry && (
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTraveller.photo}
                  alt={selectedTraveller.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-border"
                />
                <div>
                  <p className="font-semibold">{selectedTraveller.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedTraveller.country}</p>
                  <p className="text-xs text-muted-foreground">{selectedTraveller.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Star Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex items-center gap-3">
              <StarRating 
                rating={rating} 
                size={28} 
                interactive 
                onChange={setRating} 
              />
              <span className="text-lg font-semibold text-primary">{rating}/5</span>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="reviewText">Review Text *</Label>
            <Textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write the traveller's review..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Save Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
