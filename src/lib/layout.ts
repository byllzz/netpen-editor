export const HEADER_HEIGHT = 48;
export const FOOTER_HEIGHT = 28;
export const HANDLE_HEIGHT = 20;
export const LAYOUT_MODES = {
  DEFAULT: 'default',
  SIDEBAR: 'sidebar',
  SPLIT: 'split',
} as const;
export type LayoutMode = (typeof LAYOUT_MODES)[keyof typeof LAYOUT_MODES];
