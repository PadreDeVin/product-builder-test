'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { SectionCard } from '@/components/SectionCard';
import { MarketTable } from '@/components/MarketTable';
import { ExchangeChart } from '@/components/ExchangeChart';
import { GroupCompanyTable } from '@/components/GroupCompanyTable';
import { NewsList } from '@/components/NewsList';
import { Clock } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real-time data via internal API proxy (solves CORS)
        const res = await fetch('/api/finance');
        const realTimeData = await res.json();
        
        // Fetch other static data
        const [exchange, companies, news] = await Promise.all([
          fetch('/data/exchange-history.json').then(res => res.json()),
          fetch('/data/group-companies.json').then(res => res.json()),
          fetch('/data/news.json').then(res => res.json()),
        ]);

        setData({ 
          market: realTimeData.market, 
          exchange, 
          companies, 
          news 
        });
        setLastUpdated(format(new Date(), 'yyyy.MM.dd HH:mm:ss'));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const downloadJson = (filename: string, content: any) => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
        데이터를 불러오는 중...
      </div>
    );
  }

  const today = format(new Date(), 'yy.MM.dd');

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">일일시황</h1>
          <p className="text-lg text-slate-500 font-medium mt-1">{today}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
          <Clock size={14} />
          <span>마지막 업데이트: {lastUpdated}</span>
        </div>
      </div>

      {/* Market Trends Grid */}
      <div className="grid grid-cols-1 gap-6">
        <SectionCard 
          title="미국 금융시장 동향" 
          onDownload={() => downloadJson('us-market.json', data.market.usMarket)}
        >
          <MarketTable data={data.market.usMarket} />
        </SectionCard>

        <SectionCard 
          title="국내 금융시장 동향" 
          onDownload={() => downloadJson('kr-market.json', data.market.krMarket)}
        >
          <MarketTable data={data.market.krMarket} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exchange Rate Chart */}
        <div className="lg:col-span-1">
          <SectionCard 
            title="환율 추이 (USD/KRW)" 
            className="h-full"
            onDownload={() => downloadJson('exchange-history.json', data.exchange)}
          >
            <ExchangeChart data={data.exchange} />
          </SectionCard>
        </div>

        {/* Group Company Status */}
        <div className="lg:col-span-2">
          <SectionCard 
            title="주요 그룹사 현황" 
            className="h-full"
            onDownload={() => downloadJson('group-companies.json', data.companies)}
          >
            <GroupCompanyTable data={data.companies} />
          </SectionCard>
        </div>
      </div>

      {/* News List */}
      <SectionCard 
        title="금융 시장 주요 뉴스" 
        onDownload={() => downloadJson('news.json', data.news)}
      >
        <NewsList data={data.news} />
      </SectionCard>

      {/* Footer */}
      <footer className="pt-8 pb-4 text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest">
        &copy; 2026 Daily Finance Dashboard MVP. Internal Use Only.
      </footer>
    </main>
  );
}
