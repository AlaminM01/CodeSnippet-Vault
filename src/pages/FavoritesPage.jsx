import React, { useState, useMemo } from 'react';
import { FiStar, FiGrid, FiList, FiCode } from 'react-icons/fi';
import { SnippetCard } from '../components/snippets/SnippetCard';
import { SearchBar } from '../components/common/SearchBar';
import { FilterBar } from '../components/snippets/FilterBar';
import { EmptyState } from '../components/common/EmptyState';
import { filterSnippets } from '../utils/search';

/**
 * Dedicated Favorites Page View
 */
export function FavoritesPage({
  snippets = [],
  onSelectSnippet,
  onEditSnippet,
  onDeleteSnippet,
  onDuplicateSnippet,
  onToggleFavorite,
  onCopyCode,
  onNavigateToAll,
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter only favorites
  const favoriteSnippets = useMemo(() => {
    return snippets.filter((s) => s.isFavorite);
  }, [snippets]);

  // Combined search, language filter & sort
  const filteredFavorites = useMemo(() => {
    let result = favoriteSnippets;
    if (selectedLanguage !== 'all') {
      result = result.filter((s) => s.language === selectedLanguage);
    }
    result = filterSnippets(result, searchQuery);

    return [...result].sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (sortBy === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      if (sortBy === 'title-asc') return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'title-desc') return (b.title || '').localeCompare(a.title || '');
      return 0;
    });
  }, [favoriteSnippets, selectedLanguage, searchQuery, sortBy]);

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center text-sm border border-amber-500/20">
              <FiStar className="fill-amber-400" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-dark-text light:text-light-text">
              Favorite Snippets
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {filteredFavorites.length} of {favoriteSnippets.length}
            </span>
          </div>
          <p className="text-xs text-dark-subtle light:text-light-subtle">
            Quick access to your curated repository of starred snippets
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>

      {favoriteSnippets.length > 0 && (
        <div className="space-y-3">
          <div className="max-w-xl">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Search favorites by title, code, tag..."
            />
          </div>

          <FilterBar
            snippets={favoriteSnippets}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            sortBy={sortBy}
            onChangeSort={setSortBy}
          />
        </div>
      )}

      {/* Snippet List or Empty State */}
      {favoriteSnippets.length === 0 ? (
        <EmptyState
          icon={FiStar}
          title="No favorites starred yet"
          description="Click the star icon on any snippet card or detail view to pin it here for rapid access."
          actionLabel="Browse All Snippets"
          onAction={onNavigateToAll}
        />
      ) : filteredFavorites.length === 0 ? (
        <EmptyState
          icon={FiCode}
          title="No matching favorites found"
          description={`No favorite snippets matched "${searchQuery}".`}
          actionLabel="Reset Search"
          onAction={() => {
            setSearchQuery('');
            setSelectedLanguage('all');
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
          {filteredFavorites.map((snippet) => (
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
