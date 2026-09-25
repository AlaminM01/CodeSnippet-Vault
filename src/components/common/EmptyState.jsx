import React from 'react';
import { FiCode, FiPlus } from 'react-icons/fi';
import { Button } from './Button';

/**
 * Modern Empty State Component
 */
export function EmptyState({
  icon: Icon = FiCode,
  title = 'No snippets found',
  description = 'Get started by creating your first code snippet or adjust your filters.',
  actionLabel = 'Create Snippet',
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-dashed border-dark-border dark:border-dark-border light:border-slate-300 bg-dark-card/40 dark:bg-dark-card/40 light:bg-slate-50/50 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center text-2xl mb-4 shadow-sm">
        <Icon />
      </div>
      <h3 className="text-base font-semibold text-dark-text light:text-light-text mb-1">
        {title}
      </h3>
      <p className="text-xs text-dark-subtle light:text-light-subtle max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && actionLabel && (
        <Button variant="primary" icon={FiPlus} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
