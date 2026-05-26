import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { BackupSchedule } from "@/features/admin/components/BackupRecovery/types";
import { mockBackups, mockSchedules } from "@/features/admin/components/BackupRecovery/mockData";
import { BackupList } from "@/features/admin/components/BackupRecovery/BackupList";
import { BackupSchedules } from "@/features/admin/components/BackupRecovery/BackupSchedules";
import { BackupSettings } from "@/features/admin/components/BackupRecovery/BackupSettings";

const BackupRecovery = () => {
  const [activeTab, setActiveTab] = useState<string>('backups');
  const [schedules, setSchedules] = useState<BackupSchedule[]>(mockSchedules);

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Backup & Recovery" 
        description="Manage system backups and data recovery"
      />
      <div className="flex-1 overflow-auto bg-background p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backups" className="mt-6">
            <BackupList backups={mockBackups} />
          </TabsContent>
          
          <TabsContent value="scheduling" className="mt-6">
            <BackupSchedules schedules={schedules} setSchedules={setSchedules} />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <BackupSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BackupRecovery;
