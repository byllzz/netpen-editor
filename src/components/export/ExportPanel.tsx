import { useState } from 'react';
import { X, Download, FileCode, FileText, Archive, Code2, FileJson } from 'lucide-react';
import { Preview } from '../preview/Preview';
import { Button } from '../ui/Button';
import JSZip from 'jszip'; // <--- Added ZIP library
import { BiSolidFileCss } from 'react-icons/bi';
interface ExportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  html: string;
  css: string;
  js: string;
  projectName: string;
}

export function ExportPanel({ isOpen, onClose, html, css, js, projectName }: ExportPanelProps) {
  const [includeComments, setIncludeComments] = useState(true);
  const [minify, setMinify] = useState(false);

  if (!isOpen) return null;

  // Helper to trigger a file download
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Individual downloads
  const downloadHtml = () => downloadFile(html, `${projectName}.html`, 'text/html');
  const downloadCss = () => downloadFile(css, `${projectName}.css`, 'text/css');
  const downloadJs = () => downloadFile(js, `${projectName}.js`, 'application/javascript');

  // Download combined single HTML file
  const downloadCombined = () => {
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
    downloadFile(combinedDoc, `${projectName}.html`, 'text/html');
  };

  // Download all as ZIP
  const downloadZip = async () => {
    const zip = new JSZip();
    zip.file(`${projectName}.html`, html);
    zip.file(`${projectName}.css`, css);
    zip.file(`${projectName}.js`, js);

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}.zip`;
    a.click();
    URL.revokeObjectURL(url);
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
          {/* Left Side - File List & Controls */}
          <div className="w-[340px] min-w-[280px] border-r border-[#333] p-6 overflow-y-auto flex flex-col gap-6">
            {/* File List Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                <FileCode className="w-4 h-4" /> Project Files
              </h3>

              <div className="space-y-2">
                {/* HTML */}
                <div className="flex items-center justify-between bg-[#0a0a0a] p-3 rounded-md border border-[#333] group hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{projectName}.html</p>
                      <p className="text-[10px] text-gray-500">{html.length} characters</p>
                    </div>
                  </div>
                  <button
                    onClick={downloadHtml}
                    className="p-1.5 rounded-md hover:bg-[#333] transition-colors text-gray-400 hover:text-white cursor-pointer"
                    title="Download HTML"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* CSS */}
                <div className="flex items-center justify-between bg-[#0a0a0a] p-3 rounded-md border border-[#333] group hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                      <BiSolidFileCss className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{projectName}.css</p>
                      <p className="text-[10px] text-gray-500">{css.length} characters</p>
                    </div>
                  </div>
                  <button
                    onClick={downloadCss}
                    className="p-1.5 rounded-md hover:bg-[#333] transition-colors text-gray-400 hover:text-white cursor-pointer"
                    title="Download CSS"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* JS */}
                <div className="flex items-center justify-between bg-[#0a0a0a] p-3 rounded-md border border-[#333] group hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-yellow-500/20 flex items-center justify-center">
                      <FileJson className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{projectName}.js</p>
                      <p className="text-[10px] text-gray-500">{js.length} characters</p>
                    </div>
                  </div>
                  <button
                    onClick={downloadJs}
                    className="p-1.5 rounded-md hover:bg-[#333] transition-colors text-gray-400 hover:text-white cursor-pointer"
                    title="Download JS"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bulk Download Buttons */}
            <div className="border-t border-[#333] pt-6 flex flex-col gap-3">
              <Button
                onClick={downloadZip}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Archive className="w-4 h-4" />
                Download All as ZIP
              </Button>

              <Button
                onClick={downloadCombined}
                className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white font-medium py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors border border-[#444]"
              >
                <FileCode className="w-4 h-4" />
                Download Combined HTML
              </Button>
            </div>

            {/* Advanced Options (Collapsed for cleaner UI) */}
            <div className="border-t border-[#333] pt-4">
              <details className="text-sm text-gray-400 cursor-pointer group">
                <summary className="flex items-center gap-2 hover:text-white transition-colors">
                  <span>Advanced Options</span>
                </summary>
                <div className="mt-3 space-y-2 pl-1">
                  <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-400 hover:text-gray-300 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeComments}
                      onChange={() => setIncludeComments(!includeComments)}
                      className="w-4 h-4 accent-indigo-500 rounded"
                    />
                    <span>Include comments</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-400 hover:text-gray-300 transition-colors">
                    <input
                      type="checkbox"
                      checked={minify}
                      onChange={() => setMinify(!minify)}
                      className="w-4 h-4 accent-indigo-500 rounded"
                    />
                    <span>Minify code</span>
                  </label>
                </div>
              </details>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="flex-1 bg-white relative overflow-hidden">
            <Preview html={html} css={css} js={js} />
          </div>
        </div>
      </div>
    </div>
  );
}
