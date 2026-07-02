import { useState } from 'react';
import { Button } from '../ui/Button';

import { IoIosSettings } from 'react-icons/io';
import { RiLayout3Fill } from 'react-icons/ri';
import { IoIosCloud } from 'react-icons/io';
import { BsPencilFill } from 'react-icons/bs';
import { Columns, Sidebar, Split } from 'lucide-react';

import logo from '/log.svg';
import { LAYOUT_MODES, type LayoutMode } from '../../lib/layout';
import { ProjectNameEditor } from './ProjectNameEditor';
import { ExportPanel } from '../export/ExportPanel';
import { SettingsPanel } from '../settings/SettingsPanel'; // <--- Added import

interface HeaderProps {
  totalChanges: number;
  layout: LayoutMode;
  setLayout: (mode: LayoutMode) => void;
  html: string;
  css: string;
  js: string;
  projectName: string;
  setProjectName: (name: string) => void;
}

export function Header({
  totalChanges,
  layout,
  setLayout,
  html,
  css,
  js,
  projectName,
  setProjectName,
}: HeaderProps) {
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // <--- Added state

  const toggleMenu = () => setShowLayoutMenu(prev => !prev);

  const handleSelectLayout = (mode: LayoutMode) => {
    setLayout(mode);
    setShowLayoutMenu(false);
  };

  return (
    <>
      <header className="h-16 min-h-[64px] px-2 flex items-center justify-between text-white select-none">
        {/* Left side: CodePen Logo & Project Details */}
        <div className="flex items-center gap-1.5">
          <img src={logo} className="w-10 h-10" />

          <div className="flex flex-col justify-center">
            <ProjectNameEditor name={projectName} onNameChange={setProjectName} />
            <span className="text-[13px] text-[#aaa] relative top-1 cursor-pointer ">
              Captain Anonymous
            </span>
          </div>
        </div>

        {/* Right side: Action Control Buttons */}
        <div className="flex items-center gap-2 font-secondary">
          <Button
            className="bg-[#5A5F73]! hover:bg-[#3a3f50] text-white text-[15px]! font-medium px-[18px] h-10.5 rounded-[4px]! flex items-center gap-[5px]! transition-colors border-0 cursor-pointer"
            onClick={() => setIsExportOpen(true)}
          >
            <IoIosCloud className="w-[17px] h-[17px] text-white" />
            <span>Export</span>
          </Button>

          {/* Updated Settings Button */}
          <Button
            className="bg-[#5A5F73]! hover:bg-[#3a3f50]! text-white text-[15px]! font-medium px-[18px] h-10.5 rounded-[4px]! flex items-center gap-[5px]! transition-colors border-0 cursor-pointer"
            onClick={() => setIsSettingsOpen(true)}
          >
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
        </div>
      </header>

      {/* Export Modal */}
      <ExportPanel
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        html={html}
        css={css}
        js={js}
        projectName={projectName}
      />

      {/* Settings Modal */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
