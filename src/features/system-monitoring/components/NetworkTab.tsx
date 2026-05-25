import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Router, Server } from "lucide-react";
import { UsageData } from "../useSystemMonitoring";

interface NetworkTabProps {
  usageHistory: UsageData[];
}

export const NetworkTab = ({ usageHistory }: NetworkTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Network Throughput</CardTitle>
            <CardDescription>Inbound and outbound network traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={usageHistory}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="network" stroke="#FF7300" fill="#FF7300" name="Network Traffic" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Connections</CardTitle>
            <CardDescription>Number of active network connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">457</div>
            <p className="text-sm text-muted-foreground mt-1">Connections to the server</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Network Devices</CardTitle>
          <CardDescription>Connected network devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <Router className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium">Router</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Server className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium">Firewall</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
