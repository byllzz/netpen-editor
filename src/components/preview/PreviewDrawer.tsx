import { useState, useRef, useEffect, useCallback } from 'react';
import { Preview } from './Preview';
import { GripHorizontal, ChevronUp, ChevronDown, Eye } from 'lucide-react';
import { FOOTER_HEIGHT, HANDLE_HEIGHT } from '../../lib/layout';

interface PreviewDrawerProps {
  html: string;
  css: string;
  js: string;
}

const DEFAULT_CONTENT_HEIGHT = 280;
const MAX_HEIGHT_RATIO = 0.8;

export function PreviewDrawer({ html, css, js }: PreviewDrawerProps) {
  const [contentHeight, setContentHeight] = useState(DEFAULT_CONTENT_HEIGHT);
  const [isDragging, setIsDragging] = useState(false);
  const [dynamicBg, setDynamicBg] = useState('#ffffff'); // Default to white

  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startY: number; startHeight: number } | null>(null);

  // Listen for background color updates from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'PREVIEW_BG_COLOR') {
        setDynamicBg(event.data.color);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleDragStart = useCallback((clientY: number) => {
    if (!containerRef.current) return;
    const currentHeight = containerRef.current.getBoundingClientRect().height;
    dragState.current = { startY: clientY, startHeight: currentHeight };
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || !dragState.current) return;
    const maxContentHeight = window.innerHeight * MAX_HEIGHT_RATIO - HANDLE_HEIGHT - FOOTER_HEIGHT;
    const deltaY = dragState.current.startY - e.clientY;
    const newHeight = dragState.current.startHeight + deltaY;
    const clamped = Math.min(Math.max(newHeight, 0), Math.max(maxContentHeight, 0));
    containerRef.current.style.height = `${clamped + HANDLE_HEIGHT}px`;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current || !dragState.current) return;
    e.preventDefault();
    const maxContentHeight = window.innerHeight * MAX_HEIGHT_RATIO - HANDLE_HEIGHT - FOOTER_HEIGHT;
    const deltaY = dragState.current.startY - e.touches[0].clientY;
    const newHeight = dragState.current.startHeight + deltaY;
    const clamped = Math.min(Math.max(newHeight, 0), Math.max(maxContentHeight, 0));
    containerRef.current.style.height = `${clamped + HANDLE_HEIGHT}px`;
  }, []);

  const handleEnd = useCallback(() => {
    if (containerRef.current && dragState.current) {
      const currentHeight = parseFloat(containerRef.current.style.height) || 0;
      const finalContentHeight = Math.max(0, currentHeight - HANDLE_HEIGHT);
      setContentHeight(finalContentHeight);
    }
    setIsDragging(false);
    dragState.current = null;
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  useEffect(() => {
    document.body.style.cursor = isDragging ? 'ns-resize' : '';
    document.body.style.userSelect = isDragging ? 'none' : '';
    document.body.style.overscrollBehavior = isDragging ? 'none' : '';
    document.documentElement.style.overscrollBehavior = isDragging ? 'none' : '';
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, [isDragging]);

  const togglePreview = () => setContentHeight(prev => (prev > 5 ? 0 : DEFAULT_CONTENT_HEIGHT));
  const isCollapsed = contentHeight <= 5;
  const totalHeight = HANDLE_HEIGHT + contentHeight;

  return (
    <>
      {isDragging && (
        <div
          className="fixed inset-0 z-[9999] cursor-ns-resize"
          style={{ touchAction: 'none', overscrollBehavior: 'none' }}
        />
      )}

      <div
        ref={containerRef}
        className={`fixed left-0 right-0 border-t border-[#1a1a1a] flex flex-col z-[100] ${
          isDragging ? '' : 'transition-[height] duration-200 ease-out'
        }`}
        style={{
          height: `${totalHeight}px`,
          bottom: `${FOOTER_HEIGHT}px`,
          willChange: 'height',
        }}
      >
        {/* Handle */}
        <div
          className="shrink-0 flex items-center justify-between px-3 cursor-ns-resize bg-[#0d0d0d] hover:bg-[#1a1a1a] transition-colors group select-none border-b border-[#1a1a1a]"
          style={{ height: HANDLE_HEIGHT, touchAction: 'none' }}
          onMouseDown={e => {
            e.preventDefault();
            handleDragStart(e.clientY);
          }}
          onTouchStart={e => {
            e.preventDefault();
            handleDragStart(e.touches[0].clientY);
          }}
        >
          <div className="flex items-center gap-2">
            <GripHorizontal className="w-8 h-3 text-[#555] group-hover:text-[#888] transition-colors" />
            <Eye className="w-3.5 h-3.5 text-[#555]" />
            <span className="text-[10px] font-semibold text-[#555] uppercase tracking-widest">
              Preview
            </span>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              togglePreview();
            }}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#2a2a2a] transition-colors cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#666]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#666]" />
            )}
          </button>
        </div>

        {/* Preview content wrapper */}
        {!isCollapsed && (
          <div
            className="flex-1 min-h-0 overflow-hidden relative"
            style={{
              pointerEvents: isDragging ? 'none' : 'auto',
              backgroundColor: dynamicBg, // Matches user's CSS background!
            }}
          >
            <Preview html={html} css={css} js={js} />
          </div>
        )}
      </div>
    </>
  );
}
