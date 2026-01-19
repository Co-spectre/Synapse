import React, { useState } from 'react';
import { CloseIcon, LightbulbIcon, AlertIcon, ChevronRightIcon, ChevronLeftIcon, RocketIcon, ImageIcon } from './icons';

// Random corporate stock images from Unsplash
const corporateImages = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop', // Team collaboration
  'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=400&fit=crop', // Office meeting
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop', // Professional work
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=400&fit=crop', // Business meeting
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop', // Team discussion
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=400&fit=crop', // Modern office
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop', // Strategy session
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop', // Coworking
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop', // Tech team
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop', // Presentation
];

interface NewPostComposerProps {
  onSubmit: (post: { title: string; content: string; limitation: string; image?: string }) => void;
  onCancel: () => void;
}

export const NewPostComposer: React.FC<NewPostComposerProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [limitation, setLimitation] = useState('');
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ 
        title: title.trim(), 
        content: content.trim(), 
        limitation: limitation.trim(),
        image: selectedImage || undefined
      });
    }
  };

  const handleRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * corporateImages.length);
    setSelectedImage(corporateImages[randomIndex]);
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
            <div className="space-y-4">
              <div>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-neutral-700">Explain in simple terms</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe what you built and why it matters..."
                  rows={3}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-neutral-900 placeholder-neutral-400 resize-none"
                  autoFocus
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-neutral-700">Add an image (optional)</span>
                </label>
                
                {selectedImage ? (
                  <div className="relative rounded-lg overflow-hidden border border-neutral-200">
                    <img 
                      src={selectedImage} 
                      alt="Post preview" 
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 p-1.5 bg-neutral-900/70 hover:bg-neutral-900 text-white rounded-lg transition-colors"
                    >
                      <CloseIcon size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleRandomImage}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-50 border border-neutral-200 border-dashed rounded-lg hover:bg-neutral-100 transition-colors text-neutral-600"
                    >
                      <ImageIcon size={18} />
                      <span className="text-sm font-medium">Add Stock Image</span>
                    </button>
                  </div>
                )}
              </div>

              <p className="text-sm text-neutral-500">
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
