import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StaffFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  departments: string[];
}

export const StaffFilters = ({
  searchQuery,
  setSearchQuery,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  departments
}: StaffFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search staff members by name, role, or email..."
          className="pl-9 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        <div className="hidden sm:flex items-center px-3 border-l border-slate-200 h-8">
          <SlidersHorizontal className="h-4 w-4 text-slate-400 mr-2" />
          <span className="text-xs font-medium text-slate-500">Filters</span>
        </div>
        
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[160px] h-9 bg-slate-50 border-slate-200 hover:bg-slate-100 transition-colors">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px] h-9 bg-slate-50 border-slate-200 hover:bg-slate-100 transition-colors">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="leave">On Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
