import React, { useState, useEffect } from 'react';
import { CloseIcon, MoonIcon, SunIcon, BellIcon, UserIcon, ShieldIcon, SparkleIcon, RocketIcon, StarIcon, CheckIcon, ChevronRightIcon, LightbulbIcon } from './icons';

// ============================================
// SYNAPSE LANDING PAGE - PREMIUM ADVERTISEMENT
// ============================================

interface LandingPageProps {
  darkMode: boolean;
  onClose: () => void;
}

const SynapseLandingPage: React.FC<LandingPageProps> = ({ darkMode, onClose }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setStatsAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  const features = [
    {
      icon: '🧠',
      title: 'AI Task Recommender',
      description: 'Our world-class NLP engine understands every word you type. Describe your task naturally and get perfect AI tool matches instantly.',
      color: 'from-violet-500 to-purple-600',
      stats: '98% accuracy'
    },
    {
      icon: '📚',
      title: 'Interactive Playbooks',
      description: 'Brilliant-style lessons that teach you AI mastery through hands-on practice. Learn by doing, not just reading.',
      color: 'from-blue-500 to-cyan-500',
      stats: '45+ lessons'
    },
    {
      icon: '🌱',
      title: 'Progress Garden',
      description: 'Watch your AI skills bloom. A beautiful visualization of your learning journey that keeps you motivated.',
      color: 'from-emerald-500 to-green-500',
      stats: 'Gamified growth'
    },
    {
      icon: '🤝',
      title: 'Peer Network',
      description: 'Connect with AI champions across your organization. Share experiments, get help, and celebrate wins together.',
      color: 'from-amber-500 to-orange-500',
      stats: '10x engagement'
    },
    {
      icon: '🔒',
      title: 'Trust Dashboard',
      description: 'Full transparency on AI tool approvals, security ratings, and compliance status. Use AI with confidence.',
      color: 'from-rose-500 to-pink-500',
      stats: 'Enterprise ready'
    }
  ];
  
  const testimonials = [
    { name: 'Sarah Chen', role: 'Senior Engineer', quote: 'Synapse 10x\'d my productivity. The AI recommendations are scary accurate.', avatar: '👩‍💻' },
    { name: 'Marcus Johnson', role: 'Design Lead', quote: 'Finally, an AI platform that understands creative workflows. Game changer.', avatar: '👨‍🎨' },
    { name: 'Emily Rodriguez', role: 'Product Manager', quote: 'The playbooks took me from AI-curious to AI-native in just 2 weeks.', avatar: '👩‍💼' }
  ];
  
  const stats = [
    { value: '50+', label: 'AI Tools', suffix: '' },
    { value: '10', label: 'Hours Saved', suffix: '/week' },
    { value: '94', label: 'Adoption Rate', suffix: '%' },
    { value: '4.9', label: 'User Rating', suffix: '/5' }
  ];

  return (
    <div className={`relative overflow-y-auto max-h-[85vh] ${darkMode ? 'bg-neutral-950' : 'bg-white'}`}>
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-30 animate-pulse ${
            darkMode ? 'bg-gradient-to-r from-violet-600 to-blue-600' : 'bg-gradient-to-r from-violet-400 to-blue-400'
          }`} style={{ animationDuration: '4s' }} />
          <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-30 animate-pulse ${
            darkMode ? 'bg-gradient-to-r from-emerald-600 to-cyan-600' : 'bg-gradient-to-r from-emerald-400 to-cyan-400'
          }`} style={{ animationDuration: '5s', animationDelay: '1s' }} />
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${darkMode ? 'bg-white/20' : 'bg-neutral-900/10'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className={`relative px-6 pt-8 pb-12 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Logo Animation */}
          <div className="relative inline-block mb-6">
            <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-violet-500/30 transform hover:scale-110 transition-transform`}>
              <span className="text-4xl">🧬</span>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-bounce">
              <SparkleIcon size={14} className="text-white" />
            </div>
          </div>
          
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              Synapse
            </span>
          </h1>
          
          <p className={`text-xl font-medium mb-2 ${darkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
            Your AI Productivity Superpower
          </p>
          
          <p className={`text-sm max-w-xs mx-auto ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            The enterprise platform that transforms how teams discover, learn, and master AI tools.
          </p>
          
          {/* CTA Button */}
          <button className="mt-6 px-8 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transform hover:scale-105 transition-all flex items-center gap-2 mx-auto">
            <RocketIcon size={18} />
            Start Your Journey
          </button>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className={`px-4 py-6 ${darkMode ? 'bg-neutral-900/50' : 'bg-neutral-50'}`}>
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center transition-all duration-700 ${
                statsAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {stat.value}<span className="text-sm font-normal">{stat.suffix}</span>
              </div>
              <div className={`text-[10px] sm:text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features Showcase */}
      <div className="px-5 py-8">
        <div className="text-center mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
            darkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
          }`}>
            ✨ Features
          </span>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Everything You Need
          </h2>
        </div>
        
        {/* Active Feature Card */}
        <div className={`relative rounded-2xl overflow-hidden mb-4 transition-all duration-500`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].color} opacity-10`} />
          <div className={`relative p-5 ${darkMode ? 'bg-neutral-800/50' : 'bg-white/80'} backdrop-blur`}>
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${features[activeFeature].color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                {features[activeFeature].icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {features[activeFeature].title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    darkMode ? 'bg-white/10 text-white/80' : 'bg-neutral-900/10 text-neutral-700'
                  }`}>
                    {features[activeFeature].stats}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {features[activeFeature].description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeFeature 
                  ? 'w-6 bg-gradient-to-r from-violet-500 to-blue-500' 
                  : darkMode ? 'bg-neutral-700' : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>
        
        {/* Feature List */}
        <div className="grid grid-cols-5 gap-2">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`p-3 rounded-xl text-center transition-all ${
                index === activeFeature
                  ? `bg-gradient-to-br ${feature.color} text-white shadow-lg`
                  : darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'
              }`}
            >
              <span className="text-xl">{feature.icon}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Testimonials */}
      <div className={`px-5 py-8 ${darkMode ? 'bg-neutral-900/30' : 'bg-neutral-50'}`}>
        <div className="text-center mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
            darkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'
          }`}>
            💬 Testimonials
          </span>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Loved by Teams
          </h2>
        </div>
        
        <div className="space-y-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}
            >
              <p className={`text-sm italic mb-3 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {testimonial.name}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Why Synapse */}
      <div className="px-5 py-8">
        <div className="text-center mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
            darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
          }`}>
            🚀 Why Synapse
          </span>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Built Different
          </h2>
        </div>
        
        <div className="space-y-3">
          {[
            { icon: <CheckIcon size={16} />, title: 'Enterprise Security', desc: 'SOC 2 compliant, SSO ready' },
            { icon: <LightbulbIcon size={16} />, title: 'Smart Learning', desc: 'Adapts to your skill level' },
            { icon: <StarIcon size={16} />, title: 'Curated Tools', desc: 'Only vetted, approved AI tools' },
            { icon: <RocketIcon size={16} />, title: 'Instant Setup', desc: 'Up and running in 5 minutes' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {item.icon}
              </div>
              <div>
                <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {item.title}
                </p>
                <p className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Final CTA */}
      <div className={`px-5 py-8 text-center ${darkMode ? 'bg-gradient-to-t from-neutral-900 to-transparent' : 'bg-gradient-to-t from-neutral-100 to-transparent'}`}>
        <div className={`p-6 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 text-white`}>
          <h3 className="text-xl font-bold mb-2">Ready to Transform?</h3>
          <p className="text-sm text-white/80 mb-4">
            Join thousands of teams already using Synapse to supercharge their AI adoption.
          </p>
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-white text-neutral-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <SparkleIcon size={18} />
            Get Started Now
          </button>
        </div>
        
        <p className={`text-xs mt-4 ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
          Made with ❤️ for the AI-curious
        </p>
      </div>
      
      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  userName: string;
  userRole: string;
}

