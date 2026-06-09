import React from 'react';

interface CompanyData {
  name: string;
  prevClose: string;
  changeRate: string;
  creditRating: string;
  minPyung: string;
}

interface GroupCompanyTableProps {
  data: CompanyData[];
}

export const GroupCompanyTable: React.FC<GroupCompanyTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-100">
          <tr>
            <th className="px-4 py-3 font-semibold">계열사명</th>
            <th className="px-4 py-3 font-semibold text-right">전일종가</th>
            <th className="px-4 py-3 font-semibold text-right">등락률</th>
            <th className="px-4 py-3 font-semibold text-center">신용등급</th>
            <th className="px-4 py-3 font-semibold text-right">민평금리(3Y)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((company, index) => {
            const isPositive = company.changeRate.startsWith('+');
            const isNegative = company.changeRate.startsWith('-');

            return (
              <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 font-bold text-slate-900">{company.name}</td>
                <td className="px-4 py-3 text-right text-slate-600">{company.prevClose}</td>
                <td className={`px-4 py-3 text-right font-semibold ${
                  isPositive ? 'text-rose-600' : isNegative ? 'text-blue-600' : 'text-slate-500'
                }`}>
                  {company.changeRate}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-700">
                    {company.creditRating}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">{company.minPyung}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
