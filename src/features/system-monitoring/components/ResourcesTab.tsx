import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { SystemStatus, UsageData } from "../useSystemMonitoring";

interface ResourcesTabProps {
  mockSystemStatus: SystemStatus;
  usageHistory: UsageData[];
}

export const ResourcesTab = ({ mockSystemStatus, usageHistory }: ResourcesTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>CPU Usage</CardTitle>
            <CardDescription>Current CPU utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemStatus.cpuUsage}%</div>
            <Progress
              value={mockSystemStatus.cpuUsage}
              className="h-2"
              indicatorClassName={
                mockSystemStatus.cpuUsage < 50 ? 'bg-emerald-500 dark:bg-emerald-400' :
                  mockSystemStatus.cpuUsage < 80 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Memory Usage</CardTitle>
            <CardDescription>Current memory utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemStatus.memoryUsage}%</div>
            <Progress
              value={mockSystemStatus.memoryUsage}
              className="h-2"
              indicatorClassName={
                mockSystemStatus.memoryUsage < 50 ? 'bg-emerald-500 dark:bg-emerald-400' :
                  mockSystemStatus.memoryUsage < 80 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disk Usage</CardTitle>
            <CardDescription>Current disk utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemStatus.diskUsage}%</div>
            <Progress
              value={mockSystemStatus.diskUsage}
              className="h-2"
              indicatorClassName={
                mockSystemStatus.diskUsage < 50 ? 'bg-emerald-500 dark:bg-emerald-400' :
                  mockSystemStatus.diskUsage < 80 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'
              }
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Trends</CardTitle>
          <CardDescription>Historical resource usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={usageHistory}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#8884d8" activeDot={{ r: 8 }} name="CPU (%)" />
                <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory (%)" />
                <Line type="monotone" dataKey="network" stroke="#ffc658" name="Network (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
