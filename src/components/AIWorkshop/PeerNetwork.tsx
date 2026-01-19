import React, { useState } from 'react';
import { 
  UserIcon, 
  SparkleIcon, 
  MessageCircleIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  SearchIcon,
  AwardIcon,
  BookIcon
} from './icons';
import { JobRole } from './Onboarding';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: JobRole;
  aiLevel: 'beginner' | 'intermediate' | 'expert';
  avatar?: string;
  isConnected: boolean;
  isMentor?: boolean;
  sharedInterests: string[];
  recentActivity?: string;
}

interface PeerNetworkProps {
  userRole: JobRole;
  userName: string;
  isIntern: boolean;
}

// Sample team members - In real app this would come from company directory
const sampleTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Software Engineer',
    department: 'engineering',
    aiLevel: 'expert',
    isConnected: true,
    isMentor: true,
    sharedInterests: ['AI Code Review', 'GitHub Copilot'],
    recentActivity: 'Shared tips on AI-assisted debugging'
  },
  {
    id: '2',
    name: 'Michael Park',
    role: 'Product Designer',
    department: 'design',
    aiLevel: 'intermediate',
    isConnected: false,
    sharedInterests: ['Figma AI', 'Design Systems'],
    recentActivity: 'Completed AI Design Patterns playbook'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    department: 'marketing',
    aiLevel: 'intermediate',
    isConnected: true,
    sharedInterests: ['Content AI', 'Analytics'],
    recentActivity: 'Launched AI-powered campaign'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Data Analyst',
    department: 'finance',
    aiLevel: 'expert',
    isConnected: false,
    isMentor: true,
    sharedInterests: ['Data Analysis', 'Automation'],
    recentActivity: 'Created AI reporting dashboard'
  },
  {
    id: '5',
    name: 'Jessica Thompson',
    role: 'Sales Director',
    department: 'sales',
    aiLevel: 'intermediate',
    isConnected: false,
    sharedInterests: ['Gong AI', 'CRM Automation'],
    recentActivity: 'Hit Q4 targets with AI insights'
  },
  {
    id: '6',
    name: 'Alex Martinez',
    role: 'Operations Lead',
    department: 'logistics',
    aiLevel: 'beginner',
    isConnected: true,
    sharedInterests: ['Process Automation', 'Document AI'],
    recentActivity: 'Started AI fundamentals course'
  },
  {
    id: '7',
    name: 'Dr. Lisa Wang',
    role: 'Innovation Director',
    department: 'innovation',
    aiLevel: 'expert',
    isConnected: false,
    isMentor: true,
    sharedInterests: ['AI Strategy', 'Research'],
    recentActivity: 'Published AI adoption framework'
  },
  {
    id: '8',
    name: 'James Wilson',
    role: 'Engineering Intern',
    department: 'intern',
    aiLevel: 'beginner',
    isConnected: false,
    sharedInterests: ['Learning AI', 'Code Assistant'],
    recentActivity: 'Just joined the team!'
  },
  {
    id: '9',
    name: 'Sophie Anderson',
    role: 'UX Researcher',
    department: 'design',
    aiLevel: 'intermediate',
    isConnected: false,
    sharedInterests: ['AI in Research', 'User Testing'],
    recentActivity: 'Using AI for interview analysis'
  },
  {
    id: '10',
    name: 'Robert Chang',
    role: 'Senior Engineer',
    department: 'engineering',
    aiLevel: 'expert',
    isConnected: true,
    isMentor: true,
    sharedInterests: ['AI Architecture', 'Code Review'],
    recentActivity: 'Mentoring 3 team members'
  }
];

const getLevelBadge = (level: string) => {
  switch (level) {
    case 'beginner':
      return { text: 'Explorer', color: 'bg-emerald-100 text-emerald-700' };
    case 'intermediate':
      return { text: 'Practitioner', color: 'bg-blue-100 text-blue-700' };
    case 'expert':
      return { text: 'Innovator', color: 'bg-violet-100 text-violet-700' };
    default:
      return { text: 'Member', color: 'bg-neutral-100 text-neutral-700' };
  }
};

const getDepartmentColor = (dept: JobRole): string => {
  const colors: Record<JobRole, string> = {
    engineering: 'bg-blue-500',
    design: 'bg-violet-500',
    sales: 'bg-emerald-500',
    marketing: 'bg-rose-500',
    finance: 'bg-amber-500',
    logistics: 'bg-cyan-500',
    innovation: 'bg-orange-500',
    intern: 'bg-indigo-500'
  };
  return colors[dept];
};

