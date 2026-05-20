export const SPONSORS = ['Nina Organization', 'TechNova', 'CloudNine', 'SecureStack', 'DataPulse']

export const LIVE_LEADERBOARD = [
  { rank: 1, name: 'Aisha K.', score: 2840, event: 'Weekly Contest' },
  { rank: 2, name: 'Rohan S.', score: 2710, event: 'AI Hackathon' },
  { rank: 3, name: 'Meera P.', score: 2650, event: 'Spring Workshop' },
  { rank: 4, name: 'Jay D.', score: 2580, event: 'Blockchain Challenge' },
]

export const INNOVATION_CHALLENGES = [
  { title: 'Build AI Chatbot', prize: '₹25,000', deadline: '30 days' },
  { title: 'Real-World FinTech Problem', prize: '₹40,000', deadline: '45 days' },
  { title: 'Blockchain Innovation Challenge', prize: '₹35,000', deadline: '21 days' },
]

export const CAREER_MISSION_PARTICIPATE = {
  tasks: ['Register for 1 Hackathon', 'Join a Team', 'Submit GitHub Project'],
  reward: 'Recruiter Featured Profile',
}

export const EVENT_CALENDAR_LEGEND = [
  { color: 'bg-indigo-500', label: 'Hackathon' },
  { color: 'bg-cyan-500', label: 'Contest' },
  { color: 'bg-amber-500', label: 'Workshop' },
  { color: 'bg-violet-500', label: 'Seminar/Webinar' },
]

export function eventTypeBadge(type?: string): 'info' | 'warning' | 'success' | 'danger' | 'default' {
  switch (type) {
    case 'HACKATHON':
      return 'warning'
    case 'CONTEST':
      return 'danger'
    case 'WORKSHOP':
      return 'success'
    case 'SEMINAR':
    case 'WEBINAR':
      return 'info'
    default:
      return 'default'
  }
}
