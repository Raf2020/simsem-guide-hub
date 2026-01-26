import { Experience, Review } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarRating } from "@/components/ui/StarRating";
import { MapPin, Calendar, Plus } from "lucide-react";
import { format } from "date-fns";

interface ViewReviewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: Experience | null;
  reviews: Review[];
  onAddReview: () => void;
}

export function ViewReviewsModal({ 
  open, 
  onOpenChange, 
  experience, 
  reviews,
  onAddReview
}: ViewReviewsModalProps) {
  const experienceReviews = reviews.filter(r => r.experienceId === experience?.id);
  const averageRating = experienceReviews.length > 0
    ? experienceReviews.reduce((acc, r) => acc + r.rating, 0) / experienceReviews.length
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Reviews</DialogTitle>
          {experience && (
            <div className="pt-2">
              <h3 className="font-medium text-foreground">{experience.name}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {experience.country}
                </span>
                <span>Guide: {experience.guideName}</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <StarRating rating={Math.round(averageRating)} size={18} />
                <span className="font-semibold">{averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({experienceReviews.length} review{experienceReviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4 pr-2">
          {experienceReviews.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No reviews yet for this experience.</p>
              <Button onClick={onAddReview} className="gap-2">
                <Plus size={16} />
                Add First Review
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {experienceReviews.map((review) => (
                <div 
                  key={review.id} 
                  className="p-4 rounded-lg border bg-card animate-fade-in"
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={review.travellerPhoto} 
                      alt={review.travellerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold">{review.travellerName}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin size={12} />
                            {review.travellerCountry}
                          </p>
                        </div>
                        <div className="text-right">
                          <StarRating rating={review.rating} size={14} />
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                            <Calendar size={10} />
                            {format(new Date(review.createdAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed">{review.reviewText}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <span className="text-sm text-muted-foreground">
            Total: {experienceReviews.length} review{experienceReviews.length !== 1 ? 's' : ''}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={onAddReview} className="gap-2">
              <Plus size={16} />
              Add Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
