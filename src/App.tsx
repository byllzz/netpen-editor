import { useState, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CodeEditor } from './components/editor/CodeEditor';
import { PreviewDrawer } from './components/preview/PreviewDrawer';
import { useDebounce } from './hooks/useDebounce';
import { defaultHtml, defaultCss, defaultJs } from './lib/defaults';
import { Settings, ChevronDown } from 'lucide-react';

function App() {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);
  const [htmlChanges, setHtmlChanges] = useState(0);
  const [cssChanges, setCssChanges] = useState(0);
  const [jsChanges, setJsChanges] = useState(0);

  // Dismissal states for the yellow notification badges
  const [dismissedHtml, setDismissedHtml] = useState(false);
  const [dismissedCss, setDismissedCss] = useState(false);
  const [dismissedJs, setDismissedJs] = useState(false);

  const debouncedHtml = useDebounce(html, 400);
  const debouncedCss = useDebounce(css, 400);
  const debouncedJs = useDebounce(js, 400);

  const totalChanges = htmlChanges + cssChanges + jsChanges;

  const handleHtmlChange = useCallback((value: string) => {
    setHtml(value);
    setHtmlChanges(p => p + 1);
    setDismissedHtml(false); // Bring back the badge on new change
  }, []);
  const handleCssChange = useCallback((value: string) => {
    setCss(value);
    setCssChanges(p => p + 1);
    setDismissedCss(false);
  }, []);
  const handleJsChange = useCallback((value: string) => {
    setJs(value);
    setJsChanges(p => p + 1);
    setDismissedJs(false);
  }, []);

  // Reusable badge component
  const renderBadge = (
    lang: string,
    changes: number,
    dismissed: boolean,
    setDismissed: (v: boolean) => void,
  ) => {
    if (changes === 0 || dismissed) return null;
    return (
      <div className="bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded text-[9px] flex items-center gap-1 font-medium border border-yellow-500/20 ml-2">
        {changes} unsaved {lang} change{changes !== 1 ? 's' : ''}
        <span
          className="cursor-pointer hover:text-white ml-1"
          onClick={e => {
            e.stopPropagation();
            setDismissed(true);
          }}
        >
          ×
        </span>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden">
      <Header totalChanges={totalChanges} />

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
          <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between gap-2 min-h-[32px]">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center text-[8px] font-bold text-white">
                1
              </div>
              <span className="text-[11px] font-bold text-gray-300 tracking-wide">HTML</span>
              {renderBadge('HTML', htmlChanges, dismissedHtml, setDismissedHtml)}
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Settings className="w-3 h-3" />
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="html" value={html} onChange={handleHtmlChange} />
          </div>
        </div>

        <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
          <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between gap-2 min-h-[32px]">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white"></div>
              <span className="text-[11px] font-bold text-gray-300 tracking-wide">CSS</span>
              {renderBadge('CSS', cssChanges, dismissedCss, setDismissedCss)}
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Settings className="w-3 h-3" />
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="css" value={css} onChange={handleCssChange} />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between gap-2 min-h-[32px]">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 flex items-center justify-center text-[8px] font-bold text-white"></div>
              <span className="text-[11px] font-bold text-gray-300 tracking-wide">JS</span>
              {renderBadge('JS', jsChanges, dismissedJs, setDismissedJs)}
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Settings className="w-3 h-3" />
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="js" value={js} onChange={handleJsChange} />
          </div>
        </div>
      </div>

      <PreviewDrawer html={debouncedHtml} css={debouncedCss} js={debouncedJs} />
      <Footer totalChanges={totalChanges} />
    </div>
  );
}

export default App;
