import React, { useState } from 'react';
import { 
  SparkleIcon, 
  LightbulbIcon, 
  ShieldIcon,
  BookIcon,
  AlertIcon,
  SearchIcon,
  RocketIcon,
  CheckIcon
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
  taskKeywords: string[]; // Keywords for task matching
}

interface TaskRecommendation {
  tool: AITool;
  relevance: number;
  reason: string;
}

interface AIAdvisorProps {
  userRole: JobRole;
}

// AI Tools Database - Company would configure approved tools
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
    taskKeywords: ['code', 'programming', 'function', 'api', 'debug', 'test', 'script', 'automate', 'develop', 'build app', 'website', 'backend', 'frontend', 'database', 'algorithm', 'refactor', 'fix bug']
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor with built-in chat and code generation capabilities.',
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
    bestFor: 'Full codebase context, complex refactoring, debugging',
    roles: ['engineering', 'innovation'],
    taskKeywords: ['code', 'refactor', 'debug', 'codebase', 'project', 'large code', 'explain code', 'understand code', 'edit code', 'programming']
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Advanced AI assistant for analysis, writing, and complex reasoning tasks.',
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
    bestFor: 'Long documents, analysis, code review, writing',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['analyze', 'write', 'document', 'review', 'explain', 'summarize', 'research', 'brainstorm', 'strategy', 'plan', 'draft', 'email', 'report', 'presentation', 'think through', 'complex', 'reason']
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Versatile AI chatbot for conversations, writing, and general assistance.',
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
    bestFor: 'Quick questions, brainstorming, general writing',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['quick', 'question', 'help', 'brainstorm', 'idea', 'general', 'chat']
  },
  // Design Tools
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generation tool for creating stunning visuals and concept art.',
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
    bestFor: 'Concept art, marketing visuals, mood boards',
    roles: ['design', 'marketing', 'innovation'],
    taskKeywords: ['image', 'visual', 'art', 'graphic', 'illustration', 'picture', 'concept', 'mood board', 'creative', 'design visual', 'generate image', 'artwork']
  },
  {
    id: 'figma-ai',
    name: 'Figma AI',
    description: 'AI features built into Figma for faster design workflows.',
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
    bestFor: 'UI design, prototyping, design systems',
    roles: ['design', 'engineering'],
    taskKeywords: ['ui', 'ux', 'design', 'prototype', 'wireframe', 'mockup', 'interface', 'layout', 'component', 'figma', 'screen design']
  },
  {
    id: 'dall-e',
    name: 'DALL-E 3',
    description: 'OpenAI\'s image generation model with excellent text understanding.',
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
    bestFor: 'Marketing assets, social media graphics, illustrations',
    roles: ['design', 'marketing'],
    taskKeywords: ['image', 'generate', 'graphic', 'social media', 'visual', 'picture', 'illustration']
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
    bestFor: 'Marketing copy, blog posts, social media content',
    roles: ['marketing', 'sales'],
    taskKeywords: ['marketing', 'copy', 'blog', 'content', 'social media', 'ad', 'campaign', 'brand', 'post', 'article', 'seo']
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI copywriting tool for emails, ads, and marketing content.',
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
    bestFor: 'Email campaigns, ad copy, product descriptions',
    roles: ['marketing', 'sales'],
    taskKeywords: ['email', 'copy', 'ad', 'product description', 'marketing', 'headline']
  },
  {
    id: 'gong',
    name: 'Gong',
    description: 'AI-powered revenue intelligence platform for sales conversations.',
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
    bestFor: 'Call analysis, sales coaching, deal intelligence',
    roles: ['sales'],
    taskKeywords: ['sales call', 'meeting', 'call analysis', 'sales', 'deal', 'revenue', 'coaching', 'conversation']
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
    bestFor: 'Contract analysis, invoice processing, compliance',
    roles: ['finance', 'logistics'],
    taskKeywords: ['contract', 'invoice', 'document', 'extract', 'compliance', 'legal', 'pdf', 'process document', 'analyze contract']
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft 365 Copilot',
    description: 'AI assistant integrated across Word, Excel, PowerPoint, and Outlook.',
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
    bestFor: 'Document creation, email management, data analysis',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['word', 'excel', 'powerpoint', 'outlook', 'spreadsheet', 'slide', 'presentation', 'email', 'document', 'chart', 'data', 'office', 'microsoft']
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI writing and editing assistant built into your workspace.',
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
    bestFor: 'Note-taking, documentation, project management',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['notes', 'documentation', 'wiki', 'organize', 'meeting notes', 'action items', 'project', 'planning', 'notion', 'database']
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
    bestFor: 'Research, fact-checking, competitive analysis',
    roles: ['innovation', 'marketing', 'sales', 'engineering'],
    taskKeywords: ['research', 'search', 'find', 'learn', 'discover', 'fact check', 'competitive', 'market research', 'information', 'current', 'news']
  },
  {
    id: 'elicit',
    name: 'Elicit',
    description: 'AI research assistant that helps analyze academic papers and studies.',
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
    bestFor: 'Academic research, literature review, evidence synthesis',
    roles: ['innovation', 'engineering'],
    taskKeywords: ['academic', 'paper', 'study', 'research', 'literature', 'scientific', 'evidence', 'citation', 'journal']
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
    bestFor: 'Data analysis, visualization, business intelligence',
    roles: ['finance', 'marketing', 'sales', 'engineering', 'innovation'],
    taskKeywords: ['data', 'analysis', 'chart', 'graph', 'visualization', 'csv', 'excel', 'metrics', 'dashboard', 'statistics', 'numbers', 'trends']
  },
  {
    id: 'tableau-ai',
    name: 'Tableau AI',
    description: 'AI-powered analytics with Tableau Pulse and Einstein-driven insights.',
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
    bestFor: 'Enterprise dashboards, executive reporting, data storytelling',
    roles: ['finance', 'marketing', 'sales', 'logistics'],
    taskKeywords: ['dashboard', 'reporting', 'business intelligence', 'bi', 'metrics', 'kpi', 'tableau', 'visualization', 'executive', 'insights']
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
    bestFor: 'Podcast editing, video content, meeting recordings',
    roles: ['marketing', 'sales', 'innovation'],
    taskKeywords: ['video', 'audio', 'podcast', 'edit', 'recording', 'transcript', 'meeting recording', 'content creation', 'youtube']
  },
  {
    id: 'runway',
    name: 'Runway ML',
    description: 'AI-powered creative suite for video generation and editing.',
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
    bestFor: 'Marketing videos, social content, creative projects',
    roles: ['marketing', 'design', 'innovation'],
    taskKeywords: ['video', 'generate video', 'animation', 'motion', 'creative', 'social media video', 'ad video', 'clip']
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'AI voice generation and cloning for realistic speech synthesis.',
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
    bestFor: 'Voiceovers, audiobooks, product demos, accessibility',
    roles: ['marketing', 'sales', 'design', 'innovation'],
    taskKeywords: ['voice', 'audio', 'speech', 'voiceover', 'narration', 'text to speech', 'tts', 'podcast intro', 'demo']
  },
  // Customer & Support Tools
  {
    id: 'intercom-fin',
    name: 'Intercom Fin',
    description: 'AI customer service agent that resolves issues automatically.',
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
    bestFor: 'Customer support automation, help desk, FAQ handling',
    roles: ['sales', 'marketing', 'logistics'],
    taskKeywords: ['customer support', 'chatbot', 'help desk', 'faq', 'customer service', 'tickets', 'support automation']
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
    bestFor: 'Ticket management, agent productivity, customer insights',
    roles: ['sales', 'logistics'],
    taskKeywords: ['ticket', 'support', 'customer', 'helpdesk', 'service desk', 'zendesk', 'agent', 'triage']
  },
  // Coding & Development Tools
  {
    id: 'tabnine',
    name: 'Tabnine',
    description: 'AI code assistant that runs locally with privacy-first approach.',
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
    bestFor: 'Privacy-sensitive code completion, enterprise development',
    roles: ['engineering'],
    taskKeywords: ['code', 'autocomplete', 'programming', 'private', 'local ai', 'secure coding', 'enterprise']
  },
  {
    id: 'codeium',
    name: 'Codeium',
    description: 'Free AI code completion with chat and search capabilities.',
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
    bestFor: 'Free alternative to Copilot, code search, learning',
    roles: ['engineering', 'intern'],
    taskKeywords: ['code', 'free', 'programming', 'autocomplete', 'learn coding', 'beginner', 'code search']
  },
  {
    id: 'v0-dev',
    name: 'v0 by Vercel',
    description: 'AI UI generator that creates React components from text descriptions.',
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
    bestFor: 'Rapid UI prototyping, component generation, design-to-code',
    roles: ['engineering', 'design'],
    taskKeywords: ['ui', 'component', 'react', 'frontend', 'design', 'prototype', 'tailwind', 'webpage', 'landing page', 'form']
  },
  // Writing & Content Tools
  {
    id: 'grammarly',
    name: 'Grammarly',
    description: 'AI writing assistant for grammar, clarity, and tone improvements.',
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
    bestFor: 'Email writing, documentation, professional communication',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['grammar', 'writing', 'email', 'proofread', 'spelling', 'tone', 'professional', 'communication', 'document']
  },
  {
    id: 'otter-ai',
    name: 'Otter.ai',
    description: 'AI meeting assistant that transcribes and summarizes conversations.',
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
    bestFor: 'Meeting notes, action items, searchable recordings',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['meeting', 'notes', 'transcript', 'summary', 'action items', 'zoom', 'teams', 'recording', 'minutes']
  },
  {
    id: 'writer',
    name: 'Writer',
    description: 'Enterprise AI writing platform with brand consistency features.',
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
    bestFor: 'Brand consistency, enterprise content, style guides',
    roles: ['marketing', 'sales'],
    taskKeywords: ['brand', 'content', 'style guide', 'enterprise', 'marketing content', 'brand voice', 'consistency']
  },
  // HR & Recruiting Tools
  {
    id: 'textio',
    name: 'Textio',
    description: 'AI writing platform for inclusive and effective job postings.',
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
    bestFor: 'Job postings, employer branding, inclusive writing',
    roles: ['logistics', 'marketing'],
    taskKeywords: ['job posting', 'recruiting', 'hr', 'inclusive', 'hiring', 'job description', 'employer brand']
  },
  // Legal & Compliance Tools
  {
    id: 'harvey-ai',
    name: 'Harvey AI',
    description: 'AI legal assistant for contract review and legal research.',
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
    bestFor: 'Contract analysis, legal research, compliance review',
    roles: ['finance', 'logistics'],
    taskKeywords: ['legal', 'contract', 'compliance', 'review', 'legal research', 'agreement', 'terms', 'policy']
  },
  // Project & Productivity Tools
  {
    id: 'linear-ai',
    name: 'Linear AI',
    description: 'AI-powered project management with automatic issue creation and planning.',
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
    bestFor: 'Sprint planning, issue tracking, team productivity',
    roles: ['engineering', 'design', 'innovation'],
    taskKeywords: ['project', 'issue', 'sprint', 'planning', 'backlog', 'ticket', 'roadmap', 'agile', 'jira alternative']
  },
  {
    id: 'reclaim-ai',
    name: 'Reclaim.ai',
    description: 'AI calendar assistant that optimizes your schedule automatically.',
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
    bestFor: 'Time management, meeting scheduling, work-life balance',
    roles: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    taskKeywords: ['calendar', 'schedule', 'meeting', 'time', 'focus', 'productivity', 'work-life', 'booking']
  }
];

