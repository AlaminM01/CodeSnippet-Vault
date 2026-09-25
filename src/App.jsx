import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/layout';
import { DashboardPage, SnippetsPage } from './pages';
import { SnippetFormModal } from './components/forms';
import { INITIAL_SNIPPETS } from './data/initialSnippets';
import { generateSnippetId } from './utils/formatters';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [snippets, setSnippets] = useState(INITIAL_SNIPPETS);
  const [theme, setTheme] = useState('dark');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const favoritesCount = snippets.filter((s) => s.isFavorite).length;

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  // Keyboard shortcut Ctrl + N for new snippet
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setIsCreateModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle snippet creation
  const handleCreateSnippet = (formData) => {
    const newSnippet = {
      id: generateSnippetId(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSnippets([newSnippet, ...snippets]);
  };

  // Toggle favorite status
  const handleToggleFavorite = (id) => {
    setSnippets(
      snippets.map((snip) =>
        snip.id === id ? { ...snip, isFavorite: !snip.isFavorite } : snip
      )
    );
  };

  return (
    <>
      <AppLayout
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenSearch={() => console.log('Open Search')}
        totalSnippets={snippets.length}
        favoritesCount={favoritesCount}
        theme={theme}
        onToggleTheme={toggleTheme}
        pageTitle={
          activeTab === 'dashboard'
            ? 'Dashboard Overview'
            : activeTab === 'snippets'
            ? 'All Snippets'
            : activeTab === 'favorites'
            ? 'Favorite Snippets'
            : activeTab === 'tags'
            ? 'Tags & Categories'
            : 'Languages'
        }
        pageDescription="Manage, organize, and search your code repository"
      >
        {activeTab === 'dashboard' && (
          <DashboardPage
            snippets={snippets}
            onNavigate={(tab) => setActiveTab(tab)}
            onCreateSnippet={() => setIsCreateModalOpen(true)}
            onExportData={() => console.log('Export')}
            onImportClick={() => console.log('Import')}
          />
        )}

        {activeTab === 'snippets' && (
          <SnippetsPage
            snippets={snippets}
            onSelectSnippet={(snip) => console.log('Selected snippet:', snip)}
            onEditSnippet={(snip) => console.log('Edit snippet:', snip)}
            onDeleteSnippet={(snip) => console.log('Delete snippet:', snip)}
            onDuplicateSnippet={(snip) => console.log('Duplicate snippet:', snip)}
            onToggleFavorite={handleToggleFavorite}
            onCreateSnippet={() => setIsCreateModalOpen(true)}
          />
        )}
      </AppLayout>

      {/* Snippet Creation Modal */}
      <SnippetFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSnippet}
      />
    </>
  );
}
