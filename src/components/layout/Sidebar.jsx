import React from 'react';
import { 
  FiHome, 
  FiCode, 
  FiStar, 
  FiTag, 
  FiPlus, 
  FiCompass,
  FiGithub,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { VscTerminal } from 'react-icons/vsc';

/**
 * Sidebar Navigation Component
 * Inspired by Linear & VS Code sidebar
 */
export function Sidebar({
  activeTab,
  onSelectTab,
  onOpenCreateModal,
  totalSnippets = 0,
  favoritesCount = 0,
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'snippets', label: 'All Snippets', icon: FiCode, badge: totalSnippets },
    { id: 'favorites', label: 'Favorites', icon: FiStar, badge: favoritesCount },
    { id: 'tags', label: 'Tags & Topics', icon: FiTag },
    { id: 'languages', label: 'Languages', icon: FiCompass },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-dark-surface dark:bg-dark-surface light:bg-light-surface border-r border-dark-border dark:border-dark-border light:border-light-border select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-sm shrink-0">
            <VscTerminal className="text-xl" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-semibold text-sm tracking-tight text-dark-text light:text-light-text flex items-center gap-1.5">
                CodeSnippet <span className="text-xs px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 font-mono">Vault</span>
              </span>
              <span className="text-[11px] text-dark-subtle light:text-light-subtle">Developer Productivity</span>
            </div>
          )}
        </div>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-md text-dark-subtle hover:text-dark-text hover:bg-white/5 light:hover:bg-slate-100 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <FiChevronRight className="text-sm" /> : <FiChevronLeft className="text-sm" />}
          </button>
        )}
      </div>

      {/* Quick Action Button */}
      <div className="p-3">
        <button
          type="button"
          onClick={onOpenCreateModal}
          className={`w-full flex items-center justify-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs py-2 px-3 shadow-sm hover:shadow-glow-sm transition-all duration-150 active:scale-[0.98] ${
            isCollapsed ? 'px-0' : ''
          }`}
          title="New Snippet (Ctrl + N)"
        >
          <FiPlus className="text-base shrink-0" />
          {!isCollapsed && (
            <>
              <span>New Snippet</span>
              <span className="ml-auto text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">Ctrl+N</span>
            </>
          )}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className={`px-2 py-1 text-[11px] font-semibold tracking-wider text-dark-subtle uppercase ${isCollapsed ? 'sr-only' : ''}`}>
          Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 font-semibold'
                  : 'text-dark-muted hover:text-dark-text hover:bg-white/5 light:text-light-muted light:hover:text-light-text light:hover:bg-slate-100 border border-transparent'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
              title={item.label}
            >
              <Icon className={`text-base shrink-0 ${isActive ? 'text-brand-400' : 'text-dark-subtle group-hover:text-dark-text light:text-light-subtle light:group-hover:text-light-text'}`} />
              {!isCollapsed && (
                <>
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {typeof item.badge !== 'undefined' && item.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-brand-500 text-white' : 'bg-dark-card text-dark-subtle light:bg-slate-200 light:text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info & Shortcuts */}
      <div className="p-3 border-t border-dark-border/60 dark:border-dark-border/60 light:border-light-border space-y-2">
        {!isCollapsed ? (
          <div className="px-2 py-2 rounded-lg bg-dark-card/60 dark:bg-dark-card/60 light:bg-slate-100 text-[11px] text-dark-subtle space-y-1">
            <div className="flex items-center justify-between font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Offline Storage
              </span>
              <span>100% Local</span>
            </div>
            <p className="text-[10px] text-dark-muted dark:text-dark-subtle light:text-slate-500">
              Zero telemetry. Instant offline sync.
            </p>
          </div>
        ) : (
          <div className="flex justify-center" title="Offline Local Storage Active">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
        )}

        <a
          href="https://github.com/AlaminM01/CodeSnippet-Vault"
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-dark-subtle hover:text-dark-text hover:bg-white/5 light:hover:bg-slate-100 transition-colors ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title="View on GitHub"
        >
          <FiGithub className="text-base shrink-0" />
          {!isCollapsed && <span className="truncate">GitHub Repository</span>}
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-200 z-20 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-dark-surface shadow-2xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