export const PeerNetwork: React.FC<PeerNetworkProps> = ({ userRole, userName, isIntern }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'mentors' | 'department' | 'connected'>('all');
  const [members, setMembers] = useState(sampleTeamMembers);

  const handleConnect = (memberId: string) => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, isConnected: true } : m
    ));
  };

  // Filter members
  const filteredMembers = members.filter(member => {
    const matchesSearch = searchQuery === '' ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'mentors' ? member.isMentor :
      filter === 'department' ? member.department === userRole :
      filter === 'connected' ? member.isConnected : true;

    return matchesSearch && matchesFilter;
  });

  const mentors = members.filter(m => m.isMentor);
  const connectedCount = members.filter(m => m.isConnected).length;
  const departmentPeers = members.filter(m => m.department === userRole);

  return (
    <div className="space-y-6">
      {/* Intern Welcome Section */}
      {isIntern && (
        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <AwardIcon size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Welcome to the Team, {userName}!</h2>
              <p className="text-white/80 text-sm mt-1">
                Connect with mentors and peers to kickstart your journey. Ask questions, learn about the company culture, and build meaningful relationships.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {mentors.length} mentors available
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {departmentPeers.length} peers in your area
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Peer Network</h2>
            <p className="text-neutral-500 text-sm mt-1">
              Connect with colleagues on their AI journey
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full">
              <CheckCircleIcon size={14} />
              <span>{connectedCount} Connected</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or role..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'all' as const, label: 'All Members' },
              { id: 'mentors' as const, label: 'Mentors' },
              { id: 'department' as const, label: 'Your Department' },
              { id: 'connected' as const, label: 'Connected' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.id
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Mentors (for interns) */}
      {isIntern && filter === 'all' && (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100">
            <h3 className="font-semibold text-neutral-900 flex items-center gap-2">
              <SparkleIcon size={18} className="text-amber-500" />
              Recommended Mentors
            </h3>
            <p className="text-neutral-500 text-sm mt-1">
              Senior team members who can guide your AI journey
            </p>
          </div>
          <div className="divide-y divide-neutral-100">
            {mentors.slice(0, 3).map((mentor) => {
              const levelBadge = getLevelBadge(mentor.aiLevel);
              return (
                <div key={mentor.id} className="p-5 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
                  <div className="relative">
                    <div className={`w-12 h-12 ${getDepartmentColor(mentor.department)} rounded-full flex items-center justify-center text-white font-semibold`}>
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                      <SparkleIcon size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-neutral-900">{mentor.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelBadge.color}`}>
                        {levelBadge.text}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500">{mentor.role}</p>
                    <p className="text-xs text-neutral-400 mt-1">{mentor.recentActivity}</p>
                  </div>
                  <button
                    onClick={() => handleConnect(mentor.id)}
                    disabled={mentor.isConnected}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mentor.isConnected
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                  >
                    {mentor.isConnected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Members */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="font-semibold text-neutral-900">
            {filter === 'all' ? 'All Team Members' :
             filter === 'mentors' ? 'Available Mentors' :
             filter === 'department' ? 'Your Department' :
             'Your Connections'}
          </h3>
          <p className="text-neutral-500 text-sm mt-1">
            {filteredMembers.length} people found
          </p>
        </div>
        <div className="divide-y divide-neutral-100">
          {filteredMembers.map((member) => {
            const levelBadge = getLevelBadge(member.aiLevel);
            return (
              <div key={member.id} className="p-5 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
                <div className="relative">
                  <div className={`w-12 h-12 ${getDepartmentColor(member.department)} rounded-full flex items-center justify-center text-white font-semibold`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {member.isMentor && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                      <SparkleIcon size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-neutral-900">{member.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelBadge.color}`}>
                      {levelBadge.text}
                    </span>
                    {member.isMentor && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        Mentor
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500">{member.role}</p>
                  {member.sharedInterests.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {member.sharedInterests.slice(0, 2).map((interest, i) => (
                        <span key={i} className="px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {member.isConnected && (
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                      <MessageCircleIcon size={18} className="text-neutral-600" />
                    </button>
                  )}
                  <button
                    onClick={() => handleConnect(member.id)}
                    disabled={member.isConnected}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      member.isConnected
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                  >
                    {member.isConnected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon size={24} className="text-neutral-400" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-1">No members found</h3>
          <p className="text-neutral-500 text-sm">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Company Culture Section (for interns) */}
      {isIntern && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h3 className="font-semibold text-neutral-900 flex items-center gap-2 mb-4">
            <BookIcon size={18} className="text-blue-500" />
            Company Culture & Guidelines
          </h3>
          <div className="space-y-3">
            {[
              { title: 'AI Usage Guidelines', desc: 'Learn when and how to use AI tools responsibly' },
              { title: 'Team Communication', desc: 'How we collaborate and share knowledge' },
              { title: 'Company Values', desc: 'Our mission, vision, and core principles' },
              { title: 'Getting Help', desc: 'Who to ask and where to find resources' }
            ].map((item, i) => (
              <button key={i} className="w-full p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left transition-colors flex items-center justify-between group">
                <div>
                  <p className="font-medium text-neutral-900">{item.title}</p>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
                <ChevronRightIcon size={18} className="text-neutral-400 group-hover:text-neutral-600" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerNetwork;
