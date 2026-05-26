import { E } from './_shared';
import type { WidgetSize } from './_shared';

const grades = [
  { label: 'Grade XII', count: 312, max: 350 },
  { label: 'Grade XI',  count: 298, max: 350 },
  { label: 'Grade X',   count: 341, max: 350 },
  { label: 'Grade IX',  count: 329, max: 350 },
  { label: 'Grade VIII',count: 287, max: 350 },
  { label: 'Grade VII', count: 305, max: 350 },
];

export default function EnrollmentTrends({ size: _ }: { size: WidgetSize }) {
  return (
    <div className="space-y-2.5">
      {grades.map(g => {
        const pct = Math.round((g.count / g.max) * 100);
        return (
          <div key={g.label}>
            <div className="flex justify-between mb-1">
              <span className="text-[11px] font-medium text-slate-600">{g.label}</span>
              <span className="text-[11px] font-bold text-slate-700">{g.count} <span className="font-normal text-slate-400">/ {g.max}</span></span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(5,150,105,0.08)' }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: pct >= 90 ? E : pct >= 75 ? '#f59e0b' : '#3b82f6' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
