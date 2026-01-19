import React, { useState } from 'react';
import { CloseIcon, LightbulbIcon, AlertIcon, ChevronRightIcon, ChevronLeftIcon, RocketIcon } from './icons';

interface NewPostComposerProps {
  onSubmit: (post: { title: string; content: string; limitation: string }) => void;
  onCancel: () => void;
}

export const NewPostComposer: React.FC<NewPostComposerProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [limitation, setLimitation] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title: title.trim(), content: content.trim(), limitation: limitation.trim() });
    }
  };

  const isStepValid = () => {
    if (step === 1) return title.trim().length > 0;
    if (step === 2) return content.trim().length > 0;
    return true;
  };

  return (
    <div className="mt-6 bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
              <LightbulbIcon className="text-white" size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Share an Update</h3>
              <p className="text-sm text-neutral-500">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <CloseIcon className="text-neutral-400" size={18} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex gap-1.5 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                s <= step ? 'bg-neutral-900' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-5">
          {/* Step 1: Title */}
          {step === 1 && (
            <div>
              <label className="block mb-2">
                <span className="text-sm font-medium text-neutral-700">Give it a clear title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., New Feature: Smart Search"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-neutral-900 placeholder-neutral-400"
                autoFocus
              />
              <p className="mt-2 text-sm text-neutral-500">
                Keep it concise and descriptive
              </p>
            </div>
          )}

          {/* Step 2: Content */}
          {step === 2 && (
            <div>
              <label className="block mb-2">
                <span className="text-sm font-medium text-neutral-700">Explain in simple terms</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe what you built and why it matters..."
                rows={4}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-neutral-900 placeholder-neutral-400 resize-none"
                autoFocus
              />
              <p className="mt-2 text-sm text-neutral-500">
                Focus on the benefit to users, not technical details
              </p>
            </div>
          )}

          {/* Step 3: Limitation */}
          {step === 3 && (
            <div>
              <label className="block mb-2">
                <span className="text-sm font-medium text-neutral-700">Any limitations to note?</span>
              </label>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 mb-3">
                <div className="flex gap-2 items-start">
                  <AlertIcon className="text-amber-600 flex-shrink-0 mt-0.5" size={14} />
                  <p className="text-sm text-amber-700">
                    Being transparent about limitations builds trust. What should people know?
                  </p>
                </div>
              </div>
              <textarea
                value={limitation}
                onChange={(e) => setLimitation(e.target.value)}
                placeholder="e.g., Works best with English text..."
                rows={3}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-neutral-900 placeholder-neutral-400 resize-none"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="px-5 pb-5 flex gap-2">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 px-4 py-2.5 text-neutral-600 text-sm font-medium rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <ChevronLeftIcon size={16} />
              <span>Back</span>
            </button>
          )}
          
          <div className="flex-1" />
          
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!isStepValid()}
              className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isStepValid()
                  ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                  : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              <ChevronRightIcon size={16} />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <RocketIcon size={16} />
              <span>Publish</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPostComposer;
