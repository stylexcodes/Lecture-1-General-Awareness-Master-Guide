import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Primary (Red Collar)',
    LFPR: 54.6,
    GDP: 14.39,
  },
  {
    name: 'Secondary (Blue Collar)',
    LFPR: 24.3,
    GDP: 31.46,
  },
  {
    name: 'Tertiary (White Collar)',
    LFPR: 21.1,
    GDP: 54.0,
  },
];

export default function SectorChart() {
  return (
    <div className="w-full h-80 mt-4 bg-[#0d1527] p-4 rounded-xl shadow-md border border-slate-800">
      <h3 className="text-xs sm:text-sm font-semibold text-slate-200 mb-3 text-center">
        Labour Force Participation (LFPR) vs GDP Contribution (%)
      </h3>
      <div className="w-full h-[calc(100%-2rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: -15,
              bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={{ stroke: '#334155' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={{ stroke: '#334155' }} tickLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderColor: '#334155', 
                color: '#f8fafc', 
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ color: '#f8fafc' }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '12px' }} />
            <Bar dataKey="LFPR" name="LFPR % (Workforce)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="GDP" name="GDP % (Economy Share)" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
