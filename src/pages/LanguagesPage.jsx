import React from 'react';
import { FiCode, FiArrowRight, FiPlus } from 'react-icons/fi';
import { SUPPORTED_LANGUAGES } from '../constants/languages';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

/**
 * Dedicated Languages Overview Page
 */
export function LanguagesPage({
  snippets = [],
  onSelectLanguage,
  onCreateSnippetInLanguage,
}) {
  // Aggregate snippet counts per language
  const languageStats = SUPPORTED_LANGUAGES.map((lang) => {
    const matching = snippets.filter((s) => s.language === lang.id);
    return {
      ...lang,
      count: matching.length,
      percentage: snippets.length > 0 ? Math.round((matching.length / snippets.length) * 100) : 0,
    };
  }).filter((lang) => lang.count > 0 || ['javascript', 'typescript', 'python', 'react', 'sql', 'cpp', 'java'].includes(lang.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-dark-text light:text-light-text">
            Supported Languages & Stacks
          </h2>
          <p className="text-xs text-dark-subtle light:text-light-subtle">
            Explore your codebase organized by programming languages and frameworks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {languageStats.map((lang) => (
          <Card
            key={lang.id}
            hoverEffect={true}
            onClick={() => onSelectLanguage(lang.id)}
            className="flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  color={lang.color}
                  bgColor={lang.bg}
                  borderColor={lang.border}
                  size="sm"
                  dot
                >
                  .{lang.ext}
                </Badge>
                <span className="text-xs font-mono font-bold text-dark-subtle group-hover:text-dark-text transition-colors">
                  {lang.count} {lang.count === 1 ? 'snippet' : 'snippets'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-dark-text light:text-light-text group-hover:text-brand-400 transition-colors">
                  {lang.name}
                </h3>
                <div className="mt-2 w-full bg-dark-surface dark:bg-dark-surface light:bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(lang.percentage, 4)}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-dark-border/40 light:border-slate-100 flex items-center justify-between text-xs text-dark-subtle group-hover:text-brand-400">
              <span className="font-medium flex items-center gap-1">
                View snippets <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-mono text-[11px] text-dark-subtle">{lang.percentage}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
