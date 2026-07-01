import { Code2 } from 'lucide-react';

export function Header() {
  return (
    <header className="h-9 min-h-[36px] border-b border-[#1a1a1a] px-4 flex items-center bg-[#0a0a0a]">
      <div className="flex items-center gap-2">
        <Code2 className="w-4 h-4 text-indigo-400" />
        <h1 className="text-xs font-semibold text-[#e0e0e0] tracking-tight">NetPen</h1>
      </div>
    </header>
  );
}
