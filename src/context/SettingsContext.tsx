import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export const EDITOR_THEMES = {
  ONE_DARK: 'oneDark',
  ONE_LIGHT: 'oneLight',
  VSCODE_DARK: 'vscodeDark',
  SOLARIZED_DARK: 'solarizedDark',
} as const;

export type EditorTheme = (typeof EDITOR_THEMES)[keyof typeof EDITOR_THEMES];

interface SettingsContextType {
  theme: EditorTheme;
  setTheme: (theme: EditorTheme) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  tabSize: number;
  setTabSize: (size: number) => void;
  wordWrap: boolean;
  setWordWrap: (wrap: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SETTINGS_STORAGE_KEY = 'netpen_settings';

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Load settings from localStorage or use defaults
  const [theme, setTheme] = useState<EditorTheme>(() => {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.theme || 'oneDark';
      } catch {
        return 'oneDark';
      }
    }
    return 'oneDark';
  });

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.fontSize || 13;
      } catch {
        return 13;
      }
    }
    return 13;
  });

  const [tabSize, setTabSize] = useState<number>(() => {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.tabSize || 2;
      } catch {
        return 2;
      }
    }
    return 2;
  });

  const [wordWrap, setWordWrap] = useState<boolean>(() => {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.wordWrap || false;
      } catch {
        return false;
      }
    }
    return false;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      theme,
      fontSize,
      tabSize,
      wordWrap,
    };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [theme, fontSize, tabSize, wordWrap]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        tabSize,
        setTabSize,
        wordWrap,
        setWordWrap,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
