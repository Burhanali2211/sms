import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Server, Database, Cpu, HardDrive, RefreshCw,
  CheckCircle2, AlertTriangle, Activity, Clock, Wifi,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const services = [
  { name: 'Database',        status: 'online',   ms: 12  },
  { name: 'Authentication',  status: 'online',   ms: 8   },
  { name: 'Storage',         status: 'online',   ms: 15  },
  { name: 'Email',           status: 'degraded', ms: 450 },
  { name: 'API Gateway',     status: 'online',   ms: 22  },
  { name: 'Backup Service',  status: 'online',   ms: 30  },
  { name: 'Search',          status: 'online',   ms: 25  },
  { name: 'Notification',    status: 'online',   ms: 18  },
];

const resources = [
  { label: 'CPU Usage',    value: 32, icon: Cpu      },
  { label: 'Memory',       value: 45, icon: Activity },
  { label: 'Disk',         value: 65, icon: HardDrive},
  { label: 'Network I/O',  value: 38, icon: Wifi     },
];

const kpis = [
  { label: 'Uptime',         value: '99.8%',  sub: '25 days 14 hrs'    },
  { label: 'Avg Response',   value: '42ms',   sub: 'across all nodes'  },
  { label: 'Active Sessions',value: '312',    sub: 'users online'      },
  { label: 'Error Rate',     value: '0.02%',  sub: 'last 24 hours'     },
];

const recentEvents = [
  { msg: 'System backup completed successfully',         time: '2 hours ago',  type: 'success' },
  { msg: 'Email service response time degraded (450ms)', time: '3 hours ago',  type: 'warning' },
  { msg: 'Auto-scaling triggered — cache layer at 89%',  time: '4 hours ago',  type: 'warning' },
  { msg: 'SSL certificate renewed automatically',        time: '1 day ago',    type: 'success' },
  { msg: 'Failed login flood from IP 10.0.1.45',        time: '1 day ago',    type: 'error'   },
  { msg: 'Database vacuum completed (320 GB → 290 GB)', time: '2 days ago',   type: 'success' },
];

const barColor = (v: number) =>
  v < 50 ? 'bg-emerald-500' : v < 80 ? 'bg-amber-500' : 'bg-rose-500';

const dotColor: Record<string, string> = {
  success: 'bg-emerald-500', warning: 'bg-amber-500', error: 'bg-rose-500',
};

const msColor = (ms: number) =>
  ms < 100 ? 'text-emerald-600 dark:text-emerald-400' : ms < 300 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400';

const SystemHealth = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({ title: 'Status refreshed', description: 'All metrics updated.' });
    }, 1200);
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="System Health" />
      <main className="flex-1 overflow-auto bg-background p-6 space-y-5">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-foreground">All systems operational</span>
            <span className="text-xs text-muted-foreground">· last checked 2 mins ago</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-3.5 w-3.5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <Card key={k.label} className="p-4">
              <p className="text-xs font-medium text-muted-foreground mb-1">{k.label}</p>
              <div className="text-2xl font-bold text-foreground">{k.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{k.sub}</p>
            </Card>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Resource usage */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                Resource Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {resources.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.label}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        {r.label}
                      </div>
                      <span className={`font-medium ${r.value >= 80 ? 'text-rose-600 dark:text-rose-400' : r.value >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {r.value}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div className={`h-2 rounded-full ${barColor(r.value)}`} style={{ width: `${r.value}%` }} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y">
                {services.map((s) => (
                  <div key={s.name} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-2">
                      {s.status === 'online'
                        ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        : <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                      <span className="text-sm text-foreground">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className={msColor(s.ms)}>{s.ms}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y">
              {recentEvents.map((e, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${dotColor[e.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{e.msg}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </main>
    </DashboardLayout>
  );
};

export default SystemHealth;
