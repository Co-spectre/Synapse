import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  SparkleIcon, 
  LightbulbIcon, 
  ShieldIcon,
  BookIcon,
  AlertIcon,
  SearchIcon,
  RocketIcon,
  CheckIcon,
  ChevronRightIcon,
  StarIcon
} from './icons';
import { JobRole } from './Onboarding';

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  logo: string;
  isApproved: boolean;
  quickGuide: string[];
  bestFor: string;
  roles: JobRole[];
  taskKeywords: string[];
  // Enhanced matching fields
  synonyms: string[]; // Alternative words that mean the same thing
  useCases: string[]; // Specific use case descriptions
  actionVerbs: string[]; // Verbs that indicate this tool is needed
  outputTypes: string[]; // What the tool produces
  inputTypes: string[]; // What the tool accepts
  complexity: 'simple' | 'medium' | 'complex'; // Task complexity level
  timeToValue: 'instant' | 'minutes' | 'hours'; // How quickly it delivers
}

interface TaskRecommendation {
  tool: AITool;
  relevance: number;
  reason: string;
  matchedIntents: string[];
  confidenceLevel: 'high' | 'medium' | 'low';
  suggestedWorkflow?: string;
}

interface TaskAnalysis {
  primaryIntent: string;
  secondaryIntents: string[];
  detectedActions: string[];
  detectedObjects: string[];
  taskComplexity: 'simple' | 'medium' | 'complex';
  urgencyLevel: 'low' | 'medium' | 'high';
  outputExpectation: string;
}

interface AIAdvisorProps {
  userRole: JobRole;
}

// ============================================
// ADVANCED NATURAL LANGUAGE PROCESSING ENGINE
// ============================================

// Comprehensive synonym mappings for intent detection
const synonymMappings: Record<string, string[]> = {
  // Writing intents
  'write': ['compose', 'draft', 'create', 'author', 'pen', 'craft', 'produce', 'generate', 'type', 'prepare', 'put together', 'work on'],
  'edit': ['revise', 'modify', 'update', 'change', 'improve', 'refine', 'polish', 'fix', 'correct', 'enhance', 'rewrite', 'rework', 'tweak'],
  'summarize': ['condense', 'shorten', 'brief', 'digest', 'recap', 'outline', 'overview', 'synopsis', 'tldr', 'key points', 'main points', 'gist'],
  
  // Analysis intents
  'analyze': ['examine', 'study', 'investigate', 'evaluate', 'assess', 'review', 'inspect', 'scrutinize', 'look at', 'break down', 'understand', 'figure out', 'dig into'],
  'compare': ['contrast', 'differentiate', 'match', 'benchmark', 'versus', 'vs', 'weigh', 'side by side'],
  'research': ['investigate', 'explore', 'look up', 'find out', 'discover', 'search', 'learn about', 'study', 'deep dive'],
  
  // Creation intents
  'create': ['make', 'build', 'develop', 'design', 'construct', 'produce', 'generate', 'form', 'establish', 'set up', 'put together', 'come up with'],
  'design': ['layout', 'mockup', 'wireframe', 'prototype', 'sketch', 'draw', 'visualize', 'conceptualize', 'ui', 'ux', 'interface'],
  'generate': ['produce', 'create', 'make', 'output', 'yield', 'spawn', 'come up with', 'brainstorm'],
  
  // Code intents
  'code': ['program', 'develop', 'script', 'implement', 'build', 'engineer', 'write code', 'programming', 'dev', 'coding'],
  'debug': ['fix', 'troubleshoot', 'solve', 'repair', 'resolve', 'diagnose', 'figure out bug', 'error', 'issue', 'problem', 'not working', 'broken'],
  'refactor': ['restructure', 'reorganize', 'clean up', 'improve code', 'optimize', 'rewrite', 'simplify'],
  
  // Communication intents
  'email': ['mail', 'message', 'correspondence', 'letter', 'note', 'reach out', 'send', 'reply', 'respond'],
  'present': ['pitch', 'show', 'demonstrate', 'showcase', 'share', 'display', 'deck', 'slides', 'powerpoint', 'keynote'],
  'communicate': ['tell', 'inform', 'notify', 'convey', 'express', 'share', 'discuss', 'talk'],
  
  // Data intents
  'data': ['information', 'numbers', 'statistics', 'metrics', 'figures', 'analytics', 'insights', 'dataset', 'spreadsheet'],
  'chart': ['graph', 'visualization', 'plot', 'diagram', 'visual', 'infographic', 'report', 'dashboard'],
  'calculate': ['compute', 'determine', 'figure', 'work out', 'estimate', 'quantify', 'measure', 'count'],
  
  // Media intents
  'image': ['picture', 'photo', 'graphic', 'visual', 'illustration', 'artwork', 'imagery', 'pic', 'screenshot'],
  'video': ['clip', 'footage', 'recording', 'film', 'movie', 'animation', 'reel', 'content'],
  'audio': ['sound', 'voice', 'recording', 'podcast', 'music', 'narration', 'voiceover', 'speech'],
  
  // Meeting intents  
  'meeting': ['call', 'conference', 'discussion', 'session', 'sync', 'standup', 'huddle', 'catch up', '1:1', 'one on one'],
  'schedule': ['book', 'arrange', 'plan', 'organize', 'calendar', 'set up', 'coordinate'],
  'notes': ['minutes', 'documentation', 'record', 'transcript', 'summary', 'action items', 'takeaways'],
  
  // Help/Learning intents
  'help': ['assist', 'support', 'aid', 'guide', 'how to', 'how do i', 'can you', 'need to', 'want to', 'trying to'],
  'learn': ['understand', 'study', 'figure out', 'get better at', 'improve', 'master', 'know', 'tutorial'],
  'explain': ['clarify', 'describe', 'elaborate', 'break down', 'simplify', 'teach', 'show me', 'what is', 'what are'],
  
  // Quick/Fast intents
  'quick': ['fast', 'rapid', 'speedy', 'asap', 'urgent', 'immediately', 'right now', 'today', 'deadline'],
  'automate': ['automatic', 'automation', 'streamline', 'efficiency', 'save time', 'batch', 'bulk', 'repetitive']
};

// Action verb categories for intent detection
const actionVerbCategories: Record<string, string[]> = {
  creation: ['create', 'make', 'build', 'generate', 'design', 'develop', 'produce', 'write', 'draft', 'compose'],
  analysis: ['analyze', 'examine', 'review', 'evaluate', 'assess', 'study', 'investigate', 'research', 'compare'],
  modification: ['edit', 'update', 'change', 'modify', 'revise', 'improve', 'fix', 'correct', 'refactor', 'optimize'],
  communication: ['send', 'share', 'present', 'email', 'message', 'notify', 'inform', 'discuss', 'pitch'],
  organization: ['organize', 'plan', 'schedule', 'manage', 'track', 'coordinate', 'arrange', 'sort', 'prioritize'],
  learning: ['learn', 'understand', 'explain', 'clarify', 'teach', 'discover', 'explore', 'find out'],
  automation: ['automate', 'streamline', 'batch', 'bulk', 'speed up', 'accelerate', 'simplify']
};

// Object/noun categories for context detection
const objectCategories: Record<string, string[]> = {
  documents: ['document', 'report', 'presentation', 'email', 'article', 'blog', 'post', 'memo', 'proposal', 'brief', 'whitepaper', 'case study'],
  code: ['code', 'function', 'api', 'component', 'module', 'class', 'script', 'program', 'app', 'application', 'website', 'feature', 'bug'],
  visuals: ['image', 'graphic', 'design', 'mockup', 'wireframe', 'prototype', 'ui', 'layout', 'logo', 'banner', 'icon', 'illustration'],
  media: ['video', 'audio', 'podcast', 'recording', 'clip', 'animation', 'voiceover', 'music', 'sound'],
  data: ['data', 'spreadsheet', 'chart', 'graph', 'dashboard', 'metrics', 'numbers', 'statistics', 'analysis', 'report', 'csv', 'excel'],
  meetings: ['meeting', 'call', 'notes', 'transcript', 'agenda', 'minutes', 'action items', 'calendar', 'schedule'],
  content: ['content', 'copy', 'text', 'message', 'marketing', 'social media', 'ad', 'campaign', 'headline']
};

// Urgency indicators
const urgencyIndicators = {
  high: ['urgent', 'asap', 'immediately', 'right now', 'today', 'deadline', 'critical', 'emergency', 'quick', 'fast', 'hurry'],
  medium: ['soon', 'this week', 'need to', 'should', 'want to', 'planning to'],
  low: ['eventually', 'sometime', 'when possible', 'exploring', 'thinking about', 'considering']
};

// Complexity indicators
const complexityIndicators = {
  complex: ['complex', 'complicated', 'advanced', 'enterprise', 'large', 'multiple', 'integrate', 'comprehensive', 'detailed', 'thorough'],
  medium: ['standard', 'regular', 'normal', 'typical', 'moderate'],
  simple: ['simple', 'basic', 'quick', 'easy', 'short', 'brief', 'small', 'single', 'just', 'only']
};

