import React from 'react';
import { 
  StarIcon, 
  ZapIcon, 
  TargetIcon, 
  TrendingUpIcon, 
  AwardIcon, 
  GraduationCapIcon,
  RocketIcon,
  SparkleIcon,
  ClockIcon,
  CheckCircleIcon,
  BookIcon,
  LightbulbIcon,
  SeedlingIcon,
  ShieldIcon,
  FlaskIcon
} from './icons';

type UserLevel = 'beginner' | 'intermediate' | 'expert';

interface JourneyStats {
  level: number;
  levelName: string;
  totalScore: number;
  nextLevelScore: number;
  hoursThisWeek: number;
  aiAssists: number;
  skillsUnlocked: string[];
  learningsShared: number;
  streak: number;
  rank: number;
  totalUsers: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlockedAt?: string;
  progress?: number;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ReactNode;
  completed?: boolean;
}

interface PersonalJourneyProps {
  stats: JourneyStats;
  achievements: Achievement[];
  recentActivity: Array<{
    id: string;
    action: string;
    timestamp: string;
    points: number;
  }>;
  userLevel: UserLevel;
  userName: string;
}

export const PersonalJourney: React.FC<PersonalJourneyProps> = ({
  stats,
  achievements,
  recentActivity,
  userLevel,
  userName,
}) => {
  const progressToNextLevel = ((stats.totalScore / stats.nextLevelScore) * 100).toFixed(0);

  // Learning modules tailored by user level
  const learningModulesByLevel: Record<UserLevel, LearningModule[]> = {
    beginner: [
      {
        id: 'b1',
        title: 'What is AI? A Simple Guide',
        description: 'Understand the basics of artificial intelligence and how it impacts your daily work.',
        duration: '15 min',
        difficulty: 'beginner',
        icon: <SeedlingIcon size={20} className="text-emerald-600" />,
        completed: true
      },
      {
        id: 'b2',
        title: 'Your First AI Assistant',
        description: 'Learn to use ChatGPT or similar tools for everyday tasks like writing emails and summarizing documents.',
        duration: '20 min',
        difficulty: 'beginner',
        icon: <SparkleIcon size={20} className="text-blue-600" />
      },
      {
        id: 'b3',
        title: 'AI Safety & Privacy Basics',
        description: 'Understand what information is safe to share with AI tools and company policies.',
        duration: '10 min',
        difficulty: 'beginner',
        icon: <ShieldIcon size={20} className="text-rose-600" />
      },
      {
        id: 'b4',
        title: 'Writing Effective Prompts',
        description: 'Learn the simple formula for getting better results from AI: be specific, give context, and iterate.',
        duration: '25 min',
        difficulty: 'beginner',
        icon: <LightbulbIcon size={20} className="text-amber-600" />
      }
    ],
    intermediate: [
      {
        id: 'i1',
        title: 'Advanced Prompt Techniques',
        description: 'Master chain-of-thought prompting, few-shot learning, and structured outputs.',
        duration: '30 min',
        difficulty: 'intermediate',
        icon: <TargetIcon size={20} className="text-violet-600" />,
        completed: true
      },
      {
        id: 'i2',
        title: 'AI-Powered Workflows',
        description: 'Build automated workflows combining multiple AI tools for maximum productivity.',
        duration: '45 min',
        difficulty: 'intermediate',
        icon: <ZapIcon size={20} className="text-amber-600" />
      },
      {
        id: 'i3',
        title: 'Quality Assurance with AI',
        description: 'Use AI for code review, testing, and documentation while maintaining standards.',
        duration: '35 min',
        difficulty: 'intermediate',
        icon: <CheckCircleIcon size={20} className="text-emerald-600" />
      },
      {
        id: 'i4',
        title: 'AI Ethics in Practice',
        description: 'Navigate bias, attribution, and responsible AI use in professional settings.',
        duration: '25 min',
        difficulty: 'intermediate',
        icon: <ShieldIcon size={20} className="text-blue-600" />
      }
    ],
    expert: [
      {
        id: 'e1',
        title: 'Fine-Tuning & RAG Systems',
        description: 'Customize AI models for your domain using retrieval-augmented generation and fine-tuning.',
        duration: '1.5 hr',
        difficulty: 'advanced',
        icon: <FlaskIcon size={20} className="text-violet-600" />,
        completed: true
      },
      {
        id: 'e2',
        title: 'Building AI Agents',
        description: 'Create autonomous agents that can plan, reason, and execute multi-step tasks.',
        duration: '2 hr',
        difficulty: 'advanced',
        icon: <SparkleIcon size={20} className="text-blue-600" />
      },
      {
        id: 'e3',
        title: 'AI System Architecture',
        description: 'Design scalable, reliable AI systems with proper monitoring and failsafes.',
        duration: '1.5 hr',
        difficulty: 'advanced',
        icon: <TrendingUpIcon size={20} className="text-emerald-600" />
      },
      {
        id: 'e4',
        title: 'Leading AI Transformation',
        description: 'Guide your team through AI adoption, measuring impact and overcoming resistance.',
        duration: '45 min',
        difficulty: 'advanced',
        icon: <RocketIcon size={20} className="text-rose-600" />
      }
    ]
  };

  const currentModules = learningModulesByLevel[userLevel];

  const levelInfo: Record<UserLevel, { title: string; subtitle: string; color: string; icon: React.ReactNode }> = {
    beginner: {
      title: 'AI Explorer',
      subtitle: 'Building your AI foundation',
      color: 'from-emerald-500 to-emerald-600',
      icon: <SeedlingIcon size={28} className="text-white" />
    },
    intermediate: {
      title: 'AI Practitioner',
      subtitle: 'Leveling up your AI skills',
      color: 'from-blue-500 to-blue-600',
      icon: <ZapIcon size={28} className="text-white" />
    },
    expert: {
      title: 'AI Innovator',
      subtitle: 'Pushing the boundaries',
      color: 'from-violet-500 to-violet-600',
      icon: <RocketIcon size={28} className="text-white" />
    }
  };

  const currentLevelInfo = levelInfo[userLevel];

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {/* Header with Level - Personalized by user level */}
        <div className={`p-6 bg-gradient-to-r ${currentLevelInfo.color}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                {currentLevelInfo.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {userName ? `${userName}'s Journey` : 'Your AI Journey'}
                </h2>
                <p className="text-white/80 text-sm">{currentLevelInfo.title} • {currentLevelInfo.subtitle}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-white/90">
                <StarIcon size={16} className="text-yellow-300" />
                <span className="text-xl font-bold">{stats.totalScore}</span>
              </div>
              <p className="text-white/60 text-xs">points</p>
            </div>
          </div>

          {/* Progress to Next Level */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/80 mb-1.5">
              <span>Progress to Level {stats.level + 1}</span>
              <span>{stats.totalScore} / {stats.nextLevelScore}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-px bg-neutral-100">
          <StatItem 
            icon={<ClockIcon size={18} />}
            value={`${stats.hoursThisWeek}h`}
            label="Saved this week"
            color="text-emerald-600"
          />
          <StatItem 
            icon={<ZapIcon size={18} />}
            value={stats.aiAssists.toString()}
            label="AI assists"
            color="text-blue-600"
          />
          <StatItem 
            icon={<SparkleIcon size={18} />}
            value={stats.learningsShared.toString()}
            label="Shared"
            color="text-violet-600"
          />
          <StatItem 
            icon={<TargetIcon size={18} />}
            value={`${stats.streak} days`}
            label="Streak"
            color="text-amber-600"
          />
        </div>

        {/* Leaderboard Position */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <TrendingUpIcon size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-900">You're #{stats.rank} of {stats.totalUsers}</p>
                <p className="text-xs text-neutral-500">in your organization</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs text-neutral-700 transition-colors">
              View Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Skills Unlocked */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-neutral-900 flex items-center gap-2">
            <GraduationCapIcon size={18} className="text-blue-600" />
            Skills Unlocked
          </h3>
          <span className="text-xs text-neutral-500">{stats.skillsUnlocked.length} total</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stats.skillsUnlocked.map((skill, index) => (
            <span 
              key={index}
              className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700"
            >
              {skill}
            </span>
          ))}
          <span className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 border-dashed rounded-full text-sm text-neutral-500">
            + Unlock more
          </span>
        </div>
      </div>

      {/* Personalized Learning Path */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-neutral-900 flex items-center gap-2">
              <BookIcon size={18} className="text-violet-500" />
              Your Learning Path
            </h3>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              userLevel === 'beginner' ? 'bg-emerald-50 text-emerald-700' :
              userLevel === 'intermediate' ? 'bg-blue-50 text-blue-700' :
              'bg-violet-50 text-violet-700'
            }`}>
              {currentLevelInfo.title}
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            {userLevel === 'beginner' 
              ? 'Start with the fundamentals and build your AI confidence'
              : userLevel === 'intermediate'
              ? 'Advanced techniques to boost your productivity'
              : 'Cutting-edge topics for AI leaders and builders'
            }
          </p>
        </div>
        <div className="divide-y divide-neutral-100">
          {currentModules.map((module) => (
            <div 
              key={module.id}
              className={`p-4 flex items-start gap-4 hover:bg-neutral-50 transition-colors ${
                module.completed ? 'bg-neutral-50/50' : ''
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                module.completed ? 'bg-emerald-100' : 'bg-neutral-100'
              }`}>
                {module.completed ? <CheckCircleIcon size={24} className="text-emerald-600" /> : module.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`font-medium ${module.completed ? 'text-neutral-500' : 'text-neutral-900'}`}>
                    {module.title}
                  </p>
                  <span className="text-xs text-neutral-400 flex-shrink-0">{module.duration}</span>
                </div>
                <p className="text-sm text-neutral-500 mt-0.5">{module.description}</p>
                {!module.completed && (
                  <button className="mt-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-xs text-white font-medium transition-colors">
                    Start Module
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Level progression hint */}
        <div className="px-5 py-4 bg-neutral-50 border-t border-neutral-100">
          <div className="flex items-start gap-3">
            <LightbulbIcon size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-neutral-600">
              {userLevel === 'beginner' 
                ? 'Complete these modules to unlock Intermediate learning paths with more advanced AI techniques.'
                : userLevel === 'intermediate'
                ? 'Master these skills to unlock Expert content and become an AI leader in your organization.'
                : 'Share your expertise! Consider mentoring beginners or contributing to our playbook library.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="font-medium text-neutral-900 flex items-center gap-2">
            <AwardIcon size={18} className="text-amber-500" />
            Achievements
          </h3>
        </div>
        <div className="divide-y divide-neutral-100">
          {achievements.map((achievement) => {
            const isUnlocked = !!achievement.unlockedAt;
            return (
              <div 
                key={achievement.id}
                className={`p-4 flex items-center gap-4 ${isUnlocked ? '' : 'opacity-50'}`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                  isUnlocked ? 'bg-amber-100' : 'bg-neutral-100'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-900 font-medium">{achievement.title}</p>
                  <p className="text-xs text-neutral-500">{achievement.description}</p>
                  {achievement.progress !== undefined && !isUnlocked && (
                    <div className="mt-2 h-1.5 bg-neutral-100 rounded-full overflow-hidden max-w-[150px]">
                      <div 
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                {isUnlocked && (
                  <div className="text-right">
                    <CheckCircleIcon size={20} className="text-emerald-500" />
                    <p className="text-xs text-neutral-400 mt-1">{achievement.unlockedAt}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="font-medium text-neutral-900 flex items-center gap-2">
            <RocketIcon size={18} className="text-violet-500" />
            Recent Activity
          </h3>
        </div>
        <div className="divide-y divide-neutral-100">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-neutral-400 rounded-full" />
                <p className="text-sm text-neutral-700">{activity.action}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-600 font-medium">+{activity.points} pts</span>
                <span className="text-xs text-neutral-400">{activity.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation Card */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🚀</div>
          <div>
            <h3 className="text-neutral-900 font-semibold mb-1">Keep up the momentum!</h3>
            <p className="text-sm text-neutral-600">
              You're in the top {Math.round((stats.rank / stats.totalUsers) * 100)}% of AI adopters. 
              Complete 2 more playbooks this week to level up!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, color }) => (
  <div className="bg-white p-4 text-center">
    <div className={`inline-flex mb-2 ${color}`}>{icon}</div>
    <p className="text-lg font-bold text-neutral-900">{value}</p>
    <p className="text-xs text-neutral-500">{label}</p>
  </div>
);

export default PersonalJourney;