type SettingsTab = 'settings' | 'about';

export const Settings: React.FC<SettingsProps> = ({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  userName,
  userRole,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('settings');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md mx-4 mb-0 sm:mb-0 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slideUp ${
        darkMode ? 'bg-neutral-900' : 'bg-white'
      }`}>
        {/* Header with Tabs */}
        <div className={`px-5 py-4 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              {activeTab === 'settings' ? 'Settings' : 'About Synapse'}
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-500'
              }`}
            >
              <CloseIcon size={20} />
            </button>
          </div>
          
          {/* Tab Switcher */}
          <div className={`flex gap-1 p-1 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'settings'
                  ? darkMode 
                    ? 'bg-neutral-700 text-white shadow' 
                    : 'bg-white text-neutral-900 shadow'
                  : darkMode
                    ? 'text-neutral-400 hover:text-neutral-300'
                    : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <span>⚙️</span> Settings
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'about'
                  ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow'
                  : darkMode
                    ? 'text-neutral-400 hover:text-neutral-300'
                    : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <span>✨</span> About
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'settings' ? (
          <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Profile Section */}
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-neutral-700' : 'bg-neutral-900'
                }`}>
                  <UserIcon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {userName}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {userRole}
                  </p>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Appearance
              </h3>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? (
                      <MoonIcon className="text-blue-400" size={20} />
                    ) : (
                      <SunIcon className="text-amber-500" size={20} />
                    )}
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                        Dark Mode
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {darkMode ? 'Currently enabled' : 'Currently disabled'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onToggleDarkMode}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      darkMode ? 'bg-blue-600' : 'bg-neutral-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      darkMode ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Notifications
              </h3>
              <div className={`p-4 rounded-xl space-y-4 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <ToggleOption
                  icon={<BellIcon size={20} />}
                  title="Push Notifications"
                  description="Get notified about new posts"
                  darkMode={darkMode}
                  defaultChecked={true}
                />
                <ToggleOption
                  icon={<BellIcon size={20} />}
                  title="Email Digest"
                  description="Weekly summary of activity"
                  darkMode={darkMode}
                  defaultChecked={false}
                />
              </div>
            </div>

            {/* Privacy */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Privacy
              </h3>
              <div className={`p-4 rounded-xl space-y-4 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <ToggleOption
                  icon={<ShieldIcon size={20} />}
                  title="Profile Visibility"
                  description="Allow others to see your profile"
                  darkMode={darkMode}
                  defaultChecked={true}
                />
                <ToggleOption
                  icon={<ShieldIcon size={20} />}
                  title="Activity Status"
                  description="Show when you're active"
                  darkMode={darkMode}
                  defaultChecked={true}
                />
              </div>
            </div>

            {/* About Synapse Banner */}
            <button
              onClick={() => setActiveTab('about')}
              className={`w-full p-4 rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-blue-500/10 border ${
                darkMode ? 'border-violet-500/30' : 'border-violet-200'
              } hover:shadow-lg hover:shadow-violet-500/10 transition-all group`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white shadow">
                  <SparkleIcon size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                    Discover Synapse
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    See all features & what makes us special
                  </p>
                </div>
                <ChevronRightIcon size={20} className={`${darkMode ? 'text-neutral-500' : 'text-neutral-400'} group-hover:translate-x-1 transition-transform`} />
              </div>
            </button>

            {/* App Info */}
            <div className={`text-center pt-4 border-t ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Synapse v1.0.0
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                AI Productivity Platform
              </p>
            </div>
          </div>
        ) : (
          <SynapseLandingPage darkMode={darkMode} onClose={() => setActiveTab('settings')} />
        )}
      </div>
    </div>
  );
};

// Toggle Option Component
interface ToggleOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  darkMode: boolean;
  defaultChecked: boolean;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ icon, title, description, darkMode, defaultChecked }) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={darkMode ? 'text-neutral-400' : 'text-neutral-500'}>
          {icon}
        </span>
        <div>
          <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {title}
          </p>
          <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {description}
          </p>
        </div>
      </div>
      <button
        onClick={() => setIsChecked(!isChecked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          isChecked 
            ? (darkMode ? 'bg-blue-600' : 'bg-neutral-900')
            : (darkMode ? 'bg-neutral-700' : 'bg-neutral-300')
        }`}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          isChecked ? 'translate-x-5' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );
};

export default Settings;
