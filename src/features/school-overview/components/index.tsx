import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { SummaryTab } from "./SummaryTab";
import { AcademicsTab } from "./AcademicsTab";
import { StaffTab } from "./StaffTab";
import { FacilitiesTab } from "./FacilitiesTab";

const SchoolOverview = () => {
  return (
    <DashboardLayout>
      <DashboardHeader title="School Overview" />
      <div className={cn(
        "flex-1 overflow-auto p-6 transition-colors duration-300",
        "dashboard-content"
      )}>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <SummaryTab />
          </TabsContent>

          <TabsContent value="academics">
            <AcademicsTab />
          </TabsContent>

          <TabsContent value="staff">
            <StaffTab />
          </TabsContent>

          <TabsContent value="facilities">
            <FacilitiesTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SchoolOverview;
