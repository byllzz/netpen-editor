import { Code2, Activity } from 'lucide-react';

interface HeaderProps {
  totalChanges: number;
}

export function Header({ totalChanges }: HeaderProps) {
  return (
    <header className="h-9 min-h-[36px] border-b border-[#1a1a1a] px-4 flex items-center justify-between bg-[#0a0a0a]">
      <div className="flex items-center gap-2">
        <Code2 className="w-4 h-4 text-indigo-400" />
        <h1 className="text-xs font-semibold text-[#e0e0e0] tracking-tight">NetPen</h1>
      </div>
      <div className="flex items-center gap-2">
        {totalChanges > 0 && (
          <div className="flex items-center gap-1.5 text-[10px] text-[#666]">
            <Activity className="w-3 h-3 text-indigo-400" />
            <span className="tabular-nums">{totalChanges}</span>
            <span>unsaved change{totalChanges !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </header>
  );
}
