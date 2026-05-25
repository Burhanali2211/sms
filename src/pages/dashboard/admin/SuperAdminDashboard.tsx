import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, Activity, Server, Database, ShieldAlert, 
  Settings, UserPlus, HardDrive, Cpu, Network,
  AlertTriangle, CheckCircle2, Info
} from 'lucide-react';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const { stats, isLoading } = useDashboardData();
  const navigate = useNavigate();

  // Mock data for system health and recent activity
  const systemHealth = [
    { name: 'API Server', status: 'operational', uptime: '99.99%', load: '42%' },
    { name: 'Database Main', status: 'operational', uptime: '99.95%', load: '68%' },
    { name: 'Cache Layer', status: 'degraded', uptime: '98.20%', load: '89%' },
    { name: 'File Storage', status: 'operational', uptime: '99.99%', load: '21%' },
  ];

  const recentAuditLogs = [
    { id: 1, action: 'User Created', target: 'admin_tech', by: 'super_admin', time: '10 mins ago', type: 'info' },
    { id: 2, action: 'Permissions Changed', target: 'Role: Principal', by: 'super_admin', time: '1 hour ago', type: 'warning' },
    { id: 3, action: 'System Backup', target: 'Database Main', by: 'system_auto', time: '3 hours ago', type: 'success' },
    { id: 4, action: 'Failed Login', target: 'User: unknown', by: 'IP: 192.168.1.45', time: '5 hours ago', type: 'error' },
    { id: 5, action: 'Settings Updated', target: 'Email Gateway', by: 'super_admin', time: '1 day ago', type: 'info' },
  ];

  const activeAlerts = [
    { id: 1, title: 'High Memory Usage', desc: 'Cache layer is exceeding 85% memory threshold.', severity: 'high' },
    { id: 2, title: 'Database Backup Delayed', desc: 'Scheduled backup took 45s longer than usual.', severity: 'medium' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default: return <Info className="h-4 w-4 text-slate-500" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'success': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Overview</h1>
          <p className="text-sm text-slate-500">Manage and monitor your entire platform infrastructure.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/users')}>
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
          <Button variant="default" size="sm" onClick={() => navigate('/dashboard/system')}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </div>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* KPI: Total Users - Spans 1 */}
        <Card className="col-span-1 border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {isLoading ? '...' : (stats[0]?.value || '1,248')}
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        {/* KPI: Active Sessions - Spans 1 */}
        <Card className="col-span-1 border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {isLoading ? '...' : (stats[1]?.value || '342')}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Currently logged in
            </p>
          </CardContent>
        </Card>

        {/* System Health Overview - Spans 2 cols, 2 rows for Desktop */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 xl:row-span-2 border-slate-200 shadow-sm bg-white flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-indigo-500" />
              System Infrastructure
            </CardTitle>
            <CardDescription>Real-time status of critical components</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              {systemHealth.map((node) => (
                <div key={node.name} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(node.status)}
                    <div>
                      <p className="text-sm font-medium text-slate-900">{node.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{node.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">{node.load}</p>
                    <p className="text-xs text-slate-500">Load</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-emerald-700 font-bold text-xl">99.8%</span>
                <span className="text-emerald-600 text-xs font-medium">Global Uptime</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-blue-700 font-bold text-xl">42ms</span>
                <span className="text-blue-600 text-xs font-medium">Avg Response</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage / Database - Spans 1 col */}
        <Card className="col-span-1 border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Storage Usage</CardTitle>
            <Database className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 mb-2">64%</div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
              <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '64%' }}></div>
            </div>
            <p className="text-xs text-slate-500">
              320GB / 500GB Used
            </p>
          </CardContent>
        </Card>

        {/* Server Load - Spans 1 col */}
        <Card className="col-span-1 border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 mb-2">42%</div>
            <div className="flex items-end gap-1 h-8 mt-2">
              {[30, 40, 35, 50, 45, 60, 42].map((val, i) => (
                <div key={i} className="bg-slate-200 w-full rounded-t-sm" style={{ height: `${val}%` }}></div>
              ))}
              <div className="bg-indigo-500 w-full rounded-t-sm h-[42%]"></div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts - Spans 1 or 2 cols */}
        <Card className="col-span-1 md:col-span-2 border-amber-200 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-amber-800 text-base">
              <ShieldAlert className="h-5 w-5" />
              Active System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeAlerts.map(alert => (
                <div key={alert.id} className="flex gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900">{alert.title}</h4>
                    <p className="text-xs text-amber-700 mt-1">{alert.desc}</p>
                  </div>
                </div>
              ))}
              {activeAlerts.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">No active alerts. System is healthy.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs - Spans 2 cols */}
        <Card className="col-span-1 md:col-span-2 xl:col-span-2 border-slate-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-5 w-5 text-slate-500" />
              Recent Audit Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[250px] w-full">
              <div className="px-6 pb-4">
                {recentAuditLogs.map((log) => (
                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-slate-100 last:border-0 gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${log.type === 'error' ? 'bg-red-500' : log.type === 'warning' ? 'bg-amber-500' : log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{log.action}</p>
                        <p className="text-xs text-slate-500">Target: {log.target} • By: {log.by}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:justify-end">
                      <span className="text-xs text-slate-400 whitespace-nowrap">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;
