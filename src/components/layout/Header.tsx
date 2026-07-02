import { useState } from 'react';
import { Button } from '../ui/Button';

import { IoIosSettings } from 'react-icons/io';
import { RiLayout3Fill } from 'react-icons/ri';
import { IoIosCloud } from 'react-icons/io';
import { BsPencilFill } from 'react-icons/bs';
import { Columns, Sidebar, Split } from 'lucide-react';

import logo from '/log.svg';
// Change this import:
import { LAYOUT_MODES, type LayoutMode } from '../../lib/layout';

interface HeaderProps {
  totalChanges: number;
  layout: LayoutMode;
  setLayout: (mode: LayoutMode) => void;
}

export function Header({ totalChanges, layout, setLayout }: HeaderProps) {
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);

  const toggleMenu = () => setShowLayoutMenu(prev => !prev);

  const handleSelectLayout = (mode: LayoutMode) => {
    setLayout(mode);
    setShowLayoutMenu(false);
  };

  return (
    <header className="h-16 min-h-[64px] px-2 flex items-center justify-between text-white select-none">
      {/* Left side: CodePen Logo & Project Details */}
      <div className="flex items-center gap-1.5">
        <img src={logo} className="w-10 h-10" />

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 leading-none relative top-0.5">
            <h1 className="text-[20px] font-bold font-secondary text-white hover:underline cursor-pointer">
              Untitled
            </h1>
            <BsPencilFill className="w-[14px] h-[14px] text-white cursor-pointer" />
          </div>
          <span className="text-[13px] text-[#aaa] relative top-1 cursor-pointer ">
            Captain Anonymous
          </span>
        </div>
      </div>

      {/* Right side: Action Control Buttons */}
      <div className="flex items-center gap-2 font-secondary">
        <Button className="bg-[#5A5F73]! hover:bg-[#3a3f50] text-white text-[15px]! font-medium px-[18px] h-10.5 rounded-[4px]! flex items-center gap-[5px]! transition-colors border-0">
          <IoIosCloud className="w-[17px] h-[17px] text-white" />
          <span>Save</span>
        </Button>
        <Button className="bg-[#5A5F73]! hover:bg-[#3a3f50]! text-white text-[15px]! font-medium px-[18px] h-10.5 rounded-[4px]! flex items-center gap-[5px]! transition-colors border-0">
          <IoIosSettings className="w-[17px] h-[17px] text-white" />
          <span>Settings</span>
        </Button>

        {/* Layout Dropdown Wrapper */}
        <div className="relative">
          <Button
            className="bg-[#5A5F73]! hover:bg-[#3a3f50]! text-white px-[18px].5 h-10.5 rounded-[4px]! flex items-center justify-center transition-colors border-0 cursor-pointer"
            onClick={toggleMenu}
          >
            <RiLayout3Fill className="w-[22px] h-[22px] text-white" />
          </Button>

          {showLayoutMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#2a2a2a] border border-[#444] rounded-md shadow-lg overflow-hidden z-999 py-1">
              <button
                className={`w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-[#3a3a3a] text-left transition-colors ${layout === LAYOUT_MODES.DEFAULT ? 'text-indigo-400' : 'text-gray-300'}`}
                onClick={() => handleSelectLayout(LAYOUT_MODES.DEFAULT)}
              >
                <Columns className="w-4 h-4" />
                <span>Default (3-Column)</span>
                {layout === LAYOUT_MODES.DEFAULT && (
                  <span className="ml-auto text-[10px] text-indigo-400">✓</span>
                )}
              </button>
              <button
                className={`w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-[#3a3a3a] text-left transition-colors ${layout === LAYOUT_MODES.SIDEBAR ? 'text-indigo-400' : 'text-gray-300'}`}
                onClick={() => handleSelectLayout(LAYOUT_MODES.SIDEBAR)}
              >
                <Sidebar className="w-4 h-4" />
                <span>Vertical Sidebar</span>
                {layout === LAYOUT_MODES.SIDEBAR && (
                  <span className="ml-auto text-[10px] text-indigo-400">✓</span>
                )}
              </button>
              <button
                className={`w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-[#3a3a3a] text-left transition-colors ${layout === LAYOUT_MODES.SPLIT ? 'text-indigo-400' : 'text-gray-300'}`}
                onClick={() => handleSelectLayout(LAYOUT_MODES.SPLIT)}
              >
                <Split className="w-4 h-4" />
                <span>Split (2-Column)</span>
                {layout === LAYOUT_MODES.SPLIT && (
                  <span className="ml-auto text-[10px] text-indigo-400">✓</span>
                )}
              </button>
            </div>
          )}
        </div>

        <Button className="bg-[#248C46]! hover:bg-[#24bf53]! text-black font-bold text-[15px]! px-[18px] h-10.5 rounded-[4px]! transition-colors border-0">
          Sign Up
        </Button>

        <Button className="bg-[#5A5F73]! hover:bg-[#3a3f50]! text-white text-[15px]! font-medium px-[18px] h-10.5 rounded-[4px]! transition-colors border-0">
          Log In
        </Button>
      </div>
    </header>
  );
}
