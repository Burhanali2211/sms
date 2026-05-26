import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { E } from './_shared';
import type { WidgetSize } from './_shared';

const data = [
  { month: 'Apr 1',  value: 22 }, { month: 'Apr 3',  value: 28 },
  { month: 'Apr 5',  value: 24 }, { month: 'Apr 7',  value: 35 },
  { month: 'Apr 9',  value: 30 }, { month: 'Apr 11', value: 42 },
  { month: 'Apr 13', value: 38 }, { month: 'Apr 15', value: 46 },
  { month: 'Apr 17', value: 40 }, { month: 'Apr 19', value: 52 },
  { month: 'Apr 21', value: 48 }, { month: 'Apr 23', value: 58 },
  { month: 'Apr 25', value: 53 }, { month: 'Apr 29', value: 65 },
];

const xTicks = ['Apr 1', 'Apr 8', 'Apr 15', 'Apr 22', 'Apr 29'];

export default function RevenueChart({ size }: { size: WidgetSize }) {
  const h = size === 'sm' ? 100 : size === 'md' ? 120 : 140;
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-slate-800">₹48.6L</span>
        <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
          <TrendingUp className="h-3 w-3" />+24.4%
        </span>
        <span className="text-xs text-slate-400">vs. last period</span>
      </div>
      <ResponsiveContainer width="100%" height={h}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="rcFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={E} stopOpacity={0.15} />
              <stop offset="95%" stopColor={E} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(5,150,105,0.07)" />
          <XAxis dataKey="month" ticks={xTicks} tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 80]} tickFormatter={v => `₹${v}L`} tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid rgba(5,150,105,0.18)', background: 'rgba(255,255,255,0.97)' }}
            formatter={(v: number) => [`₹${v}L`, 'Revenue']}
            labelStyle={{ color: '#64748b', fontWeight: 600 }}
          />
          <Area type="monotone" dataKey="value" stroke={E} strokeWidth={2} fill="url(#rcFill)" dot={false} activeDot={{ r: 4, fill: E }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
