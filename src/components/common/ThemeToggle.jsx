import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

/**
 * Animated Theme Toggle Button
 */
export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg text-dark-muted hover:text-dark-text light:text-slate-600 light:hover:text-slate-900 hover:bg-white/5 light:hover:bg-slate-100 transition-colors ${className}`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <FiSun className="text-lg text-amber-400 transform hover:rotate-45 transition-transform duration-200" />
        ) : (
          <FiMoon className="text-lg text-brand-600 transform hover:-rotate-12 transition-transform duration-200" />
        )}
      </div>
    </button>
  );
}
