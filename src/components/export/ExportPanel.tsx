import { useState } from 'react';
import { X, Download, FileCode, Archive, Code2 } from 'lucide-react';
import { Preview } from '../preview/Preview';
import { Button } from '../ui/Button';
import JSZip from 'jszip';
import { BiSolidFileCss } from 'react-icons/bi';
import { BiSolidFileHtml } from 'react-icons/bi';
import { PiFileJsDuotone } from 'react-icons/pi';

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

  // ---------- HELPER: Minify Code ----------
  const minifyCode = (code: string) => {
    if (!minify) return code; // Skip if minify is off

    return code
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\/\/.*$/gm, '') // Remove single-line comments
      .replace(/\s+/g, ' ') // Collapse multiple spaces/newlines
      .replace(/\s*([{}():;,])\s*/g, '$1') // Remove spaces around punctuation
      .trim();
  };

  // ---------- HELPER: Handle Comments ----------
  const processComments = (code: string) => {
    if (includeComments) return code;
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\/\/.*$/gm, ''); // Remove single-line comments
  };

  // ---------- HELPER: Process Final Code ----------
  const processCode = (code: string) => {
    let result = processComments(code);
    result = minifyCode(result);
    return result;
  };

  // ---------- HELPER: Download File ----------
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- Individual Downloads ----------
  const downloadHtml = () => downloadFile(processCode(html), `${projectName}.html`, 'text/html');
  const downloadCss = () => downloadFile(processCode(css), `${projectName}.css`, 'text/css');
  const downloadJs = () =>
    downloadFile(processCode(js), `${projectName}.js`, 'application/javascript');

  // ---------- Download Combined HTML ----------
  const downloadCombined = () => {
    const combinedDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <style>
    ${processCode(css)}
  </style>
</head>
<body>
  ${processCode(html)}
  <script>${processCode(js)}<\/script>
</body>
</html>`;
    downloadFile(combinedDoc, `${projectName}.html`, 'text/html');
  };

  // ---------- Download All as ZIP ----------
  const downloadZip = async () => {
    const zip = new JSZip();
    zip.file(`${projectName}.html`, processCode(html));
    zip.file(`${projectName}.css`, processCode(css));
    zip.file(`${projectName}.js`, processCode(js));

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
                      <BiSolidFileHtml className="w-4 h-4 text-orange-400" />
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
                      <PiFileJsDuotone className="w-4 h-4 text-yellow-400" />
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

            {/* Advanced Options - ALWAYS VISIBLE */}
            <div className="border-t border-[#333] pt-4 space-y-3">
              <h3 className="text-sm font-bold text-gray-300">Advanced Options</h3>

              <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={includeComments}
                  onChange={() => setIncludeComments(!includeComments)}
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <span>Include comments</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={minify}
                  onChange={() => setMinify(!minify)}
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <span>Minify code</span>
              </label>
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
