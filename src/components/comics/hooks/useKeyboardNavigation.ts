// hooks/useKeyboardNavigation.ts
import { useEffect } from 'react';

export function useKeyboardNavigation(
  onNext: () => void,
  onPrev: () => void,
  onClose: () => void,
  isEnabled: boolean
) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          onPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose, isEnabled]);
}
