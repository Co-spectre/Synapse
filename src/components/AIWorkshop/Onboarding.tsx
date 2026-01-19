import React, { useState } from 'react';
import { 
  RocketIcon, 
  SparkleIcon, 
  CheckCircleIcon, 
  SeedlingIcon, 
  ZapIcon, 
  LightbulbIcon,
  BrainIcon,
  CompassIcon,
  LayersIcon,
  CodeIcon,
  ArrowRightIcon,
  UserIcon,
  TrendingUpIcon,
  ShieldIcon,
  BookIcon,
  AwardIcon,
  SynapseLogoIcon
} from './icons';

export type UserLevel = 'beginner' | 'intermediate' | 'expert';
export type JobRole = 'engineering' | 'design' | 'sales' | 'marketing' | 'finance' | 'logistics' | 'innovation' | 'intern';

interface OnboardingProps {
  onComplete: (level: UserLevel, name: string, role: JobRole) => void;
}

interface QuestionOption {
  text: string;
  points: number;
  icon: React.ReactNode;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  illustration: React.ReactNode;
  options: QuestionOption[];
}

// Job role configuration
const jobRoles: { id: JobRole; title: string; icon: React.ReactNode; description: string }[] = [
  { id: 'engineering', title: 'Engineering', icon: <CodeIcon size={20} className="text-blue-600" />, description: 'Software, DevOps, Data' },
  { id: 'design', title: 'Design', icon: <CompassIcon size={20} className="text-violet-600" />, description: 'UX, UI, Product Design' },
  { id: 'sales', title: 'Sales', icon: <TrendingUpIcon size={20} className="text-emerald-600" />, description: 'Sales, Business Dev' },
  { id: 'marketing', title: 'Marketing', icon: <SparkleIcon size={20} className="text-rose-600" />, description: 'Marketing, Comms, PR' },
  { id: 'finance', title: 'Finance', icon: <ShieldIcon size={20} className="text-amber-600" />, description: 'Finance, Accounting' },
  { id: 'logistics', title: 'Operations', icon: <LayersIcon size={20} className="text-cyan-600" />, description: 'Logistics, Operations' },
  { id: 'innovation', title: 'Innovation', icon: <LightbulbIcon size={20} className="text-orange-600" />, description: 'Innovation, R&D' },
  { id: 'intern', title: 'Intern', icon: <AwardIcon size={20} className="text-indigo-600" />, description: 'New to the company' },
];

