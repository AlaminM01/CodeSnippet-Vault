import React from 'react';

/**
 * Modern Minimalist Button Component
 * Inspired by Linear & VS Code design language
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow-glow-sm border border-brand-400/20',
    secondary: 'bg-dark-card hover:bg-dark-cardHover dark:bg-dark-surface dark:hover:bg-dark-card text-dark-text border border-dark-border dark:border-dark-border hover:border-dark-borderLight light:bg-light-surface light:text-light-text light:border-light-border light:hover:bg-light-cardHover',
    outline: 'border border-dark-border hover:border-brand-500/60 text-dark-text hover:text-brand-400 light:border-light-border light:text-light-text light:hover:text-brand-600 light:hover:border-brand-500/50 bg-transparent',
    ghost: 'bg-transparent hover:bg-white/5 text-dark-muted hover:text-dark-text light:hover:bg-slate-100 light:text-light-muted light:hover:text-light-text',
    danger: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/40',
    icon: 'p-2 rounded-lg text-dark-muted hover:text-dark-text hover:bg-white/5 light:text-light-muted light:hover:text-light-text light:hover:bg-slate-100 border border-transparent',
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs gap-1.5',
    sm: 'px-2.5 py-1.5 text-xs gap-1.5',
    md: 'px-3.5 py-2 text-sm gap-2',
    lg: 'px-4 py-2.5 text-base gap-2.5',
  };

  const chosenSize = variant === 'icon' ? 'p-2 text-sm' : sizes[size];

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${chosenSize} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : Icon ? (
        <Icon className="text-base shrink-0" />
      ) : null}
      {children}
      {IconRight && !isLoading && <IconRight className="text-base shrink-0" />}
    </button>
  );
}
