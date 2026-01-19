import React, { useState, useEffect } from 'react';
import { PlusIcon, FlaskIcon, BookIcon, RocketIcon, SearchIcon } from './icons';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  shortcut?: string;
}

interface QuickActionsProps {
  onNewPost: () => void;
  onNewExperiment: () => void;
  onOpenPlaybooks: () => void;
  onSearch: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onNewPost,
  onNewExperiment,
  onOpenPlaybooks,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const actions: QuickAction[] = [
    {
      id: 'new-post',
      label: 'New Post',
      icon: <PlusIcon size={20} />,
      action: onNewPost,
      color: 'from-violet-600 to-purple-600',
      shortcut: 'N'
    },
    {
      id: 'new-experiment',
      label: 'New Experiment',
      icon: <FlaskIcon size={20} />,
      action: onNewExperiment,
      color: 'from-amber-600 to-orange-600',
      shortcut: 'E'
    },
    {
      id: 'browse-playbooks',
      label: 'Browse Playbooks',
      icon: <BookIcon size={20} />,
      action: onOpenPlaybooks,
      color: 'from-cyan-600 to-blue-600',
      shortcut: 'P'
    },
    {
      id: 'search',
      label: 'Search',
      icon: <SearchIcon size={20} />,
      action: onSearch,
      color: 'from-emerald-600 to-teal-600',
      shortcut: '/'
    }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toUpperCase();
      
      // Show shortcuts help with ?
      if (e.key === '?') {
        setShowShortcuts(true);
        return;
      }

      // Close shortcuts help with Escape
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setIsOpen(false);
        return;
      }

      const action = actions.find(a => a.shortcut === key);
      if (action) {
        action.action();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [actions]);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Expanded Actions */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 mb-2 space-y-2 animate-fadeIn">
            {actions.map((action, index) => (
              <button
                key={action.id}
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 bg-white text-neutral-900 rounded-lg shadow-lg border border-neutral-200 hover:bg-neutral-50 transition-all min-w-[180px]"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                  {action.icon}
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm font-medium block">{action.label}</span>
                  {action.shortcut && (
                    <span className="text-xs text-neutral-500">Press {action.shortcut}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 bg-neutral-900 text-white rounded-full shadow-lg hover:bg-neutral-800 transition-all ${
            isOpen ? 'rotate-45' : ''
          } flex items-center justify-center`}
        >
          <RocketIcon size={24} className={isOpen ? 'rotate-[-45deg]' : ''} />
        </button>

        {/* Keyboard Shortcuts Hint */}
        <button
          onClick={() => setShowShortcuts(true)}
          className="absolute -top-2 -left-2 w-6 h-6 bg-white border border-neutral-200 rounded-full text-neutral-500 hover:text-neutral-900 text-xs flex items-center justify-center transition-colors shadow-sm"
          title="Keyboard shortcuts"
        >
          ?
        </button>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setShowShortcuts(false)}>
          <div className="bg-white rounded-xl border border-neutral-200 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-neutral-100">
              <h3 className="text-neutral-900 font-semibold">⌨️ Keyboard Shortcuts</h3>
              <p className="text-sm text-neutral-500 mt-1">Navigate faster with these shortcuts</p>
            </div>
            
            <div className="p-5 space-y-3">
              {actions.map((action) => (
                <div key={action.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                      {action.icon}
                    </div>
                    <span className="text-sm text-neutral-900">{action.label}</span>
                  </div>
                  {action.shortcut && (
                    <kbd className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded text-xs text-neutral-600 font-mono">
                      {action.shortcut}
                    </kbd>
                  )}
                </div>
              ))}
              
              <div className="pt-3 border-t border-neutral-100 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Show this help</span>
                  <kbd className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded text-xs text-neutral-600 font-mono">
                    ?
                  </kbd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Close dialogs</span>
                  <kbd className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded text-xs text-neutral-600 font-mono">
                    ESC
                  </kbd>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-neutral-100">
              <button
                onClick={() => setShowShortcuts(false)}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-sm text-white font-medium transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;
