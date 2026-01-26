import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/mockData";

interface ExperienceSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCountry: string;
  onCountryChange: (value: string) => void;
  onRefresh: () => void;
}

export function ExperienceSearch({
  searchQuery,
  onSearchChange,
  selectedCountry,
  onCountryChange,
  onRefresh,
}: ExperienceSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger className="w-[180px] bg-card">
          <SelectValue placeholder="Filter by country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country} value={country}>
              {country === 'All' ? 'All Countries' : country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search by name, experience ID, guide ID, or guide name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
        <Button variant="outline" size="icon" onClick={onRefresh}>
          <RefreshCw size={18} />
        </Button>
      </div>
    </div>
  );
}
