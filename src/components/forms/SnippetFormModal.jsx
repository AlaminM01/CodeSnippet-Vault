import React, { useEffect } from 'react';
import { FiX, FiPlus, FiEdit2 } from 'react-icons/fi';
import { SnippetForm } from './SnippetForm';

/**
 * Modal Wrapper for Snippet Creation and Editing
 */
export function SnippetFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) {
  const isEditing = Boolean(initialData);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div
          className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-dark-surface dark:bg-dark-surface light:bg-white border border-dark-border dark:border-dark-border light:border-light-border p-6 text-left align-middle shadow-2xl transition-all relative animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-dark-border/60 dark:border-dark-border/60 light:border-light-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center text-lg">
                {isEditing ? <FiEdit2 /> : <FiPlus />}
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-dark-text light:text-light-text">
                  {isEditing ? 'Edit Code Snippet' : 'Create New Snippet'}
                </h3>
                <p className="text-xs text-dark-subtle light:text-light-subtle">
                  {isEditing
                    ? 'Update snippet details, code, and categorization'
                    : 'Save a reusable code pattern into your local vault'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-dark-subtle hover:text-dark-text hover:bg-white/5 light:hover:bg-slate-100 transition-colors"
              title="Close modal (Esc)"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Form */}
          <SnippetForm
            initialData={initialData}
            onSubmit={(formData) => {
              onSubmit(formData);
              onClose();
            }}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
