import { useState, useRef, useEffect } from 'react';
import { BsPencilFill } from 'react-icons/bs';

interface ProjectNameEditorProps {
  name: string;
  onNameChange: (newName: string) => void;
}

export function ProjectNameEditor({ name, onNameChange }: ProjectNameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = tempName.trim();
    if (trimmed) {
      onNameChange(trimmed);
    } else {
      setTempName(name); // Revert if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setTempName(name);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 leading-none relative top-0.5">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={tempName}
          onChange={e => setTempName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="text-[20px] font-bold font-secondary bg-[#2a2a2a] px-1.5 py-0.5 rounded text-white outline-none ring-1 ring-indigo-500 min-w-[80px]"
        />
      ) : (
        <h1
          className="text-[20px] font-bold font-secondary text-white hover:underline cursor-pointer"
          onDoubleClick={() => setIsEditing(true)}
        >
          {name}
        </h1>
      )}
      <button
        onClick={() => setIsEditing(true)}
        className="text-white hover:text-indigo-400 transition-colors cursor-pointer"
      >
        <BsPencilFill className="w-[14px] h-[14px]" />
      </button>
    </div>
  );
}
