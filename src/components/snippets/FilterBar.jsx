import React from 'react';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

/**
 * Filter Bar component for instant language selection & sorting
 */
export function FilterBar({
  snippets = [],
  selectedLanguage = 'all',
  onSelectLanguage,
  sortBy = 'newest',
  onChangeSort,
  showFavoriteToggle = false,
  onlyFavorites = false,
  onToggleOnlyFavorites,
  className = '',
}) {
  // Compute counts per language
  const languageCounts = snippets.reduce((acc, snippet) => {
    const lang = snippet.language || 'other';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  // Get active languages that have at least 1 snippet or are part of standard supported list
  const activeLanguages = SUPPORTED_LANGUAGES.filter(
    (lang) => languageCounts[lang.id] > 0 || ['javascript', 'typescript', 'python', 'react'].includes(lang.id)
  );

  return (
    <div className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 py-1 ${className}`}>
      {/* Horizontal Language Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none select-none">
        {/* All Pill */}
        <button
          type="button"
          onClick={() => onSelectLanguage('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 border ${
            selectedLanguage === 'all'
              ? 'bg-brand-500 text-white border-brand-400 shadow-sm'
              : 'bg-dark-card/80 text-dark-muted hover:text-dark-text border-dark-border light:bg-white light:text-slate-600 light:border-slate-200'
          }`}
        >
          <span>All</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
            selectedLanguage === 'all' ? 'bg-white/20 text-white' : 'bg-dark-border light:bg-slate-100 text-dark-subtle'
          }`}>
            {snippets.length}
          </span>
        </button>

        {/* Specific Languages */}
        {activeLanguages.map((lang) => {
          const isSelected = selectedLanguage === lang.id;
          const count = languageCounts[lang.id] || 0;

          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => onSelectLanguage(lang.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 border ${
                isSelected
                  ? 'bg-dark-card border-brand-500 text-brand-400 font-semibold shadow-sm'
                  : 'bg-dark-card/60 text-dark-muted hover:text-dark-text border-dark-border light:bg-white light:text-slate-600 light:border-slate-200'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span>{lang.name}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-brand-500/20 text-brand-400' : 'bg-dark-border light:bg-slate-100 text-dark-subtle'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sort By Dropdown */}
      {onChangeSort && (
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <span className="text-[11px] uppercase tracking-wider text-dark-subtle light:text-slate-500 font-semibold">
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value)}
            className="rounded-lg bg-dark-card dark:bg-dark-card light:bg-white border border-dark-border dark:border-dark-border light:border-slate-200 text-xs text-dark-text light:text-slate-700 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title (A - Z)</option>
            <option value="title-desc">Title (Z - A)</option>
            <option value="lines-desc">Most Lines</option>
          </select>
        </div>
      )}
    </div>
  );
}
