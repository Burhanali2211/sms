import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Download, Settings2, X, Check, MoreHorizontal,
  BarChart2, LineChart as LineIco, CalendarDays, Users2,
  Activity, BookOpen, LayoutGrid, TrendingUp,
  CalendarCheck, Gauge, Star,
} from 'lucide-react';
import { E, EL, EM, cardStyle, tile } from './widgets/_shared';
import type { WidgetSize } from './widgets/_shared';

/* ── Lazy widget imports ── */

type WComp = React.LazyExoticComponent<React.ComponentType<{ size: WidgetSize }>>;

const WIDGETS: Record<string, WComp> = {
  kpi:        lazy(() => import('./widgets/KpiCards'))         as WComp,
  revenue:    lazy(() => import('./widgets/RevenueChart'))     as WComp,
  students:   lazy(() => import('./widgets/StudentsByCategory')) as WComp,
  classes:    lazy(() => import('./widgets/TopClasses'))       as WComp,
  activeDay:  lazy(() => import('./widgets/MostActiveDay'))    as WComp,
  attendance: lazy(() => import('./widgets/AttendanceGauge'))  as WComp,
  events:     lazy(() => import('./widgets/UpcomingEvents'))   as WComp,
  enrollment: lazy(() => import('./widgets/EnrollmentTrends')) as WComp,
  feeOverview:lazy(() => import('./widgets/FeeCollection'))    as WComp,
  heatmap:    lazy(() => import('./widgets/AttendanceHeatmap')) as WComp,
  staff:      lazy(() => import('./widgets/StaffPerformance')) as WComp,
};

type WidgetId = keyof typeof WIDGETS;

/* ── Widget metadata ── */

interface WidgetMeta {
  title: string;
  subtitle: string;
  desc: string;
  tag: string;
  Icon: React.ComponentType<{ className?: string }>;
  defaultSize: WidgetSize;
  defaultVisible: boolean;
}

const WIDGET_META: Record<WidgetId, WidgetMeta> = {
  kpi:         { title: 'Key Metrics',            subtitle: 'Students, staff & admissions',       desc: 'Top-level KPIs for students, active users, admissions and staff.',      tag: 'Overview',    Icon: LayoutGrid,    defaultSize: 'lg', defaultVisible: true  },
  revenue:     { title: 'Revenue Chart',           subtitle: 'Fees collected over time',           desc: 'Line chart showing monthly fee collection trend.',                       tag: 'Finance',     Icon: TrendingUp,    defaultSize: 'md', defaultVisible: true  },
  students:    { title: 'Students by Category',    subtitle: 'General · OBC · SC/ST',              desc: 'Breakdown of student enrollment by reservation category.',               tag: 'Enrolment',   Icon: Users2,        defaultSize: 'md', defaultVisible: true  },
  classes:     { title: 'Top Performing Classes',  subtitle: 'Attendance & ratings',               desc: 'Ranked list of classes by attendance rate and teacher rating.',          tag: 'Academic',    Icon: Star,          defaultSize: 'lg', defaultVisible: true  },
  activeDay:   { title: 'Most Active Day',         subtitle: 'Weekly activity pattern',            desc: 'Bar chart of portal activity by day of week.',                          tag: 'Activity',    Icon: Activity,      defaultSize: 'sm', defaultVisible: true  },
  attendance:  { title: 'Avg Attendance Rate',     subtitle: 'This academic year',                 desc: 'Semicircle gauge showing school-wide average attendance.',               tag: 'Attendance',  Icon: Gauge,         defaultSize: 'sm', defaultVisible: true  },
  events:      { title: 'Upcoming Events',         subtitle: 'Next 30 days',                       desc: 'Calendar of upcoming school events and activities.',                     tag: 'Calendar',    Icon: CalendarCheck, defaultSize: 'sm', defaultVisible: true  },
  enrollment:  { title: 'Enrollment Trends',       subtitle: 'By grade',                           desc: 'Horizontal bars showing enrollment count per grade vs. capacity.',       tag: 'Academic',    Icon: BarChart2,     defaultSize: 'md', defaultVisible: false },
  feeOverview: { title: 'Fee Collection Overview', subtitle: 'Collected · Pending · Overdue',      desc: 'Segmented bar showing fee collection status across all students.',       tag: 'Finance',     Icon: LineIco,       defaultSize: 'md', defaultVisible: false },
  heatmap:     { title: 'Attendance Heatmap',      subtitle: 'Daily patterns, 6 weeks',            desc: 'Colour-coded heatmap of attendance across days and weeks.',              tag: 'Attendance',  Icon: CalendarDays,  defaultSize: 'md', defaultVisible: false },
  staff:       { title: 'Staff Performance',       subtitle: 'Score rankings',                     desc: 'Ranked list of staff members by performance score and class count.',    tag: 'HR',          Icon: BookOpen,      defaultSize: 'md', defaultVisible: false },
};

/* ── Config ── */

interface WidgetConfig {
  id: WidgetId;
  size: WidgetSize;
  visible: boolean;
}

const DEFAULT_CONFIGS: WidgetConfig[] = (Object.keys(WIDGET_META) as WidgetId[]).map(id => ({
  id,
  size: WIDGET_META[id].defaultSize,
  visible: WIDGET_META[id].defaultVisible,
}));

const COL_CLASS: Record<WidgetSize, string> = {
  sm: 'col-span-1',
  md: 'col-span-1 lg:col-span-2',
  lg: 'col-span-1 lg:col-span-3',
};

const SIZE_LABELS: Record<WidgetSize, string> = { sm: '⅓', md: '⅔', lg: '↔' };

/* ── Skeleton ── */

function WidgetSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-3 w-1/3 rounded-full bg-slate-100" />
      <div className="h-20 rounded-xl bg-slate-100" />
      <div className="h-3 w-1/2 rounded-full bg-slate-100" />
    </div>
  );
}

/* ── Shell ── */

interface ShellProps {
  config: WidgetConfig;
  onRemove: () => void;
  onResize: (s: WidgetSize) => void;
}

function WidgetShell({ config, onRemove, onResize }: ShellProps) {
  const meta = WIDGET_META[config.id];
  const Comp = WIDGETS[config.id];
  const MetaIcon = meta.Icon;
  return (
    <div className={`${COL_CLASS[config.size]} p-5`} style={cardStyle}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div style={{ ...tile(), width: 32, height: 32 }}>
            <MetaIcon className="h-4 w-4" style={{ color: E }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-700 truncate">{meta.title}</p>
            <p className="text-[11px] text-slate-400">{meta.subtitle}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-2 w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <div className="px-2 py-1.5">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Width</p>
              <div className="flex gap-1">
                {(['sm', 'md', 'lg'] as WidgetSize[]).map(s => (
                  <button
                    key={s}
                    onClick={() => onResize(s)}
                    className="flex-1 py-1 rounded-md text-[11px] font-bold transition-colors"
                    style={config.size === s
                      ? { background: EL, color: E }
                      : { color: '#94a3b8' }}
                  >
                    {SIZE_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-rose-500 focus:text-rose-500 focus:bg-rose-50 cursor-pointer"
              onClick={onRemove}
            >
              <X className="h-3.5 w-3.5 mr-2" />Remove widget
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Suspense fallback={<WidgetSkeleton />}>
        <Comp size={config.size} />
      </Suspense>
    </div>
  );
}

/* ── Dashboard ── */

export default function SuperAdminDashboard() {
  const [configs, setConfigs] = useState<WidgetConfig[]>(() => {
    try {
      const saved = localStorage.getItem('sa-dashboard-widgets');
      if (saved) {
        const parsed: WidgetConfig[] = JSON.parse(saved);
        const ids = new Set(parsed.map(c => c.id));
        const merged = [...parsed];
        for (const cfg of DEFAULT_CONFIGS) {
          if (!ids.has(cfg.id)) merged.push(cfg);
        }
        return merged;
      }
    } catch { /* ignore */ }
    return DEFAULT_CONFIGS;
  });

  const [manageOpen, setManageOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sa-dashboard-widgets', JSON.stringify(configs));
  }, [configs]);

  const setSize = (id: WidgetId, size: WidgetSize) =>
    setConfigs(prev => prev.map(c => c.id === id ? { ...c, size } : c));

  const setVisible = (id: WidgetId, visible: boolean) =>
    setConfigs(prev => prev.map(c => c.id === id ? { ...c, visible } : c));

  const visible = configs.filter(c => c.visible);

  return (
    <div className="space-y-4">

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400 font-medium">Jan 1 – May 26, 2025 · Academic Year 2024-25</p>
        <div className="flex gap-2">
          <button
            onClick={() => setManageOpen(true)}
            className="flex items-center gap-1.5 px-3 h-8 rounded-xl text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
            style={{ border: '1px solid rgba(5,150,105,0.2)' }}
          >
            <Settings2 className="h-3.5 w-3.5" />Manage Widgets
          </button>
          <button
            className="flex items-center gap-1.5 px-3 h-8 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${EM}, ${E})`, boxShadow: `0 2px 8px ${E}44` }}
          >
            <Download className="h-3.5 w-3.5" />Export
          </button>
        </div>
      </div>

      {/* Widget grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {visible.map(cfg => (
            <WidgetShell
              key={cfg.id}
              config={cfg}
              onRemove={() => setVisible(cfg.id, false)}
              onResize={s => setSize(cfg.id, s)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={cardStyle}>
          <LayoutGrid className="h-10 w-10 mb-4" style={{ color: `${E}44` }} />
          <p className="text-sm font-semibold text-slate-500">No widgets visible</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">Add widgets to build your dashboard</p>
          <button
            onClick={() => setManageOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
            style={{ border: '1px solid rgba(5,150,105,0.2)' }}
          >
            <Settings2 className="h-3.5 w-3.5" />Manage Widgets
          </button>
        </div>
      )}

      {/* Manage Widgets dialog */}
      <Dialog open={manageOpen} onOpenChange={setManageOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)' }}>
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-slate-700">Manage Widgets</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-slate-400 -mt-1 mb-3">Toggle visibility · resize with ⅓ / ⅔ / ↔ on each card</p>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {configs.map(cfg => {
              const meta = WIDGET_META[cfg.id];
              const MetaIcon = meta.Icon;
              return (
                <div key={cfg.id}
                  className="flex items-start gap-3 p-3.5 rounded-xl transition-colors"
                  style={{
                    border: `1px solid ${cfg.visible ? 'rgba(5,150,105,0.25)' : 'rgba(5,150,105,0.1)'}`,
                    background: cfg.visible ? '#f0fdf4' : 'transparent',
                  }}>
                  <div style={{ ...tile(), width: 36, height: 36 }}>
                    <MetaIcon className="h-4 w-4" style={{ color: E }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700">{meta.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{meta.desc}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-[10px] font-semibold text-emerald-600 px-1.5 py-0.5 rounded-full"
                        style={{ background: EL }}>#{meta.tag}</span>
                      <button
                        onClick={() => setVisible(cfg.id, !cfg.visible)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                          cfg.visible
                            ? 'text-rose-500 hover:bg-rose-50'
                            : 'text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {cfg.visible
                          ? <><X className="h-3 w-3" />Hide</>
                          : <><Check className="h-3 w-3" />Show</>}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
