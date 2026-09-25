import React, { useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

/**
 * Modern Search Bar with Clear Button and Shortcut Key Hint
 */
export function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search by title, code, tag, or language...',
  className = '',
  autoFocus = false,
}) {
  const inputRef = useRef(null);

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
    }
    inputRef.current?.focus();
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <span className="absolute left-3.5 text-dark-subtle light:text-slate-400 pointer-events-none flex items-center justify-center">
        <FiSearch className="text-base" />
      </span>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-dark-card dark:bg-dark-card light:bg-white border border-dark-border dark:border-dark-border light:border-slate-200 text-xs sm:text-sm text-dark-text light:text-slate-800 placeholder:text-dark-subtle light:placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 shadow-sm"
      />

      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-1 rounded-full text-dark-subtle hover:text-dark-text light:text-slate-400 light:hover:text-slate-700 hover:bg-white/10 light:hover:bg-slate-100 transition-colors"
          title="Clear search query"
        >
          <FiX className="text-sm" />
        </button>
      ) : (
        <span className="absolute right-3.5 hidden sm:inline-flex items-center text-[10px] font-mono text-dark-subtle/70 bg-dark-surface dark:bg-dark-surface light:bg-slate-100 border border-dark-border/60 light:border-slate-200 px-1.5 py-0.5 rounded">
          /
        </span>
      )}
    </div>
  );
}
