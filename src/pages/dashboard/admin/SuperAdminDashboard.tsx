import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users, Activity, Server, Database, ShieldAlert,
  Settings, UserPlus, Cpu, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { useNavigate } from 'react-router-dom';

const systemHealth = [
  { name: 'API Server',         status: 'operational', load: '42%' },
  { name: 'Database Main',      status: 'operational', load: '68%' },
  { name: 'Cache Layer',        status: 'degraded',    load: '89%' },
  { name: 'File Storage',       status: 'operational', load: '21%' },
  { name: 'Message Queue',      status: 'operational', load: '34%' },
  { name: 'Load Balancer',      status: 'operational', load: '55%' },
  { name: 'CDN Edge',           status: 'operational', load: '38%' },
  { name: 'Monitoring Service', status: 'degraded',    load: '76%' },
];

const recentAuditLogs = [
  { id: 1,  action: 'User Created',          target: 'priya.sharma',       by: 'Rohan Verma',     time: '8 mins ago',   type: 'info'    },
  { id: 2,  action: 'Permissions Changed',   target: 'Role: Principal',    by: 'Rohan Verma',     time: '42 mins ago',  type: 'warning' },
  { id: 3,  action: 'System Backup',         target: 'Database Main',      by: 'system_auto',     time: '2 hours ago',  type: 'success' },
  { id: 4,  action: 'Failed Login',          target: 'User: unknown',      by: 'IP: 10.0.1.45',   time: '4 hours ago',  type: 'error'   },
  { id: 5,  action: 'Fee Structure Updated', target: 'Class X-A',          by: 'Fatima Siddiqui', time: '5 hours ago',  type: 'info'    },
  { id: 6,  action: 'Admission Approved',    target: 'Arjun Kapoor',       by: 'Anjali Gupta',    time: '6 hours ago',  type: 'success' },
  { id: 7,  action: 'Timetable Modified',    target: 'Semester II',        by: 'Vikram Patel',    time: '8 hours ago',  type: 'info'    },
  { id: 8,  action: 'Library Book Added',    target: 'Catalog: Science',   by: 'Mohammed Khan',   time: '10 hours ago', type: 'info'    },
  { id: 9,  action: 'Student Suspended',     target: 'ID: stu-2287',       by: 'Principal Arora', time: '12 hours ago', type: 'warning' },
  { id: 10, action: 'Config Export',         target: 'System Config v2.4', by: 'Rohan Verma',     time: '1 day ago',    type: 'info'    },
];

const activeAlerts = [
  { id: 1, title: 'High Memory Usage',       desc: 'Cache layer at 89%. Auto-scaling triggered.',              severity: 'high'   },
  { id: 2, title: 'Backup Delayed',          desc: 'Scheduled backup 45s late. Storage: 320 GB / 500 GB.',    severity: 'medium' },
  { id: 3, title: 'Monitoring Degraded',     desc: 'Log streaming intermittent. Batch mode active.',           severity: 'medium' },
  { id: 4, title: 'Unusual Login Activity',  desc: '14 failed attempts from IP 10.0.1.45 in 30 minutes.',     severity: 'high'   },
];

const logDot: Record<string, string> = {
  info: 'bg-blue-500', warning: 'bg-amber-500', error: 'bg-red-500', success: 'bg-emerald-500',
};

const SuperAdminDashboard = () => {
  const { stats, isLoading } = useDashboardData();
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">System Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Platform infrastructure and audit management.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/users')}>
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
          <Button variant="default" size="sm" onClick={() => navigate('/dashboard/configuration')}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users',     value: isLoading ? '…' : (stats[0]?.value ?? '1,248'), sub: '+12% from last month',   icon: Users    },
          { label: 'Active Sessions', value: isLoading ? '…' : (stats[1]?.value ?? '312'),   sub: 'Currently logged in',    icon: Activity },
          { label: 'Storage Used',    value: '64%',                                            sub: '320 GB / 500 GB',        icon: Database },
          { label: 'CPU Usage',       value: '42%',                                            sub: 'Avg across nodes',       icon: Cpu      },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{k.label}</span>
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{k.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{k.sub}</p>
            </Card>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* System Infrastructure */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              System Infrastructure
            </CardTitle>
            <CardDescription className="text-xs">Real-time status · 2 nodes degraded</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y">
              {systemHealth.map((node) => (
                <div key={node.name} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    {node.status === 'operational'
                      ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      : <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                    <div>
                      <p className="text-sm text-foreground">{node.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{node.status}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{node.load}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-3">
              <div className="text-center p-2.5 bg-emerald-500/10 rounded-lg">
                <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">99.8%</p>
                <p className="text-xs text-muted-foreground">Global Uptime</p>
              </div>
              <div className="text-center p-2.5 bg-blue-500/10 rounded-lg">
                <p className="text-base font-bold text-blue-600 dark:text-blue-400">42ms</p>
                <p className="text-xs text-muted-foreground">Avg Response</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts + Audit stacked */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <ShieldAlert className="h-4 w-4" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y">
                {activeAlerts.map((a) => (
                  <div key={a.id} className="flex items-start gap-2.5 py-2.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                Recent Audit Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y">
                {recentAuditLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2.5 py-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${logDot[log.type] ?? 'bg-muted-foreground'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{log.action}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {log.target} · {log.by} · {log.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;
