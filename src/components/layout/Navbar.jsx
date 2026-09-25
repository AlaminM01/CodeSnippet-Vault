import React from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiDownload, 
  FiUpload,
  FiCommand
} from 'react-icons/fi';
import { Button } from '../common/Button';

/**
 * Top Navigation Bar Component
 * VS Code / Raycast top-bar aesthetic
 */
export function Navbar({
  pageTitle = 'Dashboard',
  pageDescription,
  onOpenSearch,
  onOpenCreateModal,
  onExportJSON,
  onImportClick,
  onToggleMobileMenu,
  theme = 'dark',
  onToggleTheme,
}) {
  return (
    <header className="h-16 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border bg-dark-bg/80 dark:bg-dark-bg/80 light:bg-white/80 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-10 select-none">
      {/* Left: Mobile Menu & Page Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-dark-muted hover:text-dark-text hover:bg-white/5 transition-colors"
          title="Toggle Navigation Menu"
        >
          <FiMenu className="text-xl" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base font-semibold text-dark-text light:text-light-text tracking-tight truncate flex items-center gap-2">
            <span>{pageTitle}</span>
          </h1>
          {pageDescription && (
            <p className="text-xs text-dark-subtle light:text-light-subtle hidden sm:block truncate">
              {pageDescription}
            </p>
          )}
        </div>
      </div>

      {/* Center: Raycast / VS Code Command Search Trigger */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-dark-surface dark:bg-dark-surface light:bg-slate-100 border border-dark-border dark:border-dark-border light:border-light-border hover:border-brand-500/40 text-xs text-dark-subtle transition-all duration-150 group shadow-sm"
        >
          <div className="flex items-center gap-2 text-dark-muted light:text-slate-500">
            <FiSearch className="text-sm group-hover:text-brand-400 transition-colors" />
            <span className="group-hover:text-dark-text light:group-hover:text-slate-800">
              Search snippets, code, tags, languages...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] bg-dark-card dark:bg-dark-card light:bg-white border border-dark-border light:border-slate-200 px-1.5 py-0.5 rounded text-dark-muted light:text-slate-600">
            <FiCommand className="text-[10px]" /> K
          </kbd>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Mobile Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="md:hidden p-2 rounded-lg text-dark-muted hover:text-dark-text hover:bg-white/5 transition-colors"
          title="Search (Ctrl + K)"
        >
          <FiSearch className="text-lg" />
        </button>

        {/* Export / Backup Trigger */}
        {onExportJSON && (
          <button
            type="button"
            onClick={onExportJSON}
            className="hidden sm:flex p-2 rounded-lg text-dark-muted hover:text-dark-text hover:bg-white/5 light:hover:bg-slate-100 transition-colors"
            title="Export JSON backup"
          >
            <FiDownload className="text-base" />
          </button>
        )}

        {/* Import Trigger */}
        {onImportClick && (
          <button
            type="button"
            onClick={onImportClick}
            className="hidden sm:flex p-2 rounded-lg text-dark-muted hover:text-dark-text hover:bg-white/5 light:hover:bg-slate-100 transition-colors"
            title="Import JSON backup"
          >
            <FiUpload className="text-base" />
          </button>
        )}

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2 rounded-lg text-dark-muted hover:text-dark-text hover:bg-white/5 light:text-light-muted light:hover:text-light-text light:hover:bg-slate-100 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <FiSun className="text-base text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <FiMoon className="text-base text-brand-600 hover:-rotate-12 transition-transform" />
          )}
        </button>

        {/* New Snippet Button */}
        <Button
          variant="primary"
          size="sm"
          icon={FiPlus}
          onClick={onOpenCreateModal}
          className="shadow-sm"
        >
          <span className="hidden sm:inline">New Snippet</span>
        </Button>
      </div>
    </header>
  );
}
