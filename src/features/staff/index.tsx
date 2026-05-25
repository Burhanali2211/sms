import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useStaff } from "./useStaff";
import { StaffFilters } from "./components/StaffFilters";
import { StaffGrid } from "./components/StaffGrid";

const Staff = () => {
  const {
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    departments,
    filteredStaff
  } = useStaff();

  return (
    <DashboardLayout>
      <DashboardHeader title="Staff Management" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <StaffFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          departments={departments}
        />
        <StaffGrid staffList={filteredStaff} />
      </div>
    </DashboardLayout>
  );
};

export default Staff;
