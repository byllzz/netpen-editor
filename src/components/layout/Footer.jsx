import { Code2 } from 'lucide-react';
import { FOOTER_HEIGHT } from '../../lib/layout';

export function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 border-t border-[#1a1a1a] px-4 flex items-center bg-[#0d0d0d] z-[200]"
      style={{ height: FOOTER_HEIGHT }}
    >
      <div className="flex items-center gap-2">
        <Code2 className="w-4 h-4 text-indigo-400" />
        <h1 className="text-xs font-semibold text-[#e0e0e0] tracking-tight">NetPen</h1>
      </div>
    </footer>
  );
}
