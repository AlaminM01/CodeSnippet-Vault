import React from 'react';
import { FiPlus, FiStar, FiDownload, FiUpload, FiFolder } from 'react-icons/fi';
import { Card } from '../common/Card';

/**
 * Quick action buttons card for the dashboard
 */
export function QuickActions({
  onCreateSnippet,
  onViewFavorites,
  onViewAll,
  onExportData,
  onImportClick,
}) {
  const actions = [
    {
      title: 'New Snippet',
      desc: 'Create and save code snippet',
      icon: FiPlus,
      color: '#4f6bf0',
      action: onCreateSnippet,
    },
    {
      title: 'View Favorites',
      desc: 'Quick access to starred snippets',
      icon: FiStar,
      color: '#f59e0b',
      action: onViewFavorites,
    },
    {
      title: 'Browse Library',
      desc: 'Explore all snippets by tags',
      icon: FiFolder,
      color: '#10b981',
      action: onViewAll,
    },
    {
      title: 'Export JSON',
      desc: 'Download offline backup',
      icon: FiDownload,
      color: '#8b5cf6',
      action: onExportData,
    },
  ];

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border pb-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-dark-text light:text-light-text">
            Quick Actions
          </h3>
          <p className="text-xs text-dark-subtle light:text-light-subtle">
            Common workflows and productivity shortcuts
          </p>
        </div>
        {onImportClick && (
          <button
            type="button"
            onClick={onImportClick}
            className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1.5 transition-colors"
          >
            <FiUpload className="text-xs" /> Import Backup
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={item.action}
              className="flex items-center gap-3 p-3 rounded-lg border border-dark-border dark:border-dark-border light:border-light-border bg-dark-surface/50 dark:bg-dark-surface/50 light:bg-slate-50 hover:border-dark-borderLight hover:bg-dark-cardHover transition-all duration-150 text-left group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: `${item.color}15`,
                  borderColor: `${item.color}30`,
                  color: item.color,
                }}
              >
                <Icon className="text-lg" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-dark-text light:text-light-text group-hover:text-brand-400 transition-colors truncate">
                  {item.title}
                </div>
                <div className="text-[11px] text-dark-subtle light:text-light-subtle truncate">
                  {item.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
