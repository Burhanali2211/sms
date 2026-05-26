import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, History, Download } from 'lucide-react';

const logs = [
  { id: '1',  time: '25 May 2026, 11:23', user: 'Rohan Verma',      action: 'update',      entity: 'System Settings',          detail: 'Updated SMTP gateway and notification templates',        type: 'info'    },
  { id: '2',  time: '25 May 2026, 10:42', user: 'Priya Sharma',     action: 'create',      entity: 'Class: Adv. Maths X-A',    detail: 'Created new section with 38 students enrolled',          type: 'success' },
  { id: '3',  time: '25 May 2026, 09:30', user: 'Mohammed Khan',    action: 'delete',      entity: 'Book: Physics Vol. II',     detail: 'Removed from catalog — physically damaged',              type: 'error'   },
  { id: '4',  time: '25 May 2026, 08:15', user: 'Rohan Verma',      action: 'add-user',    entity: 'User: Sunita Mishra',       detail: 'Added with role: Teacher — Chemistry',                   type: 'success' },
  { id: '5',  time: '25 May 2026, 07:50', user: 'Principal Arora',  action: 'update',      entity: 'Exam Timetable',            detail: 'Rescheduled board exam dates for Class X & XII',         type: 'warning' },
  { id: '6',  time: '24 May 2026, 17:05', user: 'Priya Sharma',     action: 'login',       entity: 'System Auth',               detail: 'Login from IP 192.168.10.25 (Office LAN)',               type: 'info'    },
  { id: '7',  time: '24 May 2026, 16:33', user: 'Mohammed Khan',    action: 'restore',     entity: 'Book: Maths NCERT XII',     detail: 'Restored to catalog after re-acquisition',               type: 'success' },
  { id: '8',  time: '24 May 2026, 15:11', user: 'Rohan Verma',      action: 'remove-user', entity: 'User: Karan Mehta',         detail: 'Account deactivated — student transferred',              type: 'warning' },
  { id: '9',  time: '24 May 2026, 14:55', user: 'Principal Arora',  action: 'create',      entity: 'Policy: Attendance 2026',   detail: 'Min 75% attendance required for exams',                  type: 'success' },
  { id: '10', time: '24 May 2026, 13:40', user: 'Anjali Gupta',     action: 'update',      entity: 'Admission Form 2026-27',    detail: 'Updated eligibility criteria and document checklist',    type: 'info'    },
  { id: '11', time: '24 May 2026, 12:20', user: 'Fatima Siddiqui',  action: 'create',      entity: 'Fee Structure 2026-27',     detail: 'Published annual fee structure',                         type: 'success' },
  { id: '12', time: '24 May 2026, 11:05', user: 'Vikram Patel',     action: 'update',      entity: 'Timetable: Semester II',    detail: 'Modified 3 class periods — Physics Lab swap',            type: 'info'    },
  { id: '13', time: '24 May 2026, 09:30', user: 'system_auto',      action: 'backup',      entity: 'Database Main',             detail: 'Scheduled backup completed — 320 GB archived',           type: 'success' },
  { id: '14', time: '23 May 2026, 16:45', user: 'IP: 10.0.1.45',   action: 'failed-login','entity': 'System Auth',             detail: '14 failed attempts within 30 minutes — flagged',         type: 'error'   },
];

const typeStyles: Record<string, string> = {
  success: 'bg-emerald-500',
  info:    'bg-blue-500',
  warning: 'bg-amber-500',
  error:   'bg-rose-500',
};

const actionBadge: Record<string, string> = {
  update:       'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  create:       'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  delete:       'bg-rose-500/10 text-rose-700 dark:text-rose-400',
  restore:      'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  login:        'bg-muted text-muted-foreground',
  'add-user':   'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  'remove-user':'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  backup:       'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  'failed-login':'bg-rose-500/10 text-rose-700 dark:text-rose-400',
};

const AuditTrail = () => {
  const [query, setQuery] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.user.toLowerCase().includes(query.toLowerCase()) ||
      l.action.toLowerCase().includes(query.toLowerCase()) ||
      l.entity.toLowerCase().includes(query.toLowerCase()) ||
      l.detail.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <DashboardLayout>
      <DashboardHeader title="Audit Trail" />
      <main className="flex-1 overflow-auto bg-background p-6 space-y-5">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Events Today',    value: '14' },
            { label: 'Unique Users',    value: '7'  },
            { label: 'Errors / Alerts', value: '2'  },
            { label: 'Total (30 days)', value: '482' },
          ].map((k) => (
            <Card key={k.label} className="p-4">
              <p className="text-xs font-medium text-muted-foreground mb-1">{k.label}</p>
              <div className="text-2xl font-bold text-foreground">{k.value}</div>
            </Card>
          ))}
        </div>

        {/* Log table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" />
                All Events
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search logs…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-8 h-8 text-sm w-56"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-3.5 w-3.5 mr-2" /> Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y">
              {filtered.map((log) => (
                <div key={log.id} className="flex items-start gap-3 py-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${typeStyles[log.type]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-foreground">{log.user}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${actionBadge[log.action] ?? 'bg-muted text-muted-foreground'}`}>
                        {log.action}
                      </span>
                      <span className="text-sm text-muted-foreground truncate">{log.entity}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{log.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{log.time}</span>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">No matching events.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
};

export default AuditTrail;
