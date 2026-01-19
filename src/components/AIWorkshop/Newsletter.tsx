import React, { useState } from 'react';
import { 
  SparkleIcon, 
  CalendarIcon, 
  TrendingUpIcon,
  CheckIcon,
  UserIcon,
  RocketIcon,
  BookIcon
} from './icons';
import { JobRole } from './Onboarding';

interface NewsletterProps {
  userRole: JobRole;
  userName: string;
  userEmail?: string;
}

interface EmailPreferences {
  weeklyDigest: boolean;
  eventReminders: boolean;
  aiTips: boolean;
  analyticsReport: boolean;
  communityHighlights: boolean;
}

// Mock analytics data for newsletter
const mockAnalytics = {
  aiUsageHours: 24.5,
  toolsUsed: 8,
  productivity: '+32%',
  topTool: 'GitHub Copilot',
  tasksCompleted: 47,
  learningProgress: 78
};

// Mock upcoming events for newsletter
const mockUpcomingEvents = [
  {
    title: 'Prompt Engineering Workshop',
    date: 'Jan 22, 2026',
    time: '1:00 PM',
    speaker: 'Alex Rivera'
  },
  {
    title: 'OpenAI Leadership Talk',
    date: 'Jan 28, 2026',
    time: '3:00 PM',
    speaker: 'Jennifer Wu'
  }
];

// Mock community highlights
const mockHighlights = [
  { name: 'Sarah Chen', achievement: 'Completed Advanced AI Certification', emoji: '🏆' },
  { name: 'Marcus Johnson', achievement: 'Shared 10 AI experiments', emoji: '🔬' },
  { name: 'Emily Park', achievement: 'Top contributor this week', emoji: '⭐' }
];

// AI Tips for newsletter
const mockAITips = [
  {
    title: 'Chain-of-thought prompting',
    tip: 'Ask AI to "think step by step" for complex problems. This can improve accuracy by up to 40%.'
  },
  {
    title: 'Context is king',
    tip: 'Provide relevant background info at the start of your prompt for better, more tailored responses.'
  }
];

