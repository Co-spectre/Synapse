import React, { useState } from 'react';
import { 
  CalendarIcon, 
  ClockIcon,
  LocationIcon,
  SparkleIcon,
  PlayIcon,
  ChevronDownIcon
} from './icons';
import { JobRole } from './Onboarding';

interface EventSpeaker {
  name: string;
  title: string;
  organization: string;
  photo: string;
}

interface EventTranscript {
  summary: string;
  keyTakeaways: string[];
  targetAudience: JobRole[];
  duration: string;
  attendees: number;
}

interface CompanyEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  endTime: string;
  location: string;
  room?: string;
  eventType: 'talk' | 'workshop' | 'social' | 'training' | 'conference';
  targetAudience: JobRole[];
  speaker?: EventSpeaker;
  food?: string;
  isPast: boolean;
  transcript?: EventTranscript;
  registrationRequired: boolean;
  maxAttendees?: number;
  currentAttendees?: number;
}

interface EventsCalendarProps {
  userRole: JobRole;
  userName: string;
}

// Mock events data
const mockEvents: CompanyEvent[] = [
  // Past Events
  {
    id: 'evt-1',
    title: 'The Future of AI in Enterprise',
    description: 'A deep dive into how AI is transforming enterprise software development and what it means for engineers.',
    date: new Date('2026-01-10'),
    time: '2:00 PM',
    endTime: '4:00 PM',
    location: 'Main Campus',
    room: 'Innovation Hall A',
    eventType: 'talk',
    targetAudience: ['engineering', 'innovation'],
    speaker: {
      name: 'Dr. Sarah Chen',
      title: 'AI Research Director',
      organization: 'MIT CSAIL',
      photo: '👩‍🔬'
    },
    food: 'Coffee & pastries provided',
    isPast: true,
    transcript: {
      summary: 'Dr. Sarah Chen discussed the rapid evolution of AI tools in enterprise environments, focusing on how large language models are changing the software development lifecycle. She emphasized the importance of human-AI collaboration and presented case studies from leading tech companies.',
      keyTakeaways: [
        'AI assistants will augment, not replace, developer workflows',
        'Code review AI can catch 40% more bugs than manual review alone',
        'Prompt engineering is becoming a critical skill for all engineers',
        'Enterprise AI adoption requires robust security frameworks'
      ],
      targetAudience: ['engineering', 'innovation'],
      duration: '2 hours',
      attendees: 156
    },
    registrationRequired: false
  },
  {
    id: 'evt-2',
    title: 'AI-Powered Sales: Harvard Business Insights',
    description: 'Harvard professor shares research on how AI is revolutionizing B2B sales strategies.',
    date: new Date('2026-01-05'),
    time: '10:00 AM',
    endTime: '12:00 PM',
    location: 'Main Campus',
    room: 'Executive Conference Center',
    eventType: 'talk',
    targetAudience: ['sales', 'marketing'],
    speaker: {
      name: 'Prof. Michael Torres',
      title: 'Professor of Business Administration',
      organization: 'Harvard Business School',
      photo: '👨‍🏫'
    },
    food: 'Breakfast buffet',
    isPast: true,
    transcript: {
      summary: 'Professor Torres presented groundbreaking research on AI adoption in sales organizations. He shared data showing that sales teams using AI tools see 35% higher conversion rates. The talk covered practical strategies for implementing AI in the sales funnel.',
      keyTakeaways: [
        'AI can predict customer intent with 78% accuracy',
        'Personalized outreach powered by AI increases response rates by 45%',
        'The best results come from AI-human hybrid approaches',
        'Data quality is the foundation of effective AI sales tools'
      ],
      targetAudience: ['sales', 'marketing'],
      duration: '2 hours',
      attendees: 89
    },
    registrationRequired: true
  },
  {
    id: 'evt-3',
    title: 'New Year Innovation Celebration',
    description: 'Annual company celebration recognizing our top innovators and AI champions of 2025.',
    date: new Date('2026-01-03'),
    time: '6:00 PM',
    endTime: '10:00 PM',
    location: 'Rooftop Terrace',
    eventType: 'social',
    targetAudience: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    food: 'Full catered dinner with open bar',
    isPast: true,
    transcript: {
      summary: 'The annual celebration brought together over 300 employees to celebrate the achievements of 2025. CEO announced the AI Innovation Award winners and shared the company\'s AI roadmap for 2026. Live music, networking, and awards ceremony.',
      keyTakeaways: [
        'AI adoption increased 150% company-wide in 2025',
        '12 employees received AI Champion awards',
        '2026 focus: Responsible AI and efficiency gains',
        'New AI training programs launching Q1 2026'
      ],
      targetAudience: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
      duration: '4 hours',
      attendees: 312
    },
    registrationRequired: false
  },
  // Upcoming Events
  {
    id: 'evt-4',
    title: 'Hands-on AI Workshop: Prompt Engineering',
    description: 'Interactive workshop on mastering prompt engineering techniques for your daily work.',
    date: new Date('2026-01-22'),
    time: '1:00 PM',
    endTime: '5:00 PM',
    location: 'Learning Center',
    room: 'Workshop Room B',
    eventType: 'workshop',
    targetAudience: ['engineering', 'design', 'marketing', 'innovation', 'intern'],
    speaker: {
      name: 'Alex Rivera',
      title: 'Senior AI Engineer',
      organization: 'Internal - AI Team',
      photo: '🧑‍💻'
    },
    food: 'Afternoon snacks & beverages',
    isPast: false,
    registrationRequired: true,
    maxAttendees: 30,
    currentAttendees: 24
  },
  {
    id: 'evt-5',
    title: 'OpenAI Leadership: Future of Work',
    description: 'Exclusive talk by OpenAI executive on the future of AI in the workplace.',
    date: new Date('2026-01-28'),
    time: '3:00 PM',
    endTime: '5:00 PM',
    location: 'Main Campus',
    room: 'Grand Auditorium',
    eventType: 'talk',
    targetAudience: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    speaker: {
      name: 'Jennifer Wu',
      title: 'VP of Enterprise Solutions',
      organization: 'OpenAI',
      photo: '👩‍💼'
    },
    food: 'Coffee, tea & light refreshments',
    isPast: false,
    registrationRequired: true,
    maxAttendees: 500,
    currentAttendees: 387
  },
  {
    id: 'evt-6',
    title: 'AI in Finance: Risk & Opportunity',
    description: 'Deep dive into AI applications in financial analysis, forecasting, and compliance.',
    date: new Date('2026-02-03'),
    time: '10:00 AM',
    endTime: '12:30 PM',
    location: 'Finance Building',
    room: 'Boardroom 1',
    eventType: 'training',
    targetAudience: ['finance', 'logistics'],
    speaker: {
      name: 'David Park',
      title: 'Chief Data Scientist',
      organization: 'Goldman Sachs',
      photo: '👨‍💼'
    },
    food: 'Continental breakfast',
    isPast: false,
    registrationRequired: true,
    maxAttendees: 50,
    currentAttendees: 42
  },
  {
    id: 'evt-7',
    title: 'Design Systems & AI: Creative Workshop',
    description: 'Explore how AI is transforming design workflows with hands-on exercises.',
    date: new Date('2026-02-10'),
    time: '2:00 PM',
    endTime: '6:00 PM',
    location: 'Design Studio',
    room: 'Creative Lab',
    eventType: 'workshop',
    targetAudience: ['design', 'marketing'],
    speaker: {
      name: 'Maria Santos',
      title: 'Design Director',
      organization: 'Figma',
      photo: '👩‍🎨'
    },
    food: 'Artisan coffee bar & snacks',
    isPast: false,
    registrationRequired: true,
    maxAttendees: 25,
    currentAttendees: 18
  },
  {
    id: 'evt-8',
    title: 'Q1 All-Hands: AI Strategy Update',
    description: 'Company-wide meeting to discuss Q1 goals and AI strategy updates from leadership.',
    date: new Date('2026-02-15'),
    time: '11:00 AM',
    endTime: '12:30 PM',
    location: 'Virtual + Main Auditorium',
    eventType: 'conference',
    targetAudience: ['engineering', 'design', 'marketing', 'sales', 'finance', 'logistics', 'innovation', 'intern'],
    food: 'Lunch provided after',
    isPast: false,
    registrationRequired: false,
    maxAttendees: 1000,
    currentAttendees: 756
  }
];

