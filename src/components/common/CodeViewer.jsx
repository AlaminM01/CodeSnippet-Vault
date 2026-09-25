import React, { useMemo } from 'react';
import Prism from 'prismjs';

// Import essential Prism language grammars
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';

// Language identifier mapping for Prism
const PRISM_LANG_MAP = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  react: 'jsx',
  sql: 'sql',
  css: 'css',
  html: 'html',
  cpp: 'cpp',
  java: 'java',
  nodejs: 'javascript',
};

/**
 * Modern High-Performance Code Viewer with line numbers & syntax styling
 */
export function CodeViewer({
  code = '',
  language = 'javascript',
  maxLines = null,
  showLineNumbers = true,
  className = '',
}) {
  const prismLang = PRISM_LANG_MAP[language.toLowerCase()] || 'javascript';

  const highlightedHtml = useMemo(() => {
    let targetCode = code;
    if (maxLines) {
      const lines = code.split('\n');
      if (lines.length > maxLines) {
        targetCode = lines.slice(0, maxLines).join('\n') + '\n// ... ' + (lines.length - maxLines) + ' more lines';
      }
    }

    try {
      const grammar = Prism.languages[prismLang] || Prism.languages.javascript;
      return Prism.highlight(targetCode, grammar, prismLang);
    } catch (e) {
      // Fallback to plain text escaping
      return targetCode
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  }, [code, language, maxLines, prismLang]);

  const lines = useMemo(() => {
    let targetCode = code;
    if (maxLines) {
      const lineArr = code.split('\n');
      if (lineArr.length > maxLines) {
        targetCode = lineArr.slice(0, maxLines).join('\n') + '\n...';
      }
    }
    return targetCode.split('\n');
  }, [code, maxLines]);

  return (
    <div className={`overflow-x-auto text-xs font-mono select-text ${className}`}>
      <div className="flex">
        {showLineNumbers && (
          <div className="py-2.5 pl-3 pr-2 select-none text-dark-subtle/50 light:text-slate-400 text-right font-mono text-[11px] leading-relaxed border-r border-dark-border/40 light:border-slate-200">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <pre className="py-2.5 px-3 flex-1 overflow-x-auto font-mono text-xs leading-relaxed text-dark-text light:text-slate-900 bg-transparent m-0">
          <code
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            className={`language-${prismLang}`}
          />
        </pre>
      </div>
    </div>
  );
}
