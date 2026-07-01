export type TabType = 'html' | 'css' | 'js';

export interface EditorTab {
  id: TabType;
  label: string;
  language: string;
  defaultValue: string;
}
