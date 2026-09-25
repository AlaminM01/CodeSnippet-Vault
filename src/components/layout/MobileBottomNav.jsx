import React from 'react';
import { FiHome, FiCode, FiStar, FiTag, FiPlus } from 'react-icons/fi';

/**
 * Mobile Bottom Navigation Bar
 * Provides instant thumb-friendly access to primary sections on mobile
 */
export function MobileBottomNav({
  activeTab,
  onSelectTab,
  onOpenCreateModal,
}) {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: FiHome },
    { id: 'snippets', label: 'Snippets', icon: FiCode },
    { id: 'favorites', label: 'Starred', icon: FiStar },
    { id: 'tags', label: 'Tags', icon: FiTag },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-dark-surface/90 dark:bg-dark-surface/90 light:bg-white/90 backdrop-blur-lg border-t border-dark-border/60 dark:border-dark-border/60 light:border-slate-200 px-3 py-1.5 flex items-center justify-around select-none">
      {tabs.slice(0, 2).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
              isActive
                ? 'text-brand-400 font-semibold'
                : 'text-dark-subtle hover:text-dark-text light:text-slate-500 light:hover:text-slate-800'
            }`}
          >
            <Icon className={`text-lg mb-0.5 ${isActive ? 'text-brand-400' : ''}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}

      {/* Center Floating Create Action */}
      <button
        type="button"
        onClick={onOpenCreateModal}
        className="w-11 h-11 -mt-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shadow-glow-sm border-2 border-dark-surface dark:border-dark-surface light:border-white transition-transform active:scale-95"
        title="Create Snippet"
      >
        <FiPlus className="text-xl" />
      </button>

      {tabs.slice(2).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
              isActive
                ? 'text-brand-400 font-semibold'
                : 'text-dark-subtle hover:text-dark-text light:text-slate-500 light:hover:text-slate-800'
            }`}
          >
            <Icon className={`text-lg mb-0.5 ${isActive ? 'text-brand-400' : ''}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
