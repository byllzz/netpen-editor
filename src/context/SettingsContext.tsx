import { createContext, useContext, useState, ReactNode } from 'react';

// Export as a const object so it exists at runtime
export const EDITOR_THEMES = {
  ONE_DARK: 'oneDark',
  ONE_LIGHT: 'oneLight',
  VSCODE_DARK: 'vscodeDark',
  SOLARIZED_DARK: 'solarizedDark',
} as const;

// Export the type for TypeScript
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

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<EditorTheme>('oneDark');
  const [fontSize, setFontSize] = useState(13);
  const [tabSize, setTabSize] = useState(2);
  const [wordWrap, setWordWrap] = useState(false);

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