export const Newsletter: React.FC<NewsletterProps> = ({ userRole, userName, userEmail }) => {
  const [email, setEmail] = useState(userEmail || '');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [preferences, setPreferences] = useState<EmailPreferences>({
    weeklyDigest: true,
    eventReminders: true,
    aiTips: true,
    analyticsReport: true,
    communityHighlights: false
  });

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  const handleSendNewsletter = async () => {
    if (!email) return;
    
    setIsSending(true);
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    setSentSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => setSentSuccess(false), 3000);
  };

  const togglePreference = (key: keyof EmailPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getRoleTitle = (role: JobRole): string => {
    const titles: Record<JobRole, string> = {
      engineering: 'Engineering',
      design: 'Design',
      sales: 'Sales',
      marketing: 'Marketing',
      finance: 'Finance',
      logistics: 'Operations',
      innovation: 'Innovation',
      intern: 'Getting Started'
    };
    return titles[role];
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <SparkleIcon size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Synapse Newsletter</h2>
            <p className="text-emerald-200 text-xs">Your weekly AI insights delivered</p>
          </div>
        </div>
        
        <p className="text-sm text-emerald-100 leading-relaxed">
          Get personalized AI analytics, upcoming events, tips, and community highlights delivered straight to your inbox.
        </p>
      </div>

      {/* Email Subscription */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <h3 className="font-semibold text-neutral-900 text-sm mb-3">Subscribe to Newsletter</h3>
        
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400"
          />
          {!isSubscribed ? (
            <button
              onClick={handleSubscribe}
              disabled={!email || !email.includes('@')}
              className="px-5 py-3 bg-emerald-600 text-white text-sm font-medium rounded-xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Subscribe
            </button>
          ) : (
            <div className="px-4 py-3 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-xl flex items-center gap-2">
              <CheckIcon size={16} />
              Subscribed
            </div>
          )}
        </div>

        {isSubscribed && (
          <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <CheckIcon size={12} />
            You'll receive newsletters at {email}
          </p>
        )}
      </div>

      {/* Email Preferences */}
      {isSubscribed && (
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <h3 className="font-semibold text-neutral-900 text-sm mb-3">Email Preferences</h3>
          
          <div className="space-y-2">
            {[
              { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of your AI activity' },
              { key: 'analyticsReport', label: 'Analytics Report', desc: 'Your AI usage statistics' },
              { key: 'eventReminders', label: 'Event Reminders', desc: 'Upcoming company events' },
              { key: 'aiTips', label: 'AI Tips & Tricks', desc: 'Weekly productivity tips' },
              { key: 'communityHighlights', label: 'Community Highlights', desc: 'Team achievements' }
            ].map(pref => (
              <button
                key={pref.key}
                onClick={() => togglePreference(pref.key as keyof EmailPreferences)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 active:bg-neutral-100 transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-neutral-900">{pref.label}</p>
                  <p className="text-xs text-neutral-500">{pref.desc}</p>
                </div>
                <div className={`w-10 h-6 rounded-full transition-colors flex items-center ${
                  preferences[pref.key as keyof EmailPreferences] 
                    ? 'bg-emerald-500 justify-end' 
                    : 'bg-neutral-300 justify-start'
                }`}>
                  <div className="w-5 h-5 bg-white rounded-full shadow-sm mx-0.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview & Send Actions */}
      {isSubscribed && (
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex-1 py-3 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-xl active:scale-[0.98] transition-all"
          >
            {showPreview ? 'Hide Preview' : 'Preview Newsletter'}
          </button>
          <button
            onClick={handleSendNewsletter}
            disabled={isSending || sentSuccess}
            className={`flex-1 py-3 text-sm font-medium rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              sentSuccess 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-emerald-600 text-white'
            }`}
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : sentSuccess ? (
              <>
                <CheckIcon size={16} />
                Sent to {email}
              </>
            ) : (
              <>
                <SparkleIcon size={16} />
                Send Now
              </>
            )}
          </button>
        </div>
      )}

      {/* Newsletter Preview */}
      {showPreview && isSubscribed && (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-lg">
          {/* Email Header */}
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3">
              <SparkleIcon size={24} className="text-neutral-900" />
            </div>
            <h2 className="text-white text-xl font-bold">Synapse Weekly</h2>
            <p className="text-neutral-400 text-sm mt-1">{currentDate}</p>
          </div>

          {/* Greeting */}
          <div className="p-5 border-b border-neutral-100">
            <h3 className="text-lg font-semibold text-neutral-900">
              Hey {userName}! 👋
            </h3>
            <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
              Here's your weekly AI digest from Synapse. You've been making great progress with AI tools this week!
            </p>
          </div>

          {/* Analytics Section */}
          {preferences.analyticsReport && (
            <div className="p-5 border-b border-neutral-100">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUpIcon size={18} className="text-emerald-600" />
                <h4 className="font-semibold text-neutral-900">Your AI Analytics</h4>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-700">{mockAnalytics.aiUsageHours}h</p>
                  <p className="text-[10px] text-emerald-600 mt-1">AI Usage</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-blue-700">{mockAnalytics.toolsUsed}</p>
                  <p className="text-[10px] text-blue-600 mt-1">Tools Used</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-purple-700">{mockAnalytics.productivity}</p>
                  <p className="text-[10px] text-purple-600 mt-1">Productivity</p>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-600">
                  🏆 <span className="font-medium">Top Tool:</span> {mockAnalytics.topTool} • 
                  <span className="font-medium"> Tasks Completed:</span> {mockAnalytics.tasksCompleted}
                </p>
              </div>
            </div>
          )}

          {/* Events Section */}
          {preferences.eventReminders && (
            <div className="p-5 border-b border-neutral-100">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon size={18} className="text-indigo-600" />
                <h4 className="font-semibold text-neutral-900">Upcoming Events</h4>
              </div>
              
              <div className="space-y-2">
                {mockUpcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-[10px] text-indigo-600 font-medium">
                        {event.date.split(' ')[0]}
                      </span>
                      <span className="text-sm font-bold text-indigo-700">
                        {event.date.split(' ')[1].replace(',', '')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900 text-sm">{event.title}</p>
                      <p className="text-xs text-neutral-500">{event.time} • {event.speaker}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Tips Section */}
          {preferences.aiTips && (
            <div className="p-5 border-b border-neutral-100">
              <div className="flex items-center gap-2 mb-4">
                <BookIcon size={18} className="text-amber-600" />
                <h4 className="font-semibold text-neutral-900">AI Tips for {getRoleTitle(userRole)}</h4>
              </div>
              
              <div className="space-y-3">
                {mockAITips.map((tip, index) => (
                  <div key={index} className="p-3 bg-amber-50 rounded-xl">
                    <p className="font-medium text-amber-900 text-sm">💡 {tip.title}</p>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">{tip.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Highlights */}
          {preferences.communityHighlights && (
            <div className="p-5 border-b border-neutral-100">
              <div className="flex items-center gap-2 mb-4">
                <UserIcon size={18} className="text-pink-600" />
                <h4 className="font-semibold text-neutral-900">Community Highlights</h4>
              </div>
              
              <div className="space-y-2">
                {mockHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg">
                    <span className="text-xl">{highlight.emoji}</span>
                    <div>
                      <p className="font-medium text-neutral-900 text-sm">{highlight.name}</p>
                      <p className="text-xs text-neutral-500">{highlight.achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-5 bg-neutral-50 text-center">
            <p className="text-xs text-neutral-500 mb-3">
              You're receiving this email because you're subscribed to Synapse newsletters.
            </p>
            <div className="flex justify-center gap-4 text-xs">
              <button className="text-neutral-600 hover:text-neutral-900">Manage Preferences</button>
              <span className="text-neutral-300">|</span>
              <button className="text-neutral-600 hover:text-neutral-900">Unsubscribe</button>
            </div>
            <p className="text-[10px] text-neutral-400 mt-4">
              © 2026 Synapse • Intelligence, Amplified
            </p>
          </div>
        </div>
      )}

      {/* Quick Send to Specific Email */}
      <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
        <h3 className="font-semibold text-neutral-900 text-sm mb-2">Quick Send</h3>
        <p className="text-xs text-neutral-500 mb-3">
          Send a sample newsletter to a specific email address
        </p>
        
        <div className="flex gap-2">
          <input
            type="email"
            defaultValue="Yasin.Gasimov@gmail.com"
            className="flex-1 px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400"
          />
          <button 
            onClick={() => {
              setEmail('Yasin.Gasimov@gmail.com');
              if (!isSubscribed) setIsSubscribed(true);
              handleSendNewsletter();
            }}
            className="px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg active:scale-95 transition-all"
          >
            Send
          </button>
        </div>
      </div>

      {/* Info Notice */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2">
        <RocketIcon size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-emerald-900">Newsletters sent every Monday</p>
          <p className="text-[11px] text-emerald-700 mt-0.5">
            Your personalized digest includes AI analytics, events, and tips tailored to your role.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
