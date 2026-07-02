import { Terminal, Box, Keyboard } from 'lucide-react';

interface FooterProps {
  totalChanges: number;
}

export function Footer({ totalChanges }: FooterProps) {
  return (
    <footer className="h-7 min-h-[28px] border-t border-[#1a1a1a] px-3 flex items-center justify-between bg-[#1e1e1e] text-[10px] text-[#888]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 hover:text-[#ccc] cursor-pointer">
          <Terminal className="w-3 h-3" />
          <span>Console</span>
        </div>
        <div className="flex items-center gap-1.5 hover:text-[#ccc] cursor-pointer">
          <Box className="w-3 h-3" />
          <span>Assets</span>
        </div>
        <div className="flex items-center gap-1.5 hover:text-[#ccc] cursor-pointer">
          <Keyboard className="w-3 h-3" />
          <span>Shortcuts</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {totalChanges > 0 && (
          <span className="text-[10px] text-[#666]">{totalChanges} unsaved</span>
        )}
        {totalChanges === 0 && <span>No changes</span>}
      </div>
    </footer>
  );
}
