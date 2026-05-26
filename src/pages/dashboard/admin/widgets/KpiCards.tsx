import { TrendingUp, TrendingDown, Users, Activity, BookOpen, UserPlus } from 'lucide-react';
import { E, tile } from './_shared';
import type { WidgetSize } from './_shared';

const kpis = [
  { label: 'Total Students', value: '2,847', delta: '+15.5%', sub: 'vs last period', up: true,  Icon: Users    },
  { label: 'Active Today',   value: '2,391', delta: '+8.4%',  sub: 'vs last period', up: true,  Icon: Activity },
  { label: 'New Admissions', value: '142',   delta: '-10.5%', sub: 'vs last period', up: false, Icon: UserPlus },
  { label: 'Staff Members',  value: '186',   delta: '+4.4%',  sub: 'vs last period', up: true,  Icon: BookOpen },
];

export default function KpiCards({ size }: { size: WidgetSize }) {
  const cols = size === 'lg' ? 'grid-cols-4' : 'grid-cols-2';
  return (
    <div className={`grid gap-2.5 ${cols}`}>
      {kpis.map(({ label, value, delta, sub, up, Icon }) => (
        <div key={label} className="rounded-xl p-3" style={{ background: 'rgba(5,150,105,0.04)' }}>
          <div className="flex items-start justify-between mb-2">
            <span className="text-[11px] font-medium text-slate-500 leading-tight">{label}</span>
            <div style={{ ...tile(), width: 26, height: 26 }}>
              <Icon className="h-3 w-3" style={{ color: E }} />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-800 leading-none">{value}</div>
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            {up
              ? <TrendingUp  className="h-3 w-3 text-emerald-500 shrink-0" />
              : <TrendingDown className="h-3 w-3 text-rose-500 shrink-0" />}
            <span className={`text-[11px] font-semibold ${up ? 'text-emerald-600' : 'text-rose-500'}`}>{delta}</span>
            <span className="text-[11px] text-slate-400 truncate">{sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
