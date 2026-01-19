import React from 'react';

interface IllustrationPlaceholderProps {
  type: string;
}

export const IllustrationPlaceholder: React.FC<IllustrationPlaceholderProps> = ({ type }) => {
  const getIllustration = () => {
    switch (type) {
      case 'sorting-robot':
        return <SortingRobotIllustration />;
      case 'happy-chat-bot':
        return <HappyChatBotIllustration />;
      case 'rocket-bunny':
        return <RocketBunnyIllustration />;
      case 'new-idea':
        return <NewIdeaIllustration />;
      default:
        return <DefaultIllustration />;
    }
  };

  return (
    <div className="relative w-full h-40 bg-neutral-50 rounded-lg overflow-hidden border border-neutral-200">
      <div className="absolute inset-0 flex items-center justify-center">
        {getIllustration()}
      </div>
    </div>
  );
};

// Minimalist Sorting Robot
const SortingRobotIllustration: React.FC = () => (
  <svg width="180" height="120" viewBox="0 0 180 120">
    {/* Blocks */}
    <rect x="20" y="75" width="20" height="20" rx="4" fill="#8b5cf6" opacity="0.8" />
    <rect x="45" y="75" width="20" height="20" rx="4" fill="#06b6d4" opacity="0.8" />
    <rect x="115" y="75" width="20" height="20" rx="4" fill="#10b981" opacity="0.8" />
    <rect x="140" y="75" width="20" height="20" rx="4" fill="#f59e0b" opacity="0.8" />
    
    {/* Robot body */}
    <rect x="70" y="40" width="40" height="50" rx="6" fill="#334155" stroke="#475569" strokeWidth="1.5" />
    
    {/* Robot head */}
    <rect x="75" y="15" width="30" height="28" rx="4" fill="#475569" stroke="#64748b" strokeWidth="1.5" />
    
    {/* Antenna */}
    <line x1="90" y1="15" x2="90" y2="5" stroke="#64748b" strokeWidth="1.5" />
    <circle cx="90" cy="4" r="2.5" fill="#8b5cf6" />
    
    {/* Eyes */}
    <circle cx="82" cy="26" r="3" fill="#06b6d4" />
    <circle cx="98" cy="26" r="3" fill="#06b6d4" />
    
    {/* Smile */}
    <path d="M 84 35 Q 90 39, 96 35" stroke="#64748b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    
    {/* Arms */}
    <rect x="52" y="50" width="18" height="6" rx="3" fill="#334155" stroke="#475569" strokeWidth="1" />
    <rect x="110" y="50" width="18" height="6" rx="3" fill="#334155" stroke="#475569" strokeWidth="1" />
    
    {/* Chest indicator */}
    <circle cx="90" cy="62" r="4" fill="#10b981" opacity="0.6" />
  </svg>
);

// Minimalist Chat Bot
const HappyChatBotIllustration: React.FC = () => (
  <svg width="180" height="120" viewBox="0 0 180 120">
    {/* Speech bubbles */}
    <rect x="115" y="15" width="45" height="24" rx="12" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeWidth="1" />
    <rect x="20" y="70" width="40" height="20" rx="10" fill="#06b6d4" opacity="0.2" stroke="#06b6d4" strokeWidth="1" />
    
    {/* Main bot circle */}
    <circle cx="90" cy="60" r="35" fill="#334155" stroke="#475569" strokeWidth="1.5" />
    
    {/* Eyes - curved happy */}
    <path d="M 75 52 Q 78 48, 81 52" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 99 52 Q 102 48, 105 52" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinecap="round" />
    
    {/* Smile */}
    <path d="M 78 70 Q 90 82, 102 70" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
    
    {/* Decorative dots */}
    <circle cx="145" y="60" r="2" fill="#f59e0b" opacity="0.5" />
    <circle cx="35" y="45" r="1.5" fill="#8b5cf6" opacity="0.5" />
  </svg>
);

// Minimalist Rocket
const RocketBunnyIllustration: React.FC = () => (
  <svg width="180" height="120" viewBox="0 0 180 120">
    {/* Speed lines */}
    <line x1="15" y1="45" x2="40" y2="45" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="60" x2="35" y2="60" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="75" x2="45" y2="75" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Rocket body */}
    <ellipse cx="105" cy="60" rx="35" ry="22" fill="#334155" stroke="#475569" strokeWidth="1.5" />
    
    {/* Rocket nose */}
    <path d="M 140 60 L 160 60 L 140 45 Z" fill="#8b5cf6" />
    <path d="M 140 60 L 160 60 L 140 75 Z" fill="#8b5cf6" />
    
    {/* Window */}
    <circle cx="100" cy="58" r="12" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
    <circle cx="100" cy="58" r="6" fill="#06b6d4" opacity="0.2" />
    
    {/* Fins */}
    <polygon points="75,42 68,30 80,42" fill="#f59e0b" />
    <polygon points="75,78 68,90 80,78" fill="#f59e0b" />
    
    {/* Exhaust */}
    <ellipse cx="60" cy="60" rx="10" ry="8" fill="#f59e0b" opacity="0.6" />
    <ellipse cx="48" cy="60" rx="6" ry="5" fill="#ef4444" opacity="0.4" />
    
    {/* Stars */}
    <circle cx="155" y="35" r="1.5" fill="#f59e0b" />
    <circle cx="165" y="85" r="1" fill="#06b6d4" />
  </svg>
);

// Minimalist Lightbulb
const NewIdeaIllustration: React.FC = () => (
  <svg width="180" height="120" viewBox="0 0 180 120">
    {/* Glow */}
    <circle cx="90" cy="50" r="40" fill="#f59e0b" opacity="0.05" />
    <circle cx="90" cy="50" r="30" fill="#f59e0b" opacity="0.1" />
    
    {/* Bulb */}
    <circle cx="90" cy="45" r="25" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
    
    {/* Filament lines */}
    <path d="M 82 35 L 82 50" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M 90 32 L 90 52" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M 98 35 L 98 50" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    
    {/* Base */}
    <rect x="80" y="70" width="20" height="12" rx="2" fill="#475569" />
    <line x1="80" y1="74" x2="100" y2="74" stroke="#64748b" strokeWidth="1" />
    <line x1="80" y1="78" x2="100" y2="78" stroke="#64748b" strokeWidth="1" />
    
    {/* Sparkles */}
    <circle cx="130" cy="30" r="2" fill="#8b5cf6" opacity="0.6" />
    <circle cx="50" cy="40" r="1.5" fill="#06b6d4" opacity="0.6" />
    <circle cx="140" cy="75" r="1" fill="#10b981" opacity="0.6" />
  </svg>
);

// Default illustration
const DefaultIllustration: React.FC = () => (
  <svg width="180" height="120" viewBox="0 0 180 120">
    <circle cx="90" cy="60" r="30" fill="#334155" stroke="#475569" strokeWidth="1.5" />
    <circle cx="80" cy="55" r="3" fill="#06b6d4" />
    <circle cx="100" cy="55" r="3" fill="#06b6d4" />
    <path d="M 80 70 Q 90 78, 100 70" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="135" cy="35" r="1.5" fill="#8b5cf6" opacity="0.5" />
    <circle cx="45" cy="80" r="1" fill="#f59e0b" opacity="0.5" />
  </svg>
);

export default IllustrationPlaceholder;
