'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useKeyboardShortcuts, COMMON_SHORTCUTS } from '@/lib/hooks/use-keyboard-shortcuts';

interface ShortcutItem {
  key: string;
  description: string;
}

const SHORTCUTS: ShortcutItem[] = [
  { key: '⌘/Ctrl + K', description: 'Search ideas' },
  { key: '⌘/Ctrl + N', description: 'Create new idea' },
  { key: '⌘/Ctrl + S', description: 'Save changes' },
  { key: 'Esc', description: 'Close modal' },
  { key: '←/→', description: 'Navigate between ideas' },
  { key: 'Space', description: 'Select/deselect idea' },
];

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useKeyboardShortcuts([
    {
      ...COMMON_SHORTCUTS.CLOSE,
      handler: () => setIsOpen(false),
    },
  ]);

  // Prevent scrolling when modal is open
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

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <Button
          variant="outline"
          className="bg-white"
          onClick={() => setIsOpen(true)}
        >
          ⌘ Keyboard Shortcuts
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Keyboard Shortcuts</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {SHORTCUTS.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-gray-600">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-sm font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono">Esc</kbd> to close this modal
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
