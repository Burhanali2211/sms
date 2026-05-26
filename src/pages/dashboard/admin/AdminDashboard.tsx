import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, IndianRupee, ClipboardList, UserCheck, TrendingUp, TrendingDown } from 'lucide-react';

const kpis = [
  { label: 'Total Students',    value: '1,248', sub: '+18 this month',   icon: Users,         trend: 'up'      },
  { label: 'Fee Collected (May)',value: '₹8.4L', sub: '84% of target',   icon: IndianRupee,   trend: 'up'      },
  { label: 'Pending Admissions',value: '34',     sub: '12 need action',  icon: ClipboardList, trend: 'down'    },
  { label: 'Active Staff',      value: '85',     sub: '3 on leave today',icon: UserCheck,     trend: 'neutral' },
];

const recentAdmissions = [
  { name: 'Sneha Rajput',    cls: 'Class 9',  date: '25 May 2026', status: 'pending'  },
  { name: 'Arjun Mehra',     cls: 'Class 11', date: '24 May 2026', status: 'approved' },
  { name: 'Divya Tiwari',    cls: 'Class 10', date: '23 May 2026', status: 'approved' },
  { name: 'Rohit Chauhan',   cls: 'Class 12', date: '22 May 2026', status: 'pending'  },
  { name: 'Pooja Saxena',    cls: 'Class 9',  date: '21 May 2026', status: 'rejected' },
  { name: 'Ankit Srivastav', cls: 'Class 11', date: '20 May 2026', status: 'approved' },
];

const staffAttendance = [
  { dept: 'Teaching Staff', present: 46, total: 50 },
  { dept: 'Administration', present: 14, total: 15 },
  { dept: 'Support Staff',  present: 18, total: 20 },
];

const feeByClass = [
  { cls: 'Class 9',  collected: 78, amount: '₹1.87L' },
  { cls: 'Class 10', collected: 91, amount: '₹2.18L' },
  { cls: 'Class 11', collected: 82, amount: '₹1.96L' },
  { cls: 'Class 12', collected: 88, amount: '₹2.11L' },
];

const activityLog = [
  { msg: 'Fee collected from Arjun Kapoor (Class X-B)',  time: '10 mins ago', type: 'success' },
  { msg: 'New admission request: Sneha Rajput (Class 9)',time: '42 mins ago', type: 'info'    },
  { msg: 'Staff leave approved for Kavita Mishra',       time: '1 hour ago',  type: 'info'    },
  { msg: 'Pending fee reminder sent to 28 students',     time: '2 hours ago', type: 'warning' },
  { msg: 'Admission rejected: incomplete documents',     time: '3 hours ago', type: 'error'   },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    approved: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    rejected:  'bg-red-500/10 text-red-700 dark:text-red-400',
    pending:   'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[s] ?? ''}`}>
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </span>
  );
};

const dotColor: Record<string, string> = {
  success: 'bg-emerald-500', info: 'bg-blue-500', warning: 'bg-amber-500', error: 'bg-red-500',
};

const AdminDashboard = () => (
  <div className="space-y-5">
    <div>
      <h1 className="text-xl font-semibold text-foreground">School Operations</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Student, staff, fee, and admission overview.</p>
    </div>

    {/* KPIs */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((k) => {
        const Icon = k.icon;
        return (
          <Card key={k.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">{k.label}</span>
              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{k.value}</div>
            <p className={`text-xs mt-1 flex items-center gap-1 ${k.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : k.trend === 'down' ? 'text-red-500 dark:text-red-400' : 'text-muted-foreground'}`}>
              {k.trend === 'up' && <TrendingUp className="h-3 w-3" />}
              {k.trend === 'down' && <TrendingDown className="h-3 w-3" />}
              {k.sub}
            </p>
          </Card>
        );
      })}
    </div>

    {/* Main grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Recent Admissions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Recent Admissions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="divide-y">
            {recentAdmissions.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.cls} · {a.date}</p>
                </div>
                {statusBadge(a.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Right column: staff + fee */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Staff Attendance — Today</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {staffAttendance.map((s) => {
              const pct = Math.round((s.present / s.total) * 100);
              return (
                <div key={s.dept}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground">{s.dept}</span>
                    <span className="text-muted-foreground">{s.present}/{s.total} — {pct}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${pct >= 90 ? 'bg-emerald-500' : pct >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Fee Collection — May 2026</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {feeByClass.map((f) => (
              <div key={f.cls}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">{f.cls}</span>
                  <span className="text-muted-foreground">{f.amount} · {f.collected}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-school-primary h-1.5 rounded-full" style={{ width: `${f.collected}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>

    {/* Activity log */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="divide-y">
          {activityLog.map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${dotColor[a.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{a.msg}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminDashboard;
