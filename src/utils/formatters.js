/**
 * Utility functions for formatting strings, dates, and code metrics
 */

export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatTimeAgo(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const secondsDiff = Math.floor((now - date) / 1000);

  if (secondsDiff < 60) return 'just now';
  const minutes = Math.floor(secondsDiff / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function getCodeMetrics(code = '') {
  const lines = code ? code.split('\n').length : 0;
  const characters = code ? code.length : 0;
  const words = code ? code.trim().split(/\s+/).filter(Boolean).length : 0;
  return { lines, characters, words };
}

export function generateSnippetId() {
  return 'snip_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}
