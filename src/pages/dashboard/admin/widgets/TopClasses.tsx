import { Star, FlaskConical, TrendingUp, Palette, Microscope, GraduationCap } from 'lucide-react';
import { E, tile } from './_shared';
import type { WidgetSize } from './_shared';

const classes = [
  { name: 'Class X-A',    stream: 'Science',  teacher: 'Dr. R. Patel', att: 96, fees: '₹4,82,000', rating: 5.0, Icon: FlaskConical  },
  { name: 'Class XII-B',  stream: 'Commerce', teacher: 'Mrs. S. Shah', att: 94, fees: '₹4,15,000', rating: 4.8, Icon: TrendingUp    },
  { name: 'Class IX-C',   stream: 'Arts',     teacher: 'Mr. A. Kumar', att: 91, fees: '₹3,90,000', rating: 4.7, Icon: Palette       },
  { name: 'Class XI-A',   stream: 'Science',  teacher: 'Ms. N. Gupta', att: 89, fees: '₹3,72,000', rating: 4.6, Icon: Microscope    },
  { name: 'Class VIII-B', stream: 'General',  teacher: 'Mr. V. Singh', att: 87, fees: '₹3,45,000', rating: 4.5, Icon: GraduationCap },
];

export default function TopClasses({ size }: { size: WidgetSize }) {
  const compact = size === 'sm';
  const cols = compact ? '1fr 1fr' : '5fr 3fr 1fr 2fr 1fr';
  return (
    <div>
      <div className="grid gap-3 pb-2 mb-1 border-b text-[10px] font-semibold text-slate-400 uppercase tracking-wider"
        style={{ borderColor: 'rgba(5,150,105,0.08)', gridTemplateColumns: cols }}>
        <span>Class</span>
        {!compact && <span>Teacher</span>}
        <span className="text-center">Att.</span>
        {!compact && <span className="text-right">Fees</span>}
        <span className="text-right">★</span>
      </div>
      <div className="space-y-0.5">
        {classes.map(c => {
          const CIcon = c.Icon;
          return (
            <div key={c.name}
              className="grid gap-3 py-2.5 px-2 rounded-xl items-center hover:bg-emerald-50/50 transition-colors"
              style={{ gridTemplateColumns: cols }}>
              <div className="flex items-center gap-2 min-w-0">
                <div style={{ ...tile(), width: 28, height: 28 }}>
                  <CIcon className="h-3.5 w-3.5" style={{ color: E }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{c.name}</p>
                  <p className="text-[10px] text-slate-400">{c.stream}</p>
                </div>
              </div>
              {!compact && <p className="text-[11px] text-slate-500 truncate">{c.teacher}</p>}
              <div className="flex justify-center">
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${c.att >= 90 ? 'text-emerald-700' : 'text-amber-600'}`}
                  style={{ background: c.att >= 90 ? '#ecfdf5' : '#fffbeb' }}>
                  {c.att}%
                </span>
              </div>
              {!compact && <span className="text-right text-[11px] font-semibold text-slate-600">{c.fees}</span>}
              <div className="flex items-center justify-end gap-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-bold text-slate-700">{c.rating.toFixed(1)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
