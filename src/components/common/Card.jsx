import React from 'react';

/**
 * Modern Card Component with subtle glass & hover glow
 */
export function Card({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  ...props
}) {
  const hoverStyles = hoverEffect
    ? 'hover:border-dark-borderLight hover:bg-dark-cardHover/70 hover:shadow-glow-sm hover:-translate-y-0.5 cursor-pointer light:hover:bg-slate-50 light:hover:border-slate-300 light:hover:shadow-md'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-dark-border bg-dark-card/90 dark:bg-dark-card/90 light:bg-light-card light:border-light-border p-5 transition-all duration-200 backdrop-blur-sm ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
