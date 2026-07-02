import { useState, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CodeEditor } from './components/editor/CodeEditor';
import { PreviewDrawer } from './components/preview/PreviewDrawer';
import { useDebounce } from './hooks/useDebounce';
import { defaultHtml, defaultCss, defaultJs } from './lib/defaults';
import { FaCss3, FaHtml5, FaJs } from 'react-icons/fa6';

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
      <Header />

      <div className="flex-1 flex min-h-0 px-3 gap-3 bg-[#1C1C1C]">
        <div className="flex-1 flex flex-col border-r border-l border-[#ccc]/20 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#282C34]! min-h-[38px] min-w-[90px] px-2  border-t-3 border-[#ccc]/20">
              <FaHtml5 className="w-5 h-5" />
              <span className="text-[16px] font-medium text-gray-300 ">HTML</span>
            </div>
            {/* noti for changes */}
            {renderBadge('HTML', htmlChanges, dismissedHtml, setDismissedHtml)}
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="html" value={html} onChange={handleHtmlChange} />
          </div>
        </div>

        <div className="flex-1 flex flex-col border-r border-l border-[#ccc]/20 min-w-0">
          <div className=" flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 bg-[#282C34]! min-h-[35px] min-w-[100px] px-2 border-t-3 border-[#ccc]/20">
              <FaCss3 className="w-5 h-5" />
              <span className="text-[15px] font-bold text-gray-300 tracking-wide">CSS</span>
            </div>
            {/* later for more */}
            {renderBadge('CSS', cssChanges, dismissedCss, setDismissedCss)}
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="css" value={css} onChange={handleCssChange} />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 border-r border-l border-[#ccc]/20">
          <div className=" flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 bg-[#282C34]! min-h-[35px] min-w-[100px] px-2 border-t-3 border-[#ccc]/20">
              <FaJs className="w-5 h-5" />
              <span className="text-[15px] font-bold text-gray-300 tracking-wide">JS</span>
            </div>
            {/* later for more */}
            {renderBadge('JS', jsChanges, dismissedJs, setDismissedJs)}
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
