export type WorkMode = 'REMOTE' | 'HYBRID' | 'ONSITE'
export type InternshipLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export interface Internship {
  id: number
  title: string
  description?: string
  domain?: string
  category?: string
  location?: string
  duration?: string
  stipend?: number
  stipendLabel?: string
  virtual?: boolean
  certificateProvided?: boolean
  smallProject?: boolean
  featured?: boolean
  liveProject?: boolean
  ppoAvailable?: boolean
  skillBased?: boolean
  workMode?: WorkMode
  level?: InternshipLevel
  requiredSkills?: string[]
  tasks?: string[]
  mentorName?: string
  mentorRole?: string
  mentorExperience?: string
  mentorLinkedIn?: string
  progressWeeks?: string[]
  openings?: number
  appliedCount?: number
  deadline?: string
  matchScore?: number
}

export const DOMAIN_CATEGORIES: Record<string, string[]> = {
  'Software Development': ['Frontend', 'Backend', 'Full Stack', 'Live Projects'],
  'AI/ML': ['AI/ML'],
  'Cloud & DevOps': ['DevOps', 'Cloud'],
  'Cybersecurity': ['Security'],
  Data: ['Data', 'Live Projects'],
  Mobile: ['Mobile'],
  Blockchain: ['Blockchain'],
  Gaming: ['Other'],
  IoT: ['Other'],
}

export const INTERNSHIP_ROADMAPS = [
  { title: 'Full Stack Path', steps: ['HTML/CSS', 'JavaScript', 'React', 'Spring Boot', 'Deploy'] },
  { title: 'AI/ML Path', steps: ['Python', 'Statistics', 'ML Basics', 'Deep Learning', 'Gen AI'] },
  { title: 'DevOps Path', steps: ['Linux', 'Docker', 'K8s', 'CI/CD', 'Cloud'] },
  { title: 'Blockchain Path', steps: ['Solidity', 'Smart Contracts', 'Web3', 'dApps'] },
]

export const LEADERBOARD = [
  { name: 'Aisha K.', score: 98, tasks: 24, project: 'E-Commerce API' },
  { name: 'Rohan S.', score: 95, tasks: 22, project: 'ML Recommender' },
  { name: 'Meera P.', score: 92, tasks: 20, project: 'DeFi Dashboard' },
  { name: 'Jay D.', score: 89, tasks: 18, project: 'SOC Playbook' },
]

export const CERTIFICATE_TYPES = [
  'Internship Certificate',
  'Completion Badge',
  'Skill Badge',
  'Experience Letter',
]

export const ASSESSMENT_TYPES = [
  { name: 'Aptitude Test', desc: 'Logical reasoning & analytics' },
  { name: 'Coding Round', desc: 'DSA problems on HackerRank-style platform' },
  { name: 'MCQ Quiz', desc: 'Domain-specific multiple choice' },
  { name: 'Mini Project', desc: '48-hour take-home assignment' },
]
