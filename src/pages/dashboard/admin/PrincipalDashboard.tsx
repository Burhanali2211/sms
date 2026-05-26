import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';

const kpis = [
  { label: 'Total Students',    value: '1,248', sub: '48 sections active',    icon: Users        },
  { label: "Today's Attendance",value: '91.4%', sub: '1,140 / 1,248 present', icon: CheckCircle2 },
  { label: 'Classes Running',   value: '42',    sub: 'of 48 scheduled',       icon: BookOpen     },
  { label: 'Pending Approvals', value: '7',     sub: '3 leave, 4 other',      icon: AlertCircle  },
];

const todaySchedule = [
  { time: '08:00', event: 'Morning Assembly',               location: 'Auditorium',      status: 'done'     },
  { time: '09:00', event: 'Class 12 Maths — Board Revision',location: 'Room 302',        status: 'done'     },
  { time: '10:30', event: 'Staff Briefing',                 location: 'Staff Room',      status: 'ongoing'  },
  { time: '12:00', event: 'Parent-Teacher Meeting (Cl. 10)',location: 'Room 201',        status: 'upcoming' },
  { time: '14:00', event: 'Science Olympiad Prep',          location: 'Physics Lab',     status: 'upcoming' },
  { time: '15:30', event: 'End-of-Day Review',              location: "Principal's Room",status: 'upcoming' },
];

const deptPerformance = [
  { dept: 'Computer Sc.', avg: 91, up: true  },
  { dept: 'Science',      avg: 88, up: true  },
  { dept: 'Hindi',        avg: 86, up: true  },
  { dept: 'Mathematics',  avg: 84, up: true  },
  { dept: 'Social Sc.',   avg: 83, up: false },
  { dept: 'English',      avg: 80, up: false },
];

const recentNotices = [
  { title: 'Board Exam Admit Cards Distribution',   date: '25 May 2026', priority: 'high'   },
  { title: 'Annual Sports Day — Volunteer Sign-up', date: '24 May 2026', priority: 'medium' },
  { title: 'Mid-Term Result Declaration',           date: '23 May 2026', priority: 'high'   },
  { title: 'Staff Training on New ERP Modules',     date: '22 May 2026', priority: 'low'    },
  { title: 'Water Purifier Maintenance — Wing B',   date: '21 May 2026', priority: 'low'    },
];

const teacherActivity = [
  { name: 'Vikram Patel',  action: 'Submitted Class 11 marks',        time: '20 mins ago' },
  { name: 'Sunita Mishra', action: 'Updated attendance for Class 9B',  time: '45 mins ago' },
  { name: 'Ramesh Gupta',  action: 'Uploaded study material — Chem',  time: '1 hour ago'  },
  { name: 'Nirmala Singh', action: 'Applied for 2-day leave',          time: '2 hours ago' },
  { name: 'Anil Shukla',   action: 'Marked Class 12A attendance',      time: '3 hours ago' },
];

const statusStyle: Record<string, string> = {
  done:     'text-emerald-600 dark:text-emerald-400',
  ongoing:  'text-blue-600 dark:text-blue-400',
  upcoming: 'text-muted-foreground',
};

const priorityStyle: Record<string, string> = {
  high:   'bg-red-500/10 text-red-700 dark:text-red-400',
  medium: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  low:    'bg-muted text-muted-foreground',
};

const PrincipalDashboard = () => (
  <div className="space-y-5">
    <div>
      <h1 className="text-xl font-semibold text-foreground">Academic Overview</h1>
      <p className="text-sm text-muted-foreground mt-0.5">EIT Senior Secondary School — 25 May 2026</p>
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
            <p className="text-xs text-muted-foreground mt-1">{k.sub}</p>
          </Card>
        );
      })}
    </div>

    {/* Main content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Today's Schedule */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="divide-y">
            {todaySchedule.map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5">
                <span className="text-xs text-muted-foreground w-10 shrink-0">{s.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.event}</p>
                  <p className="text-xs text-muted-foreground">{s.location}</p>
                </div>
                <span className={`text-xs font-medium capitalize shrink-0 ${statusStyle[s.status]}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dept Performance + Notices stacked */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Department Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {deptPerformance.map((d) => (
              <div key={d.dept}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">{d.dept}</span>
                  <span className={d.up ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-red-500 dark:text-red-400 font-medium'}>
                    {d.avg}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-school-primary h-1.5 rounded-full" style={{ width: `${d.avg}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Recent Notices</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y">
              {recentNotices.map((n, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-foreground truncate">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${priorityStyle[n.priority]}`}>
                    {n.priority}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>

    {/* Teacher Activity */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Teacher Activity — Today</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="divide-y">
          {teacherActivity.map((t, i) => (
            <div key={i} className="flex items-center gap-4 py-2.5">
              <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-muted-foreground">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground truncate">{t.action}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{t.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default PrincipalDashboard;
