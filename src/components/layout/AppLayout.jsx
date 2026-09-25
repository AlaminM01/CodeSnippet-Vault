import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileBottomNav } from './MobileBottomNav';

/**
 * Main Application Shell Layout with Mobile Navigation Support
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
  pageTitle,
  pageDescription,
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-dark-bg text-dark-text light:bg-light-bg light:text-light-text font-sans">
      {/* Sidebar (Desktop + Mobile Drawer) */}
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
        />

        {/* Dynamic Page Scroll Area with safe mobile bottom margin */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-5 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onOpenCreateModal={onOpenCreateModal}
      />
    </div>
  );
}
