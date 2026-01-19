import React, { useState, useEffect } from 'react';
import {
  SparkleIcon,
  TrendingUpIcon,
  ClockIcon,
  ZapIcon,
  CodeIcon,
  BookIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  AlertIcon
} from './icons';
import { JobRole } from './Onboarding';

// Types for usage tracking
interface DailyUsage {
  date: string;
  totalWorkMinutes: number;
  aiAssistedMinutes: number;
  appBreakdown: {
    appName: string;
    minutes: number;
    aiMinutes: number;
    actions: number;
  }[];
}

interface AIToolUsage {
  toolId: string;
  toolName: string;
  toolIcon: string;
  category: string;
  totalSessions: number;
  totalMinutes: number;
  actionsCompleted: number;
  lastUsed: Date;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
}

interface UsageInsight {
  id: string;
  type: 'achievement' | 'suggestion' | 'warning';
  title: string;
  description: string;
  actionLabel?: string;
}

interface AIUsageTrackerProps {
  userRole: JobRole;
  userName: string;
}

// Mock data generator based on role
const generateMockUsageData = (role: JobRole): {
  weeklyUsage: DailyUsage[];
  toolUsage: AIToolUsage[];
  insights: UsageInsight[];
} => {
  const today = new Date();
  const weeklyUsage: DailyUsage[] = [];

  // Role-specific app configurations
  const roleApps: Record<JobRole, { name: string; icon: string; aiHeavy: boolean }[]> = {
    engineering: [
      { name: 'VS Code + Copilot', icon: '💻', aiHeavy: true },
      { name: 'Cursor IDE', icon: '⚡', aiHeavy: true },
      { name: 'Terminal', icon: '🖥️', aiHeavy: false },
      { name: 'GitHub', icon: '🐙', aiHeavy: false },
      { name: 'Claude', icon: '✨', aiHeavy: true },
      { name: 'Slack', icon: '💬', aiHeavy: false },
    ],
    design: [
      { name: 'Figma + AI', icon: '🎨', aiHeavy: true },
      { name: 'Adobe Firefly', icon: '🔥', aiHeavy: true },
      { name: 'Midjourney', icon: '🖼️', aiHeavy: true },
      { name: 'Sketch', icon: '✏️', aiHeavy: false },
      { name: 'Claude', icon: '✨', aiHeavy: true },
      { name: 'Notion', icon: '📓', aiHeavy: false },
    ],
    sales: [
      { name: 'Gong AI', icon: '🎯', aiHeavy: true },
      { name: 'Salesforce Einstein', icon: '☁️', aiHeavy: true },
      { name: 'LinkedIn Sales Nav', icon: '💼', aiHeavy: false },
      { name: 'Claude', icon: '✨', aiHeavy: true },
      { name: 'Outlook + Copilot', icon: '📧', aiHeavy: true },
      { name: 'Zoom', icon: '📹', aiHeavy: false },
    ],
    marketing: [
      { name: 'Jasper AI', icon: '✍️', aiHeavy: true },
      { name: 'Copy.ai', icon: '📝', aiHeavy: true },
      { name: 'Canva AI', icon: '🎨', aiHeavy: true },
      { name: 'HubSpot', icon: '🧲', aiHeavy: false },
      { name: 'Claude', icon: '✨', aiHeavy: true },
      { name: 'Google Analytics', icon: '📊', aiHeavy: false },
    ],
    finance: [
      { name: 'Excel + Copilot', icon: '📊', aiHeavy: true },
      { name: 'Power BI AI', icon: '📈', aiHeavy: true },
      { name: 'Docugami', icon: '📄', aiHeavy: true },
      { name: 'SAP', icon: '🏢', aiHeavy: false },
      { name: 'Claude', icon: '✨', aiHeavy: true },
      { name: 'QuickBooks', icon: '💰', aiHeavy: false },
    ],
    logistics: [
      { name: 'Microsoft Copilot', icon: '🪟', aiHeavy: true },
      { name: 'Process Mining AI', icon: '⚙️', aiHeavy: true },
      { name: 'SAP Logistics', icon: '📦', aiHeavy: false },
      { name: 'Claude', icon: '✨', aiHeavy: true },
      { name: 'Teams', icon: '👥', aiHeavy: false },
      { name: 'Excel', icon: '📊', aiHeavy: false },
    ],
    innovation: [
      { name: 'Claude', icon: '✨', aiHeavy: true },
      { name: 'ChatGPT', icon: '💬', aiHeavy: true },
      { name: 'Perplexity', icon: '🔍', aiHeavy: true },
      { name: 'Elicit', icon: '🔬', aiHeavy: true },
      { name: 'Notion AI', icon: '📓', aiHeavy: true },
      { name: 'Miro', icon: '🗂️', aiHeavy: false },
    ],
    intern: [
      { name: 'Claude', icon: '✨', aiHeavy: true },
      { name: 'VS Code + Copilot', icon: '💻', aiHeavy: true },
      { name: 'Notion AI', icon: '📓', aiHeavy: true },
      { name: 'Google Docs', icon: '📄', aiHeavy: false },
      { name: 'Slack', icon: '💬', aiHeavy: false },
      { name: 'Teams', icon: '👥', aiHeavy: false },
    ],
  };

  const apps = roleApps[role];

  // Generate 7 days of usage data
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseMinutes = isWeekend ? 60 + Math.random() * 120 : 360 + Math.random() * 180;
    
    const appBreakdown = apps.map(app => {
      const minutes = Math.floor((baseMinutes / apps.length) * (0.5 + Math.random()));
      const aiRatio = app.aiHeavy ? 0.6 + Math.random() * 0.3 : 0.1 + Math.random() * 0.2;
      return {
        appName: app.name,
        minutes,
        aiMinutes: Math.floor(minutes * aiRatio),
        actions: Math.floor(minutes * (0.5 + Math.random() * 2)),
      };
    });

    const totalWorkMinutes = appBreakdown.reduce((sum, app) => sum + app.minutes, 0);
    const aiAssistedMinutes = appBreakdown.reduce((sum, app) => sum + app.aiMinutes, 0);

    weeklyUsage.push({
      date: date.toISOString().split('T')[0],
      totalWorkMinutes,
      aiAssistedMinutes,
      appBreakdown,
    });
  }

  // Generate tool usage summary
  const toolUsage: AIToolUsage[] = apps
    .filter(app => app.aiHeavy)
    .map((app, index) => ({
      toolId: `tool-${index}`,
      toolName: app.name,
      toolIcon: app.icon,
      category: 'AI Tool',
      totalSessions: Math.floor(20 + Math.random() * 50),
      totalMinutes: Math.floor(300 + Math.random() * 600),
      actionsCompleted: Math.floor(100 + Math.random() * 500),
      lastUsed: new Date(today.getTime() - Math.random() * 24 * 60 * 60 * 1000),
      trend: Math.random() > 0.3 ? 'up' : Math.random() > 0.5 ? 'stable' : 'down',
      trendPercent: Math.floor(5 + Math.random() * 25),
    }));

  // Generate insights
  const totalAIMinutes = weeklyUsage.reduce((sum, day) => sum + day.aiAssistedMinutes, 0);
  const totalMinutes = weeklyUsage.reduce((sum, day) => sum + day.totalWorkMinutes, 0);
  const aiPercentage = Math.round((totalAIMinutes / totalMinutes) * 100);

  const insights: UsageInsight[] = [
    {
      id: '1',
      type: 'achievement',
      title: aiPercentage > 40 ? 'AI Power User!' : 'Growing AI Adoption',
      description: aiPercentage > 40 
        ? `You're leveraging AI in ${aiPercentage}% of your work. You're in the top 20% of AI adopters!`
        : `You're using AI in ${aiPercentage}% of your work. There's room to grow!`,
    },
    {
      id: '2',
      type: 'suggestion',
      title: 'Try a new AI tool',
      description: role === 'engineering' 
        ? 'Have you tried using AI for code reviews? It can catch bugs 40% faster.'
        : 'Explore AI-assisted document summarization to save 2+ hours weekly.',
      actionLabel: 'Explore Tools',
    },
    {
      id: '3',
      type: aiPercentage < 20 ? 'warning' : 'achievement',
      title: aiPercentage < 20 ? 'Low AI Utilization' : 'Balanced Usage',
      description: aiPercentage < 20 
        ? 'You might be missing productivity gains. Check out the AI Advisor for recommended tools.'
        : 'Great balance between AI-assisted and traditional work methods.',
    },
  ];

  return { weeklyUsage, toolUsage, insights };
};

