import { STORAGE_KEYS } from '../constants/theme';
import { INITIAL_SNIPPETS } from '../data/initialSnippets';

/**
 * Storage Service for managing Snippets in LocalStorage
 */
export const storageService = {
  getSnippets: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SNIPPETS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(INITIAL_SNIPPETS));
        return INITIAL_SNIPPETS;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to read snippets from localStorage:', error);
      return INITIAL_SNIPPETS;
    }
  },

  saveSnippets: (snippets) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(snippets));
      return true;
    } catch (error) {
      console.error('Failed to save snippets to localStorage:', error);
      return false;
    }
  },

  exportJSON: (snippets) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(snippets, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `codesnippet-vault-export-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  importJSON: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            resolve(parsed);
          } else {
            reject(new Error('Invalid format: Expected a JSON array of snippets.'));
          }
        } catch (e) {
          reject(new Error('Invalid JSON file.'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file.'));
      reader.readAsText(file);
    });
  }
};
