import React, { useState } from 'react';
import { AppLayout } from './components/layout';
import { DashboardPage } from './pages';
import { INITIAL_SNIPPETS } from './data/initialSnippets';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [snippets] = useState(INITIAL_SNIPPETS);
  const [theme, setTheme] = useState('dark');

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

  return (
    <AppLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onOpenCreateModal={() => console.log('Open Create')}
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
      pageDescription="Personal code vault statistics, metrics, and quick actions"
    >
      {activeTab === 'dashboard' && (
        <DashboardPage
          snippets={snippets}
          onNavigate={(tab) => setActiveTab(tab)}
          onCreateSnippet={() => console.log('Create Snippet')}
          onExportData={() => console.log('Export')}
          onImportClick={() => console.log('Import')}
        />
      )}
    </AppLayout>
  );
}
