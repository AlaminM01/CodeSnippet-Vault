import React from 'react';

/**
 * Modern StatCard component with subtle glow & badge
 */
export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = '#4f6bf0',
  onClick,
  className = '',
}) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-dark-border dark:border-dark-border light:border-light-border bg-dark-card/90 dark:bg-dark-card/90 light:bg-white p-5 transition-all duration-200 backdrop-blur-sm ${
        onClick ? 'cursor-pointer hover:border-dark-borderLight hover:bg-dark-cardHover/70 hover:shadow-glow-sm hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      {/* Background ambient gradient glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-10 transition-opacity"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-dark-subtle light:text-light-subtle">
            {title}
          </p>
          <div className="text-3xl font-bold font-mono tracking-tight text-dark-text light:text-light-text">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-dark-muted light:text-light-muted flex items-center gap-1.5 pt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
            style={{
              backgroundColor: `${color}15`,
              borderColor: `${color}30`,
              color: color,
            }}
          >
            <Icon className="text-2xl" />
          </div>
        )}
      </div>
    </div>
  );
}
