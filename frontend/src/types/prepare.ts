export interface Roadmap {
  title: string
  steps: string[]
  color?: string
}

export const LEARNING_ROADMAPS: Roadmap[] = [
  {
    title: 'Java Full Stack Roadmap',
    steps: ['Java Basics', 'OOPs', 'Collections', 'Spring Boot', 'REST APIs', 'React', 'Projects', 'Interview Prep'],
  },
  {
    title: 'Frontend Developer Roadmap',
    steps: ['HTML/CSS', 'JavaScript', 'React', 'State Management', 'Testing', 'Performance', 'Portfolio'],
  },
  {
    title: 'Backend Developer Roadmap',
    steps: ['Programming', 'SQL', 'REST', 'Auth', 'Microservices', 'Caching', 'System Design'],
  },
  {
    title: 'DevOps Roadmap',
    steps: ['Linux', 'Git', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Monitoring'],
  },
  {
    title: 'AI/ML Roadmap',
    steps: ['Python', 'Math', 'ML Basics', 'Deep Learning', 'NLP', 'MLOps', 'Gen AI'],
  },
  {
    title: 'Data Science Roadmap',
    steps: ['Statistics', 'Python', 'Pandas', 'Visualization', 'ML', 'Big Data', 'Case Studies'],
  },
  {
    title: 'Cybersecurity Roadmap',
    steps: ['Networking', 'Linux', 'OWASP', 'Pentesting', 'SOC', 'Forensics', 'Cert Prep'],
  },
]

export const COMPANY_TRACKS = [
  { company: 'TCS', sections: ['Aptitude', 'Coding', 'Interview Questions', 'HR Questions'] },
  { company: 'Infosys', sections: ['Aptitude', 'Coding', 'Interview Questions', 'HR Questions'] },
  { company: 'Cognizant', sections: ['Aptitude', 'Coding', 'Interview Questions', 'HR Questions'] },
  { company: 'Accenture', sections: ['Aptitude', 'Coding', 'Interview Questions', 'HR Questions'] },
  { company: 'Product-Based', sections: ['DSA Hard', 'System Design', 'LLD', 'Behavioral'] },
]

export const DSA_TOPICS = [
  { topic: 'Arrays', easy: 24, medium: 18, hard: 6 },
  { topic: 'Strings', easy: 20, medium: 15, hard: 5 },
  { topic: 'Linked Lists', easy: 12, medium: 14, hard: 8 },
  { topic: 'Trees', easy: 10, medium: 20, hard: 12 },
  { topic: 'Graphs', easy: 6, medium: 16, hard: 14 },
  { topic: 'Dynamic Programming', easy: 4, medium: 22, hard: 18 },
  { topic: 'Recursion', easy: 15, medium: 12, hard: 6 },
]

export const CODING_PROBLEMS = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', solved: false },
  { id: 2, title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stacks' },
  { id: 3, title: 'Merge K Sorted Lists', difficulty: 'Hard', topic: 'Heaps' },
  { id: 4, title: 'LRU Cache', difficulty: 'Medium', topic: 'Design' },
]

export const MOCK_INTERVIEW_TYPES = [
  { type: 'HR Interview', count: 45, icon: 'hr' },
  { type: 'Technical', count: 120, icon: 'tech' },
  { type: 'Behavioral', count: 35, icon: 'behavior' },
  { type: 'System Design', count: 28, icon: 'design' },
]

export const SKILL_QUIZZES = [
  { name: 'Java Quiz', questions: 25, duration: '20 min' },
  { name: 'SQL Quiz', questions: 20, duration: '15 min' },
  { name: 'React Quiz', questions: 22, duration: '18 min' },
  { name: 'Aptitude Quiz', questions: 30, duration: '25 min' },
]

export const ACHIEVEMENTS = [
  { badge: 'Java Master', desc: 'Complete Java track', earned: false },
  { badge: 'SQL Expert', desc: 'Score 90%+ on SQL quiz', earned: false },
  { badge: 'DSA Beginner', desc: 'Solve 10 easy problems', earned: true },
  { badge: 'Hackathon Winner', desc: 'Win a Nina hackathon', earned: false },
]

export const CAREER_MISSIONS = {
  tasks: ['5 DSA Problems', '1 Hackathon', '1 Resume Review'],
  reward: 'Hiring Priority Badge',
}

export const RESUME_TEMPLATES = ['Modern Tech', 'ATS Classic', 'Minimal Fresher', 'Senior Engineer']

export const ATS_SUGGESTIONS = [
  'Add Spring Boot',
  'Improve project descriptions',
  'Add GitHub links',
  'Include measurable impact metrics',
]
