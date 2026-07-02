import { Code2, Pencil, LayoutGrid } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  totalChanges: number;
}

export function Header({ totalChanges }: HeaderProps) {
  return (
    <header className="h-12 min-h-[48px] border-b border-[#1a1a1a] px-4 flex items-center justify-between bg-[#0a0a0a]">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-indigo-500/20 rounded flex items-center justify-center text-indigo-400">
          <Code2 className="w-4 h-4" />
        </div>
        <h1 className="text-sm font-bold text-white tracking-tight">Untitled</h1>
        <Pencil className="w-3 h-3 text-gray-500" />
        <span className="text-xs text-gray-500 ml-2">CaptainAnonymous</span>
      </div>
      <div className="flex items-center gap-2">
        {totalChanges > 0 && (
          <div className="bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded text-[9px] font-medium mr-1">
            {totalChanges}
          </div>
        )}
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          Save
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          Settings
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <LayoutGrid className="w-4 h-4" />
        </Button>
        <Button className="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1 text-xs rounded">
          Sign Up
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          Log In
        </Button>
      </div>
    </header>
  );
}
