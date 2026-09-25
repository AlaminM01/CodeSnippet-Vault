import React, { useState } from 'react';
import { AppLayout } from './components/layout';
import { Card, Button, Badge } from './components/common';
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
      pageDescription="Manage, explore, and organize your code repository"
    >
      <div className="space-y-6">
        <Card className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Navigation System Ready</h2>
            <p className="text-sm text-dark-muted light:text-light-muted mt-1">
              Linear & VS Code inspired layout with sidebar, navbar, responsive drawer, and quick actions.
            </p>
          </div>
          <div className="flex gap-2">
            <Badge color="#4f6bf0">Active Tab: {activeTab}</Badge>
            <Badge color="#10b981">{snippets.length} Stored Snippets</Badge>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
