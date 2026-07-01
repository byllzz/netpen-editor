import { Code2, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="h-10 min-h-[40px] border-b border-[#1a1a1a] px-4 flex items-center justify-between bg-[#0a0a0a]">
      <div className="flex items-center gap-2">
        <Code2 className="w-4 h-4 text-indigo-400" />
        <h1 className="text-sm font-semibold text-[#e0e0e0] tracking-tight">NetPen</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-[#888] hover:text-[#e0e0e0] text-xs">
          <ExternalLink className="w-3.5 h-3.5" />
          Full view
        </Button>
      </div>
    </header>
  );
}
