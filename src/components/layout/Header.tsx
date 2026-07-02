import { Pencil, Cloud, Settings, LayoutGrid } from 'lucide-react';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="h-16 min-h-[64px] bg-[#131417] border-b border-[#252830] px-4 flex items-center justify-between text-white select-none">
      {/* Left side: CodePen Logo & Project Details */}
      <div className="flex items-center gap-3">
        <Pencil className="w-9 h-9 text-white" />

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 leading-none">
            <h1 className="text-base font-bold text-white tracking-wide hover:underline cursor-pointer">
              Untitled
            </h1>
            <Pencil className="w-3.5 h-3.5 text-[#aaa] cursor-pointer hover:text-white transition-colors" />
          </div>
          <span className="text-xs text-[#aaa] mt-1 font-normal cursor-pointer hover:text-white transition-colors">
            Captain Anonymous
          </span>
        </div>
      </div>

      {/* Right side: Action Control Buttons */}
      <div className="flex items-center gap-2.5">
        <Button className="bg-[#2c303d] hover:bg-[#3a3f50] text-white text-sm font-medium px-4 h-9 rounded-[4px] flex items-center gap-2 transition-colors border-0">
          <Cloud className="w-4 h-4 text-white" />
          <span>Save</span>
        </Button>

        <Button className="bg-[#2c303d] hover:bg-[#3a3f50] text-white text-sm font-medium px-4 h-9 rounded-[4px] flex items-center gap-2 transition-colors border-0">
          <Settings className="w-4 h-4 text-white" />
          <span>Settings</span>
        </Button>

        <Button className="bg-[#2c303d] hover:bg-[#3a3f50] text-white p-2 h-9 w-9 rounded-[4px] flex items-center justify-center transition-colors border-0">
          <LayoutGrid className="w-4 h-4 text-white" />
        </Button>

        <Button className="bg-[#47cf73] hover:bg-[#24bf53] text-black font-bold text-sm px-4 h-9 rounded-[4px] transition-colors border-0 ml-1">
          Sign Up
        </Button>

        <Button className="bg-[#2c303d] hover:bg-[#3a3f50] text-white text-sm font-medium px-4 h-9 rounded-[4px] transition-colors border-0">
          Log In
        </Button>
      </div>
    </header>
  );
}
