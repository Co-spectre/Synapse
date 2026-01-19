import React, { useState } from 'react';
import { 
  CalendarIcon, 
  ClockIcon,
  LocationIcon,
  SparkleIcon,
  PlayIcon,
  ChevronDownIcon,
  PlusIcon,
  CheckIcon
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

// Helper function to generate Google Calendar URL
const generateGoogleCalendarUrl = (event: CompanyEvent): string => {
  const startDate = new Date(event.date);
  const [hours, minutes] = event.time.replace(/[APap][Mm]/g, '').trim().split(':');
  const isPM = event.time.toLowerCase().includes('pm');
  let hour = parseInt(hours);
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  startDate.setHours(hour, parseInt(minutes) || 0);
  
  const endDate = new Date(event.date);
  const [endHours, endMinutes] = event.endTime.replace(/[APap][Mm]/g, '').trim().split(':');
  const isEndPM = event.endTime.toLowerCase().includes('pm');
  let endHour = parseInt(endHours);
  if (isEndPM && endHour !== 12) endHour += 12;
  if (!isEndPM && endHour === 12) endHour = 0;
  endDate.setHours(endHour, parseInt(endMinutes) || 0);

  const formatDateForGoogle = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`,
    details: `${event.description}${event.speaker ? `\n\nSpeaker: ${event.speaker.name} - ${event.speaker.title} at ${event.speaker.organization}` : ''}${event.food ? `\n\nRefreshments: ${event.food}` : ''}`,
    location: event.room ? `${event.location} - ${event.room}` : event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Helper function to generate Outlook Calendar URL
const generateOutlookCalendarUrl = (event: CompanyEvent): string => {
  const startDate = new Date(event.date);
  const [hours, minutes] = event.time.replace(/[APap][Mm]/g, '').trim().split(':');
  const isPM = event.time.toLowerCase().includes('pm');
  let hour = parseInt(hours);
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  startDate.setHours(hour, parseInt(minutes) || 0);
  
  const endDate = new Date(event.date);
  const [endHours, endMinutes] = event.endTime.replace(/[APap][Mm]/g, '').trim().split(':');
  const isEndPM = event.endTime.toLowerCase().includes('pm');
  let endHour = parseInt(endHours);
  if (isEndPM && endHour !== 12) endHour += 12;
  if (!isEndPM && endHour === 12) endHour = 0;
  endDate.setHours(endHour, parseInt(endMinutes) || 0);

  const params = new URLSearchParams({
    rru: 'addevent',
    subject: event.title,
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString(),
    body: `${event.description}${event.speaker ? `\n\nSpeaker: ${event.speaker.name}` : ''}`,
    location: event.room ? `${event.location} - ${event.room}` : event.location,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

// Helper to generate ICS file content
const generateICSContent = (event: CompanyEvent): string => {
  const startDate = new Date(event.date);
  const [hours, minutes] = event.time.replace(/[APap][Mm]/g, '').trim().split(':');
  const isPM = event.time.toLowerCase().includes('pm');
  let hour = parseInt(hours);
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  startDate.setHours(hour, parseInt(minutes) || 0);
  
  const endDate = new Date(event.date);
  const [endHours, endMinutes] = event.endTime.replace(/[APap][Mm]/g, '').trim().split(':');
  const isEndPM = event.endTime.toLowerCase().includes('pm');
  let endHour = parseInt(endHours);
  if (isEndPM && endHour !== 12) endHour += 12;
  if (!isEndPM && endHour === 12) endHour = 0;
  endDate.setHours(endHour, parseInt(endMinutes) || 0);

  const formatDateForICS = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '').replace('Z', '');
  };

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Synapse//Events//EN
BEGIN:VEVENT
UID:${event.id}@synapse.app
DTSTAMP:${formatDateForICS(new Date())}Z
DTSTART:${formatDateForICS(startDate)}Z
DTEND:${formatDateForICS(endDate)}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.room ? `${event.location} - ${event.room}` : event.location}
END:VEVENT
END:VCALENDAR`;
};

// Download ICS file
const downloadICS = (event: CompanyEvent) => {
  const icsContent = generateICSContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ userRole, userName: _userName }) => {
  const [selectedEvent, setSelectedEvent] = useState<CompanyEvent | null>(null);
  const [showTranscript, setShowTranscript] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'relevant'>('upcoming');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCalendarOptions, setShowCalendarOptions] = useState<string | null>(null);
  const [events, setEvents] = useState<CompanyEvent[]>(mockEvents);
  const [addedToCalendar, setAddedToCalendar] = useState<string[]>([]);
  
  // Create Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    room: '',
    eventType: 'talk' as CompanyEvent['eventType'],
    targetAudience: [userRole] as JobRole[],
    food: '',
    registrationRequired: false,
    maxAttendees: ''
  });

  // Handle creating new event
  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;
    
    const createdEvent: CompanyEvent = {
      id: `evt-custom-${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description || 'No description provided',
      date: new Date(newEvent.date),
      time: newEvent.time,
      endTime: newEvent.endTime || newEvent.time,
      location: newEvent.location || 'TBD',
      room: newEvent.room || undefined,
      eventType: newEvent.eventType,
      targetAudience: newEvent.targetAudience,
      food: newEvent.food || undefined,
      isPast: new Date(newEvent.date) < new Date(),
      registrationRequired: newEvent.registrationRequired,
      maxAttendees: newEvent.maxAttendees ? parseInt(newEvent.maxAttendees) : undefined,
      currentAttendees: 0
    };
    
    setEvents(prev => [...prev, createdEvent]);
    setShowCreateEvent(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      endTime: '',
      location: '',
      room: '',
      eventType: 'talk',
      targetAudience: [userRole],
      food: '',
      registrationRequired: false,
      maxAttendees: ''
    });
  };

  // Toggle audience role
  const toggleAudienceRole = (role: JobRole) => {
    setNewEvent(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(role)
        ? prev.targetAudience.filter(r => r !== role)
        : [...prev.targetAudience, role]
    }));
  };

  // Filter events
  const filteredEvents = events.filter(event => {
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

  const upcomingCount = events.filter(e => !e.isPast).length;
  const relevantCount = events.filter(e => e.targetAudience.includes(userRole) && !e.isPast).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <CalendarIcon size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Events Calendar</h2>
              <p className="text-indigo-200 text-xs">Company AI & Innovation Events</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateEvent(true)}
            className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <PlusIcon size={20} className="text-white" />
          </button>
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

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-white border-b border-neutral-100 p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Create Event</h3>
              <button
                onClick={() => setShowCreateEvent(false)}
                className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Event Title */}
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Event Title *</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., AI Workshop: Getting Started"
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What's this event about?"
                  rows={3}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Date *</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Start Time *</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-600 mb-1.5 block">End Time</label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Location</label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Main Campus"
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Room</label>
                  <input
                    type="text"
                    value={newEvent.room}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, room: e.target.value }))}
                    placeholder="e.g., Conference Room A"
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Event Type</label>
                <div className="flex flex-wrap gap-2">
                  {(['talk', 'workshop', 'social', 'training', 'conference'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setNewEvent(prev => ({ ...prev, eventType: type }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        newEvent.eventType === type
                          ? getEventTypeColor(type)
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {getEventTypeLabel(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Target Audience</label>
                <div className="flex flex-wrap gap-2">
                  {(['engineering', 'design', 'sales', 'marketing', 'finance', 'logistics', 'innovation', 'intern'] as JobRole[]).map(role => (
                    <button
                      key={role}
                      onClick={() => toggleAudienceRole(role)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        newEvent.targetAudience.includes(role)
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {getRoleLabel(role)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Food/Refreshments */}
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Food & Refreshments</label>
                <input
                  type="text"
                  value={newEvent.food}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, food: e.target.value }))}
                  placeholder="e.g., Coffee & snacks provided"
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Registration */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">Require Registration?</span>
                <button
                  onClick={() => setNewEvent(prev => ({ ...prev, registrationRequired: !prev.registrationRequired }))}
                  className={`w-12 h-6 rounded-full transition-all ${
                    newEvent.registrationRequired ? 'bg-indigo-600' : 'bg-neutral-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    newEvent.registrationRequired ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {newEvent.registrationRequired && (
                <div>
                  <label className="text-xs font-medium text-neutral-600 mb-1.5 block">Max Attendees</label>
                  <input
                    type="number"
                    value={newEvent.maxAttendees}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, maxAttendees: e.target.value }))}
                    placeholder="e.g., 50"
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Create Button */}
              <button
                onClick={handleCreateEvent}
                disabled={!newEvent.title || !newEvent.date || !newEvent.time}
                className="w-full py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <CalendarIcon size={16} />
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

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
                    /* Upcoming Event - Register/Calendar Buttons */
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
                      
                      {/* Add to Calendar Button */}
                      {addedToCalendar.includes(event.id) ? (
                        <div className="w-full py-3 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-xl flex items-center justify-center gap-2">
                          <CheckIcon size={16} />
                          Added to Calendar
                        </div>
                      ) : (
                        <div className="relative">
                          <button 
                            onClick={() => setShowCalendarOptions(showCalendarOptions === event.id ? null : event.id)}
                            className="w-full py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                          >
                            <CalendarIcon size={16} />
                            {event.registrationRequired ? 'Register & Add to Calendar' : 'Add to Calendar'}
                          </button>
                          
                          {/* Calendar Options Dropdown */}
                          {showCalendarOptions === event.id && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden z-10">
                              <a
                                href={generateGoogleCalendarUrl(event)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                  setAddedToCalendar(prev => [...prev, event.id]);
                                  setShowCalendarOptions(null);
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors"
                              >
                                <span className="text-lg">📅</span>
                                <div>
                                  <p className="font-medium text-sm text-neutral-900">Google Calendar</p>
                                  <p className="text-xs text-neutral-500">Open in new tab</p>
                                </div>
                              </a>
                              <a
                                href={generateOutlookCalendarUrl(event)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                  setAddedToCalendar(prev => [...prev, event.id]);
                                  setShowCalendarOptions(null);
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-t border-neutral-100"
                              >
                                <span className="text-lg">📧</span>
                                <div>
                                  <p className="font-medium text-sm text-neutral-900">Outlook Calendar</p>
                                  <p className="text-xs text-neutral-500">Open in new tab</p>
                                </div>
                              </a>
                              <button
                                onClick={() => {
                                  downloadICS(event);
                                  setAddedToCalendar(prev => [...prev, event.id]);
                                  setShowCalendarOptions(null);
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-t border-neutral-100 w-full text-left"
                              >
                                <span className="text-lg">📥</span>
                                <div>
                                  <p className="font-medium text-sm text-neutral-900">Download .ics File</p>
                                  <p className="text-xs text-neutral-500">For Apple Calendar, etc.</p>
                                </div>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
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
