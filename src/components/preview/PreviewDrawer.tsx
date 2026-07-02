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
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);
  const rafId = useRef<number | null>(null);
  const pendingHeight = useRef<number | null>(null);

  const handleDragStart = useCallback(
    (clientY: number) => {
      dragStartY.current = clientY;
      dragStartHeight.current = contentHeight;
      setIsDragging(true);
    },
    [contentHeight],
  );

  useEffect(() => {
    if (!isDragging) return;

    const applyHeight = () => {
      if (pendingHeight.current !== null) {
        setContentHeight(pendingHeight.current);
        pendingHeight.current = null;
      }
      rafId.current = null;
    };

    const updateFromClientY = (clientY: number) => {
      const maxContentHeight =
        window.innerHeight * MAX_HEIGHT_RATIO - HANDLE_HEIGHT - FOOTER_HEIGHT;
      const deltaY = dragStartY.current - clientY;
      const newHeight = dragStartHeight.current + deltaY;
      const clamped = Math.min(Math.max(newHeight, 0), Math.max(maxContentHeight, 0));
      pendingHeight.current = Math.round(clamped);
      if (rafId.current === null) rafId.current = requestAnimationFrame(applyHeight);
    };

    const handleMouseMove = (e: MouseEvent) => updateFromClientY(e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      updateFromClientY(e.touches[0].clientY);
    };
    const handleEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
      pendingHeight.current = null;
    };
  }, [isDragging]);

  useEffect(() => {
    document.body.style.cursor = isDragging ? 'ns-resize' : '';
    document.body.style.userSelect = isDragging ? 'none' : '';
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  const togglePreview = () => setContentHeight(prev => (prev > 5 ? 0 : DEFAULT_CONTENT_HEIGHT));
  const isCollapsed = contentHeight <= 5;
  const totalHeight = HANDLE_HEIGHT + contentHeight;

  return (
    <>
      {isDragging && (
        <div className="fixed inset-0 z-[9999] cursor-ns-resize" style={{ touchAction: 'none' }} />
      )}

      <div
        className={`fixed left-0 right-0 border-t border-[#1a1a1a] bg-white flex flex-col z-[100] ${
          isDragging ? '' : 'transition-[height] duration-200 ease-out'
        }`}
        style={{ height: `${totalHeight}px`, bottom: `${FOOTER_HEIGHT}px` }}
      >
        {/* Handle */}
        <div
          className="shrink-0 flex items-center justify-between px-3 cursor-ns-resize bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors group select-none border-b border-[#e5e5e5]"
          style={{ height: HANDLE_HEIGHT }}
          onMouseDown={e => {
            e.preventDefault();
            handleDragStart(e.clientY);
          }}
          onTouchStart={e => handleDragStart(e.touches[0].clientY)}
        >
          <div className="flex items-center gap-2">
            <GripHorizontal className="w-8 h-3 text-[#ccc] group-hover:text-[#999] transition-colors" />
            <Eye className="w-3.5 h-3.5 text-[#999]" />
            <span className="text-[10px] font-semibold text-[#999] uppercase tracking-widest">
              Preview
            </span>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              togglePreview();
            }}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#e0e0e0] transition-colors cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#888]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#888]" />
            )}
          </button>
        </div>

        {/* Preview content */}
        {!isCollapsed && (
          <div className="flex-1 min-h-0 overflow-hidden">
            <Preview html={html} css={css} js={js} />
          </div>
        )}
      </div>

      <div style={{ height: `${totalHeight + FOOTER_HEIGHT}px` }} className="shrink-0" />
    </>
  );
}
