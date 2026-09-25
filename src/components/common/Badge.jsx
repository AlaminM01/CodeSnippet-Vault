import React from 'react';

/**
 * Modern Badge & Tag Component
 */
export function Badge({
  children,
  color,
  bgColor,
  borderColor,
  size = 'sm',
  dot = false,
  onRemove,
  clickable = false,
  onClick,
  className = '',
}) {
  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const customStyle = color
    ? {
        color: color,
        backgroundColor: bgColor || `${color}18`,
        borderColor: borderColor || `${color}35`,
      }
    : undefined;

  return (
    <span
      onClick={clickable ? onClick : undefined}
      style={customStyle}
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-all ${
        sizes[size]
      } ${
        !color
          ? 'bg-dark-border/40 text-dark-muted border-dark-border light:bg-slate-100 light:text-slate-600 light:border-slate-200'
          : ''
      } ${
        clickable ? 'cursor-pointer hover:opacity-85 hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${className}`}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: color || 'currentColor' }}
        />
      )}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-black/20 text-current transition-colors"
          title="Remove"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}
