import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { toast } from "@/hooks/use-toast";
import { useReports } from "./useReports";

import { ReportDashboard } from "./components/ReportDashboard";
import { ReportGrid } from "./components/ReportGrid";
import { ReportHistory } from "./components/ReportHistory";
import { ReportStatistics } from "./components/ReportStatistics";

// Mock data for user roles that can be viewed
const mockUserRoles = [
  { id: "student", name: "Students" },
  { id: "teacher", name: "Teachers" },
  { id: "admin", name: "Administrators" },
  { id: "principal", name: "Principal" },
  { id: "financial", name: "Financial Staff" },
  { id: "library", name: "Library Staff" },
  { id: "labs", name: "Lab Assistants" },
  { id: "super-admin", name: "Super Admin" },
];

const Reports = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { reports, history, loading, error, generateReport, exportReport, viewReport } = useReports();
  
  const [filteredReports, setFilteredReports] = useState<any[]>([]);

  // Filter reports based on active tab, selected role and search term
  useEffect(() => {
    let result = reports;
    
    if (activeTab !== "all") {
      result = result.filter(report => report.type === activeTab);
    }
    
    if (searchTerm) {
      result = result.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredReports(result);
  }, [activeTab, reports, searchTerm]);

  const handleGenerateReport = async (reportId: number) => {
    try {
      const result = await generateReport(reportId, 'pdf');
      toast({
        title: "Report Generated",
        description: `Report generated successfully. ${(result as any).message}`
      });
    } catch (err) {
      toast({
        title: "Generation Failed",
        description: `Failed to generate report: ${err}`,
        variant: "destructive"
      });
    }
  };

  const handleExportReport = async (reportId: number) => {
    try {
      const result = await exportReport(reportId, 'pdf');
      toast({
        title: "Report Exported",
        description: `Report exported successfully. ${(result as any).message}`
      });
    } catch (err) {
      toast({
        title: "Export Failed",
        description: `Failed to export report: ${err}`,
        variant: "destructive"
      });
    }
  };

  const handleViewReport = async (reportId: number) => {
    try {
      const result = await viewReport(reportId);
      toast({
        title: "Report Viewed",
        description: `Report viewed successfully. ${(result as any).message}`
      });
    } catch (err) {
      toast({
        title: "View Failed",
        description: `Failed to view report: ${err}`,
        variant: "destructive"
      });
    }
  };

  // Determine which roles can be viewed based on current user role
  const getViewableRoles = () => {
    switch (user?.role) {
      case "principal":
      case "super-admin":
        return mockUserRoles;
      case "admin":
        return mockUserRoles.filter(role => ["student", "teacher"].includes(role.id));
      default:
        return [{ id: user?.role || "self", name: "My Reports" }];
    }
  };

  const viewableRoles = getViewableRoles();

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardHeader title="Reports" />
        <main className="flex-1 overflow-auto dashboard-content p-6 flex items-center justify-center">
          <div>Loading reports...</div>
        </main>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <DashboardHeader title="Reports" />
        <main className="flex-1 overflow-auto dashboard-content p-6 flex items-center justify-center">
          <div>Error loading reports: {error}</div>
        </main>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Reports" />

      <main className="flex-1 overflow-auto dashboard-content p-6 space-y-6">
        <div className="flex flex-col gap-6">
          <ReportDashboard 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewableRoles={viewableRoles}
            onRefresh={() => window.location.reload()}
            onApplyFilters={() => {
              toast({
                title: "Filters Applied",
                description: "Reports have been filtered based on your selections."
              });
            }}
          />

          <ReportGrid 
            filteredReports={filteredReports}
            handleViewReport={handleViewReport}
            handleGenerateReport={handleGenerateReport}
            handleExportReport={handleExportReport}
          />

          <ReportHistory 
            history={history}
            handleViewReport={handleViewReport}
            handleExportReport={handleExportReport}
          />

          {user?.role && ["principal", "super-admin", "admin"].includes(user.role) && (
            <ReportStatistics />
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Reports;
