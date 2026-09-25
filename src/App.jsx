import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppLayout } from './components/layout';
import { DashboardPage, SnippetsPage, LanguagesPage, FavoritesPage, TagsPage } from './pages';
import { SnippetFormModal } from './components/forms';
import { SnippetDetailModal } from './components/snippets';
import { ConfirmModal, CommandPaletteModal, PageTransition } from './components/common';
import { ToastProvider, useToast } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { storageService } from './services/storageService';
import { generateSnippetId } from './utils/formatters';
import { copyToClipboard } from './utils/clipboard';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [snippets, setSnippets] = useState(() => storageService.getSnippets());
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

  const fileInputRef = useRef(null);
  const toast = useToast();

  const favoritesCount = snippets.filter((s) => s.isFavorite).length;

  // Persist snippets automatically to LocalStorage on every change
  useEffect(() => {
    storageService.saveSnippets(snippets);
  }, [snippets]);

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

  // Export JSON backup
  const handleExportJSON = () => {
    storageService.exportJSON(snippets);
    toast.success(`Exported ${snippets.length} snippets to JSON backup!`);
  };

  // Trigger file import dialog
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Process JSON file import
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedSnippets = await storageService.importJSON(file);
      const existingIds = new Set(snippets.map((s) => s.id));
      const sanitized = importedSnippets.map((item) => ({
        ...item,
        id: existingIds.has(item.id) ? generateSnippetId() : item.id,
      }));

      const merged = [...sanitized, ...snippets];
      setSnippets(merged);
      toast.success(`Successfully imported ${sanitized.length} snippets!`);
    } catch (err) {
      toast.error(err.message || 'Failed to import JSON file');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Hidden file input for JSON import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="hidden"
      />

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
        onExportJSON={handleExportJSON}
        onImportClick={handleImportClick}
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
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <PageTransition key="dashboard">
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
                onSelectLanguage={(langId) => {
                  setSelectedLanguageFilter(langId);
                  setActiveTab('snippets');
                }}
                onCopyCode={handleCopyCode}
                onExportData={handleExportJSON}
                onImportClick={handleImportClick}
              />
            </PageTransition>
          )}

          {activeTab === 'snippets' && (
            <PageTransition key="snippets">
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
            </PageTransition>
          )}

          {activeTab === 'favorites' && (
            <PageTransition key="favorites">
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
            </PageTransition>
          )}

          {activeTab === 'tags' && (
            <PageTransition key="tags">
              <TagsPage
                snippets={snippets}
                onSelectSnippet={handleSelectSnippet}
                onEditSnippet={handleOpenEdit}
                onDeleteSnippet={handleRequestDelete}
                onDuplicateSnippet={handleDuplicateSnippet}
                onToggleFavorite={handleToggleFavorite}
                onCopyCode={handleCopyCode}
              />
            </PageTransition>
          )}

          {activeTab === 'languages' && (
            <PageTransition key="languages">
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
            </PageTransition>
          )}
        </AnimatePresence>
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
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
