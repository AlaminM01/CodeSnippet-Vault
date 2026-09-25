import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

/**
 * Main Application Shell Layout
 */
export function AppLayout({
  children,
  activeTab,
  onSelectTab,
  onOpenCreateModal,
  onOpenSearch,
  totalSnippets,
  favoritesCount,
  onExportJSON,
  onImportClick,
  theme,
  onToggleTheme,
  pageTitle,
  pageDescription,
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-dark-bg text-dark-text light:bg-light-bg light:text-light-text font-sans">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onOpenCreateModal={onOpenCreateModal}
        totalSnippets={totalSnippets}
        favoritesCount={favoritesCount}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          onOpenSearch={onOpenSearch}
          onOpenCreateModal={onOpenCreateModal}
          onExportJSON={onExportJSON}
          onImportClick={onImportClick}
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        {/* Dynamic Page Scroll Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
