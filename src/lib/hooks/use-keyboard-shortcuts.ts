import { useEffect } from 'react';

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  handler: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutHandler[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Check if the active element is an input or textarea
      const isInputActive = document.activeElement instanceof HTMLInputElement || 
                          document.activeElement instanceof HTMLTextAreaElement;

      // Don't trigger shortcuts when typing in input fields
      if (isInputActive) return;

      shortcuts.forEach(shortcut => {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : true;
        const altMatch = shortcut.alt ? event.altKey : true;
        const shiftMatch = shortcut.shift ? event.shiftKey : true;

        if (keyMatch && ctrlMatch && altMatch && shiftMatch) {
          event.preventDefault();
          shortcut.handler();
        }
      });
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Predefined shortcuts for common actions
export const COMMON_SHORTCUTS = {
  SEARCH: { key: 'k', ctrl: true },
  NEW: { key: 'n', ctrl: true },
  SAVE: { key: 's', ctrl: true },
  CLOSE: { key: 'escape' },
} as const;
