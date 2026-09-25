import React, { useState } from 'react';
import { FiCode, FiStar, FiTag, FiPlus, FiAlertCircle } from 'react-icons/fi';
import { SUPPORTED_LANGUAGES, DEFAULT_TAGS } from '../../constants/languages';
import { Button, Input, TextArea, Badge } from '../common';
import { getCodeMetrics } from '../../utils/formatters';

/**
 * Reusable Snippet Form for both Creation and Editing
 */
export function SnippetForm({
  initialData = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [language, setLanguage] = useState(initialData?.language || 'javascript');
  const [customLanguage, setCustomLanguage] = useState(initialData?.customLanguage || '');
  const [tags, setTags] = useState(initialData?.tags || ['Utility']);
  const [tagInput, setTagInput] = useState('');
  const [code, setCode] = useState(initialData?.code || '');
  const [isFavorite, setIsFavorite] = useState(initialData?.isFavorite || false);

  const [errors, setErrors] = useState({});

  const codeMetrics = getCodeMetrics(code);

  // Handle Tab key in code textarea to insert 2 spaces
  const handleCodeKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      // Move cursor after the inserted 2 spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
    // Ctrl + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Add tag
  const handleAddTag = (tagToAdd) => {
    const trimmed = (tagToAdd || tagInput).trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Handle Tag Input KeyDown
  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      handleRemoveTag(tags[tags.length - 1]);
    }
  };

  // Validate and submit
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!code.trim()) {
      newErrors.code = 'Code content is required';
    }
    if (language === 'other' && !customLanguage.trim()) {
      newErrors.customLanguage = 'Please specify the custom language name';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      language: language === 'other' ? (customLanguage.trim().toLowerCase() || 'other') : language,
      customLanguage: language === 'other' ? customLanguage.trim() : undefined,
      tags: tags.length > 0 ? tags : ['General'],
      code,
      isFavorite,
    });
  };

  // Tag suggestions that aren't already added
  const suggestedTags = DEFAULT_TAGS.filter((t) => !tags.includes(t)).slice(0, 5);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title & Favorite Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 w-full">
          <Input
            label="Snippet Title *"
            placeholder="e.g. useDebounce Custom React Hook"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: null });
            }}
            error={errors.title}
            autoFocus
          />
        </div>
        <div className="pt-2 sm:pt-4">
          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
              isFavorite
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-sm'
                : 'bg-dark-surface dark:bg-dark-surface light:bg-slate-100 text-dark-muted border-dark-border light:border-slate-200 hover:text-dark-text'
            }`}
            title="Toggle favorite status"
          >
            <FiStar className={`text-sm ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isFavorite ? 'Starred' : 'Star'}</span>
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <Input
          label="Short Description"
          placeholder="Briefly explain what this code snippet does and when to use it..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Language Selector & Custom Language */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted light:text-light-muted mb-1.5">
            Programming Language *
          </label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              if (errors.customLanguage) setErrors({ ...errors, customLanguage: null });
            }}
            className="w-full rounded-lg bg-dark-surface dark:bg-dark-surface light:bg-white border border-dark-border dark:border-dark-border light:border-light-border text-sm text-dark-text light:text-light-text px-3.5 py-2 transition-all focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {language === 'other' && (
          <div>
            <Input
              label="Custom Language Name *"
              placeholder="e.g. Rust, Go, Swift, Ruby, Kotlin"
              value={customLanguage}
              onChange={(e) => {
                setCustomLanguage(e.target.value);
                if (errors.customLanguage) setErrors({ ...errors, customLanguage: null });
              }}
              error={errors.customLanguage}
            />
          </div>
        )}
      </div>

      {/* Tags Management */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted light:text-light-muted mb-1.5">
          Tags & Categories
        </label>
        <div className="p-2.5 rounded-lg bg-dark-surface dark:bg-dark-surface light:bg-white border border-dark-border dark:border-dark-border light:border-light-border space-y-2">
          {/* Active Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 min-h-[28px]">
            {tags.map((tag) => (
              <Badge
                key={tag}
                size="sm"
                onRemove={() => handleRemoveTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder={tags.length === 0 ? "Type tag name and press Enter..." : "Add tag..."}
              className="flex-1 min-w-[120px] bg-transparent text-xs text-dark-text light:text-light-text placeholder:text-dark-subtle light:placeholder:text-slate-400 focus:outline-none px-1"
            />
          </div>

          {/* Quick suggestions */}
          {suggestedTags.length > 0 && (
            <div className="pt-2 border-t border-dark-border/40 light:border-slate-100 flex items-center gap-1.5 text-[11px] text-dark-subtle">
              <span className="shrink-0">Suggestions:</span>
              <div className="flex flex-wrap gap-1">
                {suggestedTags.map((suggested) => (
                  <button
                    key={suggested}
                    type="button"
                    onClick={() => handleAddTag(suggested)}
                    className="hover:text-brand-400 hover:underline transition-colors"
                  >
                    +{suggested}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code Editor Area */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-dark-muted light:text-light-muted flex items-center gap-1.5">
            <FiCode className="text-brand-400" /> Code Snippet *
          </label>
          <div className="text-[11px] font-mono text-dark-subtle light:text-light-subtle flex items-center gap-3">
            <span>{codeMetrics.lines} {codeMetrics.lines === 1 ? 'line' : 'lines'}</span>
            <span>•</span>
            <span>{codeMetrics.characters} chars</span>
            <span className="hidden sm:inline text-dark-muted light:text-slate-400">• Press Tab to indent</span>
          </div>
        </div>

        <div className="relative font-mono">
          <textarea
            rows={12}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (errors.code) setErrors({ ...errors, code: null });
            }}
            onKeyDown={handleCodeKeyDown}
            placeholder="// Paste or write your code snippet here...&#10;// Supports multi-line code, indentation, and formatting"
            className={`w-full rounded-lg bg-dark-card dark:bg-[#0f121a] light:bg-[#f8fafc] border text-xs sm:text-sm text-dark-text light:text-slate-800 p-4 font-mono leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all ${
              errors.code
                ? 'border-rose-500/60 focus:ring-rose-500'
                : 'border-dark-border dark:border-dark-border light:border-light-border'
            }`}
          />
        </div>
        {errors.code && (
          <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
            <FiAlertCircle className="text-xs" /> {errors.code}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-dark-border/60 dark:border-dark-border/60 light:border-light-border">
        <span className="text-[11px] text-dark-subtle light:text-light-subtle hidden sm:inline font-mono">
          Tip: Press <kbd className="bg-dark-card px-1.5 py-0.5 rounded border border-dark-border">Ctrl + Enter</kbd> to save
        </span>
        <div className="flex items-center gap-2.5 ml-auto">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="shadow-glow-sm"
          >
            {isEditing ? 'Save Changes' : 'Create Snippet'}
          </Button>
        </div>
      </div>
    </form>
  );
}
