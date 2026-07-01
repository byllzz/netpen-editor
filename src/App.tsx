import { useState, useRef, useEffect, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { EditorPanel } from './components/editor/EditorPanel';
import { Preview } from './components/preview/Preview';
import { useDebounce } from './hooks/useDebounce';
import { defaultHtml, defaultCss, defaultJs } from './lib/defaults';
import { GripHorizontal, ChevronUp, ChevronDown } from 'lucide-react';

function App() {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);

  const debouncedHtml = useDebounce(html, 300);
  const debouncedCss = useDebounce(css, 300);
  const debouncedJs = useDebounce(js, 300);

  // Preview drawer state
  const [previewPercent, setPreviewPercent] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartPercent = useRef(40);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragStartY.current = e.clientY;
      dragStartPercent.current = previewPercent;
      setIsDragging(true);
    },
    [previewPercent],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const deltaY = dragStartY.current - e.clientY;
      const deltaPercent = (deltaY / rect.height) * 100;
      const newPercent = dragStartPercent.current + deltaPercent;

      // Clamp between 0% (fully hidden) and 80% max
      const clamped = Math.min(Math.max(newPercent, 0), 80);
      setPreviewPercent(Math.round(clamped));
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove as unknown as EventListener);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove as unknown as EventListener);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const togglePreview = () => {
    if (previewPercent > 5) {
      setPreviewPercent(0);
    } else {
      setPreviewPercent(40);
    }
  };

  const isCollapsed = previewPercent <= 5;

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden">
      <Header />

      <div ref={containerRef} className="flex-1 flex flex-col overflow-hidden relative">
        {/* Three editor columns */}
        <div className="flex-1 flex min-h-0">
          {/* HTML */}
          <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
            <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center">
              <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest">
                HTML
              </span>
            </div>
            <EditorPanel language="HTML" value={html} onChange={setHtml} />
          </div>

          {/* CSS */}
          <div className="flex-1 flex flex-col border-r border-[#1a1a1a] min-w-0">
            <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center">
              <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-widest">
                CSS
              </span>
            </div>
            <EditorPanel language="CSS" value={css} onChange={setCss} />
          </div>

          {/* JS */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-3 py-1.5 border-b border-[#1a1a1a] bg-[#0d0d0d] flex items-center">
              <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest">
                JS
              </span>
            </div>
            <EditorPanel language="JavaScript" value={js} onChange={setJs} />
          </div>
        </div>

        {/* Preview drawer */}
        <div
          className={`border-t border-[#1a1a1a] bg-white transition-[height] duration-200 ease-out overflow-hidden ${
            isDragging ? 'transition-none select-none' : ''
          }`}
          style={{ height: `${previewPercent}%` }}
        >
          {/* Handle bar */}
          <div
            className="h-7 flex items-center justify-between px-3 cursor-ns-resize bg-[#fafafa] border-b border-[#e5e5e5] hover:bg-[#f0f0f0] transition-colors group select-none"
            onMouseDown={handleDragStart}
            onTouchStart={e => {
              dragStartY.current = e.touches[0].clientY;
              dragStartPercent.current = previewPercent;
              setIsDragging(true);
            }}
          >
            <div className="flex items-center gap-2">
              <GripHorizontal className="w-8 h-3 text-[#ccc] group-hover:text-[#999] transition-colors" />
              <span className="text-[10px] font-semibold text-[#999] uppercase tracking-widest">
                Preview
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#bbb] tabular-nums">{previewPercent}%</span>
              <button
                onClick={e => {
                  e.stopPropagation();
                  togglePreview();
                }}
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#e0e0e0] transition-colors cursor-pointer ml-1"
                title={isCollapsed ? 'Show preview' : 'Hide preview'}
              >
                {isCollapsed ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#888]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#888]" />
                )}
              </button>
            </div>
          </div>

          {/* Preview content */}
          {!isCollapsed && (
            <div className="h-[calc(100%-28px)]">
              <Preview html={debouncedHtml} css={debouncedCss} js={debouncedJs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
