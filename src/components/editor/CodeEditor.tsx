import { useRef, useEffect } from 'react';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightSpecialChars,
  drawSelection,
  rectangularSelection,
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
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeEditorProps {
  language: 'html' | 'css' | 'js';
  value: string;
  onChange: (value: string) => void;
}

function getLanguageExtension(language: 'html' | 'css' | 'js') {
  switch (language) {
    case 'html':
      return html();
    case 'css':
      return css();
    case 'js':
      return javascript();
  }
}

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const updateListener = EditorView.updateListener.of(update => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightSpecialChars(),
        drawSelection(),
        rectangularSelection(),
        bracketMatching(),
        foldGutter(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        getLanguageExtension(language),
        oneDark,
        updateListener,
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '13px',
            backgroundColor: '#0d0d0d',
          },
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
          '.cm-activeLineGutter': {
            backgroundColor: '#111',
            color: '#888',
          },
          '.cm-activeLine': {
            backgroundColor: '#0f0f0f',
          },
          '.cm-cursor': {
            borderLeftColor: '#6366f1',
          },
          '.cm-selectionBackground': {
            backgroundColor: '#1e3a5f !important',
          },
          '.cm-foldPlaceholder': {
            backgroundColor: '#1a1a1a',
            color: '#666',
            border: 'none',
          },
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [language]);

  // Update value externally (e.g., on reset)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const currentDoc = view.state.doc.toString();
    if (value !== currentDoc) {
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
      });
    }
  }, [value]);

  return <div ref={editorRef} className="h-full overflow-hidden" />;
}
