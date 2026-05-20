import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api, { ApiResponse } from '@/services/api'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import {
  ACHIEVEMENTS,
  ATS_SUGGESTIONS,
  CAREER_MISSIONS,
  CODING_PROBLEMS,
  COMPANY_TRACKS,
  DSA_TOPICS,
  LEARNING_ROADMAPS,
  MOCK_INTERVIEW_TYPES,
  RESUME_TEMPLATES,
  SKILL_QUIZZES,
} from '@/types/prepare'
import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Code2,
  FileText,
  Flame,
  GraduationCap,
  MessageCircle,
  Play,
  Route,
  Sparkles,
  Target,
  Trophy,
  Video,
  Zap,
} from 'lucide-react'

interface Course {
  id: number
  title: string
  description?: string
  category?: string
  durationMinutes?: number
  totalLessons?: number
}

interface CourseProgress {
  course: { id: number }
  progressPercent: number
}

function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  id: string
  icon: React.ElementType
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold dark:text-white">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

export default function PreparePage() {
  const authed = useAuthStore((s) => s.isAuthenticated())
  const [code, setCode] = useState('// Write your solution here\nfunction solve() {\n  return [];\n}')
  const [resumeName, setResumeName] = useState('')
  const [resumeSkills, setResumeSkills] = useState('')
  const [atsScore, setAtsScore] = useState<number | null>(null)
  const [streak, setStreak] = useState(7)
  const [xp, setXp] = useState(1250)
  const [dsaSolved, setDsaSolved] = useState(12)

  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.get<ApiResponse<Course[]>>('/courses').then((r) => r.data.data),
  })

  const { data: progress = [], refetch: refetchProgress } = useQuery({
    queryKey: ['course-progress'],
    queryFn: () => api.get<ApiResponse<CourseProgress[]>>('/courses/my-progress').then((r) => r.data.data),
    enabled: authed,
  })

  const progressMap = useMemo(() => {
    const m = new Map<number, number>()
    progress.forEach((p) => m.set(p.course.id, p.progressPercent))
    return m
  }, [progress])

  const completedCourses = progress.filter((p) => p.progressPercent >= 100).length
  const avgProgress =
    progress.length > 0
      ? Math.round(progress.reduce((a, p) => a + p.progressPercent, 0) / progress.length)
      : 0

  const updateProgress = async (id: number, percent: number) => {
    if (!authed) return toast.error('Login to track progress')
    await api.post(`/courses/${id}/progress`, { percent })
    toast.success('Progress saved')
    refetchProgress()
    setXp((x) => x + 50)
  }

  const runAts = () => {
    const score = 68 + Math.floor(Math.random() * 22)
    setAtsScore(score)
    toast.success('ATS analysis complete')
  }

  const submitCode = () => {
    toast.success('Submitted! (Judge0 integration ready)')
    setDsaSolved((n) => n + 1)
    setXp((x) => x + 100)
    setStreak((s) => s + 1)
  }

  const dailyChallenge = () => {
    toast.success('Daily challenge completed! +150 XP')
    setXp((x) => x + 150)
  }

  const startQuiz = (name: string) => toast(`Starting ${name}...`, { icon: '📝' })

  const aiRecommend = () =>
    toast.success('AI recommends: DSA Arrays course, Java Quiz, and Full Stack internship')

  const roadmaps = courses.filter((c) => c.title?.includes('Roadmap') || c.category === 'FULL_STACK')
  const dsaCourses = courses.filter((c) => c.category === 'DSA')
  const companyCourses = courses.filter((c) => c.category === 'COMPANY_PREP' || c.category === 'APTITUDE')
  const mockCourses = courses.filter((c) => c.category === 'MOCK_INTERVIEW')
  const videoCourses = courses.filter((c) => c.category === 'VIDEO_TUTORIAL')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-10 rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-600 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">Prepare — Career Growth Hub</h1>
        <p className="mt-2 max-w-2xl text-indigo-100">
          GeeksforGeeks + Scaler + Coursera + LeetCode in one place. Learn skills, crack interviews, and become
          Nina Organization–ready.
        </p>
        <div className="flex flex-wrap gap-4 mt-6 text-sm">
          <span className="px-3 py-1 rounded-full bg-white/20">🔥 {streak} day streak</span>
          <span className="px-3 py-1 rounded-full bg-white/20">⚡ {xp} XP</span>
          <span className="px-3 py-1 rounded-full bg-white/20">📊 Level {Math.floor(xp / 500) + 1}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {['roadmaps', 'dsa', 'coding', 'mock', 'resume', 'analytics'].map((s) => (
            <a key={s} href={`#${s}`} className="text-xs px-3 py-1 rounded-full bg-white/20 hover:bg-white/30">
              {s}
            </a>
          ))}
        </div>
      </div>

      {authed && (
        <Card className="mb-10 border-violet-200 dark:border-violet-800">
          <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-500" /> AI Recommendation Engine
              </h3>
              <p className="text-sm text-slate-500">Courses, problems, internships & jobs based on your profile.</p>
            </div>
            <Button variant="outline" onClick={aiRecommend}>
              Get Recommendations
            </Button>
          </CardContent>
        </Card>
      )}

      <Section id="roadmaps" icon={Route} title="Learning Roadmaps" subtitle="Structured paths from basics to hire-ready">
        <div className="grid md:grid-cols-2 gap-4">
          {LEARNING_ROADMAPS.map((r) => (
            <Card key={r.title}>
              <CardContent>
                <h3 className="font-semibold dark:text-white">{r.title}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-1">
                  {r.steps.map((step, i) => (
                    <span key={step} className="flex items-center text-xs">
                      <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 dark:text-slate-200">{step}</span>
                      {i < r.steps.length - 1 && <span className="text-indigo-500 mx-0.5">↓</span>}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {roadmaps.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {roadmaps.slice(0, 6).map((c) => (
              <Card key={c.id}>
                <CardContent>
                  <Badge variant="info">{c.category?.replace('_', ' ')}</Badge>
                  <h3 className="font-medium mt-2 dark:text-white">{c.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {progressMap.get(c.id) ?? 0}% complete · {c.totalLessons} lessons
                  </p>
                  <Button size="sm" className="mt-3" onClick={() => updateProgress(c.id, Math.min(100, (progressMap.get(c.id) ?? 0) + 25))}>
                    Continue
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <Section id="company" icon={Target} title="Company Preparation Tracks" subtitle="TCS, Infosys, Cognizant, Accenture & product companies">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPANY_TRACKS.map((t) => (
            <Card key={t.company}>
              <CardContent>
                <h3 className="font-semibold dark:text-white">{t.company}</h3>
                <ul className="mt-3 space-y-1">
                  {t.sections.map((s) => (
                    <li key={s} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {companyCourses.map((c) => (
            <Card key={c.id}>
              <CardContent>
                <h3 className="font-medium dark:text-white">{c.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mt-1">{c.description}</p>
                <Button size="sm" className="mt-3" onClick={() => updateProgress(c.id, 10)}>
                  Start Track
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="dsa" icon={Code2} title="DSA Preparation" subtitle="Topic-wise problems with difficulty tracking">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DSA_TOPICS.map((t) => (
            <Card key={t.topic}>
              <CardContent>
                <p className="font-medium dark:text-white">{t.topic}</p>
                <div className="flex gap-2 mt-2 text-xs">
                  <Badge variant="success">E {t.easy}</Badge>
                  <Badge variant="warning">M {t.medium}</Badge>
                  <Badge variant="danger">H {t.hard}</Badge>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${Math.min(100, (dsaSolved / (t.easy + t.medium)) * 100)}%` }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {dsaCourses.map((c) => (
            <Card key={c.id}>
              <CardContent>
                <h3 className="font-medium dark:text-white">{c.title}</h3>
                <p className="text-sm text-slate-500">{c.totalLessons} problems · {progressMap.get(c.id) ?? 0}%</p>
                <Button size="sm" className="mt-2" onClick={() => updateProgress(c.id, 15)}>
                  Practice
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="coding" icon={Code2} title="Coding Practice Platform" subtitle="Problems, compiler & submissions (Judge0-ready)">
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <div className="space-y-2 mb-4">
              {CODING_PROBLEMS.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border dark:border-slate-800">
                  <div>
                    <p className="font-medium dark:text-white">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.topic}</p>
                  </div>
                  <Badge variant={p.difficulty === 'Easy' ? 'success' : p.difficulty === 'Hard' ? 'danger' : 'warning'}>
                    {p.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <Card>
            <CardContent>
              <p className="text-sm font-medium dark:text-white mb-2">Online Compiler</p>
              <textarea
                className="w-full h-48 font-mono text-sm p-3 rounded-lg border dark:bg-slate-900 dark:border-slate-700"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={submitCode}>
                  Submit
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast('Running test cases...', { icon: '⚙️' })}>
                  Run Tests
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2">Integrate Judge0 API for production judging.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="mock" icon={MessageCircle} title="Mock Interview Section" subtitle="HR, technical, behavioral & system design">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {MOCK_INTERVIEW_TYPES.map((m) => (
            <Card key={m.type}>
              <CardContent>
                <p className="font-medium dark:text-white">{m.type}</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">{m.count}+</p>
                <p className="text-xs text-slate-500">questions</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-dashed border-2 border-violet-300 dark:border-violet-700 mb-4">
          <CardContent>
            <h3 className="font-semibold dark:text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-500" /> AI Interview Simulator
            </h3>
            <p className="text-sm text-slate-500 mt-1">Practice with AI feedback on answers, tone, and structure.</p>
            <Button className="mt-3" variant="secondary" onClick={() => toast('AI simulator session starting...', { icon: '🤖' })}>
              Start AI Mock
            </Button>
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-4">
          {mockCourses.map((c) => (
            <Card key={c.id}>
              <CardContent>
                <h3 className="font-medium dark:text-white">{c.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{c.description}</p>
                <Button size="sm" className="mt-3" onClick={() => updateProgress(c.id, 20)}>
                  Start Mock
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="videos" icon={Video} title="Video Learning" subtitle="Tutorials, seminars & tech talks">
        <div className="grid md:grid-cols-3 gap-4">
          {videoCourses.length > 0
            ? videoCourses.map((c) => (
                <Card key={c.id}>
                  <CardContent>
                    <Play className="w-8 h-8 text-indigo-500 mb-2" />
                    <h3 className="font-medium dark:text-white">{c.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{c.durationMinutes} min · {c.totalLessons} videos</p>
                    <Button size="sm" className="mt-3" variant="outline" onClick={() => updateProgress(c.id, 10)}>
                      Watch
                    </Button>
                  </CardContent>
                </Card>
              ))
            : ['Spring Boot Masterclass', 'React Deep Dive', 'System Design Talk'].map((t) => (
                <Card key={t}>
                  <CardContent>
                    <Play className="w-8 h-8 text-indigo-500 mb-2" />
                    <h3 className="font-medium dark:text-white">{t}</h3>
                    <Button size="sm" className="mt-3" variant="outline">
                      Coming soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
        </div>
      </Section>

      <Section id="resume" icon={FileText} title="Resume Builder & ATS Checker">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <h3 className="font-semibold dark:text-white mb-3">Build ATS-Friendly Resume</h3>
              <Input placeholder="Full name" value={resumeName} onChange={(e) => setResumeName(e.target.value)} className="mb-2" />
              <Input placeholder="Skills (comma separated)" value={resumeSkills} onChange={(e) => setResumeSkills(e.target.value)} className="mb-2" />
              <p className="text-xs text-slate-500 mb-2">Templates:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {RESUME_TEMPLATES.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <Button onClick={() => toast.success('Resume PDF download (demo)')}>Download PDF</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold dark:text-white mb-3">ATS Resume Checker</h3>
              <Button onClick={runAts}>Check ATS Score</Button>
              {atsScore != null && (
                <div className="mt-4">
                  <p className="text-3xl font-bold text-indigo-600">ATS Score: {atsScore}%</p>
                  <p className="text-sm font-medium mt-4 dark:text-white">Suggestions:</p>
                  <ul className="mt-2 space-y-1">
                    {ATS_SUGGESTIONS.map((s) => (
                      <li key={s} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <span className="text-emerald-500">✔</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="quizzes" icon={BookOpen} title="Skill Assessments" subtitle="Java, SQL, React & aptitude quizzes">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {SKILL_QUIZZES.map((q) => (
            <Card key={q.name}>
              <CardContent>
                <h3 className="font-medium dark:text-white">{q.name}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {q.questions} Q · {q.duration}
                </p>
                <Button size="sm" className="mt-3" onClick={() => startQuiz(q.name)}>
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="daily" icon={Zap} title="Daily Challenge System">
        <Card className="border-amber-200 dark:border-amber-800">
          <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold dark:text-white">Daily Coding Challenge</h3>
              <p className="text-sm text-slate-500 mt-1">Today: Valid Anagram — complete to earn +150 XP</p>
            </div>
            <Button onClick={dailyChallenge}>Complete Today&apos;s Challenge</Button>
          </CardContent>
        </Card>
      </Section>

      <Section id="badges" icon={Award} title="Achievements & Badges">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {ACHIEVEMENTS.map((a) => (
            <Card key={a.badge} className={a.earned ? 'ring-2 ring-emerald-500' : 'opacity-80'}>
              <CardContent>
                <Trophy className={`w-8 h-8 mb-2 ${a.earned ? 'text-amber-500' : 'text-slate-400'}`} />
                <p className="font-medium dark:text-white">{a.badge}</p>
                <p className="text-xs text-slate-500">{a.desc}</p>
                {a.earned && <Badge variant="success" className="mt-2">Earned</Badge>}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="analytics" icon={BarChart3} title="Learning Analytics">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent>
              <p className="text-sm text-slate-500">Problems solved</p>
              <p className="text-2xl font-bold text-indigo-600">{dsaSolved}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm text-slate-500">Courses in progress</p>
              <p className="text-2xl font-bold text-indigo-600">{progress.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm text-slate-500">Courses completed</p>
              <p className="text-2xl font-bold text-indigo-600">{completedCourses}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm text-slate-500">Interview readiness</p>
              <p className="text-2xl font-bold text-indigo-600">{avgProgress || 42}%</p>
            </CardContent>
          </Card>
        </div>
        <p className="text-sm text-slate-500 mt-4 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" /> Weekly streak: {streak} days — keep learning!
        </p>
      </Section>

      <Section id="certificates" icon={GraduationCap} title="Certification System">
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
          Complete courses to generate certificates shareable on LinkedIn.
        </p>
        <Button variant="outline" onClick={() => toast.success('Certificate generated (demo)')}>
          Generate Certificate
        </Button>
      </Section>

      <Section id="mentors" icon={MessageCircle} title="Mentor Sessions" subtitle="Live doubt sessions & career guidance">
        <div className="grid md:grid-cols-3 gap-4">
          {['Java Career Q&A', 'DSA Doubt Clearing', 'HR Resume Review'].map((s) => (
            <Card key={s}>
              <CardContent>
                <p className="font-medium dark:text-white">{s}</p>
                <p className="text-xs text-slate-500 mt-1">Live · Weekly slots</p>
                <Button size="sm" className="mt-3" variant="outline" onClick={() => toast('Book mentor slot (coming soon)')}>
                  Book Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="missions" icon={Flame} title="Career Missions & Gamification">
        <Card>
          <CardContent>
            <h3 className="font-semibold dark:text-white">Complete mission to earn {CAREER_MISSIONS.reward}</h3>
            <ul className="mt-3 space-y-2">
              {CAREER_MISSIONS.tasks.map((t) => (
                <li key={t} className="text-sm flex items-center gap-2 dark:text-slate-300">
                  <span className="text-emerald-500">✔</span> {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              Earn: <Badge variant="warning">🏅 {CAREER_MISSIONS.reward}</Badge> · {xp} XP · Level {Math.floor(xp / 500) + 1}
            </p>
            <Link to="/participate" className="inline-block mt-4 text-sm text-indigo-600">
              Join a hackathon to complete mission →
            </Link>
          </CardContent>
        </Card>
      </Section>

      <Section id="courses" icon={BookOpen} title="All Courses" subtitle={`${courses.length} learning paths`}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <Card key={c.id}>
              <CardContent>
                <BookOpen className="h-6 w-6 text-indigo-600 mb-2" />
                <h3 className="font-semibold dark:text-white">{c.title}</h3>
                <Badge className="mt-1" variant="info">
                  {c.category?.replace('_', ' ')}
                </Badge>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{c.description}</p>
                <p className="text-xs mt-2 text-slate-400">
                  {c.totalLessons} lessons · {c.durationMinutes} min · {progressMap.get(c.id) ?? 0}%
                </p>
                <Button size="sm" className="mt-3" onClick={() => updateProgress(c.id, Math.min(100, (progressMap.get(c.id) ?? 0) + 25))}>
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
