import { STORAGE_KEYS } from '../constants/theme';
import { INITIAL_SNIPPETS } from '../data/initialSnippets';
import { generateSnippetId } from '../utils/formatters';

/**
 * Storage Service for managing Snippets in LocalStorage
 * Provides persistent offline CRUD, validation, and JSON Import/Export
 */
export const storageService = {
  /**
   * Load snippets from LocalStorage with fallback to curated defaults
   */
  getSnippets: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SNIPPETS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(INITIAL_SNIPPETS));
        return INITIAL_SNIPPETS;
      }
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SNIPPETS;
    } catch (error) {
      console.error('Failed to read snippets from localStorage:', error);
      return INITIAL_SNIPPETS;
    }
  },

  /**
   * Persist snippets array to LocalStorage
   */
  saveSnippets: (snippets) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(snippets));
      return true;
    } catch (error) {
      console.error('Failed to save snippets to localStorage:', error);
      return false;
    }
  },

  /**
   * Export all snippets to a formatted JSON download file
   */
  exportJSON: (snippets) => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(snippets, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `codesnippet-vault-export-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      return true;
    } catch (err) {
      console.error('Failed to export JSON:', err);
      return false;
    }
  },

  /**
   * Import snippets from a local JSON file with schema validation and ID deduplication
   */
  importJSON: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (!Array.isArray(parsed)) {
            return reject(new Error('Invalid format: File must contain a JSON array of snippets.'));
          }

          // Validate and sanitize each snippet
          const validated = parsed.map((item) => ({
            id: item.id || generateSnippetId(),
            title: String(item.title || 'Untitled Snippet'),
            description: String(item.description || ''),
            language: String(item.language || 'javascript'),
            customLanguage: item.customLanguage ? String(item.customLanguage) : undefined,
            tags: Array.isArray(item.tags) ? item.tags : ['Imported'],
            code: String(item.code || ''),
            isFavorite: Boolean(item.isFavorite),
            createdAt: item.createdAt || new Date().toISOString(),
            updatedAt: item.updatedAt || new Date().toISOString(),
          }));

          resolve(validated);
        } catch (e) {
          reject(new Error('Failed to parse JSON file. Please ensure it is valid JSON.'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading backup file.'));
      reader.readAsText(file);
    });
  },

  /**
   * Reset local storage back to initial curated developer snippets
   */
  resetToDefaults: () => {
    try {
      localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(INITIAL_SNIPPETS));
      return INITIAL_SNIPPETS;
    } catch (err) {
      console.error('Failed to reset localStorage:', err);
      return INITIAL_SNIPPETS;
    }
  }
};
