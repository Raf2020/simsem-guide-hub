import { Experience } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus, Eye, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExperienceTableProps {
  experiences: Experience[];
  onAddReview: (experience: Experience) => void;
  onViewReviews: (experience: Experience) => void;
}

export function ExperienceTable({ 
  experiences, 
  onAddReview, 
  onViewReviews 
}: ExperienceTableProps) {
  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Tour Name</TableHead>
            <TableHead className="font-semibold">Experience ID</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Country</TableHead>
            <TableHead className="font-semibold">Approval</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Guide</TableHead>
            <TableHead className="font-semibold text-center">Reviews</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.map((experience) => (
            <TableRow key={experience.id} className="animate-fade-in">
              <TableCell>
                <a 
                  href="#" 
                  className="text-primary hover:underline font-medium max-w-[200px] truncate block"
                  title={experience.name}
                >
                  {experience.name.length > 25 
                    ? `${experience.name.slice(0, 25)}...` 
                    : experience.name}
                </a>
              </TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {experience.id}
              </TableCell>
              <TableCell>{experience.type}</TableCell>
              <TableCell>{experience.country}</TableCell>
              <TableCell>
                <span className={experience.approval === 'APPROVED' ? 'badge-approved' : 'badge-pending'}>
                  {experience.approval}
                </span>
              </TableCell>
              <TableCell>
                <span className={experience.status === 'ACTIVE' ? 'badge-active' : 'badge-inactive'}>
                  {experience.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                    <User size={14} className="text-muted-foreground" />
                  </div>
                  <span className="text-sm">{experience.guideName}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <button 
                  onClick={() => onViewReviews(experience)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                >
                  {experience.reviewCount}
                </button>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onViewReviews(experience)}
                    className="gap-1"
                  >
                    <Eye size={14} />
                    Details
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => onAddReview(experience)}
                    className="gap-1 bg-primary hover:bg-primary/90"
                  >
                    <Plus size={14} />
                    Add Review
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {experiences.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No experiences found matching your search criteria.
        </div>
      )}
    </div>
  );
}
