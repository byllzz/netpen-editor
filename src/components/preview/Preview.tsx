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
    /* Reset default body margin */
    html, body { margin: 0; padding: 0; }
    /* Hide scrollbars visually */
    html { scrollbar-width: none; -ms-overflow-style: none; }
    html::-webkit-scrollbar { display: none; }
    ${css}
  </style>
  <script>
    // Hidden helper to calculate the background color and send it to React
    function __syncBgColor() {
      try {
        const bodyBg = getComputedStyle(document.body).backgroundColor;
        const htmlBg = getComputedStyle(document.documentElement).backgroundColor;

        let color = '#ffffff'; // Default browser background

        // Browsers report transparent backgrounds as 'rgba(0, 0, 0, 0)'
        if (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)') {
          color = bodyBg;
        } else if (htmlBg && htmlBg !== 'rgba(0, 0, 0, 0)') {
          color = htmlBg;
        }

        window.parent.postMessage({ type: 'PREVIEW_BG_COLOR', color: color }, '*');
      } catch (e) {}
    }

    window.addEventListener('DOMContentLoaded', __syncBgColor);
    window.addEventListener('load', __syncBgColor);

    // Catch late CSS rendering
    setTimeout(__syncBgColor, 50);
    setTimeout(__syncBgColor, 150);
  </script>
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
      className="w-full h-full border-0 bg-transparent absolute top-0 left-0"
      sandbox="allow-scripts allow-modals allow-same-origin"
    />
  );
}
