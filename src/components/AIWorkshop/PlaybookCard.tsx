import React, { useState } from 'react';
import { BookIcon, ClockIcon, UserIcon, ChevronRightIcon, CheckCircleIcon, StarIcon } from './icons';

interface Playbook {
  id: number;
  title: string;
  description: string;
  timeToLearn: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  adoptionRate: number;
  steps: string[];
  outcomes: string[];
  author: string;
  category: string;
}

interface PlaybookCardProps {
  playbook: Playbook;
  userProgress?: number;
  onStart: () => void;
}

export const PlaybookCard: React.FC<PlaybookCardProps> = ({
  playbook,
  userProgress = 0,
  onStart,
}) => {
  const [expanded, setExpanded] = useState(false);

  const difficultyConfig = {
    beginner: { label: 'Beginner', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    intermediate: { label: 'Intermediate', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    advanced: { label: 'Advanced', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  };

  const difficulty = difficultyConfig[playbook.difficulty];

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-all">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center">
              <BookIcon className="text-white" size={24} />
            </div>
            <div>
              <span className="text-xs text-neutral-500 uppercase tracking-wider">{playbook.category}</span>
              <h3 className="text-neutral-900 font-semibold">{playbook.title}</h3>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficulty.color}`}>
            {difficulty.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 mb-4">{playbook.description}</p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <ClockIcon size={14} />
            <span>{playbook.timeToLearn}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <UserIcon size={14} />
            <span>{playbook.adoptionRate}% adoption</span>
          </div>
          <div className="flex items-center gap-1.5">
            <StarIcon size={14} className="text-amber-500" />
            <span className="text-amber-600">{playbook.steps.length} steps</span>
          </div>
        </div>

        {/* Progress Bar (if started) */}
        {userProgress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-500">Your progress</span>
              <span className="text-neutral-900 font-medium">{userProgress}%</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-900 rounded-full transition-all duration-500"
                style={{ width: `${userProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Expandable Content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-neutral-100 space-y-4 animate-fadeIn">
            {/* Steps */}
            <div>
              <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">Steps to Follow</h4>
              <ol className="space-y-2">
                {playbook.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center text-xs text-neutral-500 flex-shrink-0 font-medium">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Outcomes */}
            <div>
              <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">Expected Outcomes</h4>
              <ul className="space-y-2">
                {playbook.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-sm text-emerald-700">
                    <CheckCircleIcon size={16} className="flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Author */}
            <div className="pt-3 border-t border-neutral-100">
              <p className="text-xs text-neutral-500">
                Created by <span className="text-neutral-700">{playbook.author}</span>
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={onStart}
            className="flex-1 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-all"
          >
            {userProgress > 0 ? 'Continue Learning' : 'Start Playbook'}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-600 transition-colors"
          >
            <ChevronRightIcon size={18} className={`transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Playbooks List Component
interface PlaybooksListProps {
  playbooks: Playbook[];
  userProgressMap?: Record<number, number>;
  onStartPlaybook: (id: number) => void;
}

export const PlaybooksList: React.FC<PlaybooksListProps> = ({
  playbooks,
  userProgressMap = {},
  onStartPlaybook,
}) => {
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  
  const filteredPlaybooks = filter === 'all' 
    ? playbooks 
    : playbooks.filter(p => p.difficulty === filter);

  const inProgressCount = playbooks.filter(p => (userProgressMap[p.id] || 0) > 0 && userProgressMap[p.id] < 100).length;
  const completedCount = playbooks.filter(p => userProgressMap[p.id] === 100).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
              <BookIcon className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">AI Partnership Playbooks</h2>
              <p className="text-xs text-neutral-500">Actionable workflows to level up your AI skills</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-neutral-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-neutral-900">{playbooks.length}</p>
            <p className="text-xs text-neutral-500">Available</p>
          </div>
          <div className="bg-neutral-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-amber-600">{inProgressCount}</p>
            <p className="text-xs text-neutral-500">In Progress</p>
          </div>
          <div className="bg-neutral-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-emerald-600">{completedCount}</p>
            <p className="text-xs text-neutral-500">Completed</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === level
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Playbooks Grid */}
      <div className="space-y-4">
        {filteredPlaybooks.map((playbook) => (
          <PlaybookCard
            key={playbook.id}
            playbook={playbook}
            userProgress={userProgressMap[playbook.id] || 0}
            onStart={() => onStartPlaybook(playbook.id)}
          />
        ))}
      </div>

      {filteredPlaybooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No playbooks found for this difficulty level</p>
        </div>
      )}
    </div>
  );
};

export default PlaybookCard;
