import React, { useState } from 'react';
import { BookIcon, ClockIcon, UserIcon, ChevronRightIcon, CheckCircleIcon, StarIcon, SparkleIcon } from './icons';
import { PlaybookLesson, playbookLessons } from './PlaybookLesson';

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
  hasInteractiveLesson?: boolean;
}

interface PlaybookCardProps {
  playbook: Playbook;
  userProgress?: number;
  onStart: () => void;
  darkMode?: boolean;
}

export const PlaybookCard: React.FC<PlaybookCardProps> = ({
  playbook,
  userProgress = 0,
  onStart,
  darkMode = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  const difficultyConfig = {
    beginner: { 
      label: 'Beginner', 
      color: darkMode 
        ? 'bg-emerald-900/30 text-emerald-400 border-emerald-700' 
        : 'bg-emerald-50 text-emerald-700 border-emerald-200' 
    },
    intermediate: { 
      label: 'Intermediate', 
      color: darkMode 
        ? 'bg-amber-900/30 text-amber-400 border-amber-700' 
        : 'bg-amber-50 text-amber-700 border-amber-200' 
    },
    advanced: { 
      label: 'Advanced', 
      color: darkMode 
        ? 'bg-rose-900/30 text-rose-400 border-rose-700' 
        : 'bg-rose-50 text-rose-700 border-rose-200' 
    },
  };

  const difficulty = difficultyConfig[playbook.difficulty];
  
  // Find the matching interactive lesson
  const interactiveLesson = playbookLessons.find(l => l.id === playbook.id);
  const hasInteractiveContent = !!interactiveLesson;

  const handleCompleteLesson = (lessonId: number) => {
    setCompletedLessons(new Set([...completedLessons, lessonId]));
    setShowLesson(false);
  };

  return (
    <>
      <div className={`rounded-xl border overflow-hidden hover:shadow-md transition-all ${
        darkMode 
          ? 'bg-neutral-800 border-neutral-700' 
          : 'bg-white border-neutral-200'
      }`}>
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-neutral-700' : 'bg-neutral-900'
              }`}>
                <BookIcon className="text-white" size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs uppercase tracking-wider ${
                    darkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>{playbook.category}</span>
                  {hasInteractiveContent && (
                    <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <SparkleIcon size={10} />
                      Interactive
                    </span>
                  )}
                </div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{playbook.title}</h3>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficulty.color}`}>
              {difficulty.label}
            </span>
          </div>

          {/* Description */}
          <p className={`text-sm mb-4 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>{playbook.description}</p>

          {/* Stats Row */}
          <div className={`flex items-center gap-4 mb-4 text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
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
              <span className={darkMode ? 'text-amber-400' : 'text-amber-600'}>{playbook.steps.length} steps</span>
            </div>
          </div>

          {/* Progress Bar (if started) */}
          {userProgress > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className={darkMode ? 'text-neutral-400' : 'text-neutral-500'}>Your progress</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{userProgress}%</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${darkMode ? 'bg-emerald-500' : 'bg-neutral-900'}`}
                  style={{ width: `${userProgress}%` }}
                />
              </div>
            </div>
          )}

        {/* Expandable Content */}
        {expanded && (
          <div className={`mt-4 pt-4 border-t space-y-4 animate-fadeIn ${
            darkMode ? 'border-neutral-700' : 'border-neutral-100'
          }`}>
            {/* Steps */}
            <div>
              <h4 className={`text-xs font-medium uppercase tracking-wider mb-3 ${
                darkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>Steps to Follow</h4>
              <ol className="space-y-2">
                {playbook.steps.map((step, index) => (
                  <li key={index} className={`flex items-start gap-3 text-sm ${
                    darkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-medium ${
                      darkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Outcomes */}
            <div>
              <h4 className={`text-xs font-medium uppercase tracking-wider mb-3 ${
                darkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>Expected Outcomes</h4>
              <ul className="space-y-2">
                {playbook.outcomes.map((outcome, index) => (
                  <li key={index} className={`flex items-center gap-2.5 text-sm ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    <CheckCircleIcon size={16} className="flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Author */}
            <div className={`pt-3 border-t ${darkMode ? 'border-neutral-700' : 'border-neutral-100'}`}>
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Created by <span className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>{playbook.author}</span>
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          {hasInteractiveContent ? (
            <button
              onClick={() => setShowLesson(true)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                darkMode 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              <SparkleIcon size={16} />
              {completedLessons.has(playbook.id) ? 'Review Lesson' : userProgress > 0 ? 'Continue Lesson' : 'Start Interactive Lesson'}
            </button>
          ) : (
            <button
              onClick={onStart}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                darkMode 
                  ? 'bg-white text-neutral-900 hover:bg-neutral-100' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              {userProgress > 0 ? 'Continue Learning' : 'Start Playbook'}
            </button>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`px-4 py-2.5 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300' 
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
            }`}
          >
            <ChevronRightIcon size={18} className={`transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>
    </div>
    
    {/* Interactive Lesson Modal */}
    {showLesson && interactiveLesson && (
      <PlaybookLesson
        lesson={interactiveLesson}
        onClose={() => setShowLesson(false)}
        onComplete={handleCompleteLesson}
        darkMode={darkMode}
      />
    )}
  </>
  );
};

// Playbooks List Component
interface PlaybooksListProps {
  playbooks: Playbook[];
  userProgressMap?: Record<number, number>;
  onStartPlaybook: (id: number) => void;
  darkMode?: boolean;
}

export const PlaybooksList: React.FC<PlaybooksListProps> = ({
  playbooks,
  userProgressMap = {},
  onStartPlaybook,
  darkMode = false,
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
      <div className={`rounded-xl border p-5 ${
        darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-neutral-700' : 'bg-neutral-900'
            }`}>
              <BookIcon className="text-white" size={20} />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>AI Partnership Playbooks</h2>
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Actionable workflows to level up your AI skills</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className={`rounded-lg p-3 text-center ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
            <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{playbooks.length}</p>
            <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Available</p>
          </div>
          <div className={`rounded-lg p-3 text-center ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
            <p className="text-lg font-bold text-amber-600">{inProgressCount}</p>
            <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>In Progress</p>
          </div>
          <div className={`rounded-lg p-3 text-center ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
            <p className="text-lg font-bold text-emerald-600">{completedCount}</p>
            <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Completed</p>
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
                  ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                  : darkMode ? 'bg-neutral-700 text-neutral-400 hover:text-white' : 'bg-neutral-100 text-neutral-500 hover:text-neutral-900'
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
            darkMode={darkMode}
          />
        ))}
      </div>

      {filteredPlaybooks.length === 0 && (
        <div className="text-center py-12">
          <p className={darkMode ? 'text-neutral-400' : 'text-neutral-500'}>No playbooks found for this difficulty level</p>
        </div>
      )}
    </div>
  );
};

export default PlaybookCard;
