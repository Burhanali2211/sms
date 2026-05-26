import { E } from './_shared';
import type { WidgetSize } from './_shared';

const segments = [
  { label: 'Collected', pct: 68, color: E,         bg: '#ecfdf5', amount: '₹32.7L' },
  { label: 'Pending',   pct: 22, color: '#f59e0b',  bg: '#fffbeb', amount: '₹10.6L' },
  { label: 'Overdue',   pct: 10, color: '#ef4444',  bg: '#fef2f2', amount: '₹4.8L'  },
];

export default function FeeCollection({ size }: { size: WidgetSize }) {
  return (
    <div>
      <div className={`grid gap-2 mb-4 ${size === 'sm' ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {segments.map(s => (
          <div key={s.label} className="rounded-xl p-3" style={{ background: s.bg, border: `1px solid ${s.color}22` }}>
            <p className="text-base font-bold leading-none" style={{ color: s.color }}>{s.amount}</p>
            <p className="text-[10px] text-slate-500 mt-1">{s.label}</p>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: s.color }}>{s.pct}%</p>
          </div>
        ))}
      </div>
      <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
        {segments.map(s => (
          <div key={s.label} className="rounded-full transition-all"
            style={{ width: `${s.pct}%`, background: s.color }} />
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        {segments.map(s => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            <span className="text-[10px] text-slate-400">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
