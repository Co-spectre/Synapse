// Enhanced sample data with professional profiles and social links

export const enhancedStories = [
  {
    id: 1,
    title: "Automated Test Generation Cut Review Time by 60%",
    illustration: "sorting-robot",
    author: {
      name: "Dr. Sarah Chen",
      role: "Senior AI Researcher @ TechCorp",
      color: "from-violet-500 to-purple-600",
      github: "sarahchen",
      linkedin: "sarahchen-ai",
      portfolio: "https://sarahchen.dev"
    },
    timestamp: "2 hours ago",
    content: {
      paragraph1: "We implemented GPT-4 powered unit test generation that analyzes our codebase and creates comprehensive test suites automatically. What used to take our team 5 hours now takes 2.",
      paragraph2: "The AI learns from our existing test patterns and coding standards. It caught 12 edge cases we hadn't considered in our manual reviews. Our QA team loves having more time for exploratory testing."
    },
    limitation: {
      text: "AI-generated tests still need human review for business logic edge cases. Complex integration tests require manual setup. Best for unit and simple integration tests.",
    },
    reactions: { hearts: 124, sparkles: 89, rockets: 156 },
    comments: [
      { id: 1, author: "Marcus J.", color: "from-cyan-500 to-blue-600", text: "We've been trying this! Did you use any specific prompting strategies?", timestamp: "1 hour ago" },
      { id: 2, author: "Lisa M.", color: "from-pink-500 to-rose-600", text: "The edge case discovery is huge. Sharing this with our team!", timestamp: "45 min ago" },
      { id: 3, author: "Dev Team Lead", color: "from-emerald-500 to-teal-600", text: "What's your false positive rate on the generated tests?", timestamp: "30 min ago" }
    ]
  },
  {
    id: 2,
    title: "Real-Time Code Documentation with AI Copilot",
    illustration: "happy-chat-bot",
    author: {
      name: "Alex Rivera",
      role: "Tech Lead @ DataFlow",
      color: "from-emerald-500 to-teal-600",
      github: "alexrivera",
      behance: "alexrivera-design",
      linkedin: "alex-rivera-tech"
    },
    timestamp: "5 hours ago",
    content: {
      paragraph1: "Trained our AI to generate inline documentation as we code. It watches our Git commits, understands context, and suggests JSDoc comments that actually make sense.",
      paragraph2: "Documentation coverage went from 23% to 87% in two months. New team members onboard 40% faster because they can understand legacy code easily."
    },
    limitation: {
      text: "Works best with TypeScript. JavaScript documentation quality varies. Requires consistent coding patterns to learn effectively.",
    },
    reactions: { hearts: 98, sparkles: 67, rockets: 45 },
    comments: [
      { id: 1, author: "Emma K.", color: "from-violet-500 to-purple-600", text: "This is exactly what we need! Is this open source?", timestamp: "3 hours ago" }
    ]
  },
  {
    id: 3,
    title: "AI Pair Programming Increased Junior Dev Velocity 3x",
    illustration: "rocket-bunny",
    author: {
      name: "Marcus Johnson",
      role: "Engineering Manager @ StartupHub",
      color: "from-amber-500 to-orange-600",
      github: "marcusj",
      linkedin: "marcus-johnson-eng",
      twitter: "marcusj_dev"
    },
    timestamp: "Yesterday",
    content: {
      paragraph1: "We paired junior developers with GitHub Copilot for 90 days. The results shocked us: 3x faster feature completion, 50% fewer bugs, and significantly higher confidence levels.",
      paragraph2: "Junior devs reported feeling less 'stuck' and learning faster by seeing AI suggestions they could learn from. Senior devs saved 15 hours/week answering basic questions."
    },
    limitation: {
      text: "AI can suggest non-optimal patterns. Requires experienced developers to review code regularly. Not a replacement for mentorship - complements it.",
    },
    reactions: { hearts: 234, sparkles: 178, rockets: 289 },
    comments: [
      { id: 1, author: "Dev Mentor", color: "from-cyan-500 to-blue-600", text: "How did you prevent juniors from blindly accepting suggestions?", timestamp: "18 hours ago" },
      { id: 2, author: "Sarah T.", color: "from-pink-500 to-rose-600", text: "We saw similar results! The learning curve is amazing.", timestamp: "12 hours ago" }
    ]
  },
  {
    id: 4,
    title: "AI-Powered Design System Migration Saved 200 Hours",
    illustration: "lightbulb",
    author: {
      name: "Priya Patel",
      role: "Principal Designer @ DesignCo",
      color: "from-pink-500 to-rose-600",
      behance: "priyapatel",
      dribbble: "priyap",
      linkedin: "priya-patel-design",
      portfolio: "https://priyapatel.design"
    },
    timestamp: "2 days ago",
    content: {
      paragraph1: "Migrating 500+ components from our old design system to our new one seemed impossible. We trained a custom AI model on our design patterns and automated 70% of the conversion.",
      paragraph2: "The AI understood our naming conventions, spacing tokens, and color mappings. What we estimated would take 6 months took 6 weeks. Manual review was still needed but focused on creative decisions."
    },
    limitation: {
      text: "Complex components with custom interactions needed manual migration. AI struggled with animations and advanced state management. Best for structural/styling updates.",
    },
    reactions: { hearts: 187, sparkles: 145, rockets: 92 },
    comments: []
  },
  {
    id: 5,
    title: "Automated PR Descriptions Improved Review Speed by 45%",
    illustration: "sorting-robot",
    author: {
      name: "David Kim",
      role: "DevOps Engineer @ CloudScale",
      color: "from-cyan-500 to-blue-600",
      github: "davidkim",
      linkedin: "david-kim-devops",
      twitter: "davidk_cloud"
    },
    timestamp: "3 days ago",
    content: {
      paragraph1: "We built a GitHub Action that analyzes code changes and generates comprehensive PR descriptions. It summarizes changes, lists affected features, and flags potential breaking changes.",
      paragraph2: "Reviewers spend less time understanding context and more time reviewing actual code. Average PR review time dropped from 2.5 hours to 1.3 hours. Approval rate increased 23%."
    },
    limitation: {
      text: "Descriptions are generic for small changes. Sometimes misses business context. Works best with clear commit messages and well-structured code.",
    },
    reactions: { hearts: 156, sparkles: 134, rockets: 201 },
    comments: [
      { id: 1, author: "Tech Lead", color: "from-violet-500 to-purple-600", text: "Do you have the GitHub Action public? Would love to try this!", timestamp: "2 days ago" },
      { id: 2, author: "Riley C.", color: "from-emerald-500 to-teal-600", text: "The breaking change detection alone is worth it.", timestamp: "1 day ago" }
    ]
  },
  {
    id: 6,
    title: "AI Customer Support Bot Handles 65% of Tier-1 Tickets",
    illustration: "happy-chat-bot",
    author: {
      name: "Jennifer Wu",
      role: "Head of Support @ HelpDesk Pro",
      color: "from-violet-500 to-purple-600",
      linkedin: "jennifer-wu-support",
      twitter: "jennwu_support"
    },
    timestamp: "4 days ago",
    content: {
      paragraph1: "Implemented Claude AI for our customer support chat. Trained it on 50,000 historical support tickets. Now handles password resets, basic troubleshooting, and FAQ questions automatically.",
      paragraph2: "Human agents focus on complex issues that need empathy and creative problem-solving. Customer satisfaction scores up 12%. Agent burnout down significantly."
    },
    limitation: {
      text: "Cannot handle emotionally charged situations or refunds. Escalates to humans when confidence is low. Requires constant monitoring for accuracy.",
    },
    reactions: { hearts: 203, sparkles: 167, rockets: 134 },
    comments: [
      { id: 1, author: "Support Lead", color: "from-amber-500 to-orange-600", text: "How did you handle the training data privacy concerns?", timestamp: "3 days ago" }
    ]
  },
  {
    id: 7,
    title: "Code Refactoring AI Reduced Technical Debt by 40%",
    illustration: "rocket-bunny",
    author: {
      name: "Thomas Anderson",
      role: "Staff Engineer @ Legacy Systems Inc",
      color: "from-emerald-500 to-teal-600",
      github: "tanderson",
      linkedin: "thomas-anderson-eng"
    },
    timestamp: "5 days ago",
    content: {
      paragraph1: "We had a 10-year-old codebase with 300K lines of technical debt. Used AI to suggest refactoring opportunities, identify duplicate code, and modernize patterns.",
      paragraph2: "AI flagged 2,400 code smell instances. We fixed 960 of them in 3 months (would've taken a year manually). Code maintainability index improved from 42 to 73."
    },
    limitation: {
      text: "AI suggestions sometimes break subtle dependencies. Requires comprehensive test coverage before refactoring. Not suitable for mission-critical systems without careful review.",
    },
    reactions: { hearts: 167, sparkles: 201, rockets: 245 },
    comments: []
  },
  {
    id: 8,
    title: "Machine Learning Model Deployment Automated End-to-End",
    illustration: "sorting-robot",
    author: {
      name: "Dr. Rachel Foster",
      role: "ML Engineer @ AI Innovations",
      color: "from-cyan-500 to-blue-600",
      github: "rachelfoster",
      linkedin: "rachel-foster-ml",
      portfolio: "https://rachel-foster.ai"
    },
    timestamp: "1 week ago",
    content: {
      paragraph1: "Built an AI agent that handles the entire ML deployment pipeline: data validation, model training, A/B testing setup, and production deployment. What took 2 weeks now takes 2 days.",
      paragraph2: "The system monitors model performance, automatically rolls back problematic deployments, and alerts us to data drift. We ship models 5x faster with 3x fewer production incidents."
    },
    limitation: {
      text: "Requires strict data schemas and monitoring setup. Initial configuration took 3 months. Best for teams with mature MLOps practices.",
    },
    reactions: { hearts: 289, sparkles: 234, rockets: 312 },
    comments: [
      { id: 1, author: "ML Ops", color: "from-violet-500 to-purple-600", text: "This is the dream! What tools did you use for orchestration?", timestamp: "5 days ago" },
      { id: 2, author: "Data Scientist", color: "from-pink-500 to-rose-600", text: "The automatic rollback feature is genius.", timestamp: "4 days ago" }
    ]
  }
];

