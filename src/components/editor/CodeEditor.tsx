import { useRef, useEffect } from 'react';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightSpecialChars,
  drawSelection,
  rectangularSelection,
  crosshairCursor,
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldGutter,
  indentOnInput,
} from '@codemirror/language';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useSettings } from '../../context/SettingsContext';

interface CodeEditorProps {
  language: 'html' | 'css' | 'js';
  value: string;
  onChange: (value: string) => void;
}

const languageExtensions = {
  html: html(),
  css: css(),
  js: javascript(),
};

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { theme, fontSize, tabSize, wordWrap } = useSettings();

  useEffect(() => {
    if (!editorRef.current) return;

    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    const updateListener = EditorView.updateListener.of(update => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    // Base themes
    let baseTheme = oneDark;
    let themeOverrides = {
      '&': { height: '100%', fontSize: `${fontSize}px`, backgroundColor: '#0d0d0d' },
      '.cm-scroller': {
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        lineHeight: '1.7',
      },
      '.cm-gutters': {
        backgroundColor: '#0a0a0a',
        color: '#444',
        border: 'none',
        paddingRight: '8px',
      },
      '.cm-activeLineGutter': { backgroundColor: '#111', color: '#888' },
      '.cm-activeLine': { backgroundColor: '#0f0f0f' },
      '.cm-cursor': { borderLeftColor: '#6366f1' },
      '.cm-selectionBackground': { backgroundColor: '#1e3a5f !important' },
      '.cm-foldPlaceholder': { backgroundColor: '#1a1a1a', color: '#666', border: 'none' },
    };

    if (theme === 'oneLight') {
      baseTheme = EditorView.theme({}); // Empty theme for light mode
      themeOverrides = {
        '&': { height: '100%', fontSize: `${fontSize}px`, backgroundColor: '#fafafa' },
        '.cm-scroller': {
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          lineHeight: '1.7',
        },
        '.cm-gutters': {
          backgroundColor: '#f0f0f0',
          color: '#666',
          border: 'none',
          paddingRight: '8px',
        },
        '.cm-activeLineGutter': { backgroundColor: '#e0e0e0', color: '#333' },
        '.cm-activeLine': { backgroundColor: '#f0f0f0' },
        '.cm-cursor': { borderLeftColor: '#333' },
        '.cm-selectionBackground': { backgroundColor: '#add6ff !important' },
        '.cm-foldPlaceholder': { backgroundColor: '#e0e0e0', color: '#888', border: 'none' },
        // Light mode syntax colors
        '& .cm-keyword': { color: '#d73a49' },
        '& .cm-operator': { color: '#24292e' },
        '& .cm-variable': { color: '#24292e' },
        '& .cm-variable-2': { color: '#005cc5' },
        '& .cm-variable-3': { color: '#6f42c1' },
        '& .cm-builtin': { color: '#005cc5' },
        '& .cm-atom': { color: '#005cc5' },
        '& .cm-number': { color: '#005cc5' },
        '& .cm-string': { color: '#032f62' },
        '& .cm-string-2': { color: '#032f62' },
        '& .cm-comment': { color: '#6a737d', fontStyle: 'italic' },
        '& .cm-tag': { color: '#22863a' },
        '& .cm-bracket': { color: '#24292e' },
        '& .cm-attribute': { color: '#6f42c1' },
        '& .cm-hr': { color: '#6a737d' },
        '& .cm-link': { color: '#032f62' },
      };
    } else if (theme === 'vscodeDark') {
      baseTheme = oneDark;
      themeOverrides = {
        '&': { height: '100%', fontSize: `${fontSize}px`, backgroundColor: '#1e1e1e' },
        '.cm-scroller': {
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          lineHeight: '1.7',
        },
        '.cm-gutters': {
          backgroundColor: '#1e1e1e',
          color: '#858585',
          border: 'none',
          paddingRight: '8px',
        },
        '.cm-activeLineGutter': { backgroundColor: '#2d2d2d', color: '#fff' },
        '.cm-activeLine': { backgroundColor: '#2d2d2d' },
        '.cm-cursor': { borderLeftColor: '#fff' },
        '.cm-selectionBackground': { backgroundColor: '#264f78 !important' },
        '.cm-foldPlaceholder': { backgroundColor: '#2d2d2d', color: '#858585', border: 'none' },
      };
    } else if (theme === 'solarizedDark') {
      baseTheme = oneDark;
      themeOverrides = {
        '&': { height: '100%', fontSize: `${fontSize}px`, backgroundColor: '#002b36' },
        '.cm-scroller': {
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          lineHeight: '1.7',
        },
        '.cm-gutters': {
          backgroundColor: '#002b36',
          color: '#586e75',
          border: 'none',
          paddingRight: '8px',
        },
        '.cm-activeLineGutter': { backgroundColor: '#073642', color: '#839496' },
        '.cm-activeLine': { backgroundColor: '#073642' },
        '.cm-cursor': { borderLeftColor: '#839496' },
        '.cm-selectionBackground': { backgroundColor: '#586e75 !important' },
        '.cm-foldPlaceholder': { backgroundColor: '#073642', color: '#586e75', border: 'none' },
      };
    }

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightSpecialChars(),
        drawSelection(),
        rectangularSelection(),
        crosshairCursor(),
        bracketMatching(),
        foldGutter(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        baseTheme,
        languageExtensions[language],
        updateListener,
        autocompletion(),
        closeBrackets(),
        EditorView.theme(themeOverrides),
        wordWrap ? EditorView.lineWrapping : [],
      ],
    });

    const view = new EditorView({ state, parent: editorRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [language, theme, fontSize, tabSize, wordWrap]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentDoc = view.state.doc.toString();
    if (value !== currentDoc) {
      view.dispatch({ changes: { from: 0, to: currentDoc.length, insert: value } });
    }
  }, [value]);

  return <div ref={editorRef} className="h-full overflow-hidden" />;
}
