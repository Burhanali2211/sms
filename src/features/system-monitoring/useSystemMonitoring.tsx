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
  status: 'warning',
  uptime: '42 days, 6 hours, 18 minutes',
  lastChecked: '2 minutes ago',
  cpuUsage: 42,
  memoryUsage: 68,
  networkUsage: 34,
  diskUsage: 78,
  services: [
    { name: 'Database Main', status: 'online', responseTime: 14 },
    { name: 'Database Replica', status: 'online', responseTime: 18 },
    { name: 'Authentication', status: 'online', responseTime: 9 },
    { name: 'File Storage', status: 'online', responseTime: 21 },
    { name: 'Email / SMTP', status: 'degraded', responseTime: 520, lastIncident: '3 hours ago' },
    { name: 'API Gateway', status: 'online', responseTime: 24 },
    { name: 'Cache Layer', status: 'degraded', responseTime: 85, lastIncident: '45 minutes ago' },
    { name: 'Backup Service', status: 'online', responseTime: 32 },
    { name: 'Notification Service', status: 'online', responseTime: 19 },
    { name: 'Search Service', status: 'online', responseTime: 28 },
    { name: 'CDN Edge', status: 'online', responseTime: 11 },
    { name: 'Load Balancer', status: 'online', responseTime: 6 },
  ]
};

export const performanceMetrics: PerformanceMetric[] = [
  { name: 'Database Queries', value: 3842, limit: 6000 },
  { name: 'API Calls', value: 15600, limit: 25000 },
  { name: 'Active Users', value: 312, limit: 1500 },
  { name: 'File Storage (GB)', value: 78, limit: 100 },
  { name: 'Cache Hit Rate', value: 71 },
  { name: 'Avg Response Time (ms)', value: 148 }
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
