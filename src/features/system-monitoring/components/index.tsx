import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ArrowUpCircle,
  Clock8
} from "lucide-react";

import { useSystemMonitoring } from "../useSystemMonitoring";
import { OverviewTab } from "./OverviewTab";
import { ResourcesTab } from "./ResourcesTab";
import { NetworkTab } from "./NetworkTab";
import { ServicesTab } from "./ServicesTab";

const SystemMonitoring = () => {
  const {
    activeTab,
    setActiveTab,
    isRefreshing,
    handleRefresh,
    mockSystemStatus,
    performanceMetrics,
    usageHistory
  } = useSystemMonitoring();

  return (
    <DashboardLayout>
      <DashboardHeader
        title="System Monitoring"
        description="Real-time monitoring of system resources and services"
      />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mockSystemStatus.status === 'healthy' ? (
              <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
            ) : mockSystemStatus.status === 'warning' ? (
              <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-rose-500 dark:text-rose-400" />
            )}
            <span className="font-medium">
              System Status:
              <span className={
                mockSystemStatus.status === 'healthy'
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : mockSystemStatus.status === 'warning'
                    ? 'text-amber-500 dark:text-amber-400'
                    : 'text-rose-500 dark:text-rose-400'
              }> {mockSystemStatus.status.charAt(0).toUpperCase() + mockSystemStatus.status.slice(1)}</span>
            </span>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <ArrowUpCircle className="h-4 w-4 mr-1" />
              <span>Uptime: {mockSystemStatus.uptime}</span>
            </div>
            <div className="flex items-center">
              <Clock8 className="h-4 w-4 mr-1" />
              <span>Last checked: {mockSystemStatus.lastChecked}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <OverviewTab 
              mockSystemStatus={mockSystemStatus}
              usageHistory={usageHistory}
              performanceMetrics={performanceMetrics}
              setActiveTab={setActiveTab}
            />
          </TabsContent>

          <TabsContent value="resources" className="mt-4">
            <ResourcesTab 
              mockSystemStatus={mockSystemStatus}
              usageHistory={usageHistory}
            />
          </TabsContent>

          <TabsContent value="network" className="mt-4">
            <NetworkTab 
              usageHistory={usageHistory}
            />
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <ServicesTab 
              mockSystemStatus={mockSystemStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SystemMonitoring;
