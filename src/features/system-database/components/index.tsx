import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table as TableIcon, FileCode, HardDrive, BarChart } from "lucide-react";

import { useSystemDatabase } from "../useSystemDatabase";
import { DatabaseOverview } from "./DatabaseOverview";
import { TablesList } from "./TablesList";
import { SqlQueryTool } from "./SqlQueryTool";
import { BackupsList } from "./BackupsList";
import { PerformanceMonitor } from "./PerformanceMonitor";

const SystemDatabase = () => {
  const {
    searchTerm,
    setSearchTerm,
    sqlQuery,
    setSqlQuery,
    queryResult,
    filteredTables,
    handleRunQuery,
    handleDownloadBackup,
    handleCreateBackup,
    handleOptimize,
    handleRefreshStats,
    mockQueries,
    mockBackups
  } = useSystemDatabase();

  return (
    <DashboardLayout>
      <DashboardHeader title="System Database" />
      <div className="flex-1 overflow-auto dashboard-content p-6">
        <DatabaseOverview />

        <Tabs defaultValue="tables" className="mb-6">
          <TabsList className="w-full grid grid-cols-4 max-w-2xl">
            <TabsTrigger value="tables">
              <TableIcon className="h-4 w-4 mr-2" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="query">
              <FileCode className="h-4 w-4 mr-2" />
              SQL Query
            </TabsTrigger>
            <TabsTrigger value="backups">
              <HardDrive className="h-4 w-4 mr-2" />
              Backups
            </TabsTrigger>
            <TabsTrigger value="performance">
              <BarChart className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="mt-6">
            <TablesList 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              filteredTables={filteredTables} 
            />
          </TabsContent>

          <TabsContent value="query" className="mt-6">
            <SqlQueryTool 
              sqlQuery={sqlQuery}
              setSqlQuery={setSqlQuery}
              queryResult={queryResult}
              handleRunQuery={handleRunQuery}
              mockQueries={mockQueries}
            />
          </TabsContent>

          <TabsContent value="backups" className="mt-6">
            <BackupsList 
              mockBackups={mockBackups}
              handleDownloadBackup={handleDownloadBackup}
              handleCreateBackup={handleCreateBackup}
            />
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <PerformanceMonitor 
              handleRefreshStats={handleRefreshStats}
              handleOptimize={handleOptimize}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SystemDatabase;