export const AIUsageTracker: React.FC<AIUsageTrackerProps> = ({ userRole, userName }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  const [usageData, setUsageData] = useState(() => generateMockUsageData(userRole));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTracking) {
        setUsageData(generateMockUsageData(userRole));
      }
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [userRole, isTracking]);

  const { weeklyUsage, toolUsage, insights } = usageData;

  // Calculate totals
  const totalWorkMinutes = weeklyUsage.reduce((sum, day) => sum + day.totalWorkMinutes, 0);
  const totalAIMinutes = weeklyUsage.reduce((sum, day) => sum + day.aiAssistedMinutes, 0);
  const aiPercentage = Math.round((totalAIMinutes / totalWorkMinutes) * 100);
  const totalHours = Math.round(totalWorkMinutes / 60);
  const aiHours = Math.round(totalAIMinutes / 60);

  // Get today's data
  const todayData = weeklyUsage[weeklyUsage.length - 1];
  const todayAIPercentage = Math.round((todayData.aiAssistedMinutes / todayData.totalWorkMinutes) * 100);

  const formatMinutes = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="space-y-6">
      {/* Header with Live Status */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUpIcon size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">AI Usage Analytics</h2>
              <p className="text-neutral-500 text-sm mt-1">
                Tracking your AI-assisted productivity, {userName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
              isTracking ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} />
              {isTracking ? 'Live Tracking' : 'Paused'}
            </div>
            <button
              onClick={() => setIsTracking(!isTracking)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              {isTracking ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>

        {/* Time Range Toggle */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === 'week' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === 'month' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 text-neutral-500 text-sm mb-2">
            <ZapIcon size={16} />
            <span>AI Usage</span>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{aiPercentage}%</p>
          <p className="text-xs text-neutral-400 mt-1">of total work time</p>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 text-neutral-500 text-sm mb-2">
            <ClockIcon size={16} />
            <span>AI Hours</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{aiHours}h</p>
          <p className="text-xs text-neutral-400 mt-1">of {totalHours}h total</p>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 text-neutral-500 text-sm mb-2">
            <SparkleIcon size={16} />
            <span>Today</span>
          </div>
          <p className="text-3xl font-bold text-emerald-600">{todayAIPercentage}%</p>
          <p className="text-xs text-neutral-400 mt-1">AI-assisted today</p>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 text-neutral-500 text-sm mb-2">
            <CodeIcon size={16} />
            <span>Actions</span>
          </div>
          <p className="text-3xl font-bold text-violet-600">
            {toolUsage.reduce((sum, t) => sum + t.actionsCompleted, 0).toLocaleString()}
          </p>
          <p className="text-xs text-neutral-400 mt-1">AI-assisted actions</p>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Daily AI Usage</h3>
        <div className="flex items-end gap-2 h-40">
          {weeklyUsage.map((day) => {
            const percentage = Math.round((day.aiAssistedMinutes / day.totalWorkMinutes) * 100);
            const isSelected = selectedDay === day.date;
            return (
              <button
                key={day.date}
                onClick={() => setSelectedDay(isSelected ? null : day.date)}
                className={`flex-1 flex flex-col items-center gap-2 group ${isSelected ? 'scale-105' : ''}`}
              >
                <div className="w-full relative">
                  {/* Background bar (total work) */}
                  <div 
                    className="w-full bg-neutral-100 rounded-t-lg transition-all"
                    style={{ height: `${Math.max(20, (day.totalWorkMinutes / 600) * 100)}px` }}
                  >
                    {/* AI usage bar overlay */}
                    <div 
                      className={`w-full rounded-t-lg transition-all ${
                        isSelected ? 'bg-blue-500' : 'bg-blue-400 group-hover:bg-blue-500'
                      }`}
                      style={{ height: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className={`text-xs font-medium ${isSelected ? 'text-blue-600' : 'text-neutral-500'}`}>
                  {getDayName(day.date)}
                </span>
                <span className={`text-xs ${isSelected ? 'text-blue-600 font-semibold' : 'text-neutral-400'}`}>
                  {percentage}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Detail */}
        {selectedDay && (
          <div className="mt-6 pt-6 border-t border-neutral-100">
            <h4 className="font-medium text-neutral-900 mb-3">
              {getDayName(selectedDay)} Breakdown
            </h4>
            <div className="space-y-2">
              {weeklyUsage.find(d => d.date === selectedDay)?.appBreakdown.map((app, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 text-center">{roleApps[userRole]?.[i]?.icon || '📱'}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-neutral-700">{app.appName}</span>
                      <span className="text-xs text-neutral-500">
                        {formatMinutes(app.aiMinutes)} AI / {formatMinutes(app.minutes)} total
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-400 rounded-full"
                        style={{ width: `${(app.aiMinutes / app.minutes) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Top AI Tools */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="font-semibold text-neutral-900">Your Top AI Tools</h3>
          <p className="text-neutral-500 text-sm mt-1">Most used AI-powered applications</p>
        </div>
        <div className="divide-y divide-neutral-100">
          {toolUsage.slice(0, 5).map((tool) => (
            <div key={tool.toolId} className="p-5 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center text-2xl">
                {tool.toolIcon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-neutral-900">{tool.toolName}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                    tool.trend === 'up' ? 'bg-emerald-100 text-emerald-700' :
                    tool.trend === 'down' ? 'bg-red-100 text-red-700' :
                    'bg-neutral-100 text-neutral-600'
                  }`}>
                    {tool.trend === 'up' ? '↑' : tool.trend === 'down' ? '↓' : '→'}
                    {tool.trendPercent}%
                  </span>
                </div>
                <p className="text-sm text-neutral-500">
                  {tool.totalSessions} sessions • {formatMinutes(tool.totalMinutes)} total
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-neutral-900">{tool.actionsCompleted}</p>
                <p className="text-xs text-neutral-400">actions</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          <SparkleIcon size={18} className="text-amber-500" />
          AI Insights
        </h3>
        <div className="space-y-3">
          {insights.map((insight) => (
            <div 
              key={insight.id}
              className={`p-4 rounded-lg border flex items-start gap-3 ${
                insight.type === 'achievement' ? 'bg-emerald-50 border-emerald-200' :
                insight.type === 'suggestion' ? 'bg-blue-50 border-blue-200' :
                'bg-amber-50 border-amber-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                insight.type === 'achievement' ? 'bg-emerald-100' :
                insight.type === 'suggestion' ? 'bg-blue-100' :
                'bg-amber-100'
              }`}>
                {insight.type === 'achievement' ? (
                  <CheckCircleIcon size={16} className="text-emerald-600" />
                ) : insight.type === 'suggestion' ? (
                  <BookIcon size={16} className="text-blue-600" />
                ) : (
                  <AlertIcon size={16} className="text-amber-600" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  insight.type === 'achievement' ? 'text-emerald-900' :
                  insight.type === 'suggestion' ? 'text-blue-900' :
                  'text-amber-900'
                }`}>{insight.title}</p>
                <p className={`text-sm mt-1 ${
                  insight.type === 'achievement' ? 'text-emerald-700' :
                  insight.type === 'suggestion' ? 'text-blue-700' :
                  'text-amber-700'
                }`}>{insight.description}</p>
                {insight.actionLabel && (
                  <button className="mt-2 text-sm font-medium flex items-center gap-1 text-blue-600 hover:text-blue-700">
                    {insight.actionLabel}
                    <ChevronRightIcon size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-neutral-100 rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 bg-neutral-200 rounded-lg flex items-center justify-center flex-shrink-0">
          🔒
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-700">Privacy Protected</p>
          <p className="text-sm text-neutral-500 mt-1">
            Your usage data is processed locally on your device. Only aggregated, anonymized statistics 
            are shared with your organization to improve AI adoption across teams.
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper: Role-specific apps (used in the component)
const roleApps: Record<JobRole, { name: string; icon: string; aiHeavy: boolean }[]> = {
  engineering: [
    { name: 'VS Code + Copilot', icon: '💻', aiHeavy: true },
    { name: 'Cursor IDE', icon: '⚡', aiHeavy: true },
    { name: 'Terminal', icon: '🖥️', aiHeavy: false },
    { name: 'GitHub', icon: '🐙', aiHeavy: false },
    { name: 'Claude', icon: '✨', aiHeavy: true },
    { name: 'Slack', icon: '💬', aiHeavy: false },
  ],
  design: [
    { name: 'Figma + AI', icon: '🎨', aiHeavy: true },
    { name: 'Adobe Firefly', icon: '🔥', aiHeavy: true },
    { name: 'Midjourney', icon: '🖼️', aiHeavy: true },
    { name: 'Sketch', icon: '✏️', aiHeavy: false },
    { name: 'Claude', icon: '✨', aiHeavy: true },
    { name: 'Notion', icon: '📓', aiHeavy: false },
  ],
  sales: [
    { name: 'Gong AI', icon: '🎯', aiHeavy: true },
    { name: 'Salesforce Einstein', icon: '☁️', aiHeavy: true },
    { name: 'LinkedIn Sales Nav', icon: '💼', aiHeavy: false },
    { name: 'Claude', icon: '✨', aiHeavy: true },
    { name: 'Outlook + Copilot', icon: '📧', aiHeavy: true },
    { name: 'Zoom', icon: '📹', aiHeavy: false },
  ],
  marketing: [
    { name: 'Jasper AI', icon: '✍️', aiHeavy: true },
    { name: 'Copy.ai', icon: '📝', aiHeavy: true },
    { name: 'Canva AI', icon: '🎨', aiHeavy: true },
    { name: 'HubSpot', icon: '🧲', aiHeavy: false },
    { name: 'Claude', icon: '✨', aiHeavy: true },
    { name: 'Google Analytics', icon: '📊', aiHeavy: false },
  ],
  finance: [
    { name: 'Excel + Copilot', icon: '📊', aiHeavy: true },
    { name: 'Power BI AI', icon: '📈', aiHeavy: true },
    { name: 'Docugami', icon: '📄', aiHeavy: true },
    { name: 'SAP', icon: '🏢', aiHeavy: false },
    { name: 'Claude', icon: '✨', aiHeavy: true },
    { name: 'QuickBooks', icon: '💰', aiHeavy: false },
  ],
  logistics: [
    { name: 'Microsoft Copilot', icon: '🪟', aiHeavy: true },
    { name: 'Process Mining AI', icon: '⚙️', aiHeavy: true },
    { name: 'SAP Logistics', icon: '📦', aiHeavy: false },
    { name: 'Claude', icon: '✨', aiHeavy: true },
    { name: 'Teams', icon: '👥', aiHeavy: false },
    { name: 'Excel', icon: '📊', aiHeavy: false },
  ],
  innovation: [
    { name: 'Claude', icon: '✨', aiHeavy: true },
    { name: 'ChatGPT', icon: '💬', aiHeavy: true },
    { name: 'Perplexity', icon: '🔍', aiHeavy: true },
    { name: 'Elicit', icon: '🔬', aiHeavy: true },
    { name: 'Notion AI', icon: '📓', aiHeavy: true },
    { name: 'Miro', icon: '🗂️', aiHeavy: false },
  ],
  intern: [
    { name: 'Claude', icon: '✨', aiHeavy: true },
    { name: 'VS Code + Copilot', icon: '💻', aiHeavy: true },
    { name: 'Notion AI', icon: '📓', aiHeavy: true },
    { name: 'Google Docs', icon: '📄', aiHeavy: false },
    { name: 'Slack', icon: '💬', aiHeavy: false },
    { name: 'Teams', icon: '👥', aiHeavy: false },
  ],
};

export default AIUsageTracker;
