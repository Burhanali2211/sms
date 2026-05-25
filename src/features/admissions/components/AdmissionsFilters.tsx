import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdmissionsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setGradeFilter: (grade: string | null) => void;
  grades: string[];
}

export const AdmissionsFilters = ({
  searchTerm,
  setSearchTerm,
  setGradeFilter,
  grades
}: AdmissionsFiltersProps) => {
  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search applications..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="sm:w-[180px]">
        <Select
          onValueChange={(value) => setGradeFilter(value === "all" ? null : value)}
          defaultValue="all"
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            {grades.map((grade) => (
              <SelectItem key={grade} value={grade}>
                Grade {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
