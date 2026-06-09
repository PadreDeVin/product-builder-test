import React from 'react';

interface MarketData {
  name: string;
  value: string;
  change: string;
}

interface MarketTableProps {
  data: MarketData[];
}

export const MarketTable: React.FC<MarketTableProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {data.map((item, index) => {
        const isPositive = item.change.startsWith('+');
        const isNegative = item.change.startsWith('-');
        
        return (
          <div key={index} className="flex flex-col p-3 rounded-md bg-slate-50 border border-slate-100">
            <span className="text-xs font-medium text-slate-500 mb-1">{item.name}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold text-slate-900">{item.value}</span>
              <span className={`text-xs font-semibold ${
                isPositive ? 'text-rose-600' : isNegative ? 'text-blue-600' : 'text-slate-500'
              }`}>
                {item.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
