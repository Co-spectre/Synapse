import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ProgressGarden } from './ProgressGarden';
import { StoryCard } from './StoryCard';
import { NewPostComposer } from './NewPostComposer';
import { ExperimentsBoard } from './ExperimentsBoard';
import { PlaybooksList } from './PlaybookCard';
import { TrustDashboard } from './TrustDashboard';
import { PersonalJourney } from './PersonalJourney';
import { QuickActions } from './QuickActions';
import { SearchAndFilter, FilterOptions } from './SearchAndFilter';
import { Onboarding, UserLevel, JobRole } from './Onboarding';
import { AIAdvisor } from './AIAdvisor';
import { PeerNetwork } from './PeerNetwork';
import { AIUsageTracker } from './AIUsageTracker';
import { EventsCalendar } from './EventsCalendar';
import { Newsletter } from './Newsletter';
import { SynapseLogoIcon, PlusIcon, LeafIcon, FlaskIcon, BookIcon, ShieldIcon, UserIcon, SparkleIcon, TrendingUpIcon, CompassIcon, CalendarIcon, MailIcon } from './icons';
import { enhancedStories, enhancedExperiments } from './sampleData';

// User profile type
interface UserProfile {
  name: string;
  level: UserLevel;
  role: JobRole;
  isOnboarded: boolean;
}

// Tab type
type TabType = 'feed' | 'experiments' | 'playbooks' | 'trust' | 'my-journey' | 'ai-advisor' | 'network' | 'analytics' | 'events' | 'newsletter';

// Navigation categories
type NavCategory = 'social' | 'learn' | 'ai';

// Sample data for the news feed - using enhanced data
const sampleStories = enhancedStories;

// Sample experiments data - using enhanced data
const sampleExperiments = enhancedExperiments;

// Sample playbooks data
const samplePlaybooks = [
  {
    id: 1,
    title: "Getting Started with AI Coding",
    description: "Learn the basics of working with AI coding assistants. Perfect for developers new to AI-assisted development.",
    timeToLearn: "30 min",
    difficulty: 'beginner' as const,
    adoptionRate: 87,
    steps: [
      "Install the AI assistant extension",
      "Configure your preferences and shortcuts",
      "Try your first autocomplete suggestion",
      "Practice accepting and modifying suggestions",
      "Complete a small coding task with AI help"
    ],
    outcomes: [
      "Understand how AI suggestions work",
      "Feel confident using basic AI features",
      "Know when to accept vs. modify suggestions"
    ],
    author: "AI Adoption Team",
    category: "Fundamentals"
  },
  {
    id: 2,
    title: "AI-Powered Code Review",
    description: "Use AI to accelerate your code review process while maintaining quality standards.",
    timeToLearn: "45 min",
    difficulty: 'intermediate' as const,
    adoptionRate: 64,
    steps: [
      "Set up AI review integration",
      "Configure review rules and preferences",
      "Run your first AI-assisted review",
      "Learn to interpret AI suggestions",
      "Practice combining AI insights with your expertise",
      "Establish a hybrid review workflow"
    ],
    outcomes: [
      "Review code 40% faster",
      "Catch more edge cases",
      "Consistent review quality"
    ],
    author: "Engineering Excellence",
    category: "Code Quality"
  },
  {
    id: 3,
    title: "Advanced Prompt Engineering",
    description: "Master the art of communicating with AI to get exactly the results you need.",
    timeToLearn: "1.5 hours",
    difficulty: 'advanced' as const,
    adoptionRate: 42,
    steps: [
      "Understand prompt structure and context",
      "Learn the CRISP framework for prompts",
      "Practice iterative prompt refinement",
      "Master multi-step prompting",
      "Create reusable prompt templates",
      "Build a personal prompt library"
    ],
    outcomes: [
      "Get better AI outputs consistently",
      "Reduce back-and-forth iterations",
      "Create reusable prompt templates"
    ],
    author: "AI Research Team",
    category: "Advanced Skills"
  },
  {
    id: 4,
    title: "AI for Technical Documentation",
    description: "Generate, improve, and maintain documentation with AI assistance.",
    timeToLearn: "1 hour",
    difficulty: 'intermediate' as const,
    adoptionRate: 71,
    steps: [
      "Set up documentation AI tools",
      "Generate initial drafts from code",
      "Learn effective editing prompts",
      "Create documentation templates",
      "Establish review workflows"
    ],
    outcomes: [
      "Cut documentation time by 50%",
      "Maintain consistent doc style",
      "Keep docs in sync with code"
    ],
    author: "Developer Experience",
    category: "Documentation"
  }
];

