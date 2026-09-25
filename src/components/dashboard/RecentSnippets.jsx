import React, { useState } from 'react';
import { FiClock, FiArrowRight, FiCopy, FiCheck, FiCode } from 'react-icons/fi';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import { formatTimeAgo } from '../../utils/formatters';

/**
 * Recent Snippets Activity Feed
 */
export function RecentSnippets({
  snippets = [],
  onSelectSnippet,
  onNavigateToAll,
  onCopyCode,
}) {
  const [copiedId, setCopiedId] = useState(null);

  // Sort by newest first and take top 5
  const recent = [...snippets]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 5);

  const handleCopy = (e, snippet) => {
    e.stopPropagation();
    if (onCopyCode) {
      onCopyCode(snippet.code);
    } else {
      navigator.clipboard.writeText(snippet.code);
    }
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center text-sm">
            <FiClock />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-dark-text light:text-light-text">
              Recent Snippets
            </h3>
            <p className="text-xs text-dark-subtle light:text-light-subtle">
              Latest additions and updates in your repository
            </p>
          </div>
        </div>

        {snippets.length > 0 && (
          <button
            type="button"
            onClick={onNavigateToAll}
            className="text-xs font-medium text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors group"
          >
            <span>View All</span>
            <FiArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {recent.length === 0 ? (
        <div className="py-6 text-center text-xs text-dark-subtle">
          No snippets saved yet.
        </div>
      ) : (
        <div className="space-y-2">
          {recent.map((snippet) => {
            const langConfig = SUPPORTED_LANGUAGES.find((l) => l.id === snippet.language) || {
              name: snippet.language,
              color: '#94a3b8',
            };
            const isCopied = copiedId === snippet.id;

            return (
              <div
                key={snippet.id}
                onClick={() => onSelectSnippet(snippet)}
                className="group flex items-center justify-between p-2.5 rounded-lg border border-dark-border/60 dark:border-dark-border/60 light:border-slate-200 bg-dark-surface/50 dark:bg-dark-surface/50 light:bg-slate-50 hover:border-dark-borderLight hover:bg-dark-cardHover transition-all cursor-pointer text-xs"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-xs"
                    style={{
                      backgroundColor: `${langConfig.color}15`,
                      borderColor: `${langConfig.color}30`,
                      color: langConfig.color,
                    }}
                  >
                    <FiCode />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-dark-text light:text-slate-800 group-hover:text-brand-400 transition-colors truncate">
                      {snippet.title}
                    </h4>
                    <span className="text-[10px] text-dark-subtle light:text-slate-500 font-mono">
                      {formatTimeAgo(snippet.updatedAt || snippet.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-3 shrink-0">
                  <Badge size="xs" color={langConfig.color} dot>
                    {langConfig.name}
                  </Badge>

                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, snippet)}
                    className={`p-1.5 rounded-md border text-xs transition-colors ${
                      isCopied
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'text-dark-subtle hover:text-dark-text border-transparent hover:bg-white/5'
                    }`}
                    title="Copy code"
                  >
                    {isCopied ? <FiCheck className="text-xs" /> : <FiCopy className="text-xs" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
