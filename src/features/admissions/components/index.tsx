import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAdmissions } from "../useAdmissions";
import { AdmissionsStats } from "./AdmissionsStats";
import { NewApplicationDialog } from "./NewApplicationDialog";
import { ApplicationDetailsDialog } from "./ApplicationDetailsDialog";
import { AdmissionsTable } from "./AdmissionsTable";
import { AdmissionsFilters } from "./AdmissionsFilters";

const Admissions = () => {
  const {
    searchTerm,
    setSearchTerm,
    setStatusFilter,
    setGradeFilter,
    isAddingApplication,
    setIsAddingApplication,
    newApplication,
    setNewApplication,
    selectedApplication,
    setSelectedApplication,
    isViewingApplication,
    setIsViewingApplication,
    filteredApplications,
    totalApplications,
    pendingApplications,
    approvedApplications,
    rejectedApplications,
    handleAddApplication,
    handleViewApplication,
    handleUpdateStatus,
    grades
  } = useAdmissions();

  return (
    <DashboardLayout>
      <DashboardHeader title="Admissions" />
      <div className={cn("flex-1 overflow-auto dashboard-content p-6")}>
        <AdmissionsStats 
          totalApplications={totalApplications}
          pendingApplications={pendingApplications}
          approvedApplications={approvedApplications}
          rejectedApplications={rejectedApplications}
        />

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Admission Applications</CardTitle>
                <CardDescription>Review and process student admission requests</CardDescription>
              </div>
              <NewApplicationDialog 
                isAddingApplication={isAddingApplication}
                setIsAddingApplication={setIsAddingApplication}
                newApplication={newApplication}
                setNewApplication={setNewApplication}
                handleAddApplication={handleAddApplication}
                grades={grades}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-4" onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
              <TabsList>
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>

            <AdmissionsFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setGradeFilter={setGradeFilter}
              grades={grades}
            />

            <AdmissionsTable 
              filteredApplications={filteredApplications}
              handleViewApplication={handleViewApplication}
              handleUpdateStatus={handleUpdateStatus}
            />
          </CardContent>
        </Card>

        <ApplicationDetailsDialog 
          isViewingApplication={isViewingApplication}
          setIsViewingApplication={setIsViewingApplication}
          selectedApplication={selectedApplication}
          setSelectedApplication={setSelectedApplication}
          handleUpdateStatus={handleUpdateStatus}
        />
      </div>
    </DashboardLayout>
  );
};

export default Admissions;
