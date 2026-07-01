import { useState, useRef, useEffect, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { EditorPanel } from './components/editor/EditorPanel';
import { Preview } from './components/preview/Preview';
import { useDebounce } from './hooks/useDebounce';
import { defaultHtml, defaultCss, defaultJs } from './lib/defaults';
// import type { TabType } from './types';
import { GripHorizontal } from 'lucide-react';

function App() {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);

  const debouncedHtml = useDebounce(html, 300);
  const debouncedCss = useDebounce(css, 300);
  const debouncedJs = useDebounce(js, 300);

  // Preview drawer state
  const [previewHeight, setPreviewHeight] = useState(40); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const y = rect.bottom - e.clientY;
      const percent = Math.min(Math.max((y / rect.height) * 100, 15), 80);
      setPreviewHeight(Math.round(percent));
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden">
      <Header />

      <div ref={containerRef} className="flex-1 flex flex-col overflow-hidden relative">
        {/* Three editor columns */}
        <div className="flex-1 flex min-h-0">
          {/* HTML */}
          <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
            <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between">
              <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest">
                HTML
              </span>
            </div>
            <EditorPanel language="HTML" value={html} onChange={setHtml} />
          </div>

          {/* CSS */}
          <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
            <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between">
              <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-widest">
                CSS
              </span>
            </div>
            <EditorPanel language="CSS" value={css} onChange={setCss} />
          </div>

          {/* JS */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-between">
              <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest">
                JS
              </span>
            </div>
            <EditorPanel language="JavaScript" value={js} onChange={setJs} />
          </div>
        </div>

        {/* Draggable divider */}
        <div
          className={`h-6 flex items-center justify-center cursor-ns-resize hover:bg-[#1a1a1a] transition-colors border-t border-[#1a1a1a] group ${isDragging ? 'bg-[#1a1a1a]' : ''}`}
          onMouseDown={handleDragStart}
        >
          <GripHorizontal className="w-8 h-3 text-[#3a3a3a] group-hover:text-[#666] transition-colors" />
        </div>

        {/* Preview pane */}
        <div
          className="border-t border-[#1a1a1a] bg-white overflow-hidden"
          style={{ height: `${previewHeight}%`, minHeight: '15%' }}
        >
          <div className="px-3 py-1 border-b border-[#e5e5e5] bg-[#fafafa] flex items-center">
            <span className="text-[10px] font-semibold text-[#888] uppercase tracking-widest">
              Preview
            </span>
            <span className="ml-auto text-[10px] text-[#aaa]">{previewHeight}%</span>
          </div>
          <div className="flex-1 h-[calc(100%-25px)]">
            <Preview html={debouncedHtml} css={debouncedCss} js={debouncedJs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