// Helper functions
const getEventTypeColor = (type: CompanyEvent['eventType']): string => {
  const colors = {
    talk: 'bg-blue-100 text-blue-700',
    workshop: 'bg-purple-100 text-purple-700',
    social: 'bg-pink-100 text-pink-700',
    training: 'bg-emerald-100 text-emerald-700',
    conference: 'bg-amber-100 text-amber-700'
  };
  return colors[type];
};

const getEventTypeLabel = (type: CompanyEvent['eventType']): string => {
  const labels = {
    talk: 'Talk',
    workshop: 'Workshop',
    social: 'Social Event',
    training: 'Training',
    conference: 'Conference'
  };
  return labels[type];
};

const getRoleLabel = (role: JobRole): string => {
  const labels: Record<JobRole, string> = {
    engineering: 'Engineering',
    design: 'Design',
    sales: 'Sales',
    marketing: 'Marketing',
    finance: 'Finance',
    logistics: 'Operations',
    innovation: 'Innovation',
    intern: 'All Teams'
  };
  return labels[role];
};

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ userRole, userName: _userName }) => {
  const [selectedEvent, setSelectedEvent] = useState<CompanyEvent | null>(null);
  const [showTranscript, setShowTranscript] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'relevant'>('upcoming');

  // Filter events
  const filteredEvents = mockEvents.filter(event => {
    if (filter === 'upcoming') return !event.isPast;
    if (filter === 'past') return event.isPast;
    if (filter === 'relevant') return event.targetAudience.includes(userRole);
    return true;
  }).sort((a, b) => {
    // Sort by date - upcoming first (ascending), past events descending
    if (!a.isPast && !b.isPast) return a.date.getTime() - b.date.getTime();
    if (a.isPast && b.isPast) return b.date.getTime() - a.date.getTime();
    return a.isPast ? 1 : -1;
  });

  const upcomingCount = mockEvents.filter(e => !e.isPast).length;
  const relevantCount = mockEvents.filter(e => e.targetAudience.includes(userRole) && !e.isPast).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <CalendarIcon size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Events Calendar</h2>
            <p className="text-indigo-200 text-xs">Company AI & Innovation Events</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg">
            <span className="font-semibold">{upcomingCount}</span>
            <span className="text-indigo-200 ml-1">upcoming</span>
          </div>
          <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg">
            <span className="font-semibold">{relevantCount}</span>
            <span className="text-indigo-200 ml-1">for you</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 p-1 bg-neutral-100 rounded-xl">
        {[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'past', label: 'Past' },
          { id: 'relevant', label: 'For Me' },
          { id: 'all', label: 'All' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition-all ${
              filter === tab.id
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map(event => {
          const isRelevant = event.targetAudience.includes(userRole);
          const isExpanded = selectedEvent?.id === event.id;
          const showingTranscript = showTranscript === event.id;

          return (
            <div
              key={event.id}
              className={`bg-white rounded-xl border overflow-hidden transition-all ${
                event.isPast ? 'border-neutral-200 opacity-90' : 'border-neutral-200'
              } ${isRelevant && !event.isPast ? 'ring-2 ring-indigo-100' : ''}`}
            >
              {/* Event Card */}
              <button
                onClick={() => setSelectedEvent(isExpanded ? null : event)}
                className="w-full p-4 text-left active:bg-neutral-50"
              >
                <div className="flex items-start gap-3">
                  {/* Date Badge */}
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                    event.isPast ? 'bg-neutral-100' : 'bg-indigo-100'
                  }`}>
                    <span className={`text-[10px] font-medium uppercase ${
                      event.isPast ? 'text-neutral-500' : 'text-indigo-600'
                    }`}>
                      {event.date.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className={`text-lg font-bold leading-none ${
                      event.isPast ? 'text-neutral-600' : 'text-indigo-700'
                    }`}>
                      {event.date.getDate()}
                    </span>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getEventTypeColor(event.eventType)}`}>
                        {getEventTypeLabel(event.eventType)}
                      </span>
                      {event.isPast && (
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-full text-[10px] font-medium">
                          Past
                        </span>
                      )}
                      {isRelevant && !event.isPast && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-medium">
                          For You
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-sm line-clamp-1">{event.title}</h3>
                    <p className="text-neutral-500 text-xs mt-0.5 line-clamp-1">{event.description}</p>
                    
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <ClockIcon size={12} />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <LocationIcon size={12} />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <ChevronDownIcon 
                    size={16} 
                    className={`text-neutral-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-neutral-100 pt-4">
                  {/* Speaker Info */}
                  {event.speaker && (
                    <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">
                        {event.speaker.photo}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900 text-sm">{event.speaker.name}</p>
                        <p className="text-neutral-500 text-xs">{event.speaker.title}</p>
                        <p className="text-neutral-400 text-[11px]">{event.speaker.organization}</p>
                      </div>
                    </div>
                  )}

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-neutral-50 rounded-xl">
                      <p className="text-[10px] text-neutral-400 uppercase font-medium mb-1">Time</p>
                      <p className="text-xs font-medium text-neutral-900">{event.time} - {event.endTime}</p>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-xl">
                      <p className="text-[10px] text-neutral-400 uppercase font-medium mb-1">Location</p>
                      <p className="text-xs font-medium text-neutral-900">{event.room || event.location}</p>
                    </div>
                    {event.food && (
                      <div className="p-3 bg-neutral-50 rounded-xl col-span-2">
                        <p className="text-[10px] text-neutral-400 uppercase font-medium mb-1">Food & Drinks</p>
                        <p className="text-xs font-medium text-neutral-900">🍽️ {event.food}</p>
                      </div>
                    )}
                  </div>

                  {/* Target Audience */}
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase font-medium mb-2">Best For</p>
                    <div className="flex flex-wrap gap-1">
                      {event.targetAudience.map(role => (
                        <span 
                          key={role}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium ${
                            role === userRole
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {getRoleLabel(role)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  {event.isPast ? (
                    /* Past Event - Transcribe Button */
                    <button
                      onClick={() => setShowTranscript(showingTranscript ? null : event.id)}
                      className="w-full py-3 bg-neutral-900 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                    >
                      <PlayIcon size={16} />
                      {showingTranscript ? 'Hide Summary' : 'View Transcript Summary'}
                    </button>
                  ) : (
                    /* Upcoming Event - Register Button */
                    <div className="space-y-2">
                      {event.registrationRequired && event.maxAttendees && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-500">
                            {event.currentAttendees}/{event.maxAttendees} registered
                          </span>
                          <span className={`font-medium ${
                            event.currentAttendees! >= event.maxAttendees! * 0.9
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }`}>
                            {event.maxAttendees! - event.currentAttendees!} spots left
                          </span>
                        </div>
                      )}
                      <button className="w-full py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                        <CalendarIcon size={16} />
                        {event.registrationRequired ? 'Register Now' : 'Add to Calendar'}
                      </button>
                    </div>
                  )}

                  {/* Transcript (for past events) */}
                  {showingTranscript && event.transcript && (
                    <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-4 space-y-4 border border-neutral-200">
                      <div className="flex items-center gap-2">
                        <SparkleIcon size={16} className="text-indigo-600" />
                        <h4 className="font-semibold text-neutral-900 text-sm">AI-Generated Summary</h4>
                      </div>

                      {/* Event Stats */}
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-2 py-1 bg-white rounded-lg text-neutral-600">
                          ⏱️ {event.transcript.duration}
                        </span>
                        <span className="px-2 py-1 bg-white rounded-lg text-neutral-600">
                          👥 {event.transcript.attendees} attended
                        </span>
                      </div>

                      {/* Summary */}
                      <div>
                        <p className="text-[10px] text-neutral-400 uppercase font-medium mb-1">Summary</p>
                        <p className="text-xs text-neutral-700 leading-relaxed">
                          {event.transcript.summary}
                        </p>
                      </div>

                      {/* Key Takeaways */}
                      <div>
                        <p className="text-[10px] text-neutral-400 uppercase font-medium mb-2">Key Takeaways</p>
                        <ul className="space-y-2">
                          {event.transcript.keyTakeaways.map((takeaway, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-neutral-700">
                              <span className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Target Audience for this content */}
                      <div className="pt-3 border-t border-neutral-200">
                        <p className="text-[10px] text-neutral-400 uppercase font-medium mb-2">Most Relevant For</p>
                        <div className="flex flex-wrap gap-1">
                          {event.transcript.targetAudience.map(role => (
                            <span 
                              key={role}
                              className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-medium"
                            >
                              {getRoleLabel(role)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CalendarIcon size={20} className="text-neutral-400" />
          </div>
          <h3 className="font-semibold text-neutral-900 text-sm mb-1">No events found</h3>
          <p className="text-neutral-500 text-xs">
            Try a different filter to see more events
          </p>
        </div>
      )}

      {/* Calendar Integration Notice */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-start gap-2">
        <CalendarIcon size={16} className="text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-indigo-900">Sync with your calendar</p>
          <p className="text-[11px] text-indigo-700 mt-0.5">
            Connect Google Calendar or Outlook to get automatic event reminders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
