import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/layout';
import { DashboardPage, SnippetsPage } from './pages';
import { SnippetFormModal } from './components/forms';
import { SnippetDetailModal } from './components/snippets';
import { INITIAL_SNIPPETS } from './data/initialSnippets';
import { generateSnippetId } from './utils/formatters';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [snippets, setSnippets] = useState(INITIAL_SNIPPETS);
  const [theme, setTheme] = useState('dark');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
    if (selectedSnippet && selectedSnippet.id === id) {
      setSelectedSnippet((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  // Open detail modal
  const handleSelectSnippet = (snippet) => {
    setSelectedSnippet(snippet);
    setIsDetailModalOpen(true);
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
        pageDescription="Manage, organize, and inspect your code repository"
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
            onSelectSnippet={handleSelectSnippet}
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

      {/* Snippet Detail Modal */}
      <SnippetDetailModal
        snippet={selectedSnippet}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={(snip) => console.log('Edit from detail:', snip)}
        onDelete={(snip) => console.log('Delete from detail:', snip)}
        onDuplicate={(snip) => console.log('Duplicate from detail:', snip)}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
}
