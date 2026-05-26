import { E } from './_shared';
import type { WidgetSize } from './_shared';

export default function AttendanceGauge({ size: _ }: { size: WidgetSize }) {
  const value = 84;
  const r = 52, cx = 80, cy = 72, ticks = 28;
  const filled = Math.round(ticks * value / 100);
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 160 90" style={{ width: '100%', height: 90 }}>
        {Array.from({ length: ticks }, (_, i) => {
          const angle = Math.PI + i / (ticks - 1) * (0 - Math.PI);
          const inner = r - 10, outer = r;
          const x1 = cx + inner * Math.cos(angle), y1 = cy + inner * Math.sin(angle);
          const x2 = cx + outer * Math.cos(angle), y2 = cy + outer * Math.sin(angle);
          return (
            <line key={i}
              x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)}
              stroke={i < filled ? E : 'rgba(5,150,105,0.12)'}
              strokeWidth="3.5" strokeLinecap="round" />
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="22" fontWeight="700" fill="#1e293b" fontFamily="sans-serif">{value}%</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontFamily="sans-serif">avg attendance</text>
        <text x={cx - r - 4} y={cy + 4} textAnchor="end" fontSize="7" fill="#9ca3af" fontFamily="sans-serif">0%</text>
        <text x={cx + r + 4} y={cy + 4} textAnchor="start" fontSize="7" fill="#9ca3af" fontFamily="sans-serif">100%</text>
      </svg>
      <div className="flex items-center gap-1 mt-1">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: E }} />
        <span className="text-[10px] text-slate-400">Target: 90%</span>
      </div>
      <button className="w-full mt-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
        style={{ border: '1px solid rgba(5,150,105,0.18)' }}>
        Show details
      </button>
    </div>
  );
}
