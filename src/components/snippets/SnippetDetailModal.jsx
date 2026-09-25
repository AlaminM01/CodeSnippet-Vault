import React, { useState, useEffect } from 'react';
import { 
  FiX, 
  FiCopy, 
  FiCheck, 
  FiStar, 
  FiEdit2, 
  FiTrash2, 
  FiDownload, 
  FiCopy as FiDuplicate,
  FiCalendar,
  FiClock,
  FiFileText,
  FiAlignLeft
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { CodeViewer } from '../common/CodeViewer';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import { formatDate, formatTimeAgo, getCodeMetrics } from '../../utils/formatters';

/**
 * Animated Snippet Detail Modal with full code viewer & metadata inspector
 */
export function SnippetDetailModal({
  snippet,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleFavorite,
  onCopy,
}) {
  const [copied, setCopied] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const langConfig = snippet ? (SUPPORTED_LANGUAGES.find(
    (l) => l.id === snippet.language
  ) || {
    id: snippet.language,
    name: (snippet.customLanguage || snippet.language).toUpperCase(),
    ext: 'txt',
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.12)',
    border: 'rgba(148, 163, 184, 0.3)',
  }) : null;

  const metrics = snippet ? getCodeMetrics(snippet.code) : { lines: 0, characters: 0, words: 0 };

  const handleCopyClick = () => {
    if (!snippet) return;
    if (onCopy) {
      onCopy(snippet.code);
    } else {
      navigator.clipboard.writeText(snippet.code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!snippet || !langConfig) return;
    const safeTitle = snippet.title.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const ext = langConfig.ext || 'txt';
    const blob = new Blob([snippet.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeTitle}.${ext}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && snippet && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Dialog Container */}
          <div className="flex min-h-full items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-dark-surface dark:bg-dark-surface light:bg-white border border-dark-border dark:border-dark-border light:border-light-border text-left shadow-2xl relative flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar Header */}
              <div className="p-5 sm:px-6 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border flex items-start justify-between gap-4 bg-dark-bg/60 dark:bg-dark-bg/60 light:bg-slate-50/70 backdrop-blur-sm">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      color={langConfig.color}
                      bgColor={langConfig.bg}
                      borderColor={langConfig.border}
                      size="sm"
                      dot
                    >
                      {langConfig.name}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(snippet.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        snippet.isFavorite
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-dark-card/60 text-dark-subtle border-dark-border hover:text-dark-text'
                      }`}
                    >
                      <FiStar className={`text-xs ${snippet.isFavorite ? 'fill-amber-400' : ''}`} />
                      <span>{snippet.isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
                    </button>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-dark-text light:text-light-text break-words">
                    {snippet.title}
                  </h2>

                  {snippet.description && (
                    <p className="text-sm text-dark-muted light:text-light-muted leading-relaxed">
                      {snippet.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-dark-subtle hover:text-dark-text hover:bg-white/5 light:hover:bg-slate-100 transition-colors shrink-0"
                  title="Close modal (Esc)"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Body: Split into Code Area and Metadata Inspector */}
              <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                {/* Left: Code Viewer Panel */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#0c0e15] dark:bg-[#0c0e15] light:bg-[#0f172a] text-dark-text">
                  {/* Code Toolbar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-[#121622] dark:bg-[#121622] light:bg-slate-900 border-b border-dark-border/40 text-xs">
                    <div className="flex items-center gap-2 text-dark-subtle font-mono text-[11px]">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      <span className="ml-1 text-dark-muted font-sans font-medium">
                        {langConfig.ext ? `${snippet.title.toLowerCase().replace(/\s+/g, '_')}.${langConfig.ext}` : 'snippet.txt'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setWordWrap(!wordWrap)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                          wordWrap
                            ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                            : 'text-dark-subtle hover:text-dark-text'
                        }`}
                        title="Toggle Word Wrap"
                      >
                        <FiAlignLeft className="text-xs" />
                        <span className="hidden sm:inline">Wrap</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyClick}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
                          copied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 border border-brand-500/30'
                        }`}
                        title="Copy code"
                      >
                        {copied ? <FiCheck className="text-xs" /> : <FiCopy className="text-xs" />}
                        <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadFile}
                        className="p-1.5 rounded text-dark-subtle hover:text-dark-text hover:bg-white/5 transition-colors"
                        title="Download file"
                      >
                        <FiDownload className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Code Scrollable Area */}
                  <div className={`flex-1 overflow-auto p-2 font-mono ${wordWrap ? 'whitespace-pre-wrap break-all' : ''}`}>
                    <CodeViewer
                      code={snippet.code}
                      language={snippet.language}
                      showLineNumbers={true}
                      className="min-h-full"
                    />
                  </div>
                </div>

                {/* Right: Inspector Sidebar */}
                <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-dark-border/60 dark:border-dark-border/60 light:border-light-border bg-dark-surface dark:bg-dark-surface light:bg-slate-50 p-5 space-y-6 overflow-y-auto shrink-0">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-subtle light:text-light-subtle mb-2.5">
                      Tags & Categories
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {snippet.tags?.map((tag) => (
                        <Badge key={tag} size="sm">
                          {tag}
                        </Badge>
                      ))}
                      {(!snippet.tags || snippet.tags.length === 0) && (
                        <span className="text-xs text-dark-subtle">No tags specified</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-subtle light:text-light-subtle mb-2.5">
                      Code Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-dark-card/60 dark:bg-dark-card/60 light:bg-white border border-dark-border/60 light:border-slate-200">
                        <span className="text-dark-subtle block text-[11px]">Total Lines</span>
                        <span className="text-base font-bold font-mono text-dark-text light:text-light-text">
                          {metrics.lines}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-dark-card/60 dark:bg-dark-card/60 light:bg-white border border-dark-border/60 light:border-slate-200">
                        <span className="text-dark-subtle block text-[11px]">Characters</span>
                        <span className="text-base font-bold font-mono text-dark-text light:text-light-text">
                          {metrics.characters}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-subtle light:text-light-subtle mb-2">
                      Timeline
                    </h4>
                    <div className="flex items-center gap-2 text-dark-muted light:text-slate-600">
                      <FiCalendar className="text-dark-subtle shrink-0" />
                      <span>Created: {formatDate(snippet.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-dark-muted light:text-slate-600">
                      <FiClock className="text-dark-subtle shrink-0" />
                      <span>Updated: {formatTimeAgo(snippet.updatedAt || snippet.createdAt)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-dark-border/60 dark:border-dark-border/60 light:border-slate-200 space-y-2">
                    {onDuplicate && (
                      <Button
                        variant="secondary"
                        icon={FiDuplicate}
                        onClick={() => {
                          onDuplicate(snippet);
                          onClose();
                        }}
                        className="w-full text-xs justify-start"
                      >
                        Duplicate Snippet
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="secondary"
                        icon={FiEdit2}
                        onClick={() => {
                          onEdit(snippet);
                          onClose();
                        }}
                        className="w-full text-xs justify-start"
                      >
                        Edit Details
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="danger"
                        icon={FiTrash2}
                        onClick={() => {
                          onDelete(snippet);
                          onClose();
                        }}
                        className="w-full text-xs justify-start"
                      >
                        Delete Snippet
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
