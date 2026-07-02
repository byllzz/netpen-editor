export const HEADER_HEIGHT = 48;
export const FOOTER_HEIGHT = 28;
export const HANDLE_HEIGHT = 20;

// Change this from 'type' to 'const'
export const LAYOUT_MODES = {
  DEFAULT: 'default',
  SIDEBAR: 'sidebar',
  SPLIT: 'split',
} as const;

// You can also keep this type for TypeScript safety, but export it separately
export type LayoutMode = (typeof LAYOUT_MODES)[keyof typeof LAYOUT_MODES];
