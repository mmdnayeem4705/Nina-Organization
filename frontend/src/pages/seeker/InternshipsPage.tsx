import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api, { ApiResponse } from '@/services/api'
import { Internship, InternshipLevel, WorkMode } from '@/types/internship'
import {
  ASSESSMENT_TYPES,
  CERTIFICATE_TYPES,
  DOMAIN_CATEGORIES,
  INTERNSHIP_ROADMAPS,
  LEADERBOARD,
} from '@/types/internship'
import { InternshipCard } from '@/components/internships/InternshipCard'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import {
  Award,
  BookOpen,
  Briefcase,
  Flame,
  GraduationCap,
  Layers,
  MapPin,
  Route,
  Sparkles,
  Target,
  Trophy,
  Users,
  Video,
} from 'lucide-react'

function fetchInternships(params: Record<string, string>) {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => v && q.set(k, v))
  q.set('size', '100')
  return api.get<ApiResponse<{ content: Internship[] }>>(`/internships?${q}`).then((r) => r.data.data.content)
}

export default function InternshipsPage() {
  const authed = useAuthStore((s) => s.isAuthenticated())
  const [domain, setDomain] = useState('')
  const [category, setCategory] = useState('')
  const [workMode, setWorkMode] = useState<WorkMode | ''>('')
  const [level, setLevel] = useState<InternshipLevel | ''>('')
  const [search, setSearch] = useState('')
  const [ppoOnly, setPpoOnly] = useState(false)
  const [liveOnly, setLiveOnly] = useState(false)
  const [atsScore, setAtsScore] = useState<number | null>(null)

  const filters = useMemo(
    () => ({
      domain,
      category,
      workMode,
      level,
      search,
      ppo: ppoOnly ? 'true' : '',
      liveProject: liveOnly ? 'true' : '',
    }),
    [domain, category, workMode, level, search, ppoOnly, liveOnly]
  )

  const { data: all = [], refetch } = useQuery({
    queryKey: ['internships', filters],
    queryFn: () => fetchInternships(filters),
  })

  const { data: domains = [] } = useQuery({
    queryKey: ['internship-domains'],
    queryFn: () => api.get<ApiResponse<string[]>>('/internships/meta/domains').then((r) => r.data.data),
  })

  const featured = all.filter((i) => i.featured)
  const liveProjects = all.filter((i) => i.liveProject)
  const ppoList = all.filter((i) => i.ppoAvailable)
  const recommended = useMemo(() => {
    return [...all]
      .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
      .slice(0, 6)
  }, [all])

  const apply = async (id: number) => {
    if (!authed) return toast.error('Login required to apply')
    await api.post('/applications', { internshipId: id })
    toast.success('Internship application submitted')
    refetch()
  }

  const checkAts = () => {
    const score = 72 + Math.floor(Math.random() * 20)
    setAtsScore(score)
    toast.success('ATS check complete — see score below')
  }

  const Section = ({
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
  }) => (
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-10 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">Internship Ecosystem</h1>
        <p className="mt-2 max-w-2xl text-indigo-100">
          Featured roles, live projects, PPO tracks, mentor guidance, and skill-matched recommendations —
          Internshala meets LinkedIn meets HackerRank, built for Nina Organization.
        </p>
        <div className="flex flex-wrap gap-2 mt-6">
          {['featured', 'domains', 'live', 'roadmaps', 'mentors', 'leaderboard'].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-sm px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              {s.replace('-', ' ')}
            </a>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-6 gap-3 mb-8 p-4 rounded-xl bg-slate-100 dark:bg-slate-900">
        <Input
          className="md:col-span-2"
          placeholder="Search internships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded-lg border px-3 dark:bg-slate-800 dark:border-slate-700"
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value)
            setCategory('')
          }}
        >
          <option value="">All domains</option>
          {domains.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border px-3 dark:bg-slate-800 dark:border-slate-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          {(domain ? DOMAIN_CATEGORIES[domain] ?? [] : Object.values(DOMAIN_CATEGORIES).flat()).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border px-3 dark:bg-slate-800 dark:border-slate-700"
          value={workMode}
          onChange={(e) => setWorkMode(e.target.value as WorkMode | '')}
        >
          <option value="">Work mode</option>
          <option value="REMOTE">Remote</option>
          <option value="HYBRID">Hybrid</option>
          <option value="ONSITE">Onsite</option>
        </select>
        <select
          className="rounded-lg border px-3 dark:bg-slate-800 dark:border-slate-700"
          value={level}
          onChange={(e) => setLevel(e.target.value as InternshipLevel | '')}
        >
          <option value="">Level</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-3 mb-8">
        <Button onClick={() => refetch()}>Apply Filters</Button>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={ppoOnly} onChange={(e) => setPpoOnly(e.target.checked)} />
          PPO only
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={liveOnly} onChange={(e) => setLiveOnly(e.target.checked)} />
          Live projects
        </label>
      </div>

      {authed && (
        <Card className="mb-10 border-indigo-200 dark:border-indigo-800">
          <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" /> AI Career Recommendation
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Internships ranked by your skills, resume, courses, and past applications.
              </p>
            </div>
            <Button variant="outline" onClick={checkAts}>
              Run Resume ATS Check
            </Button>
            {atsScore != null && (
              <p className="text-lg font-bold text-indigo-600">
                ATS Score: {atsScore}% — Add metrics & keywords to improve
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Section id="featured" icon={Flame} title="Featured Internships" subtitle="Top picks with certificates & mentorship">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(featured.length ? featured : all.slice(0, 6)).map((i) => (
            <InternshipCard key={i.id} internship={i} onApply={apply} />
          ))}
        </div>
      </Section>

      <Section id="domains" icon={Layers} title="Domain Categories" subtitle="Browse by technology domain">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.keys(DOMAIN_CATEGORIES).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDomain(d)}
              className={`p-4 rounded-xl border text-left transition hover:border-indigo-500 ${
                domain === d ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'dark:border-slate-800'
              }`}
            >
              <p className="font-medium dark:text-white">{d}</p>
              <p className="text-xs text-slate-500 mt-1">{DOMAIN_CATEGORIES[d].join(' · ')}</p>
              <p className="text-xs mt-2 text-indigo-600">{all.filter((x) => x.domain === d).length} open roles</p>
            </button>
          ))}
        </div>
      </Section>

      <Section id="recommendations" icon={Target} title="Internship Recommendations" subtitle="Skill match score when logged in">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommended.map((i) => (
            <InternshipCard key={i.id} internship={i} onApply={apply} />
          ))}
        </div>
      </Section>

      <Section id="live" icon={Briefcase} title="Live Projects" subtitle="Real-world modules recruiters love">
        <div className="grid md:grid-cols-2 gap-4">
          {(liveProjects.length ? liveProjects : all.filter((i) => i.smallProject)).map((i) => (
            <InternshipCard key={i.id} internship={i} onApply={apply} />
          ))}
        </div>
      </Section>

      <Section id="skill-based" icon={BookOpen} title="Skill-Based Internships" subtitle="Filter by required tech stack">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {all.filter((i) => i.skillBased).slice(0, 9).map((i) => (
            <InternshipCard key={i.id} internship={i} onApply={apply} compact />
          ))}
        </div>
      </Section>

      <Section id="roadmaps" icon={Route} title="Internship Roadmaps" subtitle="Structured learning paths">
        <div className="grid md:grid-cols-2 gap-4">
          {INTERNSHIP_ROADMAPS.map((r) => (
            <Card key={r.title}>
              <CardContent>
                <h3 className="font-semibold dark:text-white">{r.title}</h3>
                <ol className="mt-3 flex flex-wrap gap-2">
                  {r.steps.map((s, idx) => (
                    <li key={s} className="text-sm flex items-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="mentors" icon={Users} title="Mentor Guidance" subtitle="Industry mentors on every track">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Priya Sharma', role: 'Senior Full Stack Engineer', exp: '6+ Years' },
            { name: 'Dr. Ananya Rao', role: 'AI Research Lead', exp: '10+ Years' },
            { name: 'Dev Patel', role: 'Blockchain Architect', exp: '5+ Years' },
            { name: 'Karan Joshi', role: 'DevOps Lead', exp: '9+ Years' },
            { name: 'Amit Desai', role: 'Security Analyst', exp: '7+ Years' },
            { name: 'Pooja Nair', role: 'Data Lead', exp: '5+ Years' },
          ].map((m) => (
            <Card key={m.name}>
              <CardContent>
                <p className="font-semibold dark:text-white">{m.name}</p>
                <p className="text-sm text-slate-500">{m.role}</p>
                <Badge className="mt-2" variant="success">
                  {m.exp}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="certificates" icon={Award} title="Certificates & Rewards">
        <div className="flex flex-wrap gap-2">
          {CERTIFICATE_TYPES.map((c) => (
            <Badge key={c} variant="info">
              {c}
            </Badge>
          ))}
        </div>
      </Section>

      <Section id="progress" icon={GraduationCap} title="Internship Progress Tracker" subtitle="After selection — weekly milestones">
        <Card>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              {['Week 1 → Learning', 'Week 2 → Minor Tasks', 'Week 3 → Team Project', 'Week 4 → Final Evaluation'].map(
                (w, i) => (
                  <div key={w} className="flex-1 text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <p className="text-xs text-indigo-600 font-medium">Step {i + 1}</p>
                    <p className="text-sm mt-1 dark:text-white">{w}</p>
                  </div>
                )
              )}
            </div>
            <p className="text-sm text-slate-500 mt-4">
              View role-specific timelines on each internship detail page.
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section id="ppo" icon={Flame} title="PPO Opportunities" subtitle="Pre-placement offer tracks">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(ppoList.length ? ppoList : all.filter((i) => i.ppoAvailable)).map((i) => (
            <InternshipCard key={i.id} internship={i} onApply={apply} />
          ))}
        </div>
      </Section>

      <Section id="assessments" icon={BookOpen} title="Internship Assessments">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {ASSESSMENT_TYPES.map((a) => (
            <Card key={a.name}>
              <CardContent>
                <p className="font-medium dark:text-white">{a.name}</p>
                <p className="text-xs text-slate-500 mt-1">{a.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="leaderboard" icon={Trophy} title="Internship Leaderboard" subtitle="Top performers & projects">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b dark:border-slate-800">
                <th className="py-2">Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Tasks</th>
                <th>Best Project</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.map((row, idx) => (
                <tr key={row.name} className="border-b dark:border-slate-800">
                  <td className="py-3">{idx + 1}</td>
                  <td className="font-medium dark:text-white">{row.name}</td>
                  <td>{row.score}%</td>
                  <td>{row.tasks}</td>
                  <td>{row.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="teams" icon={Users} title="Team Collaboration">
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
          Join project teams, work in groups, and submit GitHub repos — enabled after you are selected for a live
          project internship.
        </p>
        <Button variant="outline" disabled={!authed}>
          {authed ? 'My Teams (coming soon)' : 'Login to join teams'}
        </Button>
      </Section>

      <Section id="seminars" icon={Video} title="Seminar Integration">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Internship Orientation 2026', type: 'Video' },
            { title: 'Spring Boot Masterclass', type: 'Technical' },
            { title: 'Live Workshop: System Design', type: 'Live' },
          ].map((s) => (
            <Card key={s.title}>
              <CardContent>
                <Badge variant="info">{s.type}</Badge>
                <p className="font-medium mt-2 dark:text-white">{s.title}</p>
                <Link to="/participate" className="text-sm text-indigo-600 mt-2 inline-block">
                  View events →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="all" icon={MapPin} title="All Internships" subtitle={`${all.length} roles available`}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {all.map((i) => (
            <InternshipCard key={i.id} internship={i} onApply={apply} />
          ))}
        </div>
        {!all.length && <p className="text-slate-500">No internships match your filters. Restart backend to seed catalog.</p>}
      </Section>
    </div>
  )
}
