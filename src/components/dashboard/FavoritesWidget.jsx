import React, { useState } from 'react';
import { FiStar, FiArrowRight, FiCopy, FiCheck, FiCode } from 'react-icons/fi';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

/**
 * Favorites Widget for Dashboard
 * Quick access to starred snippets
 */
export function FavoritesWidget({
  favorites = [],
  onSelectSnippet,
  onNavigateToFavorites,
  onCopyCode,
}) {
  const [copiedId, setCopiedId] = useState(null);

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

  const previewFavorites = favorites.slice(0, 4);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-sm">
            <FiStar className="fill-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-dark-text light:text-light-text flex items-center gap-2">
              <span>Pinned Favorites</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {favorites.length}
              </span>
            </h3>
            <p className="text-xs text-dark-subtle light:text-light-subtle">
              Your most frequently used code snippets
            </p>
          </div>
        </div>

        {favorites.length > 0 && (
          <button
            type="button"
            onClick={onNavigateToFavorites}
            className="text-xs font-medium text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors group"
          >
            <span>View All</span>
            <FiArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="py-8 text-center text-xs text-dark-subtle light:text-slate-500">
          <FiStar className="mx-auto text-2xl text-dark-subtle/60 mb-2" />
          <p>No favorites starred yet.</p>
          <p className="text-[11px] text-dark-subtle/80 mt-1">
            Star snippets in your vault for immediate dashboard access.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {previewFavorites.map((snippet) => {
            const langConfig = SUPPORTED_LANGUAGES.find(
              (l) => l.id === snippet.language
            ) || { name: snippet.language, color: '#94a3b8' };
            const isCopied = copiedId === snippet.id;

            return (
              <div
                key={snippet.id}
                onClick={() => onSelectSnippet(snippet)}
                className="group p-3 rounded-lg border border-dark-border dark:border-dark-border light:border-light-border bg-dark-surface/60 dark:bg-dark-surface/60 light:bg-slate-50 hover:border-dark-borderLight hover:bg-dark-cardHover transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      color={langConfig.color}
                      size="xs"
                      dot
                    >
                      {langConfig.name}
                    </Badge>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(e, snippet)}
                      className={`p-1 rounded text-xs transition-colors ${
                        isCopied
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-dark-subtle hover:text-dark-text'
                      }`}
                      title="Copy code"
                    >
                      {isCopied ? <FiCheck className="text-xs" /> : <FiCopy className="text-xs" />}
                    </button>
                  </div>
                  <h4 className="text-xs font-semibold text-dark-text light:text-light-text group-hover:text-brand-400 transition-colors line-clamp-1">
                    {snippet.title}
                  </h4>
                  {snippet.description && (
                    <p className="text-[11px] text-dark-subtle light:text-slate-500 line-clamp-1">
                      {snippet.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 mt-2 border-t border-dark-border/40 light:border-slate-200/60 flex items-center justify-between text-[10px] text-dark-subtle font-mono">
                  <span>{(snippet.code || '').split('\n').length} lines</span>
                  <span className="text-brand-400 group-hover:underline">Inspect →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
