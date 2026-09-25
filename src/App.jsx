import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/layout';
import { DashboardPage, SnippetsPage, LanguagesPage, FavoritesPage, TagsPage } from './pages';
import { SnippetFormModal } from './components/forms';
import { SnippetDetailModal } from './components/snippets';
import { ConfirmModal, CommandPaletteModal } from './components/common';
import { ToastProvider, useToast } from './context/ToastContext';
import { INITIAL_SNIPPETS } from './data/initialSnippets';
import { generateSnippetId } from './utils/formatters';
import { copyToClipboard } from './utils/clipboard';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [snippets, setSnippets] = useState(INITIAL_SNIPPETS);
  const [theme, setTheme] = useState('dark');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState('all');
  const [selectedTagFilter, setSelectedTagFilter] = useState(null);

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const toast = useToast();

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

  // Keyboard shortcuts: Ctrl + N (new), Ctrl + K or Ctrl + F (search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        handleOpenCreate();
      } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'f')) {
        e.preventDefault();
        setIsSearchModalOpen(true);
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
      toast.success('Snippet updated successfully!');
      setEditingSnippet(null);
    } else {
      const newSnippet = {
        id: generateSnippetId(),
        ...formData,
        createdAt: now,
        updatedAt: now,
      };
      setSnippets((prev) => [newSnippet, ...prev]);
      toast.success('Snippet created successfully!');
    }
  };

  // Request Delete workflow
  const handleRequestDelete = (snippet) => {
    setSnippetToDelete(snippet);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!snippetToDelete) return;
    setSnippets((prev) => prev.filter((s) => s.id !== snippetToDelete.id));

    if (selectedSnippet && selectedSnippet.id === snippetToDelete.id) {
      setSelectedSnippet(null);
      setIsDetailModalOpen(false);
    }
    toast.info(`Deleted "${snippetToDelete.title}"`);
    setSnippetToDelete(null);
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
    toast.success('Snippet duplicated!');
  };

  // Toggle favorite status
  const handleToggleFavorite = (id) => {
    setSnippets((prev) =>
      prev.map((snip) => {
        if (snip.id === id) {
          const nextFav = !snip.isFavorite;
          if (nextFav) {
            toast.success(`Added "${snip.title}" to favorites`);
          } else {
            toast.info(`Removed "${snip.title}" from favorites`);
          }
          return { ...snip, isFavorite: nextFav };
        }
        return snip;
      })
    );
    if (selectedSnippet && selectedSnippet.id === id) {
      setSelectedSnippet((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  // Copy code with toast
  const handleCopyCode = async (code) => {
    const success = await copyToClipboard(code);
    if (success) {
      toast.success('Code copied to clipboard!');
    } else {
      toast.error('Failed to copy to clipboard');
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
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'snippets') {
            setSelectedLanguageFilter('all');
            setSelectedTagFilter(null);
          }
        }}
        onOpenCreateModal={handleOpenCreate}
        onOpenSearch={() => setIsSearchModalOpen(true)}
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
            ? 'Tags & Topics'
            : 'Languages & Stacks'
        }
        pageDescription="Manage, organize, and inspect your code repository"
      >
        {activeTab === 'dashboard' && (
          <DashboardPage
            snippets={snippets}
            onNavigate={(tab) => {
              setActiveTab(tab);
              if (tab === 'snippets') {
                setSelectedLanguageFilter('all');
                setSelectedTagFilter(null);
              }
            }}
            onCreateSnippet={handleOpenCreate}
            onSelectSnippet={handleSelectSnippet}
            onCopyCode={handleCopyCode}
            onExportData={() => console.log('Export')}
            onImportClick={() => console.log('Import')}
          />
        )}

        {activeTab === 'snippets' && (
          <SnippetsPage
            snippets={snippets}
            selectedLanguage={selectedLanguageFilter}
            selectedTag={selectedTagFilter}
            onSelectLanguage={setSelectedLanguageFilter}
            onSelectTag={setSelectedTagFilter}
            onSelectSnippet={handleSelectSnippet}
            onEditSnippet={handleOpenEdit}
            onDeleteSnippet={handleRequestDelete}
            onDuplicateSnippet={handleDuplicateSnippet}
            onToggleFavorite={handleToggleFavorite}
            onCreateSnippet={handleOpenCreate}
            onCopyCode={handleCopyCode}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesPage
            snippets={snippets}
            onSelectSnippet={handleSelectSnippet}
            onEditSnippet={handleOpenEdit}
            onDeleteSnippet={handleRequestDelete}
            onDuplicateSnippet={handleDuplicateSnippet}
            onToggleFavorite={handleToggleFavorite}
            onCopyCode={handleCopyCode}
            onNavigateToAll={() => {
              setActiveTab('snippets');
              setSelectedLanguageFilter('all');
              setSelectedTagFilter(null);
            }}
          />
        )}

        {activeTab === 'tags' && (
          <TagsPage
            snippets={snippets}
            onSelectSnippet={handleSelectSnippet}
            onEditSnippet={handleOpenEdit}
            onDeleteSnippet={handleRequestDelete}
            onDuplicateSnippet={handleDuplicateSnippet}
            onToggleFavorite={handleToggleFavorite}
            onCopyCode={handleCopyCode}
          />
        )}

        {activeTab === 'languages' && (
          <LanguagesPage
            snippets={snippets}
            onSelectLanguage={(langId) => {
              setSelectedLanguageFilter(langId);
              setActiveTab('snippets');
            }}
            onCreateSnippetInLanguage={() => {
              handleOpenCreate();
            }}
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
        onDelete={handleRequestDelete}
        onDuplicate={handleDuplicateSnippet}
        onToggleFavorite={handleToggleFavorite}
        onCopy={handleCopyCode}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Code Snippet"
        message={`Are you sure you want to permanently delete "${snippetToDelete?.title}"? This action cannot be reversed.`}
        confirmLabel="Delete Snippet"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSnippetToDelete(null);
        }}
      />

      {/* Command Palette Search Modal */}
      <CommandPaletteModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        snippets={snippets}
        onSelectSnippet={handleSelectSnippet}
      />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
