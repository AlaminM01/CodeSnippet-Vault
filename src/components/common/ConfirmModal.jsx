import React, { useEffect } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { Button } from './Button';

/**
 * Modern Confirmation Dialog Modal
 */
export function ConfirmModal({
  isOpen,
  title = 'Delete Snippet',
  message = 'Are you sure you want to delete this snippet? This action cannot be undone.',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isDanger = true,
  onConfirm,
  onClose,
  isLoading = false,
}) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className="w-full max-w-md transform overflow-hidden rounded-2xl bg-dark-surface dark:bg-dark-surface light:bg-white border border-dark-border dark:border-dark-border light:border-light-border p-6 text-left align-middle shadow-2xl transition-all relative animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  isDanger
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                <FiAlertTriangle />
              </div>
              <h3 className="text-base font-semibold text-dark-text light:text-light-text">
                {title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-dark-subtle hover:text-dark-text hover:bg-white/5 light:hover:bg-slate-100 transition-colors"
            >
              <FiX className="text-base" />
            </button>
          </div>

          <p className="text-xs text-dark-muted light:text-slate-600 leading-relaxed mb-6">
            {message}
          </p>

          <div className="flex items-center justify-end gap-2.5">
            <Button variant="secondary" size="sm" onClick={onClose}>
              {cancelLabel}
            </Button>
            <Button
              variant={isDanger ? 'danger' : 'primary'}
              size="sm"
              isLoading={isLoading}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
