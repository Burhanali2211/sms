import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { StatusBadge } from "@/components/ui/status-badge";
import { Clock } from "lucide-react";
import { SystemStatus } from "../useSystemMonitoring";

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

interface ServicesTabProps {
  mockSystemStatus: SystemStatus;
}

export const ServicesTab = ({ mockSystemStatus }: ServicesTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSystemStatus.services.map((service, idx) => (
          <ServiceStatus key={idx} service={service} />
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Service Response Time Comparison</CardTitle>
          <CardDescription>Performance across all system services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockSystemStatus.services.map(s => ({
                  name: s.name,
                  responseTime: s.responseTime,
                  status: s.status
                }))}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip formatter={(value) => `${value}ms`} />
                <Legend />
                <Bar
                  dataKey="responseTime"
                  name="Response Time (ms)"
                  fill="#8884d8"
                  background={{ fill: '#eee' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
