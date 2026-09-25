import React, { useState } from 'react';
import { 
  FiStar, 
  FiCopy, 
  FiCheck, 
  FiEdit2, 
  FiTrash2, 
  FiCopy as FiDuplicate,
  FiMaximize2,
  FiClock
} from 'react-icons/fi';
import { Badge } from '../common/Badge';
import { CodeViewer } from '../common/CodeViewer';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import { formatTimeAgo } from '../../utils/formatters';

/**
 * Modern Snippet Card Component
 * Supports both Grid and List layouts
 */
export function SnippetCard({
  snippet,
  viewMode = 'grid',
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleFavorite,
  onCopy,
}) {
  const [copied, setCopied] = useState(false);

  const langConfig = SUPPORTED_LANGUAGES.find(
    (l) => l.id === snippet.language
  ) || {
    id: snippet.language,
    name: snippet.language.toUpperCase(),
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.12)',
    border: 'rgba(148, 163, 184, 0.3)',
  };

  const handleCopyClick = (e) => {
    e.stopPropagation();
    if (onCopy) {
      onCopy(snippet.code);
    } else {
      navigator.clipboard.writeText(snippet.code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compact List View Layout
  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onSelect(snippet)}
        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-dark-border dark:border-dark-border light:border-light-border bg-dark-card/90 dark:bg-dark-card/90 light:bg-white hover:border-dark-borderLight hover:bg-dark-cardHover transition-all duration-150 cursor-pointer shadow-sm hover:shadow-glow-sm"
      >
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(snippet.id);
            }}
            className={`p-1.5 rounded-md hover:bg-white/10 transition-colors shrink-0 ${
              snippet.isFavorite ? 'text-amber-400' : 'text-dark-subtle hover:text-dark-text'
            }`}
            title={snippet.isFavorite ? 'Unstar' : 'Star'}
          >
            <FiStar className={`text-base ${snippet.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Info */}
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-dark-text light:text-light-text group-hover:text-brand-400 transition-colors truncate">
                {snippet.title}
              </h4>
              <Badge
                color={langConfig.color}
                bgColor={langConfig.bg}
                borderColor={langConfig.border}
                size="xs"
                dot
              >
                {langConfig.name}
              </Badge>
            </div>
            {snippet.description && (
              <p className="text-xs text-dark-subtle light:text-light-subtle line-clamp-1">
                {snippet.description}
              </p>
            )}
          </div>
        </div>

        {/* Tags & Actions */}
        <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
          <div className="hidden md:flex items-center gap-1.5 max-w-[200px] overflow-hidden">
            {snippet.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} size="xs">
                {tag}
              </Badge>
            ))}
            {snippet.tags?.length > 2 && (
              <span className="text-[10px] text-dark-subtle">+{snippet.tags.length - 2}</span>
            )}
          </div>

          <div className="text-[11px] text-dark-subtle font-mono hidden lg:flex items-center gap-1">
            <FiClock className="text-xs" />
            {formatTimeAgo(snippet.updatedAt || snippet.createdAt)}
          </div>

          {/* Quick Action Icons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopyClick}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                copied
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'text-dark-subtle hover:text-dark-text border-transparent hover:bg-white/5'
              }`}
              title="Copy Code"
            >
              {copied ? <FiCheck className="text-sm" /> : <FiCopy className="text-sm" />}
            </button>
            {onDuplicate && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(snippet);
                }}
                className="p-1.5 rounded-lg text-dark-subtle hover:text-dark-text hover:bg-white/5 transition-colors"
                title="Duplicate Snippet"
              >
                <FiDuplicate className="text-sm" />
              </button>
            )}
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(snippet);
                }}
                className="p-1.5 rounded-lg text-dark-subtle hover:text-brand-400 hover:bg-white/5 transition-colors"
                title="Edit Snippet"
              >
                <FiEdit2 className="text-sm" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(snippet);
                }}
                className="p-1.5 rounded-lg text-dark-subtle hover:text-rose-400 hover:bg-white/5 transition-colors"
                title="Delete Snippet"
              >
                <FiTrash2 className="text-sm" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Card Grid View Layout
  return (
    <div
      onClick={() => onSelect(snippet)}
      className="group relative flex flex-col rounded-xl border border-dark-border dark:border-dark-border light:border-light-border bg-dark-card/90 dark:bg-dark-card/90 light:bg-white hover:border-dark-borderLight hover:bg-dark-cardHover/70 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-glow-sm hover:-translate-y-1"
    >
      {/* Top Card Header */}
      <div className="p-4 pb-3 flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              color={langConfig.color}
              bgColor={langConfig.bg}
              borderColor={langConfig.border}
              size="xs"
              dot
            >
              {langConfig.name}
            </Badge>
            <span className="text-[11px] text-dark-subtle font-mono">
              {formatTimeAgo(snippet.updatedAt || snippet.createdAt)}
            </span>
          </div>
          <h4 className="text-sm font-semibold tracking-tight text-dark-text light:text-light-text group-hover:text-brand-400 transition-colors line-clamp-1">
            {snippet.title}
          </h4>
          {snippet.description && (
            <p className="text-xs text-dark-muted light:text-light-muted line-clamp-2 leading-relaxed">
              {snippet.description}
            </p>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(snippet.id);
          }}
          className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0 ${
            snippet.isFavorite ? 'text-amber-400' : 'text-dark-subtle hover:text-dark-text'
          }`}
          title={snippet.isFavorite ? 'Remove Favorite' : 'Mark as Favorite'}
        >
          <FiStar className={`text-base ${snippet.isFavorite ? 'fill-amber-400' : ''}`} />
        </button>
      </div>

      {/* Code Preview Box with VS Code Style Header */}
      <div className="px-4 py-1 flex-1">
        <div className="rounded-lg overflow-hidden border border-dark-border/80 dark:border-dark-border/80 light:border-slate-200 bg-[#0d1017] dark:bg-[#0d1017] light:bg-slate-900">
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#141824] dark:bg-[#141824] light:bg-slate-800 border-b border-dark-border/50 text-[10px] text-dark-subtle">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-dark-subtle/80 lowercase">
              {langConfig.ext ? `snippet.${langConfig.ext}` : 'snippet.txt'}
            </span>
          </div>
          <CodeViewer
            code={snippet.code}
            language={snippet.language}
            maxLines={4}
            showLineNumbers={false}
          />
        </div>
      </div>

      {/* Card Footer: Tags & Quick Actions */}
      <div className="p-4 pt-3 mt-auto border-t border-dark-border/40 dark:border-dark-border/40 light:border-slate-100 flex items-center justify-between gap-2">
        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap min-w-0 flex-1">
          {snippet.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} size="xs">
              {tag}
            </Badge>
          ))}
          {snippet.tags?.length > 3 && (
            <span className="text-[10px] text-dark-subtle font-mono">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleCopyClick}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              copied
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'text-dark-subtle hover:text-dark-text border-transparent hover:bg-white/5'
            }`}
            title="Copy Code to Clipboard"
          >
            {copied ? <FiCheck className="text-sm" /> : <FiCopy className="text-sm" />}
          </button>
          {onDuplicate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(snippet);
              }}
              className="p-1.5 rounded-lg text-dark-subtle hover:text-dark-text hover:bg-white/5 transition-colors"
              title="Duplicate Snippet"
            >
              <FiDuplicate className="text-sm" />
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(snippet);
              }}
              className="p-1.5 rounded-lg text-dark-subtle hover:text-brand-400 hover:bg-white/5 transition-colors"
              title="Edit Snippet"
            >
              <FiEdit2 className="text-sm" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(snippet);
              }}
              className="p-1.5 rounded-lg text-dark-subtle hover:text-rose-400 hover:bg-white/5 transition-colors"
              title="Delete Snippet"
            >
              <FiTrash2 className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
