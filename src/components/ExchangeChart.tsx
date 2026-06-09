'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ExchangeData {
  date: string;
  rate: number;
}

interface ExchangeChartProps {
  data: ExchangeData[];
}

export const ExchangeChart: React.FC<ExchangeChartProps> = ({ data }) => {
  const latestRate = data[data.length - 1]?.rate;
  const rates = data.map(d => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-sm text-slate-500">현재 환율</span>
          <div className="text-3xl font-bold text-slate-900">
            {latestRate?.toLocaleString()} <span className="text-lg font-normal text-slate-500">원</span>
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="text-xs text-slate-500">
            최고 <span className="font-semibold text-rose-600">{maxRate.toLocaleString()}</span>
          </div>
          <div className="text-xs text-slate-500">
            최저 <span className="font-semibold text-blue-600">{minRate.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => val.split('-').slice(1).join('/')}
              stroke="#94a3b8"
            />
            <YAxis 
              domain={['auto', 'auto']} 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              stroke="#94a3b8"
              tickFormatter={(val) => val.toLocaleString()}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#0f172a" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#0f172a', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
