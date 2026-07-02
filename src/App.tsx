import { useState, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer.tsx';
import { CodeEditor } from './components/editor/CodeEditor';
import { PreviewDrawer } from './components/preview/PreviewDrawer';
import { useDebounce } from './hooks/useDebounce';
import { defaultHtml, defaultCss, defaultJs } from './lib/defaults';
import { FileCode, Palette, Braces, Circle } from 'lucide-react';

function App() {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);
  const [htmlChanges, setHtmlChanges] = useState(0);
  const [cssChanges, setCssChanges] = useState(0);
  const [jsChanges, setJsChanges] = useState(0);

  const debouncedHtml = useDebounce(html, 400);
  const debouncedCss = useDebounce(css, 400);
  const debouncedJs = useDebounce(js, 400);

  const totalChanges = htmlChanges + cssChanges + jsChanges;

  const handleHtmlChange = useCallback((value: string) => {
    setHtml(value);
    setHtmlChanges(p => p + 1);
  }, []);
  const handleCssChange = useCallback((value: string) => {
    setCss(value);
    setCssChanges(p => p + 1);
  }, []);
  const handleJsChange = useCallback((value: string) => {
    setJs(value);
    setJsChanges(p => p + 1);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden">
      <Header totalChanges={totalChanges} />

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
          <div className="px-3 py-2 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[11px] font-semibold text-[#e0e0e0] tracking-wide">HTML</span>
            </div>
            <div className="flex items-center gap-2">
              {htmlChanges > 0 && (
                <span className="text-[10px] text-[#666] tabular-nums">
                  {htmlChanges} change{htmlChanges !== 1 ? 's' : ''}
                </span>
              )}
              <Circle
                className={`w-2 h-2 fill-current ${htmlChanges > 0 ? 'text-orange-400' : 'text-[#333]'}`}
              />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="html" value={html} onChange={handleHtmlChange} />
          </div>
        </div>

        <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
          <div className="px-3 py-2 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-semibold text-[#e0e0e0] tracking-wide">CSS</span>
            </div>
            <div className="flex items-center gap-2">
              {cssChanges > 0 && (
                <span className="text-[10px] text-[#666] tabular-nums">
                  {cssChanges} change{cssChanges !== 1 ? 's' : ''}
                </span>
              )}
              <Circle
                className={`w-2 h-2 fill-current ${cssChanges > 0 ? 'text-sky-400' : 'text-[#333]'}`}
              />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="css" value={css} onChange={handleCssChange} />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-3 py-2 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Braces className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-semibold text-[#e0e0e0] tracking-wide">JS</span>
            </div>
            <div className="flex items-center gap-2">
              {jsChanges > 0 && (
                <span className="text-[10px] text-[#666] tabular-nums">
                  {jsChanges} change{jsChanges !== 1 ? 's' : ''}
                </span>
              )}
              <Circle
                className={`w-2 h-2 fill-current ${jsChanges > 0 ? 'text-amber-400' : 'text-[#333]'}`}
              />
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