// AI Tools Database - Enhanced with deep matching capabilities
const aiToolsDatabase: AITool[] = [
  // Engineering Tools
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster with contextual suggestions.',
    category: 'Code Assistant',
    url: 'https://github.com/features/copilot',
    logo: '🤖',
    isApproved: true,
    quickGuide: [
      'Install the extension in VS Code or JetBrains',
      'Start typing and accept suggestions with Tab',
      'Use comments to describe what you want to build',
      'Press Ctrl+Enter to see multiple suggestions'
    ],
    bestFor: 'Writing boilerplate, generating tests, code completion',
    roles: ['engineering', 'innovation'],
    taskKeywords: ['code', 'programming', 'function', 'api', 'debug', 'test', 'script', 'automate', 'develop', 'build app', 'website', 'backend', 'frontend', 'database', 'algorithm', 'refactor', 'fix bug'],
    synonyms: ['coding assistant', 'code helper', 'programming ai', 'developer tool', 'autocomplete'],
    useCases: ['writing new code from scratch', 'completing partial code', 'generating unit tests', 'creating boilerplate', 'implementing algorithms', 'building APIs', 'fixing syntax errors'],
    actionVerbs: ['code', 'program', 'develop', 'build', 'implement', 'write', 'create', 'generate', 'fix', 'debug'],
    outputTypes: ['code', 'functions', 'classes', 'tests', 'scripts', 'applications'],
    inputTypes: ['comments', 'partial code', 'function signatures', 'requirements'],
    complexity: 'medium',
    timeToValue: 'instant'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor with built-in chat and full codebase understanding.',
    category: 'Code Editor',
    url: 'https://cursor.sh',
    logo: '⚡',
    isApproved: true,
    quickGuide: [
      'Download and install Cursor IDE',
      'Press Cmd/Ctrl+K to generate or edit code',
      'Use Cmd/Ctrl+L to chat about your codebase',
      'Highlight code and ask AI to explain or refactor'
    ],
    bestFor: 'Full codebase context, complex refactoring, understanding large projects',
    roles: ['engineering', 'innovation'],
    taskKeywords: ['code', 'refactor', 'debug', 'codebase', 'project', 'large code', 'explain code', 'understand code', 'edit code', 'programming', 'entire project', 'whole codebase'],
    synonyms: ['code editor', 'ide', 'development environment', 'ai editor', 'smart editor'],
    useCases: ['understanding complex codebases', 'refactoring large files', 'debugging with context', 'asking questions about code', 'making changes across multiple files', 'code review', 'learning new codebase'],
    actionVerbs: ['refactor', 'understand', 'explain', 'debug', 'edit', 'change', 'modify', 'review', 'navigate'],
    outputTypes: ['refactored code', 'explanations', 'bug fixes', 'code changes'],
    inputTypes: ['codebase', 'files', 'questions', 'requirements'],
    complexity: 'complex',
    timeToValue: 'minutes'
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Advanced AI assistant for analysis, writing, coding, and complex reasoning tasks.',
    category: 'AI Assistant',
    url: 'https://claude.ai',
    logo: '✨',
    isApproved: true,
    quickGuide: [
      'Start with clear, specific prompts',
      'Provide context about your task upfront',
      'Use artifacts for documents and code',
      'Ask follow-up questions to refine outputs'
    ],
    bestFor: 'Long documents, deep analysis, code review, strategic thinking, writing',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['analyze', 'write', 'document', 'review', 'explain', 'summarize', 'research', 'brainstorm', 'strategy', 'plan', 'draft', 'email', 'report', 'presentation', 'think through', 'complex', 'reason', 'help me', 'assist'],
    synonyms: ['ai assistant', 'chatbot', 'ai helper', 'writing assistant', 'analysis tool', 'thinking partner'],
    useCases: ['writing detailed documents', 'analyzing complex information', 'reviewing code or text', 'brainstorming ideas', 'strategic planning', 'research synthesis', 'explaining concepts', 'drafting communications', 'problem solving'],
    actionVerbs: ['write', 'analyze', 'review', 'explain', 'summarize', 'brainstorm', 'plan', 'draft', 'think', 'help', 'create', 'research'],
    outputTypes: ['documents', 'analysis', 'summaries', 'strategies', 'code', 'explanations', 'plans', 'emails', 'reports'],
    inputTypes: ['text', 'documents', 'questions', 'data', 'code', 'context'],
    complexity: 'complex',
    timeToValue: 'minutes'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Versatile AI chatbot for conversations, quick writing, and general assistance.',
    category: 'AI Assistant',
    url: 'https://chat.openai.com',
    logo: '💬',
    isApproved: false,
    quickGuide: [
      'Be specific about what you need',
      'Use system prompts for consistent outputs',
      'Try GPT-4 for complex tasks',
      'Use plugins for extended functionality'
    ],
    bestFor: 'Quick questions, brainstorming, general writing, conversations',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['quick', 'question', 'help', 'brainstorm', 'idea', 'general', 'chat', 'ask'],
    synonyms: ['chatbot', 'ai chat', 'conversation ai', 'gpt'],
    useCases: ['quick questions', 'general brainstorming', 'simple writing tasks', 'casual conversation'],
    actionVerbs: ['ask', 'chat', 'brainstorm', 'help', 'explain'],
    outputTypes: ['answers', 'ideas', 'text', 'explanations'],
    inputTypes: ['questions', 'prompts', 'text'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  // Design Tools
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generation tool for creating stunning visuals, concept art, and creative imagery.',
    category: 'Image Generation',
    url: 'https://midjourney.com',
    logo: '🎨',
    isApproved: true,
    quickGuide: [
      'Join the Discord server to get started',
      'Use /imagine command with detailed prompts',
      'Include style references like "photo realistic" or "minimalist"',
      'Use --ar for aspect ratios (e.g., --ar 16:9)'
    ],
    bestFor: 'Concept art, marketing visuals, mood boards, creative imagery, artistic visuals',
    roles: ['design', 'marketing', 'innovation'],
    taskKeywords: ['image', 'visual', 'art', 'graphic', 'illustration', 'picture', 'concept', 'mood board', 'creative', 'design visual', 'generate image', 'artwork', 'artistic'],
    synonyms: ['image generator', 'ai art', 'picture maker', 'visual creator', 'art generator'],
    useCases: ['creating marketing visuals', 'generating concept art', 'making mood boards', 'designing social media graphics', 'creating artistic illustrations', 'visualizing ideas', 'making unique imagery'],
    actionVerbs: ['create', 'generate', 'make', 'design', 'visualize', 'imagine', 'draw', 'illustrate'],
    outputTypes: ['images', 'artwork', 'visuals', 'graphics', 'illustrations', 'concept art'],
    inputTypes: ['text prompts', 'descriptions', 'reference images', 'style keywords'],
    complexity: 'medium',
    timeToValue: 'minutes'
  },
  {
    id: 'figma-ai',
    name: 'Figma AI',
    description: 'AI features built into Figma for faster UI/UX design workflows.',
    category: 'Design Assistant',
    url: 'https://figma.com',
    logo: '🎯',
    isApproved: true,
    quickGuide: [
      'Enable AI features in Figma settings',
      'Use AI to generate placeholder content',
      'Auto-rename layers with AI suggestions',
      'Generate component variants automatically'
    ],
    bestFor: 'UI design, prototyping, design systems, interface design',
    roles: ['design', 'engineering'],
    taskKeywords: ['ui', 'ux', 'design', 'prototype', 'wireframe', 'mockup', 'interface', 'layout', 'component', 'figma', 'screen design', 'user interface', 'user experience'],
    synonyms: ['ui designer', 'ux tool', 'interface designer', 'prototyping tool', 'design tool'],
    useCases: ['designing user interfaces', 'creating prototypes', 'building wireframes', 'designing app screens', 'creating component libraries', 'designing websites'],
    actionVerbs: ['design', 'prototype', 'wireframe', 'mockup', 'layout', 'create', 'build'],
    outputTypes: ['ui designs', 'prototypes', 'wireframes', 'mockups', 'components', 'design systems'],
    inputTypes: ['requirements', 'sketches', 'ideas', 'brand guidelines'],
    complexity: 'medium',
    timeToValue: 'hours'
  },
  {
    id: 'dall-e',
    name: 'DALL-E 3',
    description: 'OpenAI\'s image generation model with excellent text understanding and precise outputs.',
    category: 'Image Generation',
    url: 'https://openai.com/dall-e-3',
    logo: '🖼️',
    isApproved: false,
    quickGuide: [
      'Access through ChatGPT Plus or API',
      'Be descriptive about style and composition',
      'Specify image dimensions needed',
      'Iterate on prompts for better results'
    ],
    bestFor: 'Marketing assets, social media graphics, illustrations, precise imagery',
    roles: ['design', 'marketing'],
    taskKeywords: ['image', 'generate', 'graphic', 'social media', 'visual', 'picture', 'illustration', 'photo'],
    synonyms: ['image ai', 'picture generator', 'visual ai', 'openai images'],
    useCases: ['creating marketing graphics', 'generating social media images', 'making product visuals', 'creating illustrations'],
    actionVerbs: ['generate', 'create', 'make', 'design'],
    outputTypes: ['images', 'graphics', 'illustrations', 'visuals'],
    inputTypes: ['text prompts', 'descriptions'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  // Sales & Marketing Tools
  {
    id: 'jasper',
    name: 'Jasper',
    description: 'AI marketing platform for creating brand-consistent content at scale.',
    category: 'Content Creation',
    url: 'https://jasper.ai',
    logo: '📝',
    isApproved: true,
    quickGuide: [
      'Set up your brand voice in settings',
      'Use templates for common content types',
      'Generate multiple variations to A/B test',
      'Integrate with your existing workflow tools'
    ],
    bestFor: 'Marketing copy, blog posts, social media content, brand-consistent writing',
    roles: ['marketing', 'sales'],
    taskKeywords: ['marketing', 'copy', 'blog', 'content', 'social media', 'ad', 'campaign', 'brand', 'post', 'article', 'seo', 'marketing content'],
    synonyms: ['content writer', 'marketing ai', 'copywriting tool', 'content generator'],
    useCases: ['writing blog posts', 'creating social media content', 'generating ad copy', 'writing marketing emails', 'creating product descriptions', 'SEO content'],
    actionVerbs: ['write', 'create', 'generate', 'draft', 'compose', 'produce'],
    outputTypes: ['blog posts', 'social media posts', 'ad copy', 'marketing content', 'articles'],
    inputTypes: ['brand voice', 'topics', 'keywords', 'product info'],
    complexity: 'medium',
    timeToValue: 'minutes'
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI copywriting tool for emails, ads, and persuasive marketing content.',
    category: 'Copywriting',
    url: 'https://copy.ai',
    logo: '✍️',
    isApproved: false,
    quickGuide: [
      'Choose a content template',
      'Input your product/service details',
      'Generate multiple variations',
      'Edit and refine the best outputs'
    ],
    bestFor: 'Email campaigns, ad copy, product descriptions, sales copy',
    roles: ['marketing', 'sales'],
    taskKeywords: ['email', 'copy', 'ad', 'product description', 'marketing', 'headline', 'sales', 'persuasive'],
    synonyms: ['copywriter', 'ad writer', 'email writer', 'sales copy'],
    useCases: ['writing email campaigns', 'creating ad headlines', 'product descriptions', 'sales copy'],
    actionVerbs: ['write', 'create', 'generate', 'craft', 'compose'],
    outputTypes: ['emails', 'ad copy', 'descriptions', 'headlines'],
    inputTypes: ['product info', 'audience', 'goals'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  {
    id: 'gong',
    name: 'Gong',
    description: 'AI-powered revenue intelligence platform for sales conversation analysis.',
    category: 'Sales Intelligence',
    url: 'https://gong.io',
    logo: '📊',
    isApproved: true,
    quickGuide: [
      'Connect your meeting platforms',
      'Review AI-generated call summaries',
      'Track talk ratios and engagement metrics',
      'Use insights to improve sales techniques'
    ],
    bestFor: 'Call analysis, sales coaching, deal intelligence, conversation insights',
    roles: ['sales'],
    taskKeywords: ['sales call', 'meeting', 'call analysis', 'sales', 'deal', 'revenue', 'coaching', 'conversation', 'sales meeting', 'prospect'],
    synonyms: ['sales ai', 'call recorder', 'conversation intelligence', 'revenue intelligence'],
    useCases: ['analyzing sales calls', 'coaching sales reps', 'understanding deal progress', 'improving sales techniques'],
    actionVerbs: ['analyze', 'review', 'track', 'improve', 'coach'],
    outputTypes: ['call summaries', 'insights', 'analytics', 'recommendations'],
    inputTypes: ['calls', 'meetings', 'conversations'],
    complexity: 'medium',
    timeToValue: 'minutes'
  },
  // Finance & Operations Tools
  {
    id: 'docugami',
    name: 'Docugami',
    description: 'AI document processing for contracts, invoices, and business documents.',
    category: 'Document AI',
    url: 'https://docugami.com',
    logo: '📄',
    isApproved: true,
    quickGuide: [
      'Upload your documents to train the model',
      'Define extraction fields needed',
      'Review and validate extracted data',
      'Export to your preferred format'
    ],
    bestFor: 'Contract analysis, invoice processing, document extraction, compliance',
    roles: ['finance', 'logistics'],
    taskKeywords: ['contract', 'invoice', 'document', 'extract', 'compliance', 'legal', 'pdf', 'process document', 'analyze contract', 'paperwork'],
    synonyms: ['document processor', 'contract analyzer', 'invoice ai', 'document extraction'],
    useCases: ['extracting data from contracts', 'processing invoices', 'analyzing legal documents', 'compliance review', 'document digitization'],
    actionVerbs: ['extract', 'process', 'analyze', 'review', 'digitize'],
    outputTypes: ['extracted data', 'structured information', 'insights', 'reports'],
    inputTypes: ['pdfs', 'contracts', 'invoices', 'documents'],
    complexity: 'complex',
    timeToValue: 'hours'
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft 365 Copilot',
    description: 'AI assistant integrated across Word, Excel, PowerPoint, Outlook, and Teams.',
    category: 'Productivity Suite',
    url: 'https://microsoft.com/copilot',
    logo: '🪟',
    isApproved: true,
    quickGuide: [
      'Activate Copilot in your Microsoft 365 apps',
      'Use natural language to create documents',
      'Summarize emails and meetings automatically',
      'Generate charts and analysis in Excel'
    ],
    bestFor: 'Document creation, email management, spreadsheet analysis, presentations',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['word', 'excel', 'powerpoint', 'outlook', 'spreadsheet', 'slide', 'presentation', 'email', 'document', 'chart', 'data', 'office', 'microsoft', 'teams'],
    synonyms: ['office ai', 'microsoft ai', 'excel ai', 'word ai', 'powerpoint ai', 'outlook ai'],
    useCases: ['creating word documents', 'analyzing excel data', 'making powerpoint presentations', 'managing emails', 'summarizing meetings', 'creating charts'],
    actionVerbs: ['create', 'analyze', 'summarize', 'write', 'present', 'chart', 'email'],
    outputTypes: ['documents', 'spreadsheets', 'presentations', 'emails', 'charts', 'summaries'],
    inputTypes: ['data', 'text', 'requirements', 'emails', 'meetings'],
    complexity: 'medium',
    timeToValue: 'minutes'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI writing and organization assistant built into your Notion workspace.',
    category: 'Workspace AI',
    url: 'https://notion.so/ai',
    logo: '📓',
    isApproved: true,
    quickGuide: [
      'Press Space for AI assistance while writing',
      'Use /ai commands for specific tasks',
      'Summarize pages and databases',
      'Generate action items from meeting notes'
    ],
    bestFor: 'Note-taking, documentation, project management, knowledge organization',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['notes', 'documentation', 'wiki', 'organize', 'meeting notes', 'action items', 'project', 'planning', 'notion', 'database', 'knowledge base'],
    synonyms: ['note taking ai', 'documentation ai', 'wiki ai', 'project management ai'],
    useCases: ['writing meeting notes', 'creating documentation', 'organizing knowledge', 'project planning', 'generating action items'],
    actionVerbs: ['organize', 'document', 'note', 'plan', 'write', 'summarize'],
    outputTypes: ['notes', 'documentation', 'action items', 'summaries', 'databases'],
    inputTypes: ['text', 'meetings', 'ideas', 'data'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  // Innovation & Research
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI-powered search engine with cited sources and real-time information.',
    category: 'Research Assistant',
    url: 'https://perplexity.ai',
    logo: '🔍',
    isApproved: true,
    quickGuide: [
      'Ask questions in natural language',
      'Review the cited sources for verification',
      'Use Pro Search for deeper research',
      'Create Collections to organize findings'
    ],
    bestFor: 'Research, fact-checking, competitive analysis, learning, finding information',
    roles: ['innovation', 'marketing', 'sales', 'engineering'],
    taskKeywords: ['research', 'search', 'find', 'learn', 'discover', 'fact check', 'competitive', 'market research', 'information', 'current', 'news', 'look up', 'what is'],
    synonyms: ['ai search', 'research ai', 'smart search', 'search engine', 'fact checker'],
    useCases: ['researching topics', 'fact-checking information', 'competitive analysis', 'finding current information', 'learning about new subjects', 'market research'],
    actionVerbs: ['search', 'research', 'find', 'learn', 'discover', 'look up', 'investigate'],
    outputTypes: ['research summaries', 'cited answers', 'information', 'sources'],
    inputTypes: ['questions', 'topics', 'queries'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  {
    id: 'elicit',
    name: 'Elicit',
    description: 'AI research assistant for analyzing academic papers and scientific studies.',
    category: 'Research Tool',
    url: 'https://elicit.org',
    logo: '🔬',
    isApproved: true,
    quickGuide: [
      'Enter your research question',
      'Review AI-extracted findings from papers',
      'Compare methodologies across studies',
      'Export citations and summaries'
    ],
    bestFor: 'Academic research, literature review, evidence synthesis, scientific analysis',
    roles: ['innovation', 'engineering'],
    taskKeywords: ['academic', 'paper', 'study', 'research', 'literature', 'scientific', 'evidence', 'citation', 'journal', 'academic research'],
    synonyms: ['academic ai', 'paper analyzer', 'literature review ai', 'research tool'],
    useCases: ['reviewing academic literature', 'finding relevant papers', 'synthesizing research', 'understanding studies', 'academic writing'],
    actionVerbs: ['research', 'analyze', 'review', 'synthesize', 'find', 'cite'],
    outputTypes: ['paper summaries', 'research findings', 'citations', 'literature reviews'],
    inputTypes: ['research questions', 'topics', 'keywords'],
    complexity: 'complex',
    timeToValue: 'minutes'
  },
  // Data & Analytics Tools
  {
    id: 'julius-ai',
    name: 'Julius AI',
    description: 'AI data analyst that helps you analyze, visualize and interpret data instantly.',
    category: 'Data Analysis',
    url: 'https://julius.ai',
    logo: '📈',
    isApproved: true,
    quickGuide: [
      'Upload your CSV, Excel, or connect databases',
      'Ask questions in plain English about your data',
      'Generate charts and visualizations automatically',
      'Export insights and reports'
    ],
    bestFor: 'Data analysis, visualization, business intelligence, quick insights',
    roles: ['finance', 'marketing', 'sales', 'engineering', 'innovation'],
    taskKeywords: ['data', 'analysis', 'chart', 'graph', 'visualization', 'csv', 'excel', 'metrics', 'dashboard', 'statistics', 'numbers', 'trends', 'analyze data', 'data insights'],
    synonyms: ['data ai', 'analytics ai', 'chart maker', 'data visualization', 'business intelligence'],
    useCases: ['analyzing spreadsheets', 'creating charts', 'finding trends', 'data exploration', 'generating reports', 'business insights'],
    actionVerbs: ['analyze', 'visualize', 'chart', 'graph', 'explore', 'understand', 'report'],
    outputTypes: ['charts', 'graphs', 'insights', 'visualizations', 'reports', 'analysis'],
    inputTypes: ['csv', 'excel', 'data', 'databases', 'spreadsheets'],
    complexity: 'medium',
    timeToValue: 'minutes'
  },
  {
    id: 'tableau-ai',
    name: 'Tableau AI',
    description: 'AI-powered enterprise analytics with Tableau Pulse and Einstein-driven insights.',
    category: 'Business Intelligence',
    url: 'https://tableau.com',
    logo: '📊',
    isApproved: true,
    quickGuide: [
      'Connect your data sources',
      'Use Ask Data for natural language queries',
      'Enable Explain Data for automatic insights',
      'Set up Tableau Pulse for metric monitoring'
    ],
    bestFor: 'Enterprise dashboards, executive reporting, data storytelling, KPI tracking',
    roles: ['finance', 'marketing', 'sales', 'logistics'],
    taskKeywords: ['dashboard', 'reporting', 'business intelligence', 'bi', 'metrics', 'kpi', 'tableau', 'visualization', 'executive', 'insights', 'enterprise analytics'],
    synonyms: ['bi tool', 'dashboard tool', 'analytics platform', 'reporting tool'],
    useCases: ['building dashboards', 'executive reporting', 'KPI tracking', 'data storytelling', 'enterprise analytics'],
    actionVerbs: ['visualize', 'report', 'track', 'monitor', 'dashboard', 'analyze'],
    outputTypes: ['dashboards', 'reports', 'visualizations', 'KPIs', 'insights'],
    inputTypes: ['databases', 'data sources', 'metrics'],
    complexity: 'complex',
    timeToValue: 'hours'
  },
  // Video & Audio Tools
  {
    id: 'descript',
    name: 'Descript',
    description: 'AI-powered video and audio editing with transcription and overdub features.',
    category: 'Video/Audio Editor',
    url: 'https://descript.com',
    logo: '🎬',
    isApproved: true,
    quickGuide: [
      'Upload your video or audio file',
      'Edit by editing the transcript text',
      'Use Overdub to fix audio mistakes',
      'Remove filler words automatically'
    ],
    bestFor: 'Podcast editing, video content, meeting recordings, transcription',
    roles: ['marketing', 'sales', 'innovation'],
    taskKeywords: ['video', 'audio', 'podcast', 'edit', 'recording', 'transcript', 'meeting recording', 'content creation', 'youtube', 'video edit', 'audio edit'],
    synonyms: ['video editor', 'audio editor', 'podcast editor', 'transcription tool'],
    useCases: ['editing podcasts', 'editing videos', 'transcribing audio', 'editing meeting recordings', 'creating video content'],
    actionVerbs: ['edit', 'transcribe', 'cut', 'trim', 'produce', 'record'],
    outputTypes: ['edited videos', 'edited audio', 'transcripts', 'podcasts'],
    inputTypes: ['video files', 'audio files', 'recordings'],
    complexity: 'medium',
    timeToValue: 'minutes'
  },
  {
    id: 'runway',
    name: 'Runway ML',
    description: 'AI-powered creative suite for video generation, editing, and special effects.',
    category: 'Video Generation',
    url: 'https://runway.ml',
    logo: '🎥',
    isApproved: false,
    quickGuide: [
      'Choose from text-to-video or image-to-video',
      'Describe your desired video scene',
      'Use Gen-2 for realistic outputs',
      'Combine with editing tools for polish'
    ],
    bestFor: 'Marketing videos, social content, creative projects, video effects',
    roles: ['marketing', 'design', 'innovation'],
    taskKeywords: ['video', 'generate video', 'animation', 'motion', 'creative', 'social media video', 'ad video', 'clip', 'video generation', 'text to video'],
    synonyms: ['video ai', 'video generator', 'ai video', 'motion graphics ai'],
    useCases: ['generating videos from text', 'creating animations', 'making social media videos', 'video effects', 'creative video projects'],
    actionVerbs: ['generate', 'create', 'animate', 'produce', 'make'],
    outputTypes: ['videos', 'animations', 'clips', 'video effects'],
    inputTypes: ['text prompts', 'images', 'video clips'],
    complexity: 'medium',
    timeToValue: 'minutes'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'AI voice generation and cloning for realistic speech synthesis and voiceovers.',
    category: 'Voice AI',
    url: 'https://elevenlabs.io',
    logo: '🎙️',
    isApproved: true,
    quickGuide: [
      'Choose or clone a voice',
      'Input your text script',
      'Adjust voice settings (stability, clarity)',
      'Download audio for your projects'
    ],
    bestFor: 'Voiceovers, audiobooks, product demos, accessibility, narration',
    roles: ['marketing', 'sales', 'design', 'innovation'],
    taskKeywords: ['voice', 'audio', 'speech', 'voiceover', 'narration', 'text to speech', 'tts', 'podcast intro', 'demo', 'voice clone', 'ai voice'],
    synonyms: ['voice ai', 'text to speech', 'tts', 'voice generator', 'narration ai'],
    useCases: ['creating voiceovers', 'generating narration', 'making audio content', 'product demos', 'audiobook narration'],
    actionVerbs: ['generate', 'create', 'voice', 'narrate', 'speak', 'record'],
    outputTypes: ['audio', 'voiceovers', 'narration', 'speech'],
    inputTypes: ['text', 'scripts'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  // Customer & Support Tools
  {
    id: 'intercom-fin',
    name: 'Intercom Fin',
    description: 'AI customer service agent that resolves customer issues automatically.',
    category: 'Customer Support AI',
    url: 'https://intercom.com/fin',
    logo: '💬',
    isApproved: true,
    quickGuide: [
      'Train Fin on your help documentation',
      'Set up conversation flows',
      'Review AI responses and improve',
      'Monitor resolution rates'
    ],
    bestFor: 'Customer support automation, help desk, FAQ handling, chat support',
    roles: ['sales', 'marketing', 'logistics'],
    taskKeywords: ['customer support', 'chatbot', 'help desk', 'faq', 'customer service', 'tickets', 'support automation', 'customer questions'],
    synonyms: ['support ai', 'chatbot', 'customer service ai', 'help desk ai'],
    useCases: ['automating customer support', 'handling FAQs', 'resolving tickets', 'chat support'],
    actionVerbs: ['support', 'help', 'resolve', 'answer', 'automate'],
    outputTypes: ['answers', 'resolutions', 'support responses'],
    inputTypes: ['customer questions', 'help docs', 'FAQs'],
    complexity: 'complex',
    timeToValue: 'hours'
  },
  {
    id: 'zendesk-ai',
    name: 'Zendesk AI',
    description: 'AI-powered customer service with intelligent triage and agent assist.',
    category: 'Support Platform',
    url: 'https://zendesk.com',
    logo: '🎯',
    isApproved: true,
    quickGuide: [
      'Enable intelligent ticket routing',
      'Use AI to suggest responses',
      'Analyze customer sentiment',
      'Automate common workflows'
    ],
    bestFor: 'Ticket management, agent productivity, customer insights, support workflows',
    roles: ['sales', 'logistics'],
    taskKeywords: ['ticket', 'support', 'customer', 'helpdesk', 'service desk', 'zendesk', 'agent', 'triage', 'customer service'],
    synonyms: ['helpdesk ai', 'ticket system', 'support platform', 'service desk'],
    useCases: ['managing support tickets', 'routing customer issues', 'improving agent productivity', 'customer sentiment analysis'],
    actionVerbs: ['manage', 'route', 'triage', 'support', 'analyze'],
    outputTypes: ['ticket routing', 'response suggestions', 'sentiment analysis'],
    inputTypes: ['tickets', 'customer messages'],
    complexity: 'complex',
    timeToValue: 'hours'
  },
  // Coding & Development Tools
  {
    id: 'tabnine',
    name: 'Tabnine',
    description: 'AI code assistant that runs locally with privacy-first approach for enterprise.',
    category: 'Code Assistant',
    url: 'https://tabnine.com',
    logo: '⌨️',
    isApproved: true,
    quickGuide: [
      'Install in your IDE',
      'Tabnine learns from your codebase',
      'Use whole-line completions',
      'Keep code private with local mode'
    ],
    bestFor: 'Privacy-sensitive code completion, enterprise development, secure coding',
    roles: ['engineering'],
    taskKeywords: ['code', 'autocomplete', 'programming', 'private', 'local ai', 'secure coding', 'enterprise', 'code completion'],
    synonyms: ['code ai', 'autocomplete', 'local code ai', 'private code assistant'],
    useCases: ['secure code completion', 'enterprise development', 'private coding', 'code suggestions'],
    actionVerbs: ['code', 'complete', 'suggest', 'develop'],
    outputTypes: ['code completions', 'suggestions'],
    inputTypes: ['code', 'context'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  {
    id: 'codeium',
    name: 'Codeium',
    description: 'Free AI code completion with chat and intelligent search capabilities.',
    category: 'Code Assistant',
    url: 'https://codeium.com',
    logo: '💻',
    isApproved: true,
    quickGuide: [
      'Install the free extension',
      'Get inline suggestions as you type',
      'Use chat for code explanations',
      'Search your codebase with AI'
    ],
    bestFor: 'Free code completion, code search, learning to code, getting started',
    roles: ['engineering', 'intern'],
    taskKeywords: ['code', 'free', 'programming', 'autocomplete', 'learn coding', 'beginner', 'code search', 'free ai'],
    synonyms: ['free code ai', 'code helper', 'coding assistant', 'free copilot'],
    useCases: ['free code completion', 'learning to code', 'code search', 'understanding code'],
    actionVerbs: ['code', 'learn', 'search', 'complete'],
    outputTypes: ['code completions', 'explanations', 'search results'],
    inputTypes: ['code', 'questions'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  {
    id: 'v0-dev',
    name: 'v0 by Vercel',
    description: 'AI UI generator that creates React components from text descriptions instantly.',
    category: 'UI Generation',
    url: 'https://v0.dev',
    logo: '🎨',
    isApproved: true,
    quickGuide: [
      'Describe the UI you want to create',
      'Review and iterate on generated code',
      'Export React/Tailwind components',
      'Integrate into your project'
    ],
    bestFor: 'Rapid UI prototyping, component generation, design-to-code, landing pages',
    roles: ['engineering', 'design'],
    taskKeywords: ['ui', 'component', 'react', 'frontend', 'design', 'prototype', 'tailwind', 'webpage', 'landing page', 'form', 'ui component', 'web design'],
    synonyms: ['ui generator', 'component generator', 'react ai', 'frontend ai'],
    useCases: ['generating UI components', 'rapid prototyping', 'creating landing pages', 'building forms', 'design to code'],
    actionVerbs: ['generate', 'create', 'build', 'design', 'prototype'],
    outputTypes: ['react components', 'ui code', 'tailwind code', 'web pages'],
    inputTypes: ['text descriptions', 'design requirements'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  // Writing & Content Tools
  {
    id: 'grammarly',
    name: 'Grammarly',
    description: 'AI writing assistant for grammar, clarity, tone, and professional communication.',
    category: 'Writing Assistant',
    url: 'https://grammarly.com',
    logo: '✏️',
    isApproved: true,
    quickGuide: [
      'Install browser extension',
      'Write and get real-time suggestions',
      'Set tone and formality goals',
      'Use plagiarism checker for important docs'
    ],
    bestFor: 'Email writing, documentation, professional communication, proofreading',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['grammar', 'writing', 'email', 'proofread', 'spelling', 'tone', 'professional', 'communication', 'document', 'check writing', 'improve writing'],
    synonyms: ['grammar checker', 'writing checker', 'proofreader', 'spell checker'],
    useCases: ['checking grammar', 'improving writing', 'professional emails', 'proofreading documents', 'tone adjustment'],
    actionVerbs: ['check', 'proofread', 'improve', 'correct', 'write'],
    outputTypes: ['corrected text', 'suggestions', 'improvements'],
    inputTypes: ['text', 'documents', 'emails'],
    complexity: 'simple',
    timeToValue: 'instant'
  },
  {
    id: 'otter-ai',
    name: 'Otter.ai',
    description: 'AI meeting assistant that transcribes, summarizes, and organizes conversations.',
    category: 'Meeting Assistant',
    url: 'https://otter.ai',
    logo: '📝',
    isApproved: true,
    quickGuide: [
      'Connect to Zoom/Teams/Meet',
      'Auto-join and transcribe meetings',
      'Review AI-generated summaries',
      'Search across all meeting transcripts'
    ],
    bestFor: 'Meeting notes, action items, transcription, searchable recordings',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['meeting', 'notes', 'transcript', 'summary', 'action items', 'zoom', 'teams', 'recording', 'minutes', 'meeting notes', 'transcribe'],
    synonyms: ['meeting ai', 'transcription ai', 'meeting notes ai', 'meeting recorder'],
    useCases: ['transcribing meetings', 'generating meeting summaries', 'capturing action items', 'searching meeting content'],
    actionVerbs: ['transcribe', 'summarize', 'record', 'note', 'capture'],
    outputTypes: ['transcripts', 'summaries', 'action items', 'notes'],
    inputTypes: ['meetings', 'audio', 'recordings'],
    complexity: 'simple',
    timeToValue: 'minutes'
  },
  {
    id: 'writer',
    name: 'Writer',
    description: 'Enterprise AI writing platform with brand consistency and style guide features.',
    category: 'Enterprise Writing',
    url: 'https://writer.com',
    logo: '📄',
    isApproved: true,
    quickGuide: [
      'Set up your brand style guide',
      'Use AI to generate on-brand content',
      'Check content against guidelines',
      'Collaborate with team on drafts'
    ],
    bestFor: 'Brand consistency, enterprise content, style guides, team writing',
    roles: ['marketing', 'sales'],
    taskKeywords: ['brand', 'content', 'style guide', 'enterprise', 'marketing content', 'brand voice', 'consistency', 'brand writing'],
    synonyms: ['brand ai', 'enterprise writing ai', 'content platform', 'style guide ai'],
    useCases: ['maintaining brand consistency', 'enterprise content creation', 'enforcing style guides', 'team content collaboration'],
    actionVerbs: ['write', 'create', 'maintain', 'enforce', 'collaborate'],
    outputTypes: ['on-brand content', 'style-compliant writing', 'team content'],
    inputTypes: ['brand guidelines', 'style guides', 'content briefs'],
    complexity: 'medium',
    timeToValue: 'minutes'
  },
  // HR & Recruiting Tools
  {
    id: 'textio',
    name: 'Textio',
    description: 'AI writing platform for inclusive and effective job postings and HR content.',
    category: 'HR Writing',
    url: 'https://textio.com',
    logo: '👥',
    isApproved: true,
    quickGuide: [
      'Paste your job description',
      'Review inclusion and tone scores',
      'Apply AI suggestions',
      'Track performance metrics'
    ],
    bestFor: 'Job postings, employer branding, inclusive writing, recruiting content',
    roles: ['logistics', 'marketing'],
    taskKeywords: ['job posting', 'recruiting', 'hr', 'inclusive', 'hiring', 'job description', 'employer brand', 'diversity'],
    synonyms: ['hr ai', 'job posting ai', 'recruiting ai', 'inclusive writing'],
    useCases: ['writing job postings', 'improving job descriptions', 'inclusive hiring content', 'employer branding'],
    actionVerbs: ['write', 'improve', 'create', 'optimize'],
    outputTypes: ['job postings', 'inclusive content', 'hr writing'],
    inputTypes: ['job descriptions', 'hr content'],
    complexity: 'simple',
    timeToValue: 'minutes'
  },
  // Legal & Compliance Tools
  {
    id: 'harvey-ai',
    name: 'Harvey AI',
    description: 'AI legal assistant for contract review, legal research, and compliance.',
    category: 'Legal AI',
    url: 'https://harvey.ai',
    logo: '⚖️',
    isApproved: false,
    quickGuide: [
      'Upload contracts for review',
      'Ask legal research questions',
      'Generate document summaries',
      'Compare contract versions'
    ],
    bestFor: 'Contract analysis, legal research, compliance review, legal documents',
    roles: ['finance', 'logistics'],
    taskKeywords: ['legal', 'contract', 'compliance', 'review', 'legal research', 'agreement', 'terms', 'policy', 'legal document'],
    synonyms: ['legal ai', 'contract ai', 'compliance ai', 'law ai'],
    useCases: ['reviewing contracts', 'legal research', 'compliance checking', 'contract analysis'],
    actionVerbs: ['review', 'analyze', 'research', 'check', 'compare'],
    outputTypes: ['contract summaries', 'legal insights', 'compliance reports'],
    inputTypes: ['contracts', 'legal documents', 'questions'],
    complexity: 'complex',
    timeToValue: 'minutes'
  },
  // Project & Productivity Tools
  {
    id: 'linear-ai',
    name: 'Linear AI',
    description: 'AI-powered project management with automatic issue creation and sprint planning.',
    category: 'Project Management',
    url: 'https://linear.app',
    logo: '📋',
    isApproved: true,
    quickGuide: [
      'Enable AI features in settings',
      'Auto-generate issues from descriptions',
      'Use AI to estimate and prioritize',
      'Get cycle planning suggestions'
    ],
    bestFor: 'Sprint planning, issue tracking, team productivity, agile workflows',
    roles: ['engineering', 'design', 'innovation'],
    taskKeywords: ['project', 'issue', 'sprint', 'planning', 'backlog', 'ticket', 'roadmap', 'agile', 'jira alternative', 'task management', 'project management'],
    synonyms: ['project ai', 'issue tracker', 'sprint planning ai', 'agile ai'],
    useCases: ['sprint planning', 'creating issues', 'tracking tasks', 'project roadmaps', 'team productivity'],
    actionVerbs: ['plan', 'track', 'manage', 'create', 'prioritize', 'estimate'],
    outputTypes: ['issues', 'sprints', 'roadmaps', 'estimates'],
    inputTypes: ['requirements', 'tasks', 'features'],
    complexity: 'medium',
    timeToValue: 'minutes'
  },
  {
    id: 'reclaim-ai',
    name: 'Reclaim.ai',
    description: 'AI calendar assistant that automatically optimizes your schedule.',
    category: 'Calendar AI',
    url: 'https://reclaim.ai',
    logo: '📅',
    isApproved: true,
    quickGuide: [
      'Connect your calendar',
      'Set your work preferences',
      'Let AI schedule focus time',
      'Auto-reschedule when conflicts arise'
    ],
    bestFor: 'Time management, meeting scheduling, work-life balance, focus time',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['calendar', 'schedule', 'meeting', 'time', 'focus', 'productivity', 'work-life', 'booking', 'time management', 'scheduling'],
    synonyms: ['calendar ai', 'scheduling ai', 'time management ai', 'meeting scheduler'],
    useCases: ['optimizing calendar', 'scheduling focus time', 'managing meetings', 'work-life balance'],
    actionVerbs: ['schedule', 'plan', 'optimize', 'manage', 'book'],
    outputTypes: ['optimized schedules', 'focus time', 'meeting times'],
    inputTypes: ['calendar', 'preferences', 'meetings'],
    complexity: 'simple',
    timeToValue: 'minutes'
  }
];

// ============================================
// ADVANCED TASK ANALYSIS ENGINE
// ============================================

// Tokenize and normalize text
const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s'-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1);
};

// Get n-grams from tokens
const getNGrams = (tokens: string[], n: number): string[] => {
  const ngrams: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
};

// Expand synonyms in the query
const expandSynonyms = (tokens: string[]): Set<string> => {
  const expanded = new Set<string>(tokens);
  
  tokens.forEach(token => {
    // Check if token matches any synonym key
    Object.entries(synonymMappings).forEach(([key, synonyms]) => {
      if (token === key || synonyms.includes(token)) {
        expanded.add(key);
        synonyms.forEach(syn => expanded.add(syn));
      }
    });
  });
  
  return expanded;
};

// Detect actions from text
const detectActions = (text: string): string[] => {
  const textLower = text.toLowerCase();
  const detectedActions: string[] = [];
  
  Object.entries(actionVerbCategories).forEach(([category, verbs]) => {
    verbs.forEach(verb => {
      if (textLower.includes(verb)) {
        if (!detectedActions.includes(category)) {
          detectedActions.push(category);
        }
      }
    });
  });
  
  return detectedActions;
};

// Detect objects/nouns from text
const detectObjects = (text: string): string[] => {
  const textLower = text.toLowerCase();
  const detectedObjects: string[] = [];
  
  Object.entries(objectCategories).forEach(([category, nouns]) => {
    nouns.forEach(noun => {
      if (textLower.includes(noun)) {
        if (!detectedObjects.includes(category)) {
          detectedObjects.push(category);
        }
      }
    });
  });
  
  return detectedObjects;
};

// Detect urgency level
const detectUrgency = (text: string): 'low' | 'medium' | 'high' => {
  const textLower = text.toLowerCase();
  
  if (urgencyIndicators.high.some(indicator => textLower.includes(indicator))) {
    return 'high';
  }
  if (urgencyIndicators.medium.some(indicator => textLower.includes(indicator))) {
    return 'medium';
  }
  return 'low';
};

// Detect task complexity
const detectComplexity = (text: string): 'simple' | 'medium' | 'complex' => {
  const textLower = text.toLowerCase();
  
  if (complexityIndicators.complex.some(indicator => textLower.includes(indicator))) {
    return 'complex';
  }
  if (complexityIndicators.simple.some(indicator => textLower.includes(indicator))) {
    return 'simple';
  }
  return 'medium';
};

// Full task analysis
const analyzeTask = (task: string): TaskAnalysis => {
  const actions = detectActions(task);
  const objects = detectObjects(task);
  const urgency = detectUrgency(task);
  const complexity = detectComplexity(task);
  
  // Determine primary intent based on actions and objects
  let primaryIntent = 'general assistance';
  
  if (actions.includes('creation') && objects.includes('code')) {
    primaryIntent = 'code development';
  } else if (actions.includes('creation') && objects.includes('documents')) {
    primaryIntent = 'document creation';
  } else if (actions.includes('creation') && objects.includes('visuals')) {
    primaryIntent = 'visual design';
  } else if (actions.includes('creation') && objects.includes('media')) {
    primaryIntent = 'media production';
  } else if (actions.includes('analysis') && objects.includes('data')) {
    primaryIntent = 'data analysis';
  } else if (actions.includes('analysis')) {
    primaryIntent = 'analysis and review';
  } else if (actions.includes('modification') && objects.includes('code')) {
    primaryIntent = 'code modification';
  } else if (actions.includes('communication')) {
    primaryIntent = 'communication';
  } else if (actions.includes('organization')) {
    primaryIntent = 'organization and planning';
  } else if (actions.includes('learning')) {
    primaryIntent = 'learning and research';
  } else if (actions.includes('automation')) {
    primaryIntent = 'automation';
  } else if (objects.length > 0) {
    primaryIntent = `working with ${objects[0]}`;
  }
  
  // Determine output expectation
  let outputExpectation = 'assistance';
  if (objects.includes('documents')) outputExpectation = 'document or text';
  else if (objects.includes('code')) outputExpectation = 'code or technical solution';
  else if (objects.includes('visuals')) outputExpectation = 'visual or image';
  else if (objects.includes('media')) outputExpectation = 'audio or video';
  else if (objects.includes('data')) outputExpectation = 'charts or insights';
  
  return {
    primaryIntent,
    secondaryIntents: actions,
    detectedActions: actions,
    detectedObjects: objects,
    taskComplexity: complexity,
    urgencyLevel: urgency,
    outputExpectation
  };
};

// ============================================
// SOPHISTICATED RECOMMENDATION ENGINE
// ============================================

const getTaskRecommendations = (
  task: string, 
  tools: AITool[], 
  userRole: JobRole
): TaskRecommendation[] => {
  if (!task.trim()) return [];
  
  const taskLower = task.toLowerCase();
  const tokens = tokenize(task);
  const bigrams = getNGrams(tokens, 2);
  const trigrams = getNGrams(tokens, 3);
  const expandedTokens = expandSynonyms(tokens);
  const taskAnalysis = analyzeTask(task);
  
  const recommendations: TaskRecommendation[] = [];
  
  tools.forEach(tool => {
    // Only consider approved tools that match user's role
    if (!tool.isApproved || !tool.roles.includes(userRole)) return;
    
    let relevanceScore = 0;
    const matchedIntents: string[] = [];
    const matchReasons: string[] = [];
    
    // 1. DIRECT KEYWORD MATCHING (Weight: 3x)
    tool.taskKeywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      if (taskLower.includes(keywordLower)) {
        relevanceScore += keyword.split(' ').length * 3;
        matchedIntents.push(keyword);
      }
    });
    
    // 2. SYNONYM MATCHING (Weight: 2.5x)
    tool.synonyms.forEach(synonym => {
      const synonymLower = synonym.toLowerCase();
      if (taskLower.includes(synonymLower) || expandedTokens.has(synonymLower)) {
        relevanceScore += 2.5;
        if (!matchedIntents.includes(synonym)) {
          matchedIntents.push(synonym);
        }
      }
    });
    
    // 3. USE CASE MATCHING (Weight: 4x) - Very important
    tool.useCases.forEach(useCase => {
      const useCaseLower = useCase.toLowerCase();
      const useCaseTokens = tokenize(useCase);
      
      // Check for phrase overlap
      let overlapCount = 0;
      useCaseTokens.forEach(token => {
        if (expandedTokens.has(token)) overlapCount++;
      });
      
      // If more than 40% of use case words match, it's relevant
      if (useCaseTokens.length > 0 && overlapCount / useCaseTokens.length > 0.4) {
        relevanceScore += 4;
        matchReasons.push(useCase);
      }
      
      // Direct substring match
      if (taskLower.includes(useCaseLower) || useCaseLower.includes(taskLower.slice(0, 20))) {
        relevanceScore += 5;
        matchReasons.push(useCase);
      }
    });
    
    // 4. ACTION VERB MATCHING (Weight: 3x)
    tool.actionVerbs.forEach(verb => {
      if (taskLower.includes(verb) || expandedTokens.has(verb)) {
        relevanceScore += 3;
        if (!matchedIntents.includes(verb)) {
          matchedIntents.push(verb);
        }
      }
    });
    
    // 5. OUTPUT TYPE MATCHING (Weight: 2x)
    tool.outputTypes.forEach(output => {
      if (taskLower.includes(output.toLowerCase())) {
        relevanceScore += 2;
        matchReasons.push(`produces ${output}`);
      }
    });
    
    // 6. INPUT TYPE MATCHING (Weight: 1.5x)
    tool.inputTypes.forEach(input => {
      if (taskLower.includes(input.toLowerCase())) {
        relevanceScore += 1.5;
      }
    });
    
    // 7. CATEGORY MATCHING (Weight: 2x)
    if (taskLower.includes(tool.category.toLowerCase())) {
      relevanceScore += 2;
    }
    
    // 8. BIGRAM/TRIGRAM MATCHING (Weight: 4x for multi-word matches)
    [...bigrams, ...trigrams].forEach(ngram => {
      tool.taskKeywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(ngram) || ngram.includes(keyword.toLowerCase())) {
          relevanceScore += 4;
        }
      });
    });
    
    // 9. COMPLEXITY MATCHING BONUS
    if (taskAnalysis.taskComplexity === tool.complexity) {
      relevanceScore += 1.5;
    }
    
    // 10. URGENCY BONUS for fast tools
    if (taskAnalysis.urgencyLevel === 'high' && tool.timeToValue === 'instant') {
      relevanceScore += 2;
    }
    
    // 11. TOOL NAME MENTIONED (Weight: 10x)
    if (taskLower.includes(tool.name.toLowerCase())) {
      relevanceScore += 10;
      matchedIntents.push(tool.name);
    }
    
    // 12. BEST FOR MATCHING (Weight: 2x)
    const bestForTokens = tokenize(tool.bestFor);
    bestForTokens.forEach(token => {
      if (token.length > 3 && expandedTokens.has(token)) {
        relevanceScore += 2;
      }
    });
    
    // Generate intelligent reason
    if (relevanceScore > 0) {
      let reason = '';
      
      if (matchReasons.length > 0) {
        reason = `Perfect for ${matchReasons[0]}. `;
      } else if (matchedIntents.length > 0) {
        const topIntents = matchedIntents.slice(0, 2);
        reason = `Great for ${topIntents.join(' and ')} tasks. `;
      }
      
      reason += tool.bestFor;
      
      // Determine confidence level
      let confidenceLevel: 'high' | 'medium' | 'low' = 'low';
      if (relevanceScore >= 15) confidenceLevel = 'high';
      else if (relevanceScore >= 8) confidenceLevel = 'medium';
      
      // Generate workflow suggestion for high confidence matches
      let suggestedWorkflow: string | undefined;
      if (confidenceLevel === 'high' && tool.quickGuide.length > 0) {
        suggestedWorkflow = `Start by: ${tool.quickGuide[0]}`;
      }
      
      recommendations.push({
        tool,
        relevance: relevanceScore,
        reason: reason.trim(),
        matchedIntents: [...new Set(matchedIntents)],
        confidenceLevel,
        suggestedWorkflow
      });
    }
  });
  
  // Sort by relevance and return top matches
  return recommendations
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5);
};

// ============================================
// SMART SUGGESTIONS ENGINE
// ============================================

const getSuggestedQueries = (userRole: JobRole): string[] => {
  const suggestions: Record<JobRole, string[]> = {
    engineering: [
      "Help me write a React component for a user dashboard",
      "Debug why my API is returning 500 errors",
      "Refactor this legacy code to be more maintainable",
      "Generate unit tests for my authentication module",
      "Explain how this codebase architecture works",
      "Create a landing page with a contact form"
    ],
    design: [
      "Create a mood board for our new product launch",
      "Design a user interface for a mobile banking app",
      "Generate concept art for our marketing campaign",
      "Build a prototype for the new checkout flow",
      "Create social media graphics for our announcement"
    ],
    marketing: [
      "Write a blog post about AI in customer service",
      "Create engaging social media content for our launch",
      "Analyze our campaign performance data",
      "Generate ad copy for our new product",
      "Research competitor marketing strategies",
      "Create a video script for our product demo"
    ],
    sales: [
      "Analyze my sales call recording for insights",
      "Write a follow-up email to a prospect",
      "Create a presentation for my client pitch",
      "Research the company I'm meeting with tomorrow",
      "Help me prepare for objection handling"
    ],
    finance: [
      "Analyze this spreadsheet of quarterly data",
      "Create a dashboard for our financial metrics",
      "Review this contract for key terms",
      "Generate a report from this invoice data",
      "Help me understand these market trends"
    ],
    logistics: [
      "Process and extract data from these invoices",
      "Create a project plan for our Q2 initiatives",
      "Write a job posting for a new role",
      "Analyze our operational metrics",
      "Help me organize meeting notes into action items"
    ],
    innovation: [
      "Research emerging trends in our industry",
      "Brainstorm ideas for our next product",
      "Analyze academic papers on this topic",
      "Create a prototype for this concept",
      "Help me explore new technologies we could adopt"
    ],
    intern: [
      "Help me learn how to use Git for version control",
      "Explain how this code works step by step",
      "Write professional emails to my team",
      "Take notes during my meetings automatically",
      "Help me create my first presentation"
    ]
  };
  
  return suggestions[userRole] || suggestions.intern;
};

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ userRole }) => {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyApproved, setShowOnlyApproved] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [taskRecommendations, setTaskRecommendations] = useState<TaskRecommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [taskAnalysis, setTaskAnalysis] = useState<TaskAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Get role-specific suggestions
  const suggestedQueries = useMemo(() => getSuggestedQueries(userRole), [userRole]);

  // Debounced real-time analysis
  useEffect(() => {
    if (taskInput.trim().length > 3) {
      const timer = setTimeout(() => {
        const analysis = analyzeTask(taskInput);
        setTaskAnalysis(analysis);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setTaskAnalysis(null);
    }
  }, [taskInput]);

  // Handle task submission with animation
  const handleTaskSubmit = useCallback(() => {
    if (!taskInput.trim()) return;
    
    setIsAnalyzing(true);
    setShowSuggestions(false);
    
    // Simulate brief analysis time for UX
    setTimeout(() => {
      const recommendations = getTaskRecommendations(taskInput, aiToolsDatabase, userRole);
      setTaskRecommendations(recommendations);
      setShowRecommendations(true);
      setIsAnalyzing(false);
    }, 400);
  }, [taskInput, userRole]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setTaskInput(suggestion);
    setShowSuggestions(false);
    
    // Auto-submit after setting
    setTimeout(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        const recommendations = getTaskRecommendations(suggestion, aiToolsDatabase, userRole);
        setTaskRecommendations(recommendations);
        setShowRecommendations(true);
        setIsAnalyzing(false);
      }, 400);
    }, 100);
  };

  // Filter tools based on user role and search
  const filteredTools = aiToolsDatabase.filter(tool => {
    const matchesRole = tool.roles.includes(userRole);
    const matchesSearch = searchQuery === '' || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.taskKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesApproved = !showOnlyApproved || tool.isApproved;
    
    return matchesRole && matchesSearch && matchesApproved;
  });

  const approvedCount = filteredTools.filter(t => t.isApproved).length;

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

  const getConfidenceBadge = (level: 'high' | 'medium' | 'low') => {
    const badges = {
      high: { text: 'Excellent Match', bg: 'bg-emerald-500/20', color: 'text-emerald-300' },
      medium: { text: 'Good Match', bg: 'bg-blue-500/20', color: 'text-blue-300' },
      low: { text: 'Possible Match', bg: 'bg-neutral-500/20', color: 'text-neutral-300' }
    };
    return badges[level];
  };

  return (
    <div className="space-y-6">
      {/* Task Recommender - Primary Feature */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl p-5 sm:p-6 text-white overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <RocketIcon size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl">AI Task Recommender</h2>
              <p className="text-neutral-400 text-xs">Describe your task in natural language — I'll find the perfect tools</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={taskInput}
                onChange={(e) => {
                  setTaskInput(e.target.value);
                  if (!e.target.value.trim()) {
                    setShowRecommendations(false);
                    setShowSuggestions(true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleTaskSubmit();
                  }
                }}
                onFocus={() => {
                  if (!taskInput.trim() && !showRecommendations) {
                    setShowSuggestions(true);
                  }
                }}
                placeholder="What are you trying to accomplish? Be as specific as you want — I understand context, synonyms, and intent..."
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 resize-none transition-all"
                rows={3}
              />
              
              {/* Real-time intent indicator */}
              {taskAnalysis && taskInput.trim().length > 5 && (
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <span className="px-2 py-1 bg-white/10 rounded-md text-[10px] text-neutral-300">
                    {taskAnalysis.primaryIntent}
                  </span>
                </div>
              )}
            </div>

            {/* Smart Suggestions */}
            {showSuggestions && !showRecommendations && (
              <div className="space-y-2">
                <p className="text-xs text-neutral-400 flex items-center gap-1">
                  <LightbulbIcon size={12} />
                  Try these for {getRoleTitle(userRole)}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQueries.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-neutral-300 hover:text-white transition-all text-left"
                    >
                      "{suggestion.length > 45 ? suggestion.slice(0, 45) + '...' : suggestion}"
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={handleTaskSubmit}
              disabled={!taskInput.trim() || isAnalyzing}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing your task...
                </>
              ) : (
                <>
                  <SparkleIcon size={16} />
                  Find Best AI Tools
                </>
              )}
            </button>
          </div>

          {/* Recommendations */}
          {showRecommendations && (
            <div className="mt-6 space-y-4">
              {/* Analysis Summary */}
              {taskAnalysis && (
                <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-white/10">
                  <span className="text-xs text-neutral-400">Understanding:</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
                    {taskAnalysis.primaryIntent}
                  </span>
                  {taskAnalysis.taskComplexity !== 'medium' && (
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                      {taskAnalysis.taskComplexity} task
                    </span>
                  )}
                  {taskAnalysis.urgencyLevel === 'high' && (
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded-full">
                      urgent
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <CheckIcon size={18} className="text-emerald-400" />
                <span className="text-emerald-400 font-medium">
                  {taskRecommendations.length > 0 
                    ? `Found ${taskRecommendations.length} perfect tool${taskRecommendations.length > 1 ? 's' : ''} for your task`
                    : 'No specific tools found — try rephrasing or browse below'}
                </span>
              </div>
              
              {taskRecommendations.length > 0 ? (
                <div className="space-y-3">
                  {taskRecommendations.map((rec, index) => {
                    const badge = getConfidenceBadge(rec.confidenceLevel);
                    return (
                      <div
                        key={rec.tool.id}
                        className={`bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 transition-all hover:bg-white/10 ${
                          index === 0 ? 'ring-1 ring-emerald-500/30' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                            index === 0 ? 'bg-gradient-to-br from-emerald-500/30 to-blue-500/30' : 'bg-white/10'
                          }`}>
                            {rec.tool.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h4 className="font-semibold text-white">{rec.tool.name}</h4>
                              <span className={`px-2 py-0.5 ${badge.bg} ${badge.color} text-xs rounded-full font-medium`}>
                                {badge.text}
                              </span>
                              {index === 0 && (
                                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded-full font-medium flex items-center gap-1">
                                  <StarIcon size={10} />
                                  Top Pick
                                </span>
                              )}
                            </div>
                            <p className="text-neutral-300 text-sm leading-relaxed">{rec.reason}</p>
                            
                            {/* Matched intents */}
                            {rec.matchedIntents.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {rec.matchedIntents.slice(0, 4).map((intent, i) => (
                                  <span key={i} className="px-1.5 py-0.5 bg-white/5 text-neutral-400 text-[10px] rounded">
                                    {intent}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {/* Workflow suggestion */}
                            {rec.suggestedWorkflow && (
                              <p className="text-xs text-emerald-400/80 mt-2 flex items-center gap-1">
                                <ChevronRightIcon size={12} />
                                {rec.suggestedWorkflow}
                              </p>
                            )}
                            
                            <a
                              href={rec.tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-white font-medium transition-colors"
                            >
                              Open {rec.tool.name} →
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <SearchIcon size={18} className="text-neutral-400" />
                  </div>
                  <p className="text-neutral-300 text-sm mb-2">
                    No perfect matches found for this specific task
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Try adding more details about what you want to create, analyze, or accomplish. 
                    You can also browse all available tools below.
                  </p>
                </div>
              )}
              
              <button
                onClick={() => {
                  setTaskInput('');
                  setShowRecommendations(false);
                  setTaskAnalysis(null);
                  setShowSuggestions(true);
                }}
                className="w-full py-2.5 text-neutral-400 text-xs hover:text-white transition-colors flex items-center justify-center gap-1"
              >
                <SparkleIcon size={12} />
                Clear & try another task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Browse All Tools Section */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <SparkleIcon size={20} className="text-neutral-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-neutral-900">Browse AI Tools</h2>
            <p className="text-neutral-500 text-xs mt-0.5">
              All tools available for {getRoleTitle(userRole)}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-400"
            />
          </div>
          <button
            onClick={() => setShowOnlyApproved(!showOnlyApproved)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              showOnlyApproved 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
            }`}
          >
            <ShieldIcon size={14} />
            <span>Approved</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-3 flex items-center gap-3 text-xs">
          <span className="text-neutral-500">
            {filteredTools.length} tools
          </span>
          <span className="w-1 h-1 bg-neutral-300 rounded-full" />
          <span className="text-emerald-600 flex items-center gap-1">
            <ShieldIcon size={12} />
            {approvedCount} approved
          </span>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-3">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className={`bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all active:scale-[0.99] ${
              !tool.isApproved ? 'opacity-60' : ''
            }`}
          >
            {/* Tool Header */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                  tool.isApproved ? 'bg-neutral-100' : 'bg-neutral-100 grayscale'
                }`}>
                  {tool.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-neutral-900 text-sm">{tool.name}</h3>
                    {tool.isApproved ? (
                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded-full font-medium flex items-center gap-0.5">
                        <ShieldIcon size={8} />
                        Approved
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-neutral-200 text-neutral-500 text-[10px] rounded-full font-medium flex items-center gap-0.5">
                        <AlertIcon size={8} />
                        Restricted
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{tool.category}</p>
                </div>
              </div>
              <p className={`mt-2 text-xs line-clamp-2 ${tool.isApproved ? 'text-neutral-600' : 'text-neutral-400'}`}>
                {tool.description}
              </p>
            </div>

            {/* Actions */}
            <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center gap-2">
              {tool.isApproved ? (
                <>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-lg active:bg-neutral-700 transition-colors text-center"
                  >
                    Open Tool
                  </a>
                  <button
                    onClick={() => setSelectedTool(selectedTool?.id === tool.id ? null : tool)}
                    className="px-3 py-2.5 text-neutral-600 text-xs font-medium rounded-lg border border-neutral-200 active:bg-neutral-100 transition-colors flex items-center gap-1"
                  >
                    <BookIcon size={12} />
                    Guide
                  </button>
                </>
              ) : (
                <div className="flex-1 py-2.5 bg-neutral-200 text-neutral-400 text-xs font-medium rounded-lg text-center cursor-not-allowed">
                  Not Available
                </div>
              )}
            </div>

            {/* Quick Guide (Expandable) */}
            {selectedTool?.id === tool.id && tool.isApproved && (
              <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
                <p className="text-sm font-medium text-blue-900 mb-3 flex items-center gap-2">
                  <LightbulbIcon size={16} className="text-blue-600" />
                  Quick Start Guide
                </p>
                <ol className="space-y-2">
                  {tool.quickGuide.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-blue-800">
                      <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <SearchIcon size={20} className="text-neutral-400" />
          </div>
          <h3 className="font-semibold text-neutral-900 text-sm mb-1">No tools found</h3>
          <p className="text-neutral-500 text-xs">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Company Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
        <AlertIcon size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-amber-900">Company AI Policy</p>
          <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
            Only approved tools should be used for work tasks. Contact the AI team for restricted tool access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;