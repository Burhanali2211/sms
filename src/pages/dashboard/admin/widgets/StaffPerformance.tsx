import { E } from './_shared';
import type { WidgetSize } from './_shared';

const staff = [
  { name: 'Dr. R. Patel',  dept: 'Science',  score: 96, classes: 12, students: 380 },
  { name: 'Mrs. S. Shah',  dept: 'Commerce', score: 93, classes: 10, students: 310 },
  { name: 'Mr. A. Kumar',  dept: 'Arts',     score: 91, classes: 11, students: 295 },
  { name: 'Ms. N. Gupta',  dept: 'Science',  score: 88, classes: 9,  students: 270 },
  { name: 'Mr. V. Singh',  dept: 'General',  score: 85, classes: 8,  students: 248 },
];

export default function StaffPerformance({ size }: { size: WidgetSize }) {
  const compact = size === 'sm';
  return (
    <div className="space-y-2">
      {staff.map((s, i) => (
        <div key={s.name} className="flex items-center gap-3 py-1.5">
          <span className="text-[11px] font-bold text-slate-300 w-4 shrink-0">{i + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{s.name}</p>
                {!compact && <p className="text-[10px] text-slate-400">{s.dept} · {s.classes} classes · {s.students} students</p>}
              </div>
              <span className="text-xs font-bold ml-2 shrink-0" style={{ color: E }}>{s.score}</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(5,150,105,0.08)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${s.score}%`, background: E }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
