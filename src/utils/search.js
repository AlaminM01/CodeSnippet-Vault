/**
 * Real-time Multi-Field Search Engine
 * Searches title, description, code, tags, and language
 */
export function filterSnippets(snippets = [], query = '') {
  if (!query || !query.trim()) return snippets;

  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  return snippets.filter((snippet) => {
    const title = (snippet.title || '').toLowerCase();
    const description = (snippet.description || '').toLowerCase();
    const language = (snippet.language || '').toLowerCase();
    const customLanguage = (snippet.customLanguage || '').toLowerCase();
    const tags = (snippet.tags || []).join(' ').toLowerCase();
    const code = (snippet.code || '').toLowerCase();

    const searchCorpus = `${title} ${description} ${language} ${customLanguage} ${tags} ${code}`;

    // All tokens must match somewhere in the snippet
    return tokens.every((token) => searchCorpus.includes(token));
  });
}
