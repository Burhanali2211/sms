import { E, EM } from './_shared';
import type { WidgetSize } from './_shared';

const bars = [
  { day: 'Sun', val: 42 }, { day: 'Mon', val: 78 }, { day: 'Tue', val: 94 },
  { day: 'Wed', val: 88 }, { day: 'Thu', val: 82 }, { day: 'Fri', val: 75 }, { day: 'Sat', val: 51 },
];

export default function MostActiveDay({ size: _ }: { size: WidgetSize }) {
  const max = Math.max(...bars.map(d => d.val));
  const todayIdx = new Date().getDay();
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2 h-20">
        {bars.map((d, i) => {
          const isToday = i === todayIdx;
          const pct = Math.round((d.val / max) * 100);
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              {isToday && (
                <span className="text-[9px] font-bold leading-none" style={{ color: E }}>{d.val}%</span>
              )}
              <div className="w-full flex-1 flex items-end rounded-lg overflow-hidden"
                style={{ background: isToday ? 'transparent' : 'rgba(5,150,105,0.06)' }}>
                <div className="w-full rounded-lg transition-all"
                  style={{
                    height: `${pct}%`,
                    background: isToday ? `linear-gradient(180deg, ${EM}, ${E})` : 'rgba(5,150,105,0.15)',
                    boxShadow: isToday ? `0 2px 8px ${E}44` : 'none',
                  }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        {bars.map((d, i) => (
          <div key={d.day} className="flex-1 text-center">
            <span className="text-[9px]" style={{
              color: i === todayIdx ? E : '#9ca3af',
              fontWeight: i === todayIdx ? 700 : 400,
            }}>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
