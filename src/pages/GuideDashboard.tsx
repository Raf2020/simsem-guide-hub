import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus, MapPin, Clock, DollarSign, Eye, Pencil, Trash2, Search, Check
} from "lucide-react";
import {
  getPlaceById, mockGuideTours, experienceCategories,
  type GuideTour, type ExperienceCategory
} from "@/data/placesData";
import { PlaceTag } from "@/components/guide/PlaceMultiSelect";
import { CategorySelector } from "@/components/guide/CategorySelector";
import { CreateTourForm } from "@/components/guide/CreateTourForm";

export default function GuideDashboard() {
  const [tours, setTours] = useState<GuideTour[]>(mockGuideTours);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory | null>(null);

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

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCategory(null);
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
            <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) handleDialogClose(); else setDialogOpen(true); }}>
              <DialogTrigger asChild>
                <Button><Plus size={16} className="mr-1" /> New Tour</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">
                    {selectedCategory ? "Create New Tour" : "Choose Experience Type"}
                  </DialogTitle>
                </DialogHeader>
                {!selectedCategory ? (
                  <CategorySelector onSelect={setSelectedCategory} />
                ) : (
                  <CreateTourForm
                    category={selectedCategory}
                    onClose={handleDialogClose}
                    onSave={handleSave}
                    onBack={() => setSelectedCategory(null)}
                  />
                )}
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
            const catInfo = experienceCategories.find((c) => c.id === tour.category);
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
                        {catInfo && (
                          <span className="text-xs">{catInfo.icon} {catInfo.name}</span>
                        )}
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
