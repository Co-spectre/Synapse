import React from 'react';
import { LeafIcon, SparkleIcon } from './icons';

interface ProgressGardenProps {
  currentProgress: number;
  goal: number;
}

export const ProgressGarden: React.FC<ProgressGardenProps> = ({ currentProgress, goal }) => {
  const progressPercentage = Math.min((currentProgress / goal) * 100, 100);

  return (
    <div className="bg-white rounded-xl p-5 border border-neutral-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <LeafIcon className="text-emerald-500" size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-neutral-900">Progress</h2>
            <p className="text-sm text-neutral-500">{currentProgress} of {goal} updates</p>
          </div>
        </div>
        <span className="text-2xl font-bold text-neutral-900">{Math.round(progressPercentage)}%</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Status message */}
      <div className="mt-4 flex items-center gap-2">
        {progressPercentage >= 100 ? (
          <>
            <SparkleIcon className="text-amber-500" size={16} />
            <p className="text-sm text-neutral-600">Goal reached! Outstanding work this week.</p>
          </>
        ) : progressPercentage >= 50 ? (
          <p className="text-sm text-neutral-500">Great momentum! Keep the updates flowing.</p>
        ) : (
          <p className="text-sm text-neutral-500">Every update counts. Share your progress.</p>
        )}
      </div>
    </div>
  );
};

export default ProgressGarden;
