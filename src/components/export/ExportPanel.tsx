import { useState } from 'react';
import { X, Download, FileCode, FileText, Archive, Code2 } from 'lucide-react';
import { Preview } from '../preview/Preview';
import { Button } from '../ui/Button'; // <--- FIXED: Added import

interface ExportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  html: string;
  css: string;
  js: string;
  projectName: string;
}

type ExportFormat = 'separate' | 'combined';

export function ExportPanel({ isOpen, onClose, html, css, js, projectName }: ExportPanelProps) {
  const [format, setFormat] = useState<ExportFormat>('separate');
  const [includeComments, setIncludeComments] = useState(true);
  const [minify, setMinify] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (format === 'separate') {
      // Download HTML
      const htmlBlob = new Blob([html], { type: 'text/html' });
      const htmlUrl = URL.createObjectURL(htmlBlob);
      const a = document.createElement('a');
      a.href = htmlUrl;
      a.download = `${projectName}.html`;
      a.click();
      URL.revokeObjectURL(htmlUrl);

      // Download CSS
      const cssBlob = new Blob([css], { type: 'text/css' });
      const cssUrl = URL.createObjectURL(cssBlob);
      const a2 = document.createElement('a');
      a2.href = cssUrl;
      a2.download = `${projectName}.css`;
      a2.click();
      URL.revokeObjectURL(cssUrl);

      // Download JS
      const jsBlob = new Blob([js], { type: 'application/javascript' });
      const jsUrl = URL.createObjectURL(jsBlob);
      const a3 = document.createElement('a');
      a3.href = jsUrl;
      a3.download = `${projectName}.js`;
      a3.click();
      URL.revokeObjectURL(jsUrl);
    } else {
      // Combined HTML file
      const combinedDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>${js}<\/script>
</body>
</html>`;

      const combinedBlob = new Blob([combinedDoc], { type: 'text/html' });
      const combinedUrl = URL.createObjectURL(combinedBlob);
      const a = document.createElement('a');
      a.href = combinedUrl;
      a.download = `${projectName}.html`;
      a.click();
      URL.revokeObjectURL(combinedUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[90vh] bg-[#1C1C1C] rounded-xl border border-[#333] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333] bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Export Project</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#333] transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body - Split Layout */}
        <div className="flex-1 flex min-h-0">
          {/* Left Side - Controls */}
          <div className="w-[320px] min-w-[280px] border-r border-[#333] p-6 overflow-y-auto flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                <FileCode className="w-4 h-4" /> Export Options
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
                  <input
                    type="radio"
                    name="format"
                    checked={format === 'separate'}
                    onChange={() => setFormat('separate')}
                    className="w-4 h-4 accent-indigo-500"
                  />
                  <span>Separate files (HTML, CSS, JS)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
                  <input
                    type="radio"
                    name="format"
                    checked={format === 'combined'}
                    onChange={() => setFormat('combined')}
                    className="w-4 h-4 accent-indigo-500"
                  />
                  <span>Combined single HTML file</span>
                </label>
              </div>
            </div>

            <div className="border-t border-[#333] pt-6">
              <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                <Archive className="w-4 h-4" /> Advanced
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={includeComments}
                    onChange={() => setIncludeComments(!includeComments)}
                    className="w-4 h-4 accent-indigo-500 rounded"
                  />
                  <span>Include comments</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={minify}
                    onChange={() => setMinify(!minify)}
                    className="w-4 h-4 accent-indigo-500 rounded"
                  />
                  <span>Minify code</span>
                </label>
              </div>
            </div>

            <div className="border-t border-[#333] pt-6 mt-auto">
              <Button
                onClick={handleDownload}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download {format === 'separate' ? 'Files' : 'File'}
              </Button>
              <p className="text-[10px] text-gray-500 text-center mt-2">
                Files will be saved as{' '}
                <span className="text-gray-400 font-mono">{projectName}</span>.*
              </p>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="flex-1 bg-white relative overflow-hidden">
            {/* FIXED: Removed allow-same-origin to stop browser warning */}
            <Preview html={html} css={css} js={js} />
          </div>
        </div>
      </div>
    </div>
  );
}
