import React from 'react';
import { Card } from '../common/Card';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import { FiPieChart, FiTrendingUp } from 'react-icons/fi';

/**
 * Language Distribution & Most Used Language Analytics Widget
 */
export function LanguageDistribution({
  snippets = [],
  onSelectLanguage,
}) {
  const total = snippets.length;

  // Aggregate counts per language
  const counts = snippets.reduce((acc, snippet) => {
    const lang = snippet.language || 'other';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  // Sort languages by count descending
  const distribution = Object.entries(counts)
    .map(([langId, count]) => {
      const config = SUPPORTED_LANGUAGES.find((l) => l.id === langId) || {
        name: langId.toUpperCase(),
        color: '#94a3b8',
      };
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      return {
        id: langId,
        name: config.name,
        color: config.color,
        count,
        percentage,
      };
    })
    .sort((a, b) => b.count - a.count);

  const topLanguage = distribution[0] || null;

  return (
    <Card className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-sm">
            <FiPieChart />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-dark-text light:text-light-text">
              Language Distribution
            </h3>
            <p className="text-xs text-dark-subtle light:text-light-subtle">
              Breakdown of programming languages in your vault
            </p>
          </div>
        </div>

        {topLanguage && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-surface dark:bg-dark-surface light:bg-slate-100 border border-dark-border light:border-slate-200 text-xs">
            <FiTrendingUp className="text-emerald-400" />
            <span className="text-dark-subtle">Most Used:</span>
            <span className="font-semibold text-dark-text light:text-slate-800">{topLanguage.name}</span>
          </div>
        )}
      </div>

      {total === 0 ? (
        <div className="py-6 text-center text-xs text-dark-subtle">
          No snippets to analyze yet.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Multi-segment Progress Bar */}
          <div className="h-3 w-full bg-dark-surface dark:bg-dark-surface light:bg-slate-200 rounded-full flex overflow-hidden p-0.5">
            {distribution.map((item) => (
              <div
                key={item.id}
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
                className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 relative group"
                title={`${item.name}: ${item.count} snippets (${item.percentage}%)`}
              />
            ))}
          </div>

          {/* Detailed Language Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-1">
            {distribution.slice(0, 8).map((item) => (
              <div
                key={item.id}
                onClick={onSelectLanguage ? () => onSelectLanguage(item.id) : undefined}
                className={`p-2 rounded-lg bg-dark-surface/50 dark:bg-dark-surface/50 light:bg-slate-50 border border-dark-border/60 dark:border-dark-border/60 light:border-slate-200 flex items-center justify-between text-xs transition-colors ${
                  onSelectLanguage ? 'cursor-pointer hover:border-brand-500/40 hover:bg-dark-cardHover' : ''
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-dark-text light:text-slate-800 font-medium truncate">
                    {item.name}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-dark-subtle light:text-slate-500 ml-2 shrink-0">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
