import React from 'react';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { QuickActions } from '../components/dashboard/QuickActions';
import { FavoritesWidget } from '../components/dashboard/FavoritesWidget';
import { Button } from '../components/common';
import { FiPlus, FiZap } from 'react-icons/fi';

/**
 * Dashboard Page View with Stats, Quick Actions, and Favorites Widget
 */
export function DashboardPage({
  snippets = [],
  onNavigate,
  onCreateSnippet,
  onSelectSnippet,
  onCopyCode,
  onExportData,
  onImportClick,
}) {
  const totalSnippets = snippets.length;
  const favorites = snippets.filter((s) => s.isFavorite);
  const favoritesCount = favorites.length;

  const uniqueLanguages = new Set(snippets.map((s) => s.language)).size;
  const allTags = new Set(snippets.flatMap((s) => s.tags || [])).size;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-brand-950/40 via-dark-card to-dark-card border border-brand-500/20 rounded-xl p-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
              {currentDate}
            </span>
            <span className="text-xs text-dark-subtle light:text-light-subtle flex items-center gap-1">
              <FiZap className="text-amber-400 text-xs" /> Ready to build
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-dark-text light:text-light-text">
            {getGreeting()}, Developer!
          </h2>
          <p className="text-xs text-dark-muted light:text-light-muted">
            Here is what is currently stored in your personal offline code vault.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            icon={FiPlus}
            onClick={onCreateSnippet}
            className="shadow-glow-sm"
          >
            Create Snippet
          </Button>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <StatsGrid
        totalSnippets={totalSnippets}
        favoritesCount={favoritesCount}
        languagesCount={uniqueLanguages}
        tagsCount={allTags}
        onNavigate={onNavigate}
      />

      {/* Favorites Widget */}
      <FavoritesWidget
        favorites={favorites}
        onSelectSnippet={onSelectSnippet}
        onNavigateToFavorites={() => onNavigate('favorites')}
        onCopyCode={onCopyCode}
      />

      {/* Quick Actions Bar */}
      <QuickActions
        onCreateSnippet={onCreateSnippet}
        onViewFavorites={() => onNavigate('favorites')}
        onViewAll={() => onNavigate('snippets')}
        onExportData={onExportData}
        onImportClick={onImportClick}
      />
    </div>
  );
}