export const enhancedExperiments = [
  ...Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    title: [
      "AI-Assisted Code Reviews",
      "Pair Programming with GPT-4",
      "Auto-Generated API Documentation",
      "Intelligent Test Case Generation",
      "AI-Powered Debugging Assistant",
      "Natural Language SQL Queries",
      "Automated Security Vulnerability Scanning",
      "AI Code Translation Between Languages"
    ][i],
    hypothesis: [
      "Using AI for initial code review pass will reduce total review time by 40% while maintaining quality",
      "Developers using AI pair programming will complete features 25% faster with fewer bugs",
      "AI can generate 80% accurate API documentation from code comments and function signatures",
      "AI-generated test cases will catch 70% more edge cases than manual testing alone",
      "AI debugging assistant will reduce average bug fix time from 4 hours to 90 minutes",
      "Non-technical team members can query databases using plain English with 90% accuracy",
      "AI can identify security vulnerabilities 2x faster than manual code review",
      "AI can translate legacy code to modern languages with 85% accuracy"
    ][i],
    author: { 
      name: ["Sarah K.", "Mike T.", "Lisa M.", "Dan R.", "Emma W.", "Chris P.", "Jordan L.", "Alex K."][i],
      color: ["from-violet-500 to-purple-600", "from-cyan-500 to-blue-600", "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600", "from-pink-500 to-rose-600", "from-indigo-500 to-violet-600", "from-rose-500 to-pink-600", "from-teal-500 to-cyan-600"][i]
    },
    status: (['testing', 'worked', 'learned', 'pivoted'] as const)[i % 4],
    upvotes: [23, 45, 18, 31, 67, 12, 89, 34][i],
    learnings: [
      ["First week showed 35% time reduction on routine reviews", "AI catches syntax issues better than style issues"],
      ["28% faster feature completion confirmed!", "Bug rate decreased by 15%", "Junior devs benefited most"],
      ["Accuracy was only 60% - needs human review", "Works great as a first draft though!", "Best for API documentation"],
      ["Generated tests were too basic initially", "Improved with better prompts", "Now catching 45% more edge cases"],
      ["Reduced debugging time by 55%!", "Best for logical errors", "Struggles with performance issues"],
      ["89% accuracy achieved!", "Works great for simple queries", "Complex joins need refinement"],
      ["Found 34 vulnerabilities in first scan", "12 were false positives", "Saved 40 hours of manual review"],
      ["80% success rate on simple refactors", "Complex business logic needs manual review", "Great for boilerplate migration"]
    ][i],
    tryCount: [12, 34, 8, 15, 45, 23, 67, 19][i]
  }))
];
