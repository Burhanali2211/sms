import { E } from './_shared';
import type { WidgetSize } from './_shared';

const cats = [
  { label: 'General', count: 1420, pct: '49.9%', color: E,         bg: '#ecfdf5' },
  { label: 'OBC',     count: 847,  pct: '29.7%', color: '#f59e0b', bg: '#fffbeb' },
  { label: 'SC / ST', count: 580,  pct: '20.4%', color: '#3b82f6', bg: '#eff6ff' },
];
const total = cats.reduce((s, c) => s + c.count, 0);

export default function StudentsByCategory({ size }: { size: WidgetSize }) {
  return (
    <div>
      <div className={`grid gap-3 mb-4 ${size === 'sm' ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {cats.map(c => (
          <div key={c.label} className="rounded-xl p-3" style={{ background: c.bg, border: `1px solid ${c.color}22` }}>
            <p className="text-xl font-bold leading-none" style={{ color: c.color }}>{c.count.toLocaleString()}</p>
            <p className="text-[11px] text-slate-500 mt-1">{c.label}</p>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: c.color }}>{c.pct}</p>
          </div>
        ))}
      </div>
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
        {cats.map(c => (
          <div key={c.label} className="rounded-full"
            style={{ width: `${(c.count / total) * 100}%`, background: c.color }} />
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        {cats.map(c => (
          <div key={c.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
            <span className="text-[10px] text-slate-400">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
