import { useRef, useEffect } from 'react';

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

export function Preview({ html, css, js }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generateDoc = (): string => {
    return `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Reset default body margin so shrinking height doesn't cause overflow */
    html, body {
      margin: 0;
      padding: 0;
    }

    /* Hide scrollbars visually while still allowing scroll if content needs it */
    html {
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */
    }
    html::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }

    ${css}
  </style>
</head>
<body>
  ${html}
  <script>${js}<\/script>
</body>
</html>`;
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = generateDoc();
    const blob = new Blob([doc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    iframe.src = url;

    return () => URL.revokeObjectURL(url);
  }, [html, css, js]);

  return (
    <iframe
      ref={iframeRef}
      title="preview"
      className="w-full h-full border-0 bg-white"
      sandbox="allow-scripts allow-modals"
    />
  );
}
