import React from 'react';
import { Card } from '../common/Card';
import { FiLayers, FiFileText, FiAward, FiHash } from 'react-icons/fi';

/**
 * Vault Insights Card: Code Metrics & Depth
 */
export function VaultInsights({ snippets = [] }) {
  let totalLines = 0;
  let totalChars = 0;
  const tagCounts = {};

  snippets.forEach((s) => {
    const lines = (s.code || '').split('\n').length;
    totalLines += lines;
    totalChars += (s.code || '').length;

    (s.tags || []).forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const avgLines = snippets.length > 0 ? Math.round(totalLines / snippets.length) : 0;
  const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-sm">
            <FiLayers />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-dark-text light:text-light-text">
              Vault Insights & Volume
            </h3>
            <p className="text-xs text-dark-subtle light:text-light-subtle">
              Deep code analytics across your local library
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-dark-surface/50 dark:bg-dark-surface/50 light:bg-slate-50 border border-dark-border/60 dark:border-dark-border/60 light:border-slate-200">
          <span className="text-dark-subtle block text-[11px] mb-1">Lines of Code</span>
          <span className="text-lg font-bold font-mono text-brand-400">{totalLines.toLocaleString()}</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-surface/50 dark:bg-dark-surface/50 light:bg-slate-50 border border-dark-border/60 dark:border-dark-border/60 light:border-slate-200">
          <span className="text-dark-subtle block text-[11px] mb-1">Total Characters</span>
          <span className="text-lg font-bold font-mono text-emerald-400">{totalChars.toLocaleString()}</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-surface/50 dark:bg-dark-surface/50 light:bg-slate-50 border border-dark-border/60 dark:border-dark-border/60 light:border-slate-200">
          <span className="text-dark-subtle block text-[11px] mb-1">Avg Snippet Size</span>
          <span className="text-lg font-bold font-mono text-amber-400">{avgLines} lines</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-surface/50 dark:bg-dark-surface/50 light:bg-slate-50 border border-dark-border/60 dark:border-dark-border/60 light:border-slate-200">
          <span className="text-dark-subtle block text-[11px] mb-1">Dominant Tag</span>
          <span className="text-lg font-bold font-mono text-purple-400 truncate block">#{topTag}</span>
        </div>
      </div>
    </Card>
  );
}
