import React, { useState, useMemo } from 'react';
import { FiGrid, FiList, FiPlus, FiCode } from 'react-icons/fi';
import { SnippetCard } from '../components/snippets/SnippetCard';
import { FilterBar } from '../components/snippets/FilterBar';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { SearchBar } from '../components/common/SearchBar';
import { filterSnippets } from '../utils/search';

/**
 * Snippets Listing Page View with Real-time Search, Language Filtering & Sorting
 */
export function SnippetsPage({
  snippets = [],
  selectedLanguage = 'all',
  onSelectLanguage,
  onSelectSnippet,
  onEditSnippet,
  onDeleteSnippet,
  onDuplicateSnippet,
  onToggleFavorite,
  onCreateSnippet,
  onCopyCode,
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState(selectedLanguage);
  const [sortBy, setSortBy] = useState('newest');

  // Sync external selectedLanguage if changed
  React.useEffect(() => {
    setCurrentLang(selectedLanguage);
  }, [selectedLanguage]);

  // Combined Filtering & Sorting
  const filteredAndSortedSnippets = useMemo(() => {
    // 1. Language Filter
    let result = snippets;
    if (currentLang !== 'all') {
      result = result.filter((s) => s.language === currentLang);
    }

    // 2. Real-time Search Filter
    result = filterSnippets(result, searchQuery);

    // 3. Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      }
      if (sortBy === 'lines-desc') {
        const linesA = (a.code || '').split('\n').length;
        const linesB = (b.code || '').split('\n').length;
        return linesB - linesA;
      }
      return 0;
    });
  }, [snippets, currentLang, searchQuery, sortBy]);

  return (
    <div className="space-y-5">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-dark-text light:text-light-text">
              All Code Snippets
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {filteredAndSortedSnippets.length} of {snippets.length}
            </span>
          </div>
          <p className="text-xs text-dark-subtle light:text-light-subtle">
            Browse, search, filter by language, manage, and duplicate snippets
          </p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex items-center gap-3">
          {/* Grid vs List View Mode Toggle */}
          <div className="flex items-center p-1 rounded-lg bg-dark-card dark:bg-dark-card light:bg-slate-100 border border-dark-border dark:border-dark-border light:border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-dark-subtle hover:text-dark-text light:text-slate-600'
              }`}
              title="Grid View"
            >
              <FiGrid className="text-sm" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-dark-subtle hover:text-dark-text light:text-slate-600'
              }`}
              title="List View"
            >
              <FiList className="text-sm" />
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={FiPlus}
            onClick={onCreateSnippet}
            className="shadow-glow-sm"
          >
            New Snippet
          </Button>
        </div>
      </div>

      {/* Search and Language Filter Controls */}
      <div className="space-y-3">
        <div className="max-w-xl">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Search by title, code, tag, or language..."
          />
        </div>

        <FilterBar
          snippets={snippets}
          selectedLanguage={currentLang}
          onSelectLanguage={(lang) => {
            setCurrentLang(lang);
            if (onSelectLanguage) onSelectLanguage(lang);
          }}
          sortBy={sortBy}
          onChangeSort={setSortBy}
        />
      </div>

      {/* Snippet Grid / List Content */}
      {filteredAndSortedSnippets.length === 0 ? (
        <EmptyState
          icon={FiCode}
          title={searchQuery || currentLang !== 'all' ? 'No matching snippets' : 'No snippets saved yet'}
          description={
            searchQuery || currentLang !== 'all'
              ? `No snippets found matching your current search query or language filter (${currentLang}). Try resetting your filters.`
              : 'Your snippet vault is currently empty. Start saving reusable code snippets today!'
          }
          actionLabel={searchQuery || currentLang !== 'all' ? 'Reset Filters' : 'Create First Snippet'}
          onAction={() => {
            if (searchQuery || currentLang !== 'all') {
              setSearchQuery('');
              setCurrentLang('all');
            } else {
              onCreateSnippet();
            }
          }}
        />
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-3'
          }
        >
          {filteredAndSortedSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              viewMode={viewMode}
              onSelect={onSelectSnippet}
              onEdit={onEditSnippet}
              onDelete={onDeleteSnippet}
              onDuplicate={onDuplicateSnippet}
              onToggleFavorite={onToggleFavorite}
              onCopy={onCopyCode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
