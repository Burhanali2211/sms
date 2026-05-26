import { Calendar, Trophy, FlaskConical, Users, Music } from 'lucide-react';
import { E, tile } from './_shared';
import type { WidgetSize } from './_shared';

const events = [
  { title: 'Annual Sports Day',    date: 'Jun 3',  day: 'Mon', color: '#f59e0b', Icon: Trophy       },
  { title: 'Science Exhibition',   date: 'Jun 7',  day: 'Fri', color: E,         Icon: FlaskConical },
  { title: 'Parent-Teacher Meet',  date: 'Jun 12', day: 'Wed', color: '#3b82f6', Icon: Users        },
  { title: 'Cultural Fest',        date: 'Jun 18', day: 'Tue', color: '#a855f7', Icon: Music        },
];

export default function UpcomingEvents({ size: _ }: { size: WidgetSize }) {
  return (
    <div className="space-y-2">
      {events.map(ev => {
        const EIcon = ev.Icon;
        return (
          <div key={ev.title} className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50/50 transition-colors">
            <div style={{ ...tile(ev.color), width: 32, height: 32, flexShrink: 0 }}>
              <EIcon className="h-4 w-4" style={{ color: ev.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 truncate">{ev.title}</p>
              <p className="text-[10px] text-slate-400">{ev.day}, {ev.date}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${ev.color}18`, color: ev.color }}>{ev.date}</span>
            </div>
          </div>
        );
      })}
      <button className="w-full mt-1 py-2 rounded-xl text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
        style={{ border: '1px solid rgba(5,150,105,0.18)' }}>
        <Calendar className="h-3 w-3 inline mr-1.5" />View calendar
      </button>
    </div>
  );
}
