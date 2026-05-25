import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Types
export interface SystemStatus {
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  lastChecked: string;
  cpuUsage: number;
  memoryUsage: number;
  networkUsage: number;
  diskUsage: number;
  services: {
    name: string;
    status: 'online' | 'offline' | 'degraded';
    responseTime: number;
    lastIncident?: string;
  }[];
}

export interface PerformanceMetric {
  name: string;
  value: number;
  limit?: number;
}

export interface UsageData {
  time: string;
  cpu: number;
  memory: number;
  network: number;
}

export const mockSystemStatus: SystemStatus = {
  status: 'healthy',
  uptime: '25 days, 14 hours, 12 minutes',
  lastChecked: '2 minutes ago',
  cpuUsage: 32,
  memoryUsage: 45,
  networkUsage: 28,
  diskUsage: 65,
  services: [
    { name: 'Database', status: 'online', responseTime: 12 },
    { name: 'Authentication', status: 'online', responseTime: 8 },
    { name: 'Storage', status: 'online', responseTime: 15 },
    { name: 'Email', status: 'degraded', responseTime: 450, lastIncident: '2 hours ago' },
    { name: 'API Gateway', status: 'online', responseTime: 22 },
    { name: 'Backup Service', status: 'online', responseTime: 30 },
    { name: 'Search', status: 'online', responseTime: 25 },
    { name: 'Notification', status: 'online', responseTime: 18 },
  ]
};

export const performanceMetrics: PerformanceMetric[] = [
  { name: 'Database Queries', value: 2345, limit: 5000 },
  { name: 'API Calls', value: 12500, limit: 20000 },
  { name: 'Active Users', value: 185, limit: 500 },
  { name: 'File Storage', value: 45, limit: 100 },
  { name: 'Cache Hit Rate', value: 92 },
  { name: 'Average Response Time', value: 120 }
];

// Usage history mock data (last 24 hours)
export const generateUsageData = () => {
  const data: UsageData[] = [];
  const now = new Date();

  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() - 24 + i);
    const hour = time.getHours();
    const timeString = `${hour}:00`;

    // Generate some pattern based on time of day
    const baseValue = (hour >= 8 && hour <= 17) ? 40 : 20;
    const randomFactor = Math.random() * 30;

    data.push({
      time: timeString,
      cpu: Math.min(95, baseValue + randomFactor),
      memory: Math.min(95, (baseValue + 10) + randomFactor * 0.8),
      network: Math.min(95, (baseValue - 5) + randomFactor * 1.2),
    });
  }

  return data;
};

export const usageHistory = generateUsageData();

export const useSystemMonitoring = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "System Status Updated",
        description: "All metrics refreshed successfully."
      });
    }, 1500);
  };

  return {
    activeTab,
    setActiveTab,
    isRefreshing,
    handleRefresh,
    mockSystemStatus,
    performanceMetrics,
    usageHistory
  };
};