// Sample trust metrics
const sampleTrustMetrics = {
  accuracyRate: 94,
  humanOverrideRate: 6,
  avgConfidence: 87,
  totalDecisions: 1247,
  trend: 'up' as const
};

// Sample AI decisions
const sampleDecisions = [
  {
    id: '1',
    action: "Auto-categorized support ticket as 'Billing Inquiry'",
    reasoning: "Keywords detected: 'invoice', 'payment', 'charge'",
    confidence: 96,
    humanOverride: false,
    timestamp: "2 min ago",
    category: "Classification"
  },
  {
    id: '2',
    action: "Suggested code refactor for performance",
    reasoning: "Detected O(n²) loop that could be optimized to O(n)",
    confidence: 89,
    humanOverride: false,
    timestamp: "15 min ago",
    category: "Code Review"
  },
  {
    id: '3',
    action: "Flagged PR for additional review",
    reasoning: "Changes affect authentication module - requires security review",
    confidence: 78,
    humanOverride: true,
    timestamp: "1 hour ago",
    category: "Security"
  },
  {
    id: '4',
    action: "Auto-generated API documentation",
    reasoning: "Parsed function signatures and JSDoc comments",
    confidence: 92,
    humanOverride: false,
    timestamp: "2 hours ago",
    category: "Documentation"
  }
];

// Sample journey stats
const sampleJourneyStats = {
  level: 3,
  levelName: "AI Explorer",
  totalScore: 1250,
  nextLevelScore: 2000,
  hoursThisWeek: 4.2,
  aiAssists: 47,
  skillsUnlocked: ["Code Review", "Auto-complete", "Documentation", "Testing"],
  learningsShared: 8,
  streak: 12,
  rank: 23,
  totalUsers: 156
};

// Sample achievements
const sampleAchievements = [
  {
    id: '1',
    title: "First Steps",
    description: "Complete your first AI-assisted task",
    icon: "🎯",
    unlockedAt: "Jan 5, 2026"
  },
  {
    id: '2',
    title: "Quick Learner",
    description: "Complete 3 playbooks",
    icon: "📚",
    unlockedAt: "Jan 10, 2026"
  },
  {
    id: '3',
    title: "Knowledge Sharer",
    description: "Share 5 learnings with the team",
    icon: "💡",
    unlockedAt: "Jan 15, 2026"
  },
  {
    id: '4',
    title: "Streak Master",
    description: "Maintain a 30-day AI usage streak",
    icon: "🔥",
    progress: 40
  },
  {
    id: '5',
    title: "Experiment Pioneer",
    description: "Propose and complete an experiment",
    icon: "🧪",
    progress: 75
  }
];

// Sample recent activity
const sampleRecentActivity = [
  { id: '1', action: "Completed 'AI Code Review' playbook", timestamp: "Today", points: 50 },
  { id: '2', action: "Shared a learning in Experiments", timestamp: "Yesterday", points: 25 },
  { id: '3', action: "Used AI for 10 code reviews", timestamp: "2 days ago", points: 30 },
  { id: '4', action: "Helped a teammate with AI setup", timestamp: "3 days ago", points: 40 }
];

