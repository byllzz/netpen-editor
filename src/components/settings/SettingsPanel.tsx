import { X, Palette, Type, WrapText, Columns } from 'lucide-react';
import { useSettings, EDITOR_THEMES, type EditorTheme } from '../../context/SettingsContext';
import { Button } from '../ui/Button';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme, setTheme, fontSize, setFontSize, tabSize, setTabSize, wordWrap, setWordWrap } =
    useSettings();

  if (!isOpen) return null;

  const themes: { id: EditorTheme; label: string; preview: string }[] = [
    { id: EDITOR_THEMES.ONE_DARK, label: 'One Dark', preview: 'bg-[#282c34] text-white' },
    { id: EDITOR_THEMES.ONE_LIGHT, label: 'One Light', preview: 'bg-[#fafafa] text-black' },
    { id: EDITOR_THEMES.VSCODE_DARK, label: 'VS Code Dark', preview: 'bg-[#1e1e1e] text-white' },
    {
      id: EDITOR_THEMES.SOLARIZED_DARK,
      label: 'Solarized Dark',
      preview: 'bg-[#002b36] text-[#839496]',
    },
  ];

  return (
    <div className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#1C1C1C] rounded-xl border border-[#333] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333] bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#333] transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-8">
          {/* Theme Selector */}
          <div>
            <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4" /> Editor Theme
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-md border text-left transition-all ${theme === t.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-[#333] bg-[#0a0a0a] hover:border-[#555]'}`}
                >
                  <div
                    className={`h-8 rounded mb-2 ${t.preview} flex items-center px-2 text-[10px] font-mono`}
                  >
                    {t.label}
                  </div>
                  <p className="text-sm text-gray-300">{t.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="border-t border-[#333] pt-6">
            <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <Type className="w-4 h-4" /> Font Size
            </h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="24"
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="flex-1 h-1.5 bg-[#333] rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-sm text-white font-mono w-8 text-center">{fontSize}px</span>
            </div>
          </div>

          {/* Tab Size */}
          <div className="border-t border-[#333] pt-6">
            <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <Columns className="w-4 h-4" /> Tab Size
            </h3>
            <div className="flex gap-3">
              {[2, 4, 8].map(size => (
                <button
                  key={size}
                  onClick={() => setTabSize(size)}
                  className={`px-4 py-2 rounded-md border text-sm transition-colors ${tabSize === size ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-[#333] text-gray-400 hover:border-[#555]'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Word Wrap */}
          <div className="border-t border-[#333] pt-6">
            <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <WrapText className="w-4 h-4" /> Word Wrap
            </h3>
            <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={wordWrap}
                onChange={() => setWordWrap(!wordWrap)}
                className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
              />
              <span>Enable word wrapping in editors</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#333] bg-[#0a0a0a] flex justify-end">
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