const questions: Question[] = [
  {
    id: 1,
    question: "How familiar are you with AI?",
    subtitle: "Tell us about your experience with AI tools",
    illustration: (
      <div className="relative w-full h-32 flex items-center justify-center">
        <div className="absolute w-20 h-20 bg-blue-100 rounded-full animate-pulse" />
        <div className="absolute w-14 h-14 bg-violet-100 rounded-full -left-4 top-2" />
        <div className="absolute w-10 h-10 bg-emerald-100 rounded-full right-8 bottom-2" />
        <BrainIcon size={48} className="text-neutral-800 relative z-10" />
      </div>
    ),
    options: [
      { 
        text: "I'm just getting started", 
        points: 0,
        icon: <SeedlingIcon size={20} className="text-emerald-600" />
      },
      { 
        text: "I use AI sometimes", 
        points: 1,
        icon: <LightbulbIcon size={20} className="text-amber-600" />
      },
      { 
        text: "AI is part of my daily work", 
        points: 2,
        icon: <ZapIcon size={20} className="text-violet-600" />
      },
    ]
  },
  {
    id: 2,
    question: "What do you want to achieve?",
    subtitle: "Select your primary learning goal",
    illustration: (
      <div className="relative w-full h-32 flex items-center justify-center">
        <div className="absolute w-24 h-2 bg-gradient-to-r from-emerald-200 via-blue-200 to-violet-200 rounded-full top-1/2 -translate-y-1/2" />
        <div className="absolute w-6 h-6 bg-emerald-400 rounded-full left-1/4 top-1/2 -translate-y-1/2" />
        <div className="absolute w-6 h-6 bg-violet-400 rounded-full right-1/4 top-1/2 -translate-y-1/2" />
        <RocketIcon size={48} className="text-neutral-800 relative z-10" />
      </div>
    ),
    options: [
      { 
        text: "Learn AI fundamentals", 
        points: 0,
        icon: <SeedlingIcon size={20} className="text-emerald-600" />
      },
      { 
        text: "Boost my productivity", 
        points: 1,
        icon: <ZapIcon size={20} className="text-amber-600" />
      },
      { 
        text: "Build AI-powered products", 
        points: 2,
        icon: <RocketIcon size={20} className="text-violet-600" />
      },
    ]
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'role' | 'questions' | 'complete'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const calculateLevel = (): UserLevel => {
    const totalPoints = answers.reduce((sum, points) => sum + points, 0);
    if (totalPoints <= 1) return 'beginner';
    if (totalPoints <= 3) return 'intermediate';
    return 'expert';
  };

  const getLevelInfo = (level: UserLevel) => {
    switch (level) {
      case 'beginner':
        return {
          title: 'AI Explorer',
          description: "Perfect! We'll start with the fundamentals and build your confidence step by step.",
          icon: <SeedlingIcon size={32} className="text-white" />,
          color: 'bg-emerald-500',
          gradient: 'from-emerald-400 to-teal-500'
        };
      case 'intermediate':
        return {
          title: 'AI Practitioner',
          description: "Great foundation! We'll help you level up with advanced techniques and real-world applications.",
          icon: <ZapIcon size={32} className="text-white" />,
          color: 'bg-blue-500',
          gradient: 'from-blue-400 to-indigo-500'
        };
      case 'expert':
        return {
          title: 'AI Innovator',
          description: "Impressive! We'll connect you with cutting-edge practices and leadership opportunities.",
          icon: <RocketIcon size={32} className="text-white" />,
          color: 'bg-violet-500',
          gradient: 'from-violet-400 to-purple-500'
        };
    }
  };

  const getRoleInfo = (role: JobRole) => {
    return jobRoles.find(r => r.id === role);
  };

  const handleAnswer = (points: number) => {
    setSelectedOption(points);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    
    setIsAnimating(true);
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    setTimeout(() => {
      setSelectedOption(null);
      setIsAnimating(false);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setStep('complete');
      }
    }, 300);
  };

  const handleComplete = () => {
    const level = calculateLevel();
    onComplete(level, name || 'User', selectedRole || 'engineering');
  };

  // Welcome Screen
  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Decorative Elements */}
          <div className="relative mb-8">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-100/50 rounded-full blur-3xl" />
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xl shadow-neutral-200/50 p-8 relative overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
            
            <div className="relative">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-neutral-900 rounded-2xl blur-xl opacity-20" />
                  <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center relative">
                    <SynapseLogoIcon size={36} className="text-white" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-neutral-900 mb-2 text-center">
                Welcome to Synapse
              </h1>
              <p className="text-neutral-500 text-center mb-8">
                Intelligence, amplified — let's personalize your journey
              </p>

              {/* Name Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  What should we call you?
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                    <UserIcon size={18} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep('role')}
                className="w-full py-3.5 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-all hover:shadow-lg hover:shadow-neutral-900/20 flex items-center justify-center gap-2 group"
              >
                <span>Continue</span>
                <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-neutral-400 mt-4 text-center">
                4 quick steps · Takes 1 minute
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Role Selection Screen
  if (step === 'role') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center p-4">
        <div className="max-w-xl w-full">
          {/* Progress Steps */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-1 bg-neutral-900 rounded-full" />
            <div className="flex-1 h-1 bg-neutral-200 rounded-full" />
            <div className="flex-1 h-1 bg-neutral-200 rounded-full" />
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xl shadow-neutral-200/50 overflow-hidden">
            {/* Illustration */}
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-6 border-b border-neutral-100">
              <div className="relative w-full h-32 flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-blue-100 rounded-lg rotate-12 left-1/4" />
                <div className="absolute w-12 h-12 bg-violet-100 rounded-lg -rotate-6 right-1/4" />
                <div className="absolute w-10 h-10 bg-emerald-100 rounded-lg rotate-3 left-1/3 bottom-0" />
                <BookIcon size={48} className="text-neutral-800 relative z-10" />
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide mb-2">
                Step 1 of 3
              </p>
              <h2 className="text-xl font-bold text-neutral-900 mb-1">
                What's your role?
              </h2>
              <p className="text-neutral-500 text-sm mb-6">
                This helps us recommend the right AI tools and connect you with peers
              </p>

              {/* Role Grid */}
              <div className="grid grid-cols-2 gap-3">
                {jobRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedRole === role.id
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                      selectedRole === role.id ? 'bg-white/20' : 'bg-neutral-100'
                    }`}>
                      {React.cloneElement(role.icon as React.ReactElement, {
                        className: selectedRole === role.id ? 'text-white' : ''
                      })}
                    </div>
                    <p className="font-medium">{role.title}</p>
                    <p className={`text-xs mt-0.5 ${selectedRole === role.id ? 'text-white/70' : 'text-neutral-500'}`}>
                      {role.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => setStep('questions')}
                disabled={!selectedRole}
                className="w-full py-3.5 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                <span>Continue</span>
                <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questions Screen - Brilliant Style
  if (step === 'questions') {
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-1 bg-neutral-900 rounded-full" />
            {questions.map((_, index) => (
              <div key={index} className="flex-1 relative">
                <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neutral-900 rounded-full transition-all duration-500"
                    style={{ 
                      width: index < currentQuestion ? '100%' : 
                             index === currentQuestion && selectedOption !== null ? '100%' : 
                             '0%' 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={`bg-white rounded-2xl border border-neutral-200/80 shadow-xl shadow-neutral-200/50 overflow-hidden transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {/* Illustration Area */}
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-6 border-b border-neutral-100">
              {question.illustration}
            </div>

            {/* Question */}
            <div className="p-6">
              <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide mb-2">
                Step {currentQuestion + 2} of 3
              </p>
              <h2 className="text-xl font-bold text-neutral-900 mb-1">
                {question.question}
              </h2>
              <p className="text-neutral-500 text-sm mb-6">
                {question.subtitle}
              </p>

              {/* Options - Card Style */}
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.points)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 group ${
                      selectedOption === option.points
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedOption === option.points
                        ? 'bg-white/20'
                        : 'bg-neutral-100 group-hover:bg-neutral-200'
                    }`}>
                      {React.cloneElement(option.icon as React.ReactElement, {
                        className: selectedOption === option.points ? 'text-white' : ''
                      })}
                    </div>
                    <span className="font-medium">{option.text}</span>
                    {selectedOption === option.points && (
                      <CheckCircleIcon size={20} className="ml-auto text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="px-6 pb-6">
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="w-full py-3.5 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-neutral-900 flex items-center justify-center gap-2 group"
              >
                <span>{currentQuestion < questions.length - 1 ? 'Continue' : 'See Results'}</span>
                <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform group-disabled:transform-none" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete Screen - Results
  const level = calculateLevel();
  const levelInfo = getLevelInfo(level);
  const roleInfo = getRoleInfo(selectedRole || 'engineering');
  const isIntern = selectedRole === 'intern';

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xl shadow-neutral-200/50 overflow-hidden">
          {/* Header with Gradient */}
          <div className={`bg-gradient-to-br ${levelInfo.gradient} p-8 text-center text-white relative overflow-hidden`}>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                {levelInfo.icon}
              </div>
              <h2 className="text-2xl font-bold mb-1">
                {isIntern ? `Welcome aboard, ${name || 'Team Member'}!` : `Great work, ${name || 'there'}!`}
              </h2>
              <p className="text-white/80 text-sm">
                {isIntern ? 'Your welcome pack is ready' : 'Your personalized path is ready'}
              </p>
            </div>
          </div>

          {/* Level & Role Info */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6 p-4 bg-neutral-50 rounded-xl">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                {roleInfo?.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-neutral-400 uppercase tracking-wide">Your Role</p>
                <p className="font-semibold text-neutral-900">{roleInfo?.title}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-400 uppercase tracking-wide">AI Level</p>
                <p className="font-semibold text-neutral-900">{levelInfo.title}</p>
              </div>
            </div>

            {/* What's Personalized */}
            <div className="bg-neutral-50 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-neutral-700 mb-3">
                {isIntern ? "Your welcome pack includes:" : "What we've prepared for you:"}
              </p>
              <div className="space-y-3">
                {isIntern ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon size={16} className="text-indigo-600" />
                      </div>
                      <span className="text-sm text-neutral-600">Connect with mentors & peers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon size={16} className="text-emerald-600" />
                      </div>
                      <span className="text-sm text-neutral-600">Company culture & AI guidelines</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon size={16} className="text-amber-600" />
                      </div>
                      <span className="text-sm text-neutral-600">AI tools for your department</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon size={16} className="text-emerald-600" />
                      </div>
                      <span className="text-sm text-neutral-600">AI tools curated for {roleInfo?.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon size={16} className="text-blue-600" />
                      </div>
                      <span className="text-sm text-neutral-600">Connect with peers in your department</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon size={16} className="text-violet-600" />
                      </div>
                      <span className="text-sm text-neutral-600">Learning paths for your level</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="w-full py-3.5 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-all hover:shadow-lg hover:shadow-neutral-900/20 flex items-center justify-center gap-2 group"
            >
              <span>{isIntern ? 'Open Welcome Pack' : 'Start Learning'}</span>
              <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
