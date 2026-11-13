import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 rounded-2xl border border-primary/40 bg-card px-4 py-3 shadow-2xl text-xs font-medium text-foreground backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-primary shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
