import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 16,
  interactive = false,
  onChange 
}: StarRatingProps) {
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          disabled={!interactive}
          className={cn(
            "transition-transform",
            interactive && "hover:scale-110 cursor-pointer disabled:cursor-default"
          )}
        >
          <Star
            size={size}
            className={cn(
              "transition-colors",
              index < rating 
                ? "fill-accent text-accent" 
                : "fill-muted text-muted"
            )}
          />
        </button>
      ))}
    </div>
  );
}
