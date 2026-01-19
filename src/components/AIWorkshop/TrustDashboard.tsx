import React from 'react';
import { ShieldIcon, EyeIcon, AlertTriangleIcon, CheckIcon, TrendingUpIcon } from './icons';

interface AIDecision {
  id: string;
  action: string;
  reasoning: string;
  confidence: number;
  humanOverride: boolean;
  timestamp: string;
  category: string;
}

interface TrustMetrics {
  accuracyRate: number;
  humanOverrideRate: number;
  avgConfidence: number;
  totalDecisions: number;
  trend: 'up' | 'down' | 'stable';
}

interface TrustDashboardProps {
  metrics: TrustMetrics;
  recentDecisions: AIDecision[];
}

export const TrustDashboard: React.FC<TrustDashboardProps> = ({
  metrics,
  recentDecisions,
}) => {
  return (
    <div className="space-y-6">
      {/* Main Trust Card */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <ShieldIcon className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Trust Dashboard</h2>
              <p className="text-sm text-neutral-500">AI transparency & human accountability</p>
            </div>
          </div>
        </div>

        {/* Trust Score */}
        <div className="p-6 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-neutral-600">Overall Trust Score</h3>
            <div className="flex items-center gap-1.5 text-emerald-600 text-sm">
              <TrendingUpIcon size={14} />
              <span>+2.3% this month</span>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <div className="text-5xl font-bold text-neutral-900">{metrics.accuracyRate}%</div>
            <div className="pb-2 text-sm text-neutral-500">accuracy rate</div>
          </div>
          <div className="mt-4 h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${metrics.accuracyRate}%` }}
            />
          </div>
        </div>

        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-2 divide-x divide-y divide-neutral-100">
          <MetricCard
            label="Human Overrides"
            value={`${metrics.humanOverrideRate}%`}
            description="AI learns from corrections"
            icon={<AlertTriangleIcon size={16} className="text-amber-500" />}
          />
          <MetricCard
            label="Avg Confidence"
            value={`${metrics.avgConfidence}%`}
            description="AI certainty threshold"
            icon={<CheckIcon size={16} className="text-blue-500" />}
          />
          <MetricCard
            label="Decisions Today"
            value={metrics.totalDecisions.toLocaleString()}
            description="All logged & auditable"
            icon={<EyeIcon size={16} className="text-violet-500" />}
          />
          <MetricCard
            label="Response Time"
            value="1.2s"
            description="Average processing"
            icon={<TrendingUpIcon size={16} className="text-emerald-500" />}
          />
        </div>
      </div>

      {/* Recent Decisions */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h3 className="font-medium text-neutral-900 flex items-center gap-2">
            <EyeIcon size={16} className="text-neutral-400" />
            Recent AI Decisions
          </h3>
        </div>
        <div className="divide-y divide-neutral-100">
          {recentDecisions.map((decision) => (
            <div
              key={decision.id}
              className="p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 mb-2">
                    {decision.category}
                  </span>
                  <p className="text-sm font-medium text-neutral-900 mb-1">{decision.action}</p>
                  <p className="text-sm text-neutral-500">{decision.reasoning}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    decision.humanOverride
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {decision.humanOverride ? (
                      <>
                        <AlertTriangleIcon size={10} />
                        <span>Overridden</span>
                      </>
                    ) : (
                      <>
                        <CheckIcon size={10} />
                        <span>{decision.confidence}% confident</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1.5">{decision.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-3 border-t border-neutral-100">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            View all decisions →
          </button>
        </div>
      </div>

      {/* Human Control Assurance */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <ShieldIcon className="text-emerald-600" size={20} />
          </div>
          <div>
            <h3 className="text-emerald-800 font-semibold mb-3">🛡️ Humans Are Always In Control</h3>
            <ul className="space-y-2 text-sm text-emerald-700">
              <li className="flex items-center gap-2">
                <CheckIcon size={14} className="text-emerald-600 flex-shrink-0" />
                <span>Every AI decision is logged and explainable</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={14} className="text-emerald-600 flex-shrink-0" />
                <span>Humans can override any AI suggestion instantly</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={14} className="text-emerald-600 flex-shrink-0" />
                <span>AI learns from corrections to improve accuracy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={14} className="text-emerald-600 flex-shrink-0" />
                <span>Critical decisions always require human approval</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* AI Limitations Disclosure */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h3 className="font-medium text-neutral-900 mb-3 flex items-center gap-2">
          <AlertTriangleIcon size={16} className="text-amber-500" />
          What Our AI Can't Do (Yet)
        </h3>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li>• Understand complex emotional contexts or sarcasm reliably</li>
          <li>• Make decisions involving legal, medical, or financial advice</li>
          <li>• Access real-time external data or systems</li>
          <li>• Learn from individual conversations (training is separate)</li>
        </ul>
        <p className="mt-4 text-sm text-neutral-500">
          We're transparent about limitations because trust is earned through honesty.
        </p>
      </div>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, description, icon }) => (
  <div className="p-5">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <p className="text-sm text-neutral-500">{label}</p>
    </div>
    <p className="text-2xl font-bold text-neutral-900 mb-1">{value}</p>
    <p className="text-sm text-neutral-500">{description}</p>
  </div>
);

export default TrustDashboard;
