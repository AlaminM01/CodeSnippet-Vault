import React, { useState, useMemo } from 'react';
import { FiTag, FiHash, FiArrowRight, FiSearch, FiCode, FiFolder } from 'react-icons/fi';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { SnippetCard } from '../components/snippets/SnippetCard';
import { EmptyState } from '../components/common/EmptyState';

/**
 * Dedicated Tags and Categorization Management Page
 */
export function TagsPage({
  snippets = [],
  onSelectTag,
  onSelectSnippet,
  onEditSnippet,
  onDeleteSnippet,
  onDuplicateSnippet,
  onToggleFavorite,
  onCopyCode,
}) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagSearch, setTagSearch] = useState('');

  // Compute tag counts and statistics
  const tagStats = useMemo(() => {
    const counts = {};
    snippets.forEach((snippet) => {
      (snippet.tags || []).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    const list = Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));

    // Sort by count descending
    list.sort((a, b) => b.count - a.count);
    return list;
  }, [snippets]);

  // Filter tags by search
  const filteredTags = useMemo(() => {
    if (!tagSearch.trim()) return tagStats;
    return tagStats.filter((t) =>
      t.name.toLowerCase().includes(tagSearch.toLowerCase().trim())
    );
  }, [tagStats, tagSearch]);

  // Snippets filtered by currently selected tag
  const matchingSnippets = useMemo(() => {
    if (!selectedTag) return [];
    return snippets.filter((s) => (s.tags || []).includes(selectedTag));
  }, [snippets, selectedTag]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-400 flex items-center justify-center text-sm border border-purple-500/20">
              <FiTag />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-dark-text light:text-light-text">
              Tags & Categorization
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {tagStats.length} Tags
            </span>
          </div>
          <p className="text-xs text-dark-subtle light:text-light-subtle">
            Explore and filter code snippets by topics, algorithms, frameworks, and patterns
          </p>
        </div>

        {/* Search within tags */}
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-subtle text-xs" />
          <input
            type="text"
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
            placeholder="Search tags..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-dark-card dark:bg-dark-card light:bg-white border border-dark-border dark:border-dark-border light:border-slate-200 text-xs text-dark-text light:text-slate-800 placeholder:text-dark-subtle focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Tag Cloud / Pills Grid */}
      <Card className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-dark-subtle light:text-slate-500">
          Tag Cloud
        </h3>
        <div className="flex flex-wrap gap-2">
          {filteredTags.map((tag) => {
            const isSelected = selectedTag === tag.name;
            return (
              <button
                key={tag.name}
                type="button"
                onClick={() => setSelectedTag(isSelected ? null : tag.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400/30'
                    : 'bg-dark-surface dark:bg-dark-surface light:bg-slate-100 text-dark-text light:text-slate-700 border border-dark-border light:border-slate-200 hover:border-purple-500/50 hover:text-purple-300'
                }`}
              >
                <FiHash className="text-xs opacity-60" />
                <span>{tag.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-dark-border light:bg-slate-200 text-dark-subtle'
                }`}>
                  {tag.count}
                </span>
              </button>
            );
          })}
          {filteredTags.length === 0 && (
            <p className="text-xs text-dark-subtle py-2">No tags matched "{tagSearch}"</p>
          )}
        </div>
      </Card>

      {/* Filtered Snippets for Selected Tag */}
      {selectedTag && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-dark-text light:text-light-text flex items-center gap-2">
              <span>Snippets tagged with</span>
              <span className="text-purple-400 font-mono">#{selectedTag}</span>
              <span className="text-xs text-dark-subtle font-mono">
                ({matchingSnippets.length})
              </span>
            </h3>
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className="text-xs text-brand-400 hover:underline"
            >
              Clear tag filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchingSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onSelect={onSelectSnippet}
                onEdit={onEditSnippet}
                onDelete={onDeleteSnippet}
                onDuplicate={onDuplicateSnippet}
                onToggleFavorite={onToggleFavorite}
                onCopy={onCopyCode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
