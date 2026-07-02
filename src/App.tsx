import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CodeEditor } from './components/editor/CodeEditor';
import { PreviewDrawer } from './components/preview/PreviewDrawer';
import { useDebounce } from './hooks/useDebounce';
import { defaultHtml, defaultCss, defaultJs } from './lib/defaults';

function App() {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);

  const debouncedHtml = useDebounce(html, 400);
  const debouncedCss = useDebounce(css, 400);
  const debouncedJs = useDebounce(js, 400);

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden">
      <Header />

      <div className="flex-1 flex min-h-0">
        {/* HTML */}
        <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
          <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center">
            <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest">
              HTML
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="html" value={html} onChange={setHtml} />
          </div>
        </div>

        {/* CSS */}
        <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
          <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center">
            <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-widest">
              CSS
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="css" value={css} onChange={setCss} />
          </div>
        </div>

        {/* JS */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center">
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest">
              JS
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor language="js" value={js} onChange={setJs} />
          </div>
        </div>
      </div>

      <PreviewDrawer html={debouncedHtml} css={debouncedCss} js={debouncedJs} />

      <Footer />
    </div>
  );
}

export default App;
