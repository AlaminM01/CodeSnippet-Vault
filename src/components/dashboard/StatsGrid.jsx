import React from 'react';
import { FiCode, FiStar, FiCompass, FiTag } from 'react-icons/fi';
import { StatCard } from './StatCard';

/**
 * Grid of core statistics for the dashboard
 */
export function StatsGrid({
  totalSnippets = 0,
  favoritesCount = 0,
  languagesCount = 0,
  tagsCount = 0,
  onNavigate,
}) {
  const stats = [
    {
      id: 'snippets',
      title: 'Total Snippets',
      value: totalSnippets,
      subtitle: `${totalSnippets} snippets saved locally`,
      icon: FiCode,
      color: '#4f6bf0', // Indigo
      tab: 'snippets',
    },
    {
      id: 'favorites',
      title: 'Favorites',
      value: favoritesCount,
      subtitle: 'Starred for quick access',
      icon: FiStar,
      color: '#f59e0b', // Amber
      tab: 'favorites',
    },
    {
      id: 'languages',
      title: 'Languages Used',
      value: languagesCount,
      subtitle: 'Active coding languages',
      icon: FiCompass,
      color: '#10b981', // Emerald
      tab: 'languages',
    },
    {
      id: 'tags',
      title: 'Tags Count',
      value: tagsCount,
      subtitle: 'Categorization topics',
      icon: FiTag,
      color: '#8b5cf6', // Violet
      tab: 'tags',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          color={stat.color}
          onClick={onNavigate ? () => onNavigate(stat.tab) : undefined}
        />
      ))}
    </div>
  );
}
