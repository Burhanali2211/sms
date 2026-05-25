import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Cpu, Database, HardDrive, Network, Clock } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { SystemStatus, PerformanceMetric, UsageData } from "../useSystemMonitoring";

// Component for resource usage
const ResourceUsage = ({ title, usage, icon }: { title: string; usage: number; icon: React.ReactNode }) => {
  const getColorClass = (value: number) => {
    if (value < 50) return 'text-green-500';
    if (value < 80) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <span className={`${getColorClass(usage)}`}>{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{usage}%</div>
        <Progress
          value={usage}
          className={`mt-2 h-2 ${usage < 50 ? 'bg-green-100' : usage < 80 ? 'bg-amber-100' : 'bg-red-100'
            } ${usage < 50 ? 'bg-green-500' : usage < 80 ? 'bg-amber-500' : 'bg-red-500'
            }`}
        />
      </CardContent>
    </Card>
  );
};

// Service status component
const ServiceStatus = ({ service }: { service: SystemStatus['services'][0] }) => {
  const getResponseTimeClass = () => {
    if (service.responseTime < 100) return 'text-emerald-500 dark:text-emerald-400';
    if (service.responseTime < 300) return 'text-amber-500 dark:text-amber-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <div className="font-medium">{service.name}</div>
        <StatusBadge status={service.status} />
      </div>
      <div className="mt-2 flex items-center text-sm">
        <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
        <span className={`${getResponseTimeClass()}`}>{service.responseTime}ms</span>
      </div>
      {service.lastIncident && (
        <div className="mt-1 text-xs text-muted-foreground">
          Last incident: {service.lastIncident}
        </div>
      )}
    </div>
  );
};

interface OverviewTabProps {
  mockSystemStatus: SystemStatus;
  usageHistory: UsageData[];
  performanceMetrics: PerformanceMetric[];
  setActiveTab: (tab: string) => void;
}

export const OverviewTab = ({
  mockSystemStatus,
  usageHistory,
  performanceMetrics,
  setActiveTab
}: OverviewTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ResourceUsage
          title="CPU Usage"
          usage={mockSystemStatus.cpuUsage}
          icon={<Cpu className="h-5 w-5" />}
        />
        <ResourceUsage
          title="Memory Usage"
          usage={mockSystemStatus.memoryUsage}
          icon={<HardDrive className="h-5 w-5" />}
        />
        <ResourceUsage
          title="Network Usage"
          usage={mockSystemStatus.networkUsage}
          icon={<Network className="h-5 w-5" />}
        />
        <ResourceUsage
          title="Disk Usage"
          usage={mockSystemStatus.diskUsage}
          icon={<Database className="h-5 w-5" />}
        />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>System Resource Usage (24 Hours)</CardTitle>
          <CardDescription>Historical view of system resource utilization</CardDescription>
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
                <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="memory" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="network" stackId="3" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Health</CardTitle>
            <CardDescription>Current status of critical services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {mockSystemStatus.services
                .filter((_, idx) => idx < 4)
                .map((service, idx) => (
                  <ServiceStatus key={idx} service={service} />
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("services")}
              className="w-full"
            >
              View All Services
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Real-time performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {performanceMetrics
                .filter((_, idx) => idx < 4)
                .map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <div className="flex items-center">
                      {metric.limit ? (
                        <span className="text-sm">
                          <span
                            className={
                              metric.value / metric.limit < 0.7
                                ? 'text-emerald-500 dark:text-emerald-400'
                                : metric.value / metric.limit < 0.9
                                  ? 'text-amber-500 dark:text-amber-400'
                                  : 'text-rose-500 dark:text-rose-400'
                            }
                          >
                            {metric.value.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground"> / {metric.limit.toLocaleString()}</span>
                        </span>
                      ) : (
                        <span className="text-sm">
                          {metric.name.includes('Time')
                            ? `${metric.value}ms`
                            : `${metric.value}%`
                          }
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("resources")}
              className="w-full"
            >
              View All Resources
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
