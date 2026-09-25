import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX, FiCode, FiArrowRight, FiCornerDownLeft, FiStar } from 'react-icons/fi';
import { Badge } from './Badge';
import { filterSnippets } from '../../utils/search';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

/**
 * Modern Command Palette Search Modal
 * Inspired by Raycast & VS Code Quick Open (Ctrl+K / Ctrl+F)
 */
export function CommandPaletteModal({
  isOpen,
  onClose,
  snippets = [],
  onSelectSnippet,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = filterSnippets(snippets, query);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        onSelectSnippet(filtered[selectedIndex]);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, onSelectSnippet]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:pt-24 text-center">
        <div
          className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-dark-surface dark:bg-dark-surface light:bg-white border border-dark-border dark:border-dark-border light:border-light-border text-left align-middle shadow-2xl transition-all relative flex flex-col max-h-[75vh] animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border gap-3">
            <FiSearch className="text-lg text-brand-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search code snippets, functions, languages, tags..."
              className="w-full bg-transparent text-sm text-dark-text light:text-light-text placeholder:text-dark-subtle light:placeholder:text-slate-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-dark-subtle hover:text-dark-text"
              >
                <FiX className="text-sm" />
              </button>
            )}
            <kbd className="hidden sm:inline-block text-[10px] font-mono text-dark-subtle bg-dark-card dark:bg-dark-card light:bg-slate-100 px-1.5 py-0.5 rounded border border-dark-border light:border-slate-200">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-2 divide-y divide-dark-border/30 dark:divide-dark-border/30 light:divide-slate-100">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-dark-subtle light:text-slate-500">
                No matching snippets found for <span className="text-brand-400 font-mono">"{query}"</span>
              </div>
            ) : (
              filtered.map((snippet, idx) => {
                const isSelected = idx === selectedIndex;
                const langConfig = SUPPORTED_LANGUAGES.find((l) => l.id === snippet.language) || {
                  name: snippet.language,
                  color: '#94a3b8',
                };

                return (
                  <div
                    key={snippet.id}
                    onClick={() => {
                      onSelectSnippet(snippet);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-100 ${
                      isSelected
                        ? 'bg-brand-500/10 text-dark-text border border-brand-500/30'
                        : 'hover:bg-white/5 text-dark-muted border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          backgroundColor: `${langConfig.color}15`,
                          borderColor: `${langConfig.color}30`,
                          color: langConfig.color,
                        }}
                      >
                        <FiCode className="text-sm" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-dark-text light:text-light-text truncate">
                            {snippet.title}
                          </span>
                          {snippet.isFavorite && (
                            <FiStar className="text-xs fill-amber-400 text-amber-400 shrink-0" />
                          )}
                        </div>
                        {snippet.description && (
                          <p className="text-[11px] text-dark-subtle light:text-slate-500 truncate">
                            {snippet.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <Badge size="xs" color={langConfig.color} dot>
                        {langConfig.name}
                      </Badge>
                      {isSelected && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-brand-400 font-mono">
                          Open <FiCornerDownLeft className="text-[10px]" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Controls Hint */}
          <div className="px-4 py-2 bg-dark-bg/60 dark:bg-dark-bg/60 light:bg-slate-50 border-t border-dark-border/60 text-[11px] text-dark-subtle flex items-center justify-between font-mono">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
            </div>
            <span>{filtered.length} results</span>
          </div>
        </div>
      </div>
    </div>
  );
}
