import React, { useState } from 'react';
import { FlaskIcon, LightbulbIcon, RocketIcon } from './icons';

interface Experiment {
  id: number;
  title: string;
  hypothesis: string;
  author: {
    name: string;
    color: string;
  };
  status: 'testing' | 'worked' | 'learned' | 'pivoted';
  upvotes: number;
  learnings: string[];
  tryCount: number;
}

interface ExperimentsBoardProps {
  experiments: Experiment[];
  onTryExperiment: (id: number) => void;
  onShareLearning: (id: number, learning: string) => void;
  onAddExperiment: (experiment: { title: string; hypothesis: string }) => void;
}

export const ExperimentsBoard: React.FC<ExperimentsBoardProps> = ({
  experiments,
  onTryExperiment,
  onShareLearning,
  onAddExperiment,
}) => {
  const [selectedExperiment, setSelectedExperiment] = useState<number | null>(null);
  const [newLearning, setNewLearning] = useState('');
  const [showNewExperiment, setShowNewExperiment] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newHypothesis, setNewHypothesis] = useState('');

  const statusConfig = {
    testing: { label: 'In Progress', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: '🧪' },
    worked: { label: 'Success!', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: '✅' },
    learned: { label: 'Valuable Learning', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: '💡' },
    pivoted: { label: 'Pivoted', color: 'bg-violet-50 text-violet-700 border-violet-200', icon: '🔄' },
  };

  const handleSubmitLearning = (experimentId: number) => {
    if (newLearning.trim()) {
      onShareLearning(experimentId, newLearning.trim());
      setNewLearning('');
      setSelectedExperiment(null);
    }
  };

  const handleSubmitExperiment = () => {
    if (newTitle.trim() && newHypothesis.trim()) {
      onAddExperiment({ title: newTitle.trim(), hypothesis: newHypothesis.trim() });
      setNewTitle('');
      setNewHypothesis('');
      setShowNewExperiment(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <FlaskIcon className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Experiments Board</h2>
              <p className="text-xs text-neutral-500">Safe space to try, fail, and learn together</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-50 rounded-full text-xs text-amber-700 font-medium">
              {experiments.filter(e => e.status === 'testing').length} active
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-px bg-neutral-100">
        <div className="bg-white p-3 text-center">
          <p className="text-lg font-bold text-neutral-900">{experiments.length}</p>
          <p className="text-xs text-neutral-500">Total</p>
        </div>
        <div className="bg-white p-3 text-center">
          <p className="text-lg font-bold text-emerald-600">{experiments.filter(e => e.status === 'worked').length}</p>
          <p className="text-xs text-neutral-500">Succeeded</p>
        </div>
        <div className="bg-white p-3 text-center">
          <p className="text-lg font-bold text-blue-600">{experiments.filter(e => e.status === 'learned').length}</p>
          <p className="text-xs text-neutral-500">Learnings</p>
        </div>
        <div className="bg-white p-3 text-center">
          <p className="text-lg font-bold text-violet-600">{experiments.filter(e => e.status === 'pivoted').length}</p>
          <p className="text-xs text-neutral-500">Pivoted</p>
        </div>
      </div>

      {/* Experiments List */}
      <div className="divide-y divide-neutral-100">
        {experiments.map((experiment) => {
          const status = statusConfig[experiment.status];
          const isSelected = selectedExperiment === experiment.id;
          return (
            <div key={experiment.id} className="p-5 hover:bg-neutral-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color} mb-3`}>
                    <span>{status.icon}</span>
                    <span>{status.label}</span>
                  </div>

                  {/* Title & Hypothesis */}
                  <h3 className="text-neutral-900 font-medium mb-2">{experiment.title}</h3>
                  <p className="text-sm text-neutral-600 mb-3">
                    <span className="text-neutral-500 font-medium">Hypothesis:</span> {experiment.hypothesis}
                  </p>

                  {/* Learnings Preview */}
                  {experiment.learnings.length > 0 && (
                    <div className="bg-neutral-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-neutral-500 mb-2 flex items-center gap-1">
                        <LightbulbIcon size={12} />
                        Latest learning:
                      </p>
                      <p className="text-sm text-neutral-700 italic">"{experiment.learnings[0]}"</p>
                      {experiment.learnings.length > 1 && (
                        <p className="text-xs text-neutral-400 mt-2">+{experiment.learnings.length - 1} more learnings</p>
                      )}
                    </div>
                  )}

                  {/* Learning Input */}
                  {isSelected && (
                    <div className="bg-neutral-50 rounded-lg p-3 mb-3 animate-fadeIn">
                      <textarea
                        value={newLearning}
                        onChange={(e) => setNewLearning(e.target.value)}
                        placeholder="What did you learn from trying this?"
                        className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 resize-none"
                        rows={2}
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => setSelectedExperiment(null)}
                          className="px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSubmitLearning(experiment.id)}
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-xs text-white font-medium transition-colors"
                        >
                          Share Learning
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onTryExperiment(experiment.id)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm text-neutral-700 transition-colors"
                    >
                      <RocketIcon size={14} />
                      <span>Try this ({experiment.tryCount})</span>
                    </button>
                    {!isSelected && (
                      <button
                        onClick={() => setSelectedExperiment(experiment.id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-blue-700 transition-colors"
                      >
                        <LightbulbIcon size={14} />
                        <span>Share learning</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Author */}
                <div className="text-right flex-shrink-0">
                  <div className={`w-8 h-8 bg-gradient-to-br ${experiment.author.color} rounded-lg flex items-center justify-center text-white text-xs font-medium`}>
                    {experiment.author.name.charAt(0)}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">{experiment.author.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Experiment */}
      <div className="p-5 border-t border-neutral-100 bg-neutral-50">
        {showNewExperiment ? (
          <div className="space-y-3 animate-fadeIn">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Experiment title (e.g., 'AI-assisted code reviews')"
              className="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400"
            />
            <textarea
              value={newHypothesis}
              onChange={(e) => setNewHypothesis(e.target.value)}
              placeholder="Hypothesis: What do you think will happen? (e.g., 'Using AI for initial code review will reduce review time by 40%')"
              className="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 resize-none"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewExperiment(false)}
                className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitExperiment}
                disabled={!newTitle.trim() || !newHypothesis.trim()}
                className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Propose Experiment
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setShowNewExperiment(true)}
            className="w-full py-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400 rounded-lg text-neutral-500 hover:text-neutral-700 transition-all flex items-center justify-center gap-2"
          >
            <FlaskIcon size={16} />
            <span>Propose an experiment</span>
          </button>
        )}
      </div>

      {/* Encouragement Message */}
      <div className="px-5 pb-5">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 font-medium mb-1">💪 Failure is feedback</p>
          <p className="text-xs text-amber-700">
            Every experiment—successful or not—teaches us something valuable. 
            Share your learnings to help others grow faster.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperimentsBoard;
