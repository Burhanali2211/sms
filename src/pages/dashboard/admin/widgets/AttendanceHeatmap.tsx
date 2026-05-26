import { E } from './_shared';
import type { WidgetSize } from './_shared';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

const raw = [
  [92, 88, 95, 91, 85, 60],
  [89, 94, 87, 96, 90, 55],
  [95, 91, 93, 88, 92, 62],
  [87, 90, 96, 94, 89, 58],
  [93, 86, 91, 95, 88, 65],
  [90, 95, 89, 92, 94, 61],
  [88, 92, 94, 87, 91, 59],
];

function cellColor(v: number) {
  if (v >= 90) return E;
  if (v >= 80) return '#6ee7b7';
  if (v >= 70) return '#a7f3d0';
  if (v >= 60) return '#d1fae5';
  return '#f1f5f9';
}

export default function AttendanceHeatmap({ size: _ }: { size: WidgetSize }) {
  return (
    <div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(${days.length}, 1fr)` }}>
        <div />
        {days.map(d => (
          <div key={d} className="text-center text-[9px] font-semibold text-slate-400 pb-1">{d}</div>
        ))}
        {weeks.map((w, wi) => (
          <>
            <div key={w} className="text-[9px] text-slate-400 flex items-center pr-1">{w}</div>
            {days.map((d, di) => {
              const v = raw[wi][di];
              return (
                <div key={d} title={`${v}%`}
                  className="rounded aspect-square"
                  style={{ background: cellColor(v) }} />
              );
            })}
          </>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-[9px] text-slate-400">Less</span>
        {['#f1f5f9', '#d1fae5', '#a7f3d0', '#6ee7b7', E].map(c => (
          <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-[9px] text-slate-400">More</span>
      </div>
    </div>
  );
}
