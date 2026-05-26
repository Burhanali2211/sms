import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle, Archive, Download, RefreshCw } from "lucide-react";

import { useSystemLogs } from "../useSystemLogs";
import { LogStats } from "./LogStats";
import { LogFilters } from "./LogFilters";
import { LogTable } from "./LogTable";

const SystemLogs = () => {
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    logTypeFilter,
    setLogTypeFilter,
    sourceFilter,
    setSourceFilter,
    currentPage,
    setCurrentPage,
    logsPerPage,
    sources,
    filteredLogs,
    currentLogs,
    totalPages,
    errorCount,
    warningCount,
    infoCount,
    successCount,
  } = useSystemLogs();

  return (
    <DashboardLayout>
      <DashboardHeader
        title="System Logs"
        description="View and manage system logs and activities"
      />
      <div className="flex-1 overflow-auto bg-background p-6">
        <LogStats 
          errorCount={errorCount}
          warningCount={warningCount}
          infoCount={infoCount}
          successCount={successCount}
        />

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>All system events and activities</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
                <Button variant="default" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList>
                <TabsTrigger value="all">All Logs</TabsTrigger>
                <TabsTrigger value="error">
                  <AlertTriangle className="h-4 w-4 mr-1 text-rose-600 dark:text-rose-400" />
                  Errors
                </TabsTrigger>
                <TabsTrigger value="warning">
                  <AlertTriangle className="h-4 w-4 mr-1 text-amber-600 dark:text-amber-400" />
                  Warnings
                </TabsTrigger>
                <TabsTrigger value="info">
                  <Info className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                  Info
                </TabsTrigger>
                <TabsTrigger value="success">
                  <CheckCircle className="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                  Success
                </TabsTrigger>
              </TabsList>

              <LogFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                logTypeFilter={logTypeFilter}
                setLogTypeFilter={setLogTypeFilter}
                sourceFilter={sourceFilter}
                setSourceFilter={setSourceFilter}
                sources={sources}
              />

              <TabsContent value={activeTab}>
                <LogTable 
                  currentLogs={currentLogs}
                  filteredLogs={filteredLogs}
                  logsPerPage={logsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SystemLogs;
