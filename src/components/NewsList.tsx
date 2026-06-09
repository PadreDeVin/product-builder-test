import React from 'react';
import { ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  link: string;
}

interface NewsListProps {
  data: NewsItem[];
}

export const NewsList: React.FC<NewsListProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      {data.map((item, index) => (
        <a 
          key={index} 
          href={item.link} 
          className="group flex flex-col p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
        >
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-[15px] font-medium text-slate-800 leading-snug group-hover:text-blue-700">
              {item.title}
            </h3>
            <ExternalLink size={14} className="text-slate-400 mt-1 flex-shrink-0" />
          </div>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.source}</span>
        </a>
      ))}
    </div>
  );
};
