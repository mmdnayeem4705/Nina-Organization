import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api, { ApiResponse } from '@/services/api'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import {
  CAREER_MISSION_PARTICIPATE,
  EVENT_CALENDAR_LEGEND,
  INNOVATION_CHALLENGES,
  LIVE_LEADERBOARD,
  SPONSORS,
  eventTypeBadge,
} from '@/types/participate'
import {
  Award,
  Calendar,
  Flame,
  Github,
  MessageSquare,
  Mic,
  Radio,
  Sparkles,
  Star,
  Trophy,
  Users,
  Video,
  Zap,
} from 'lucide-react'

interface Event {
  id: number
  title: string
  description?: string
  type?: string
  startDate?: string
  endDate?: string
  location?: string
  registeredCount?: number
  maxParticipants?: number
  prizePool?: string
  teamSize?: string
  topic?: string
  featured?: boolean
}

function fetchEvents(type?: string) {
  const q = new URLSearchParams()
  if (type) q.set('type', type)
  q.set('size', '50')
  return api.get<ApiResponse<{ content: Event[] }>>(`/events?${q}`).then((r) => r.data.data.content)
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
        <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
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

function EventCard({ e, onRegister }: { e: Event; onRegister: (id: number) => void }) {
  return (
    <Card className={e.featured ? 'ring-2 ring-amber-400/50' : ''}>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant={eventTypeBadge(e.type)}>{e.type}</Badge>
          {e.featured && <Badge variant="warning">Featured</Badge>}
          {e.topic && <Badge>{e.topic}</Badge>}
        </div>
        <h3 className="font-semibold text-lg mt-2 dark:text-white">{e.title}</h3>
        {e.prizePool && (
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-1">Prize Pool: {e.prizePool}</p>
        )}
        {e.teamSize && <p className="text-xs text-slate-500">Team Size: {e.teamSize}</p>}
        <p className="text-sm text-slate-500 mt-1">
          {e.location} · {e.registeredCount ?? 0} registered
          {e.maxParticipants ? ` / ${e.maxParticipants}` : ''}
        </p>
        {e.startDate && (
          <p className="text-xs text-slate-400 mt-1">
            <Calendar className="w-3 h-3 inline mr-1" />
            {new Date(e.startDate).toLocaleDateString()}
          </p>
        )}
        <p className="mt-3 text-sm dark:text-slate-300 line-clamp-3">{e.description}</p>
        <Button size="sm" className="mt-4" onClick={() => onRegister(e.id)}>
          Register
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ParticipatePage() {
  const authed = useAuthStore((s) => s.isAuthenticated())
  const [teamName, setTeamName] = useState('')
  const [forumMsg, setForumMsg] = useState('')
  const [xp, setXp] = useState(890)

  const { data: all = [], refetch } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
  })

  const hackathons = useMemo(() => all.filter((e) => e.type === 'HACKATHON'), [all])
  const contests = useMemo(() => all.filter((e) => e.type === 'CONTEST'), [all])
  const workshops = useMemo(() => all.filter((e) => e.type === 'WORKSHOP'), [all])
  const seminars = useMemo(
    () => all.filter((e) => e.type === 'SEMINAR' || e.type === 'WEBINAR'),
    [all]
  )
  const featured = all.filter((e) => e.featured)

  const register = async (id: number) => {
    if (!authed) return toast.error('Login to register')
    await api.post(`/events/${id}/register`)
    toast.success('Registered!')
    setXp((x) => x + 200)
    refetch()
  }

  const createTeam = () => {
    if (!authed) return toast.error('Login to create a team')
    if (!teamName.trim()) return toast.error('Enter team name')
    toast.success(`Team "${teamName}" created — invite members via link`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-10 rounded-2xl bg-gradient-to-br from-cyan-600 via-indigo-600 to-violet-600 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">Participate — Innovation Hub</h1>
        <p className="mt-2 max-w-2xl text-cyan-100">
          HackerRank + Devfolio energy: hackathons, contests, workshops, leaderboards, and recruiter visibility for top
          performers.
        </p>
        <div className="flex flex-wrap gap-4 mt-6 text-sm">
          <span className="px-3 py-1 rounded-full bg-white/20">⚡ {xp} XP</span>
          <span className="px-3 py-1 rounded-full bg-white/20">{all.length} events</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {['hackathons', 'contests', 'seminars', 'teams', 'leaderboard', 'recruiters'].map((s) => (
            <a key={s} href={`#${s}`} className="text-xs px-3 py-1 rounded-full bg-white/20 hover:bg-white/30">
              {s}
            </a>
          ))}
        </div>
      </div>

      <Section id="hackathons" icon={Flame} title="Hackathons" subtitle="Team registrations, prizes & problem statements">
        <div className="grid md:grid-cols-2 gap-4">
          {(hackathons.length ? hackathons : featured).map((e) => (
            <EventCard key={e.id} e={e} onRegister={register} />
          ))}
        </div>
        {!hackathons.length && (
          <p className="text-slate-500 text-sm">Restart backend to seed events, or register from featured list above.</p>
        )}
      </Section>

      <Section id="contests" icon={Zap} title="Coding Contests" subtitle="Weekly & monthly timed rounds with live rankings">
        <div className="grid md:grid-cols-2 gap-4">
          {contests.map((e) => (
            <EventCard key={e.id} e={e} onRegister={register} />
          ))}
        </div>
        <Card className="mt-4 border-dashed">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-medium dark:text-white">Live Contest Timer</p>
              <p className="text-sm text-slate-500">90:00 remaining (demo)</p>
            </div>
            <Button variant="secondary" onClick={() => toast('Contest lobby opening...', { icon: '⏱️' })}>
              Enter Lobby
            </Button>
          </CardContent>
        </Card>
      </Section>

      <Section id="seminars" icon={Mic} title="Seminars & Webinars" subtitle="AI, Cloud, Web3, Cybersecurity, DevOps">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {seminars.map((e) => (
            <EventCard key={e.id} e={e} onRegister={register} />
          ))}
        </div>
      </Section>

      <Section id="workshops" icon={Video} title="Workshops" subtitle="Hands-on React, Spring Boot, Docker & AI">
        <div className="grid md:grid-cols-2 gap-4">
          {workshops.map((e) => (
            <EventCard key={e.id} e={e} onRegister={register} />
          ))}
        </div>
      </Section>

      <Section id="projects" icon={Github} title="Project Competitions" subtitle="Submit GitHub repos & presentations">
        <Card>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Showcase real projects for Nina HR and sponsors. Top submissions get featured profiles.
            </p>
            <Input placeholder="GitHub repository URL" className="mb-2" />
            <Input placeholder="Project title" className="mb-2" />
            <Button onClick={() => toast.success('Project submitted for review')}>Submit Project</Button>
          </CardContent>
        </Card>
        {contests.filter((e) => e.title?.includes('Project')).map((e) => (
          <div key={e.id} className="mt-4">
            <EventCard e={e} onRegister={register} />
          </div>
        ))}
      </Section>

      <Section id="teams" icon={Users} title="Team Formation System" subtitle="Create teams, join teams, invite members">
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <h3 className="font-medium dark:text-white mb-2">Create Team</h3>
              <Input placeholder="Team name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
              <Button className="mt-3" onClick={createTeam}>
                Create & Invite
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-medium dark:text-white mb-2">Join Open Teams</h3>
              {['Code Warriors', 'AI Pioneers', 'Block Builders'].map((t) => (
                <div key={t} className="flex justify-between items-center py-2 border-b dark:border-slate-800 last:border-0">
                  <span className="text-sm dark:text-slate-300">{t}</span>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Joined ${t}`)}>
                    Join
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="leaderboard" icon={Trophy} title="Live Leaderboards" subtitle="Contest ranks & hackathon winners">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b dark:border-slate-800">
                <th className="py-2">Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              {LIVE_LEADERBOARD.map((row) => (
                <tr key={row.name} className="border-b dark:border-slate-800">
                  <td className="py-3 font-bold text-amber-500">#{row.rank}</td>
                  <td className="font-medium dark:text-white">{row.name}</td>
                  <td>{row.score}</td>
                  <td>{row.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="rewards" icon={Award} title="Certificates & Rewards">
        <div className="flex flex-wrap gap-2">
          {['Participation Certificate', 'Winner Badge', 'Internship Fast-Track', 'Swag Pack'].map((r) => (
            <Badge key={r} variant="success">
              {r}
            </Badge>
          ))}
        </div>
      </Section>

      <Section id="calendar" icon={Calendar} title="Event Calendar" subtitle="Upcoming events & deadlines">
        <div className="flex flex-wrap gap-3 mb-4">
          {EVENT_CALENDAR_LEGEND.map((l) => (
            <span key={l.label} className="flex items-center gap-2 text-xs">
              <span className={`w-3 h-3 rounded-full ${l.color}`} /> {l.label}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          {all.slice(0, 8).map((e) => (
            <div key={e.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
              <div>
                <p className="font-medium text-sm dark:text-white">{e.title}</p>
                <p className="text-xs text-slate-500">{e.type} · {e.location}</p>
              </div>
              <p className="text-xs text-indigo-600">
                {e.startDate ? new Date(e.startDate).toLocaleDateString() : 'TBD'}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="forums" icon={MessageSquare} title="Discussion Forums" subtitle="Team chat, doubts & networking">
        <Card>
          <CardContent>
            <Input
              placeholder="Ask a question or share an idea..."
              value={forumMsg}
              onChange={(e) => setForumMsg(e.target.value)}
            />
            <Button className="mt-3" size="sm" onClick={() => toast.success('Posted to forum (demo)')}>
              Post
            </Button>
            <div className="mt-4 space-y-2 text-sm">
              <p className="dark:text-slate-300">
                <strong>Arjun:</strong> Best stack for hackathon API?
              </p>
              <p className="dark:text-slate-300">
                <strong>Priya:</strong> Spring Boot + React works great for Nina events.
              </p>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section id="streaming" icon={Radio} title="Live Streaming" subtitle="Seminars, workshops & coding events">
        <Card className="border-red-200 dark:border-red-900">
          <CardContent className="flex items-center gap-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <div>
              <p className="font-medium dark:text-white">Live: DevOps Pipeline Build</p>
              <p className="text-sm text-slate-500">342 watching</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => toast('Opening stream...', { icon: '📺' })}>
              Watch Live
            </Button>
          </CardContent>
        </Card>
      </Section>

      <Section id="analytics" icon={Sparkles} title="Event Analytics">
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <p className="text-sm text-slate-500">Total participants</p>
              <p className="text-2xl font-bold text-cyan-600">
                {all.reduce((a, e) => a + (e.registeredCount ?? 0), 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm text-slate-500">Registrations (you)</p>
              <p className="text-2xl font-bold text-cyan-600">{authed ? '—' : 'Login'}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm text-slate-500">Active events</p>
              <p className="text-2xl font-bold text-cyan-600">{all.length}</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="sponsors" icon={Star} title="Sponsor Section">
        <div className="flex flex-wrap gap-4">
          {SPONSORS.map((s) => (
            <div key={s} className="px-6 py-4 rounded-xl border dark:border-slate-800 font-semibold text-slate-600 dark:text-slate-300">
              {s}
            </div>
          ))}
        </div>
      </Section>

      <Section id="innovation" icon={Flame} title="Innovation Challenges">
        <div className="grid md:grid-cols-3 gap-4">
          {INNOVATION_CHALLENGES.map((c) => (
            <Card key={c.title}>
              <CardContent>
                <h3 className="font-medium dark:text-white">{c.title}</h3>
                <p className="text-amber-600 font-medium mt-1">{c.prize}</p>
                <p className="text-xs text-slate-500">Deadline: {c.deadline}</p>
                <Button size="sm" className="mt-3" onClick={() => toast.success('Challenge accepted!')}>
                  Join Challenge
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {all
            .filter((e) => e.title?.includes('Blockchain') || e.title?.includes('AI'))
            .map((e) => (
              <EventCard key={e.id} e={e} onRegister={register} />
            ))}
        </div>
      </Section>

      <Section id="recruiters" icon={Star} title="Recruiter Visibility" subtitle="Top performers get HR attention">
        <Card className="border-indigo-200 dark:border-indigo-800">
          <CardContent>
            <h3 className="font-semibold dark:text-white">Featured Profiles</h3>
            <p className="text-sm text-slate-500 mt-1">
              Rank in top 10 on leaderboards or win hackathons for direct Nina HR visibility and interview fast-track.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mt-4">
              {LIVE_LEADERBOARD.slice(0, 3).map((p) => (
                <div key={p.name} className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-center">
                  <p className="font-medium dark:text-white">{p.name}</p>
                  <Badge variant="warning" className="mt-1">
                    HR Visible
                  </Badge>
                </div>
              ))}
            </div>
            <Link to="/jobs" className="inline-block mt-4 text-sm text-indigo-600">
              View open Nina roles →
            </Link>
          </CardContent>
        </Card>
      </Section>

      <Section id="missions" icon={Trophy} title="Career Missions & Streaks">
        <Card>
          <CardContent>
            <h3 className="font-semibold dark:text-white">Earn: {CAREER_MISSION_PARTICIPATE.reward}</h3>
            <ul className="mt-3 space-y-2">
              {CAREER_MISSION_PARTICIPATE.tasks.map((t) => (
                <li key={t} className="text-sm flex items-center gap-2 dark:text-slate-300">
                  <span className="text-emerald-500">✔</span> {t}
                </li>
              ))}
            </ul>
            <Link to="/prepare" className="inline-block mt-4 text-sm text-indigo-600">
              Complete Prepare missions too →
            </Link>
          </CardContent>
        </Card>
      </Section>

      <Section id="all-events" icon={Calendar} title="All Events">
        <div className="grid md:grid-cols-2 gap-4">
          {all.map((e) => (
            <EventCard key={e.id} e={e} onRegister={register} />
          ))}
        </div>
      </Section>
    </div>
  )
}
