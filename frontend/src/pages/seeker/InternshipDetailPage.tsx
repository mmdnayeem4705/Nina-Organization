import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Internship } from '@/types/internship'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Flame,
  IndianRupee,
  Linkedin,
  MapPin,
  Target,
  User,
} from 'lucide-react'

const levelInfo: Record<string, string> = {
  BEGINNER: 'Easy tasks — ideal for students starting out',
  INTERMEDIATE: 'Moderate complexity — some prior experience',
  ADVANCED: 'Real production work — high ownership',
}

export default function InternshipDetailPage() {
  const { id } = useParams()
  const authed = useAuthStore((s) => s.isAuthenticated())

  const { data: internship, isLoading } = useQuery({
    queryKey: ['internship', id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Internship>>(`/internships/${id}`)
      return res.data.data
    },
    enabled: !!id,
  })

  const apply = async () => {
    if (!authed) return toast.error('Login required')
    if (!internship) return
    await api.post('/applications', { internshipId: internship.id })
    toast.success('Application submitted')
  }

  if (isLoading) return <p className="p-8 text-center text-slate-500">Loading...</p>
  if (!internship) return <p className="p-8 text-center">Internship not found</p>

  const i = internship

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/internships" className="inline-flex items-center gap-2 text-sm text-indigo-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to internships
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {i.featured && <Badge variant="warning">Featured</Badge>}
        {i.liveProject && <Badge variant="info">Live Project</Badge>}
        {i.ppoAvailable && (
          <Badge variant="danger">
            <Flame className="w-3 h-3 inline mr-1" /> PPO Opportunity Available
          </Badge>
        )}
        {i.level && <Badge>{i.level}</Badge>}
        {i.certificateProvided && <Badge variant="success">Certificate</Badge>}
      </div>

      <h1 className="text-3xl font-bold dark:text-white">{i.title}</h1>
      <p className="text-slate-500 mt-1">
        {i.domain} {i.category ? `· ${i.category}` : ''}
      </p>

      <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600 dark:text-slate-400">
        {i.location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {i.location}
          </span>
        )}
        {i.duration && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {i.duration}
          </span>
        )}
        {i.stipendLabel && (
          <span className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" /> {i.stipendLabel}
          </span>
        )}
      </div>

      {i.matchScore != null && (
        <Card className="mt-6 border-indigo-200 dark:border-indigo-800">
          <CardContent className="flex items-center gap-3">
            <Target className="w-8 h-8 text-indigo-500" />
            <div>
              <p className="text-2xl font-bold text-indigo-600">Your Match Score: {i.matchScore}%</p>
              <p className="text-sm text-slate-500">Based on skills, resume, courses & applications</p>
            </div>
          </CardContent>
        </Card>
      )}

      {i.level && (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          <strong>Level:</strong> {levelInfo[i.level] ?? i.level}
        </p>
      )}

      <p className="mt-6 dark:text-slate-300 leading-relaxed">{i.description}</p>

      {i.requiredSkills && i.requiredSkills.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold dark:text-white mb-3">Required Skills</h2>
          <ul className="flex flex-wrap gap-2">
            {i.requiredSkills.map((s) => (
              <li
                key={s}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 text-sm"
              >
                <CheckCircle2 className="w-4 h-4" /> {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {i.tasks && i.tasks.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold dark:text-white mb-3">Internship Tasks Preview</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            {i.tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {i.mentorName && (
        <Card className="mt-8">
          <CardContent>
            <h2 className="text-lg font-semibold dark:text-white mb-3 flex items-center gap-2">
              <User className="w-5 h-5" /> Mentored By
            </h2>
            <p className="font-medium dark:text-white">{i.mentorName}</p>
            <p className="text-slate-500">{i.mentorRole}</p>
            <p className="text-sm text-indigo-600 mt-1">{i.mentorExperience}</p>
            {i.mentorLinkedIn && (
              <a
                href={i.mentorLinkedIn}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-indigo-600 mt-2"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            )}
          </CardContent>
        </Card>
      )}

      {i.progressWeeks && i.progressWeeks.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold dark:text-white mb-3">Progress Tracker</h2>
          <div className="space-y-2">
            {i.progressWeeks.map((w) => (
              <div key={w} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-sm dark:text-white">
                {w}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 flex gap-3">
        <Button size="lg" onClick={apply}>
          Apply Now
        </Button>
        <Button size="lg" variant="outline" onClick={() => toast('Complete a mini project after apply', { icon: '🧪' })}>
          Take Assessment
        </Button>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        {i.openings} openings · {i.appliedCount} applied
        {i.deadline ? ` · Deadline ${i.deadline}` : ''}
      </p>
    </div>
  )
}
