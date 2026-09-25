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

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
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
        handleOpenCreate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingSnippet(null);
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (snippet) => {
    setEditingSnippet(snippet);
    setIsDetailModalOpen(false);
    setIsFormModalOpen(true);
  };

  // Handle Save (both Create and Edit)
  const handleSaveSnippet = (formData) => {
    const now = new Date().toISOString();

    if (editingSnippet) {
      // Update existing snippet
      const updatedSnippet = {
        ...editingSnippet,
        ...formData,
        updatedAt: now,
      };

      setSnippets((prev) =>
        prev.map((s) => (s.id === editingSnippet.id ? updatedSnippet : s))
      );

      if (selectedSnippet && selectedSnippet.id === editingSnippet.id) {
        setSelectedSnippet(updatedSnippet);
      }
      setEditingSnippet(null);
    } else {
      // Create new snippet
      const newSnippet = {
        id: generateSnippetId(),
        ...formData,
        createdAt: now,
        updatedAt: now,
      };
      setSnippets((prev) => [newSnippet, ...prev]);
    }
  };

  // Duplicate snippet workflow
  const handleDuplicateSnippet = (snippet) => {
    const now = new Date().toISOString();
    const duplicated = {
      ...snippet,
      id: generateSnippetId(),
      title: `${snippet.title} (Copy)`,
      createdAt: now,
      updatedAt: now,
    };
    setSnippets((prev) => [duplicated, ...prev]);
  };

  // Toggle favorite status
  const handleToggleFavorite = (id) => {
    setSnippets((prev) =>
      prev.map((snip) =>
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
        onOpenCreateModal={handleOpenCreate}
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
            onCreateSnippet={handleOpenCreate}
            onExportData={() => console.log('Export')}
            onImportClick={() => console.log('Import')}
          />
        )}

        {activeTab === 'snippets' && (
          <SnippetsPage
            snippets={snippets}
            onSelectSnippet={handleSelectSnippet}
            onEditSnippet={handleOpenEdit}
            onDeleteSnippet={(snip) => console.log('Delete snippet:', snip)}
            onDuplicateSnippet={handleDuplicateSnippet}
            onToggleFavorite={handleToggleFavorite}
            onCreateSnippet={handleOpenCreate}
          />
        )}
      </AppLayout>

      {/* Snippet Form Modal (Handles both Create and Edit) */}
      <SnippetFormModal
        isOpen={isFormModalOpen}
        initialData={editingSnippet}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingSnippet(null);
        }}
        onSubmit={handleSaveSnippet}
      />

      {/* Snippet Detail Modal */}
      <SnippetDetailModal
        snippet={selectedSnippet}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleOpenEdit}
        onDelete={(snip) => console.log('Delete from detail:', snip)}
        onDuplicate={handleDuplicateSnippet}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
}
