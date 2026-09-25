import React from 'react';
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';

/**
 * Modern Toast Notification Component
 */
export function Toast({
  id,
  type = 'success',
  message,
  onDismiss,
}) {
  const icons = {
    success: FiCheckCircle,
    info: FiInfo,
    error: FiAlertCircle,
  };

  const styles = {
    success: 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200 shadow-glow-emerald',
    info: 'border-brand-500/30 bg-brand-950/80 text-brand-200 shadow-glow-sm',
    error: 'border-rose-500/30 bg-rose-950/80 text-rose-200',
  };

  const Icon = icons[type] || FiCheckCircle;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl text-xs sm:text-sm font-medium animate-slide-up transition-all ${styles[type]}`}
    >
      <Icon className="text-base shrink-0" />
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={() => onDismiss(id)}
          className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity ml-2"
        >
          <FiX className="text-sm" />
        </button>
      )}
    </div>
  );
}
