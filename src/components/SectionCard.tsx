import React from 'react';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onDownload?: () => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, children, className, onDownload }) => {
  return (
    <section className={cn("bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden", className)}>
      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        {onDownload && (
          <button 
            onClick={onDownload}
            className="p-1.5 hover:bg-slate-200 rounded-md transition-colors text-slate-500"
            title="Download JSON"
          >
            <Download size={18} />
          </button>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
    </section>
  );
};
