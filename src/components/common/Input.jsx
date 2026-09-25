import React, { forwardRef } from 'react';

/**
 * Developer-focused Input & Textarea Components
 */
export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    icon: Icon,
    iconRight: IconRight,
    onRightIconClick,
    className = '',
    containerClassName = '',
    ...props
  },
  ref
) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted light:text-light-muted mb-1.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <span className="absolute left-3 text-dark-subtle light:text-light-subtle pointer-events-none flex items-center justify-center">
            <Icon className="text-base" />
          </span>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg bg-dark-surface dark:bg-dark-surface light:bg-white border text-sm text-dark-text light:text-light-text placeholder:text-dark-subtle light:placeholder:text-light-subtle transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 disabled:opacity-50 disabled:cursor-not-allowed ${
            Icon ? 'pl-9' : 'pl-3.5'
          } ${IconRight ? 'pr-9' : 'pr-3.5'} py-2 ${
            error
              ? 'border-rose-500/60 focus:ring-rose-500 focus:border-rose-500'
              : 'border-dark-border light:border-light-border'
          } ${className}`}
          {...props}
        />
        {IconRight && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 text-dark-subtle hover:text-dark-text light:text-light-subtle light:hover:text-light-text flex items-center justify-center transition-colors"
          >
            <IconRight className="text-base" />
          </button>
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-rose-400">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-dark-subtle light:text-light-subtle">{helperText}</p>
      ) : null}
    </div>
  );
});

export const TextArea = forwardRef(function TextArea(
  {
    label,
    error,
    helperText,
    className = '',
    containerClassName = '',
    rows = 4,
    ...props
  },
  ref
) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted light:text-light-muted mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full rounded-lg bg-dark-surface dark:bg-dark-surface light:bg-white border text-sm text-dark-text light:text-light-text placeholder:text-dark-subtle light:placeholder:text-light-subtle transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 disabled:opacity-50 px-3.5 py-2.5 font-mono resize-y ${
          error
            ? 'border-rose-500/60 focus:ring-rose-500 focus:border-rose-500'
            : 'border-dark-border light:border-light-border'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-xs text-rose-400">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-dark-subtle light:text-light-subtle">{helperText}</p>
      ) : null}
    </div>
  );
});
