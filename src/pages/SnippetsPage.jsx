import React, { useState } from 'react';
import { FiGrid, FiList, FiPlus, FiCode } from 'react-icons/fi';
import { SnippetCard } from '../components/snippets/SnippetCard';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

/**
 * Snippets Listing Page View
 */
export function SnippetsPage({
  snippets = [],
  onSelectSnippet,
  onEditSnippet,
  onDeleteSnippet,
  onDuplicateSnippet,
  onToggleFavorite,
  onCreateSnippet,
  onCopyCode,
}) {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-dark-text light:text-light-text">
              All Code Snippets
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {snippets.length}
            </span>
          </div>
          <p className="text-xs text-dark-subtle light:text-light-subtle">
            Browse, manage, and duplicate snippets across all languages and categories
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

      {/* Snippet Grid / List Content */}
      {snippets.length === 0 ? (
        <EmptyState
          icon={FiCode}
          title="No snippets saved yet"
          description="Your snippet vault is currently empty. Start saving reusable code snippets today!"
          actionLabel="Create First Snippet"
          onAction={onCreateSnippet}
        />
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-3'
          }
        >
          {snippets.map((snippet) => (
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
