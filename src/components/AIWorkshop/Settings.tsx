import React, { useState, useEffect } from 'react';
import { CloseIcon, MoonIcon, SunIcon, BellIcon, UserIcon, ShieldIcon, SparkleIcon, StarIcon, ChevronRightIcon, LightbulbIcon, BrainIcon, BookIcon, SeedlingIcon, NetworkIcon, LockIcon, ArrowRightIcon, QuoteIcon, SynapseLogoIcon, ZapIcon, SettingsIcon as SettingsTabIcon } from './icons';

// ============================================
// SYNAPSE LANDING PAGE - MINIMAL & SOPHISTICATED
// ============================================

interface LandingPageProps {
  darkMode: boolean;
  onClose: () => void;
}

const SynapseLandingPage: React.FC<LandingPageProps> = ({ darkMode, onClose }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const features = [
    {
      icon: BrainIcon,
      title: 'AI Task Recommender',
      description: 'Advanced NLP engine that understands your intent. Describe any task naturally and get instant, accurate tool matches.',
      gradient: 'from-violet-500 to-indigo-600'
    },
    {
      icon: BookIcon,
      title: 'Interactive Playbooks',
      description: 'Learn AI mastery through hands-on practice. Brilliant-style lessons that adapt to your pace.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: SeedlingIcon,
      title: 'Progress Garden',
      description: 'Beautiful visualization of your learning journey. Watch your AI skills bloom over time.',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: NetworkIcon,
      title: 'Peer Network',
      description: 'Connect with AI champions across your organization. Share experiments and celebrate wins.',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      icon: LockIcon,
      title: 'Trust Dashboard',
      description: 'Full transparency on security ratings and compliance. Enterprise-ready AI governance.',
      gradient: 'from-rose-500 to-pink-600'
    }
  ];
  
  const stats = [
    { value: '50+', label: 'AI Tools' },
    { value: '10h', label: 'Saved Weekly' },
    { value: '94%', label: 'Adoption' },
    { value: '4.9', label: 'Rating' }
  ];
  
  const benefits = [
    { icon: ShieldIcon, title: 'Enterprise Security', desc: 'SOC 2 compliant' },
    { icon: LightbulbIcon, title: 'Adaptive Learning', desc: 'Fits your level' },
    { icon: StarIcon, title: 'Curated Tools', desc: 'Vetted & approved' },
    { icon: ZapIcon, title: 'Instant Setup', desc: '5 min to start' }
  ];

  const ActiveIcon = features[activeFeature].icon;

  return (
    <div className={`relative overflow-y-auto max-h-[85vh] ${darkMode ? 'bg-neutral-950' : 'bg-white'}`}>
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-violet-600' : 'bg-violet-300'
        }`} style={{ transform: 'translate(30%, -30%)' }} />
        <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15 ${
          darkMode ? 'bg-blue-600' : 'bg-blue-300'
        }`} style={{ transform: 'translate(-30%, 30%)' }} />
      </div>
      
      {/* Hero Section */}
      <div className={`relative px-6 pt-10 pb-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            darkMode ? 'bg-gradient-to-br from-violet-500 to-indigo-600' : 'bg-gradient-to-br from-violet-600 to-indigo-700'
          } shadow-lg`}>
            <SynapseLogoIcon size={32} className="text-white" />
          </div>
        </div>
        
        {/* Title */}
        <div className="text-center">
          <h1 className={`text-2xl font-semibold tracking-tight mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Synapse
          </h1>
          <p className={`text-base font-medium mb-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Your AI Productivity Platform
          </p>
          <p className={`text-sm max-w-xs mx-auto leading-relaxed ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
            Transform how your team discovers, learns, and masters AI tools.
          </p>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className={`px-4 py-5 mx-4 rounded-xl mb-6 ${darkMode ? 'bg-neutral-900/60' : 'bg-neutral-50'}`}>
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {stat.value}
              </div>
              <div className={`text-[10px] uppercase tracking-wide ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Feature Showcase */}
      <div className="px-5 mb-6">
        <div className={`relative overflow-hidden rounded-xl ${darkMode ? 'bg-neutral-900/60' : 'bg-neutral-50'}`}>
          {/* Feature Content */}
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${features[activeFeature].gradient} flex items-center justify-center flex-shrink-0`}>
                <ActiveIcon size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {features[activeFeature].title}
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {features[activeFeature].description}
                </p>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className={`h-0.5 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'}`}>
            <div 
              className={`h-full bg-gradient-to-r ${features[activeFeature].gradient} transition-all duration-500`}
              style={{ width: `${((activeFeature + 1) / features.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Feature Indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  index === activeFeature
                    ? `bg-gradient-to-br ${feature.gradient} text-white shadow-lg`
                    : darkMode 
                      ? 'bg-neutral-800/60 text-neutral-500 hover:bg-neutral-800' 
                      : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                }`}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Why Choose Section */}
      <div className="px-5 mb-6">
        <h2 className={`text-sm font-medium uppercase tracking-wide mb-3 ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
          Why Synapse
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`p-3 rounded-xl ${darkMode ? 'bg-neutral-900/60' : 'bg-neutral-50'}`}
              >
                <Icon size={18} className={darkMode ? 'text-neutral-400' : 'text-neutral-500'} />
                <p className={`font-medium text-sm mt-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {item.title}
                </p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Testimonial */}
      <div className="px-5 mb-6">
        <div className={`relative p-5 rounded-xl ${darkMode ? 'bg-neutral-900/60' : 'bg-neutral-50'}`}>
          <QuoteIcon size={24} className={`absolute top-4 left-4 ${darkMode ? 'text-neutral-700' : 'text-neutral-200'}`} />
          <p className={`text-sm italic leading-relaxed mb-4 pl-4 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
            "Synapse transformed how our team works with AI. The recommendations are incredibly accurate."
          </p>
          <div className="flex items-center gap-3 pl-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-neutral-800' : 'bg-neutral-200'
            }`}>
              <UserIcon size={14} className={darkMode ? 'text-neutral-400' : 'text-neutral-500'} />
            </div>
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                Sarah Chen
              </p>
              <p className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                Senior Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="px-5 pb-8">
        <button 
          onClick={onClose}
          className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
            darkMode 
              ? 'bg-white text-neutral-900 hover:bg-neutral-100' 
              : 'bg-neutral-900 text-white hover:bg-neutral-800'
          }`}
        >
          Get Started
          <ArrowRightIcon size={16} />
        </button>
        <p className={`text-center text-xs mt-3 ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
          Built for teams that embrace AI
        </p>
      </div>
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
              <SettingsTabIcon size={14} /> Settings
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
              <SparkleIcon size={14} /> About
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
