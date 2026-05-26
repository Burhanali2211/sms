import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useStaff } from "./useStaff";
import { StaffFilters } from "./components/StaffFilters";
import { StaffGrid } from "./components/StaffGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, CalendarOff, Building2 } from "lucide-react";

const Staff = () => {
  const {
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    departments,
    filteredStaff,
    totalStaff,
    activeStaff,
    leaveStaff
  } = useStaff();

  return (
    <DashboardLayout>
      <DashboardHeader title="Staff Management" />
      <div className="flex-1 overflow-auto bg-slate-50/50 p-6">
        <div className="w-full space-y-6">
          {/* KPI Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Staff</p>
                    <h3 className="text-2xl font-bold text-slate-900">{totalStaff}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Active</p>
                    <h3 className="text-2xl font-bold text-slate-900">{activeStaff}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                    <CalendarOff className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">On Leave</p>
                    <h3 className="text-2xl font-bold text-slate-900">{leaveStaff}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Departments</p>
                    <h3 className="text-2xl font-bold text-slate-900">{departments.length}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
      </div>
    </DashboardLayout>
  );
};

export default Staff;
