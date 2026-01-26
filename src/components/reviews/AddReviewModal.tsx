import { useState } from "react";
import { Experience, countries } from "@/data/mockData";
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
import { StarRating } from "@/components/ui/StarRating";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

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
  const [travellerName, setTravellerName] = useState("");
  const [travellerCountry, setTravellerCountry] = useState("");
  const [travellerPhoto, setTravellerPhoto] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

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

    // Reset form
    setTravellerName("");
    setTravellerCountry("");
    setTravellerPhoto("");
    setPhotoPreview(null);
    setRating(5);
    setReviewText("");
    onOpenChange(false);
    toast.success("Review added successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              <SelectTrigger>
                <SelectValue placeholder="Select traveller's country" />
              </SelectTrigger>
              <SelectContent>
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
