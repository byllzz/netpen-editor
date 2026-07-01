import { useState } from 'react';
import { Header } from './components/layout/Header';
import { EditorPanel } from './components/editor/EditorPanel';
import { Preview } from './components/preview/Preview';
import { useDebounce } from './hooks/useDebounce';
import { defaultHtml, defaultCss, defaultJs } from './lib/defaults';
import type { TabType } from './types';

const tabs: { id: TabType; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'js', label: 'JS' },
];

function App() {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);
  const [activeTab, setActiveTab] = useState<TabType>('html');

  const debouncedHtml = useDebounce(html, 300);
  const debouncedCss = useDebounce(css, 300);
  const debouncedJs = useDebounce(js, 300);

  const getValue = (tab: TabType) => {
    if (tab === 'html') return html;
    if (tab === 'css') return css;
    return js;
  };

  const getSetter = (tab: TabType) => {
    if (tab === 'html') return setHtml;
    if (tab === 'css') return setCss;
    return setJs;
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor section */}
        <div className="flex-1 flex flex-col min-h-0 border-r border-[#1a1a1a]">
          {/* Tabs */}
          <div className="flex border-b border-[#1a1a1a] bg-[#0d0d0d]">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer border-b-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-[#e0e0e0]'
                    : 'border-transparent text-[#666] hover:text-[#aaa]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Editors */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {tabs.map(tab => (
              <EditorPanel
                key={tab.id}
                active={activeTab === tab.id}
                language={tab.label}
                value={getValue(tab.id)}
                onChange={getSetter(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Preview section */}
        <div className="flex-1 min-h-0">
          <div className="h-full flex flex-col">
            <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center">
              <span className="text-[10px] text-[#666] uppercase tracking-widest">Preview</span>
            </div>
            <div className="flex-1">
              <Preview html={debouncedHtml} css={debouncedCss} js={debouncedJs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