// Function to match task to tools
const getTaskRecommendations = (task: string, tools: AITool[], userRole: JobRole): TaskRecommendation[] => {
  if (!task.trim()) return [];
  
  const taskLower = task.toLowerCase();
  
  const recommendations: TaskRecommendation[] = [];
  
  tools.forEach(tool => {
    // Only consider approved tools that match user's role
    if (!tool.isApproved || !tool.roles.includes(userRole)) return;
    
    let relevance = 0;
    const matchedKeywords: string[] = [];
    
    // Check for keyword matches
    tool.taskKeywords.forEach(keyword => {
      if (taskLower.includes(keyword)) {
        relevance += keyword.split(' ').length * 2; // Multi-word matches score higher
        matchedKeywords.push(keyword);
      }
    });
    
    // Check if task mentions tool name
    if (taskLower.includes(tool.name.toLowerCase())) {
      relevance += 10;
    }
    
    // Check category match
    if (taskLower.includes(tool.category.toLowerCase())) {
      relevance += 5;
    }
    
    // Check bestFor match
    const bestForWords = tool.bestFor.toLowerCase().split(/[,\s]+/);
    bestForWords.forEach(word => {
      if (word.length > 3 && taskLower.includes(word)) {
        relevance += 1;
      }
    });
    
    if (relevance > 0) {
      // Generate reason based on matched keywords
      let reason = '';
      if (matchedKeywords.length > 0) {
        const topKeywords = matchedKeywords.slice(0, 3);
        reason = `Great for ${topKeywords.join(', ')} tasks. ${tool.bestFor}`;
      } else {
        reason = tool.bestFor;
      }
      
      recommendations.push({ tool, relevance, reason });
    }
  });
  
  // Sort by relevance and return top matches
  return recommendations.sort((a, b) => b.relevance - a.relevance).slice(0, 3);
};

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ userRole }) => {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyApproved, setShowOnlyApproved] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [taskRecommendations, setTaskRecommendations] = useState<TaskRecommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Handle task submission
  const handleTaskSubmit = () => {
    if (!taskInput.trim()) return;
    const recommendations = getTaskRecommendations(taskInput, aiToolsDatabase, userRole);
    setTaskRecommendations(recommendations);
    setShowRecommendations(true);
  };

  // Filter tools based on user role and search
  const filteredTools = aiToolsDatabase.filter(tool => {
    const matchesRole = tool.roles.includes(userRole);
    const matchesSearch = searchQuery === '' || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
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

  return (
    <div className="space-y-6">
      {/* Task Recommender - Primary Feature */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-5 sm:p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
            <RocketIcon size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Task Recommender</h2>
            <p className="text-neutral-400 text-xs">Describe your task, get the right AI tools</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <textarea
            value={taskInput}
            onChange={(e) => {
              setTaskInput(e.target.value);
              if (!e.target.value.trim()) {
                setShowRecommendations(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleTaskSubmit();
              }
            }}
            placeholder="What are you trying to do? e.g., 'Write a blog post about AI trends' or 'Debug my React component'"
            className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-white/40 resize-none"
            rows={2}
          />
          <button
            onClick={handleTaskSubmit}
            disabled={!taskInput.trim()}
            className="w-full py-3 bg-white text-neutral-900 text-sm font-semibold rounded-xl transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <SparkleIcon size={16} />
            Find Best Tools
          </button>
        </div>

        {/* Recommendations */}
        {showRecommendations && (
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckIcon size={16} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">
                {taskRecommendations.length > 0 
                  ? `${taskRecommendations.length} approved tool${taskRecommendations.length > 1 ? 's' : ''} recommended`
                  : 'No specific tools found for this task'}
              </span>
            </div>
            
            {taskRecommendations.length > 0 ? (
              <div className="space-y-2">
                {taskRecommendations.map((rec, index) => (
                  <div
                    key={rec.tool.id}
                    className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-4 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {rec.tool.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-white">{rec.tool.name}</h4>
                          {index === 0 && (
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full font-medium">
                              Best Match
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-300 text-xs mt-1 line-clamp-2">{rec.reason}</p>
                        <a
                          href={rec.tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs text-white/70 hover:text-white transition-colors"
                        >
                          Open Tool →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-neutral-400 text-sm">
                  Try rephrasing your task or browse the tools below
                </p>
              </div>
            )}
            
            <button
              onClick={() => {
                setTaskInput('');
                setShowRecommendations(false);
              }}
              className="w-full py-2 text-neutral-400 text-xs hover:text-white transition-colors"
            >
              Clear & try another task
            </button>
          </div>
        )}
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