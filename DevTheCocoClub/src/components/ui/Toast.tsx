import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-jacobean text-lace px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-in slide-in-from-bottom-5">
      <div className="w-7 h-7 rounded-full bg-redRobin flex items-center justify-center text-white shrink-0">
        <Sparkles className="w-4 h-4" />
      </div>
      <p className="text-xs sm:text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
