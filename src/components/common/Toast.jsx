import React from 'react';
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

/**
 * Animated Modern Toast Component
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
    success: 'border-emerald-500/30 bg-emerald-950/90 text-emerald-200 shadow-glow-emerald',
    info: 'border-brand-500/30 bg-brand-950/90 text-brand-200 shadow-glow-sm',
    error: 'border-rose-500/30 bg-rose-950/90 text-rose-200',
  };

  const Icon = icons[type] || FiCheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl text-xs sm:text-sm font-medium transition-all ${styles[type]}`}
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
    </motion.div>
  );
}