export const AIWorkshop: React.FC = () => {
  // User profile state (would come from auth in real app)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    level: 'beginner',
    role: 'engineering',
    isOnboarded: false
  });

  const [stories, setStories] = useState(sampleStories);
  const [showComposer, setShowComposer] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [experiments, setExperiments] = useState(sampleExperiments);
  const [playbookProgress, setPlaybookProgress] = useState<Record<number, number>>({
    1: 100,
    2: 60,
    3: 0,
    4: 25
  });
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [showSplash, setShowSplash] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRefreshLogo, setShowRefreshLogo] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipingCategory, setIsSwipingCategory] = useState(false);
  const [, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startX = useRef(0);
  const isPulling = useRef(false);
  const isHorizontalSwipe = useRef(false);

  // Pull-to-refresh logic
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling.current) return;
    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, Math.min((currentY - startY.current) * 0.5, 120));
    setPullDistance(distance);
    if (distance > 30) {
      setShowRefreshLogo(true);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (pullDistance > 80) {
      setIsRefreshing(true);
      setPullDistance(60);
      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        setShowRefreshLogo(false);
      }, 1500);
    } else {
      setPullDistance(0);
      setShowRefreshLogo(false);
    }
    isPulling.current = false;
  }, [pullDistance]);

  // Category swipe handlers for horizontal navigation
  const handleCategorySwipeStart = useCallback((e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = false;
  }, []);

  const handleCategorySwipeMove = useCallback((e: TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX.current;
    const diffY = currentY - startY.current;

    // Determine if horizontal swipe (only on first significant move)
    if (!isHorizontalSwipe.current && Math.abs(diffX) > 10) {
      isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
    }

    if (isHorizontalSwipe.current) {
      setIsSwipingCategory(true);
      // Limit the swipe offset
      const maxOffset = 100;
      const newOffset = Math.max(-maxOffset, Math.min(maxOffset, diffX * 0.5));
      setSwipeOffset(newOffset);
    }
  }, []);

  const handleCategorySwipeEnd = useCallback(() => {
    if (!isSwipingCategory) return;
    
    const threshold = 50;
    const screenWidth = window.innerWidth;
    
    if (swipeOffset > threshold && activeCategoryIndex > 0) {
      // Swipe right - go to previous category
      setSlideDirection('right');
      setIsTransitioning(true);
      setSwipeOffset(screenWidth); // Slide out to the right
      
      setTimeout(() => {
        const newIndex = activeCategoryIndex - 1;
        setActiveCategoryIndex(newIndex);
        const navCats = [
          { tabs: ['feed', 'network', 'events', 'newsletter'] },
          { tabs: ['experiments', 'playbooks', 'my-journey'] },
          { tabs: ['ai-advisor', 'analytics', 'trust'] }
        ];
        setActiveTab(navCats[newIndex].tabs[0] as TabType);
        setSwipeOffset(-screenWidth); // Position new content off-screen left
        
        requestAnimationFrame(() => {
          setSwipeOffset(0); // Slide in from left
          setTimeout(() => {
            setIsTransitioning(false);
            setSlideDirection(null);
          }, 300);
        });
      }, 150);
    } else if (swipeOffset < -threshold && activeCategoryIndex < 2) {
      // Swipe left - go to next category
      setSlideDirection('left');
      setIsTransitioning(true);
      setSwipeOffset(-screenWidth); // Slide out to the left
      
      setTimeout(() => {
        const newIndex = activeCategoryIndex + 1;
        setActiveCategoryIndex(newIndex);
        const navCats = [
          { tabs: ['feed', 'network', 'events', 'newsletter'] },
          { tabs: ['experiments', 'playbooks', 'my-journey'] },
          { tabs: ['ai-advisor', 'analytics', 'trust'] }
        ];
        setActiveTab(navCats[newIndex].tabs[0] as TabType);
        setSwipeOffset(screenWidth); // Position new content off-screen right
        
        requestAnimationFrame(() => {
          setSwipeOffset(0); // Slide in from right
          setTimeout(() => {
            setIsTransitioning(false);
            setSlideDirection(null);
          }, 300);
        });
      }, 150);
    } else {
      // Snap back
      setSwipeOffset(0);
    }
    
    setIsSwipingCategory(false);
    isHorizontalSwipe.current = false;
  }, [swipeOffset, activeCategoryIndex, isSwipingCategory]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd);
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Category swipe effect
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.addEventListener('touchstart', handleCategorySwipeStart, { passive: true });
    el.addEventListener('touchmove', handleCategorySwipeMove, { passive: true });
    el.addEventListener('touchend', handleCategorySwipeEnd);
    return () => {
      el.removeEventListener('touchstart', handleCategorySwipeStart);
      el.removeEventListener('touchmove', handleCategorySwipeMove);
      el.removeEventListener('touchend', handleCategorySwipeEnd);
    };
  }, [handleCategorySwipeStart, handleCategorySwipeMove, handleCategorySwipeEnd]);

  // Sync activeCategoryIndex when tab changes
  useEffect(() => {
    const socialTabs = ['feed', 'network', 'events', 'newsletter'];
    const learnTabs = ['experiments', 'playbooks', 'my-journey'];
    const aiTabs = ['ai-advisor', 'analytics', 'trust'];
    
    if (socialTabs.includes(activeTab)) setActiveCategoryIndex(0);
    else if (learnTabs.includes(activeTab)) setActiveCategoryIndex(1);
    else if (aiTabs.includes(activeTab)) setActiveCategoryIndex(2);
  }, [activeTab]);

  // Handle onboarding completion
  const handleOnboardingComplete = (level: UserLevel, name: string, role: JobRole) => {
    // Show splash screen first
    setShowSplash(true);
    
    setTimeout(() => {
      setUserProfile({
        name,
        level,
        role,
        isOnboarded: true
      });
      // Set initial tab based on role - interns see network first, others see feed
      if (role === 'intern') {
        setActiveTab('network');
      }
      setShowSplash(false);
    }, 2000);
  };

  // Show onboarding if user hasn't completed it
  if (!userProfile.isOnboarded && !showSplash) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Show splash screen after onboarding
  if (showSplash) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-white flex items-center justify-center safe-area-inset">
        <div className="flex flex-col items-center animate-fade-in px-6">
          <div className="w-20 h-20 bg-neutral-900 rounded-2xl flex items-center justify-center mb-5 animate-pulse">
            <SynapseLogoIcon className="text-white" size={44} />
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-1">Synapse</h1>
          <p className="text-sm text-neutral-500">Intelligence, amplified</p>
        </div>
      </div>
    );
  }

  const totalUpdates = stories.length;
  const goalUpdates = 20; // Increased goal for more stories

  // Filter stories based on search and filters
  let filteredStories = stories.filter(story => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        story.title.toLowerCase().includes(query) ||
        story.content.paragraph1.toLowerCase().includes(query) ||
        story.author.name.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }
    
    // Category filter (if we add categories to stories in the future)
    if (filterOptions.category && filterOptions.category.length > 0) {
      // For now, all stories pass this filter
      // In a real app, stories would have a category property
    }
    
    return true;
  });

  // Sort based on filterOptions
  if (filterOptions.sortBy === 'popular') {
    filteredStories = [...filteredStories].sort((a, b) => {
      const totalA = a.reactions.hearts + a.reactions.sparkles + a.reactions.rockets;
      const totalB = b.reactions.hearts + b.reactions.sparkles + b.reactions.rockets;
      return totalB - totalA;
    });
  } else if (filterOptions.sortBy === 'trending') {
    filteredStories = [...filteredStories].sort((a, b) => b.reactions.rockets - a.reactions.rockets);
  }
  // 'recent' is default order (already in that order)

  const handleNewPost = (post: { title: string; content: string; limitation: string }) => {
    const newStory = {
      id: stories.length + 1,
      title: post.title,
      illustration: "new-idea",
      author: {
        name: "You",
        role: "Team Member",
        color: "from-fuchsia-500 to-pink-600",
        github: "",
        linkedin: "",
        portfolio: ""
      },
      timestamp: "Just now",
      content: {
        paragraph1: post.content,
        paragraph2: ""
      },
      limitation: {
        text: post.limitation || "No limitations noted for this update.",
      },
      reactions: { hearts: 0, sparkles: 0, rockets: 0 },
      comments: []
    };
    setStories([newStory, ...stories]);
    setShowComposer(false);
  };

  const handleReaction = (storyId: number, reactionType: 'hearts' | 'sparkles' | 'rockets') => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, reactions: { ...story.reactions, [reactionType]: story.reactions[reactionType] + 1 }}
        : story
    ));
  };

  const handleAddComment = (storyId: number, comment: string) => {
    setStories(stories.map(story =>
      story.id === storyId
        ? {
            ...story,
            comments: [
              ...story.comments,
              {
                id: story.comments.length + 1,
                author: "You",
                color: "from-fuchsia-500 to-pink-600",
                text: comment,
                timestamp: "Just now"
              }
            ]
          }
        : story
    ) as typeof stories);
  };

  const handleTryExperiment = (id: number) => {
    setExperiments(experiments.map(exp =>
      exp.id === id ? { ...exp, tryCount: exp.tryCount + 1 } : exp
    ));
  };

  const handleShareLearning = (id: number, learning: string) => {
    setExperiments(experiments.map(exp =>
      exp.id === id ? { ...exp, learnings: [learning, ...exp.learnings] } : exp
    ));
  };

  const handleAddExperiment = (experiment: { title: string; hypothesis: string }) => {
    const newExperiment = {
      id: experiments.length + 1,
      title: experiment.title,
      hypothesis: experiment.hypothesis,
      author: { name: "You", color: "from-fuchsia-500 to-pink-600" },
      status: 'testing' as const,
      upvotes: 0,
      learnings: [],
      tryCount: 1
    };
    setExperiments([newExperiment, ...experiments]);
  };

  const handleStartPlaybook = (id: number) => {
    setPlaybookProgress(prev => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 20, 100)
    }));
  };

  // Navigation structure - 3 categories
  const navCategories = [
    {
      id: 'social' as NavCategory,
      label: 'Social',
      icon: UserIcon,
      tabs: [
        { id: 'feed' as TabType, label: 'Updates', icon: LeafIcon },
        { id: 'network' as TabType, label: 'Network', icon: UserIcon },
        { id: 'events' as TabType, label: 'Events', icon: CalendarIcon },
        { id: 'newsletter' as TabType, label: 'Newsletter', icon: MailIcon },
      ]
    },
    {
      id: 'learn' as NavCategory,
      label: 'Learn',
      icon: BookIcon,
      tabs: [
        { id: 'experiments' as TabType, label: 'Experiments', icon: FlaskIcon },
        { id: 'playbooks' as TabType, label: 'Playbooks', icon: BookIcon },
        { id: 'my-journey' as TabType, label: 'Journey', icon: CompassIcon },
      ]
    },
    {
      id: 'ai' as NavCategory,
      label: 'AI Hub',
      icon: SparkleIcon,
      tabs: [
        { id: 'ai-advisor' as TabType, label: 'AI Tools', icon: SparkleIcon },
        { id: 'analytics' as TabType, label: 'Analytics', icon: TrendingUpIcon },
        { id: 'trust' as TabType, label: 'Trust & Safety', icon: ShieldIcon },
      ]
    }
  ];

  const currentCategoryTabs = navCategories[activeCategoryIndex]?.tabs || [];

  return (
    <div ref={mainRef} className="min-h-screen min-h-[100dvh] bg-neutral-50 relative overscroll-none touch-pan-y">
      {/* Pull-to-refresh indicator */}
      <div 
        className="fixed left-0 right-0 flex justify-center transition-all duration-200 ease-out z-[100] pointer-events-none"
        style={{ 
          top: pullDistance > 0 ? `${Math.min(pullDistance - 30, 70)}px` : '-60px',
          opacity: showRefreshLogo ? 1 : 0,
          transform: `scale(${Math.min(pullDistance / 80, 1)})`
        }}
      >
        <div className={`w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center shadow-xl ${isRefreshing ? 'animate-spin' : ''}`}>
          <SynapseLogoIcon className="text-white" size={26} />
        </div>
      </div>

      {/* Header - Mobile Optimized */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 safe-top">
        <div className="max-w-3xl mx-auto px-3 py-2">
          {/* Category Selector with Swipe Indicator */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              {navCategories.map((category, index) => {
                const CategoryIcon = category.icon;
                const isActive = activeCategoryIndex === index;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategoryIndex(index);
                      setActiveTab(category.tabs[0].id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                      isActive
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <CategoryIcon size={14} />
                    <span className="hidden sm:inline">{category.label}</span>
                  </button>
                );
              })}
            </div>
            {/* Swipe hint dots */}
            <div className="flex gap-1.5 items-center">
              {navCategories.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeCategoryIndex === index 
                      ? 'bg-neutral-900 w-4' 
                      : 'bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tab Pills - Horizontally Scrollable */}
          <div className="overflow-x-auto scrollbar-hide -mx-3 px-3">
            <div className="flex gap-2 min-w-max pb-1">
              {currentCategoryTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 whitespace-nowrap ${
                      isActive
                        ? 'bg-neutral-100 text-neutral-900 shadow-sm'
                        : 'text-neutral-500 active:bg-neutral-50'
                    }`}
                  >
                    <TabIcon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Swipeable */}
      <main 
        ref={contentRef}
        className="max-w-3xl mx-auto px-3 sm:px-6 py-4 pb-36 sm:pb-28"
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: isSwipingCategory ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          opacity: isTransitioning ? 0.85 : (isSwipingCategory ? 0.95 : 1),
          willChange: 'transform, opacity'
        }}
      >
        
        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <>
            {/* Progress Garden */}
            <ProgressGarden currentProgress={totalUpdates} goal={goalUpdates} />

            {/* Search and Filter */}
            {showSearch && (
              <SearchAndFilter
                onSearch={(query) => setSearchQuery(query)}
                onFilterChange={(filters) => setFilterOptions(filters)}
                onClose={() => setShowSearch(false)}
              />
            )}

            {/* New Post Composer */}
            {showComposer && (
              <NewPostComposer 
                onSubmit={handleNewPost} 
                onCancel={() => setShowComposer(false)} 
              />
            )}

            {/* Story Feed */}
            <div className="space-y-4 mt-6">
              {filteredStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onReaction={(type) => handleReaction(story.id, type)}
                  onAddComment={(comment) => handleAddComment(story.id, comment)}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredStories.length === 0 && (
              <div className="text-center py-16">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                  <LeafIcon className="text-neutral-400" size={20} />
                </div>
                <p className="text-neutral-600 font-medium">No posts found</p>
                <p className="text-sm text-neutral-400 mt-1">Try adjusting your search or filters</p>
              </div>
            )}

            {/* End of Feed */}
            {filteredStories.length > 0 && (
              <div className="text-center py-16">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
                  <LeafIcon className="text-emerald-500" size={20} />
                </div>
                <p className="text-neutral-600 font-medium">You're all caught up</p>
                <p className="text-sm text-neutral-400 mt-1">Check back soon for more updates</p>
              </div>
            )}
          </>
        )}

        {/* Experiments Tab */}
        {activeTab === 'experiments' && (
          <ExperimentsBoard
            experiments={experiments}
            onTryExperiment={handleTryExperiment}
            onShareLearning={handleShareLearning}
            onAddExperiment={handleAddExperiment}
          />
        )}

        {/* Playbooks Tab */}
        {activeTab === 'playbooks' && (
          <PlaybooksList
            playbooks={samplePlaybooks}
            userProgressMap={playbookProgress}
            onStartPlaybook={handleStartPlaybook}
          />
        )}

        {/* Trust Tab */}
        {activeTab === 'trust' && (
          <TrustDashboard
            metrics={sampleTrustMetrics}
            recentDecisions={sampleDecisions}
          />
        )}

        {/* AI Advisor Tab */}
        {activeTab === 'ai-advisor' && (
          <AIAdvisor userRole={userProfile.role} />
        )}

        {/* Peer Network Tab */}
        {activeTab === 'network' && (
          <PeerNetwork 
            userRole={userProfile.role}
            userName={userProfile.name}
            isIntern={userProfile.role === 'intern'}
          />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AIUsageTracker
            userRole={userProfile.role}
            userName={userProfile.name}
          />
        )}

        {/* My Journey Tab */}
        {activeTab === 'my-journey' && (
          <PersonalJourney
            stats={sampleJourneyStats}
            achievements={sampleAchievements}
            recentActivity={sampleRecentActivity}
            userLevel={userProfile.level}
            userName={userProfile.name}
          />
        )}

        {/* Events Calendar Tab */}
        {activeTab === 'events' && (
          <EventsCalendar
            userRole={userProfile.role}
            userName={userProfile.name}
          />
        )}

        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && (
          <Newsletter
            userEmail="Yasin.Gasimov@gmail.com"
            userName={userProfile.name}
            userRole={userProfile.role}
          />
        )}

      </main>

      {/* Quick Actions Floating Button */}
      <QuickActions
        onNewPost={() => {
          setActiveTab('feed');
          setShowComposer(true);
        }}
        onNewExperiment={() => {
          setActiveTab('experiments');
        }}
        onOpenPlaybooks={() => {
          setActiveTab('playbooks');
        }}
        onSearch={() => {
          setActiveTab('feed');
          setShowSearch(true);
        }}
      />

      {/* Mobile Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-neutral-200 safe-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            const isActive = activeCategoryIndex === index;
            return (
              <button
                key={category.id}
                onClick={() => {
                  if (index === activeCategoryIndex || isTransitioning) return;
                  
                  const screenWidth = window.innerWidth;
                  const direction = index > activeCategoryIndex ? 'left' : 'right';
                  setSlideDirection(direction);
                  setIsTransitioning(true);
                  setSwipeOffset(direction === 'left' ? -screenWidth : screenWidth);
                  
                  setTimeout(() => {
                    setActiveCategoryIndex(index);
                    setActiveTab(category.tabs[0].id);
                    setSwipeOffset(direction === 'left' ? screenWidth : -screenWidth);
                    
                    requestAnimationFrame(() => {
                      setSwipeOffset(0);
                      setTimeout(() => {
                        setIsTransitioning(false);
                        setSlideDirection(null);
                      }, 300);
                    });
                  }, 150);
                }}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all active:scale-95 min-w-[72px] ${
                  isActive
                    ? 'text-neutral-900'
                    : 'text-neutral-400'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all ${
                  isActive ? 'bg-neutral-100' : ''
                }`}>
                  <CategoryIcon size={22} />
                </div>
                <span className={`text-xs font-medium ${
                  isActive ? 'text-neutral-900' : 'text-neutral-500'
                }`}>
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Fixed New Post Button at Bottom - Adjusted for mobile nav */}
      {activeTab === 'feed' && (
        <div className="fixed bottom-16 sm:bottom-0 left-0 right-0 z-40 safe-bottom pb-4 pt-2 bg-gradient-to-t from-neutral-50 via-neutral-50 to-transparent">
          <div className="flex justify-center">
            <button 
              onClick={() => setShowComposer(!showComposer)}
              className="flex items-center gap-2 px-6 py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full transition-all shadow-xl active:scale-95 active:bg-neutral-800"
            >
              <PlusIcon size={18} />
              <span>New Post</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIWorkshop;
