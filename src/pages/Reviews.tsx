import { useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ExperienceSearch } from "@/components/reviews/ExperienceSearch";
import { ExperienceTable } from "@/components/reviews/ExperienceTable";
import { AddReviewModal } from "@/components/reviews/AddReviewModal";
import { ViewReviewsModal } from "@/components/reviews/ViewReviewsModal";
import { experiences as initialExperiences, reviews as initialReviews, Experience, Review } from "@/data/mockData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [allReviews, setAllReviews] = useState<Review[]>(initialReviews);
  
  const [addReviewOpen, setAddReviewOpen] = useState(false);
  const [viewReviewsOpen, setViewReviewsOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        exp.name.toLowerCase().includes(searchLower) ||
        exp.id.toLowerCase().includes(searchLower) ||
        exp.guideId.toLowerCase().includes(searchLower) ||
        exp.guideName.toLowerCase().includes(searchLower);
      
      // Country filter
      const matchesCountry = selectedCountry === "All" || exp.country === selectedCountry;
      
      // Status filter
      const matchesStatus = 
        statusFilter === "All" ||
        (statusFilter === "Active" && exp.status === "ACTIVE") ||
        (statusFilter === "Inactive" && exp.status === "INACTIVE") ||
        (statusFilter === "Pending" && exp.approval === "PENDING");
      
      return matchesSearch && matchesCountry && matchesStatus;
    });
  }, [experiences, searchQuery, selectedCountry, statusFilter]);

  const handleAddReview = (experience: Experience) => {
    setSelectedExperience(experience);
    setAddReviewOpen(true);
  };

  const handleViewReviews = (experience: Experience) => {
    setSelectedExperience(experience);
    setViewReviewsOpen(true);
  };

  const handleSaveReview = (reviewData: {
    travellerName: string;
    travellerCountry: string;
    travellerPhoto: string;
    rating: number;
    reviewText: string;
  }) => {
    if (!selectedExperience) return;

    const newReview: Review = {
      id: `rev${Date.now()}`,
      experienceId: selectedExperience.id,
      travellerName: reviewData.travellerName,
      travellerCountry: reviewData.travellerCountry,
      travellerPhoto: reviewData.travellerPhoto,
      rating: reviewData.rating,
      reviewText: reviewData.reviewText,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAllReviews([newReview, ...allReviews]);
    setExperiences(experiences.map(exp => 
      exp.id === selectedExperience.id 
        ? { ...exp, reviewCount: exp.reviewCount + 1 }
        : exp
    ));
  };

  const handleAddReviewFromModal = () => {
    setViewReviewsOpen(false);
    setAddReviewOpen(true);
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setSelectedCountry("All");
    setStatusFilter("All");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Reviews Management</h1>
            <p className="text-muted-foreground mt-1">
              Add and manage reviews for local guide experiences
            </p>
          </div>

          {/* Status Tabs */}
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
            <TabsList className="bg-card border">
              <TabsTrigger value="All" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                All
              </TabsTrigger>
              <TabsTrigger value="Pending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Pending Experiences
              </TabsTrigger>
              <TabsTrigger value="Active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Active
              </TabsTrigger>
              <TabsTrigger value="Inactive" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Inactive
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search and Filters */}
          <div className="mb-6">
            <ExperienceSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              onRefresh={handleRefresh}
            />
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredExperiences.length} of {experiences.length} experiences
          </div>

          {/* Experience Table */}
          <ExperienceTable
            experiences={filteredExperiences}
            onAddReview={handleAddReview}
            onViewReviews={handleViewReviews}
          />
        </div>
      </main>

      {/* Add Review Modal */}
      <AddReviewModal
        open={addReviewOpen}
        onOpenChange={setAddReviewOpen}
        experience={selectedExperience}
        onSave={handleSaveReview}
      />

      {/* View Reviews Modal */}
      <ViewReviewsModal
        open={viewReviewsOpen}
        onOpenChange={setViewReviewsOpen}
        experience={selectedExperience}
        reviews={allReviews}
        onAddReview={handleAddReviewFromModal}
      />
    </div>
  );
}
