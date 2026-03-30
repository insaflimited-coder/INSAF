import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from 'react';
import { Toast } from './types';

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());

  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    const timeoutId = window.setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
      timersRef.current.delete(id);
    }, 3500);

    timersRef.current.set(id, timeoutId);
  }, []);

  const removeToast = useCallback((id: string) => {
    const timeoutId = timersRef.current.get(id);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timersRef.current.delete(id);
    }
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup timers to avoid updating unmounted state.
      for (const timeoutId of timersRef.current.values()) window.clearTimeout(timeoutId);
      timersRef.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-5 py-3 rounded-xl shadow-lg text-white font-medium text-sm flex items-center gap-2 animate-slide-in backdrop-blur-sm ${
              toast.type === 'success' ? 'bg-emerald-500/90' :
              toast.type === 'error' ? 'bg-red-500/90' :
              toast.type === 'warning' ? 'bg-amber-500/90' :
              'bg-blue-500/90'
            }`}
            onClick={() => removeToast(toast.id)}
          >
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '❌'}
            {toast.type === 'warning' && '⚠️'}
            {toast.type === 'info' && 'ℹ️'}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
