import { useRef } from 'react';
// import type { TabType } from '../../types';

interface EditorPanelProps {
  active: boolean;
  language: string;
  value: string;
  onChange: (value: string) => void;
}

export function EditorPanel({ active, language, value, onChange }: EditorPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      // Move cursor after the inserted tab
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${active ? 'flex' : 'hidden'}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="flex-1 w-full resize-none bg-[#0d0d0d] text-[#e0e0e0] font-mono text-sm p-4 leading-relaxed focus:outline-none placeholder:text-[#3a3a3a]"
        placeholder={`Write your ${language} here...`}
      />
    </div>
  );
}
