import { Link } from 'react-router-dom'
import { Internship } from '@/types/internship'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MapPin, Clock, IndianRupee, Flame, Target } from 'lucide-react'

const levelLabel: Record<string, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
}

export function InternshipCard({
  internship,
  onApply,
  compact,
}: {
  internship: Internship
  onApply?: (id: number) => void
  compact?: boolean
}) {
  const i = internship
  return (
    <Card className="h-full hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
      <CardContent className="flex flex-col h-full">
        <div className="flex flex-wrap gap-2 mb-2">
          {i.featured && <Badge variant="warning">Featured</Badge>}
          {i.liveProject && <Badge variant="info">Live Project</Badge>}
          {i.ppoAvailable && (
            <Badge variant="danger" className="gap-1">
              <Flame className="w-3 h-3" /> PPO
            </Badge>
          )}
          {i.level && <Badge>{levelLabel[i.level] ?? i.level}</Badge>}
        </div>
        <h3 className="font-semibold text-lg dark:text-white">{i.title}</h3>
        <p className="text-sm text-slate-500 mt-1">{i.domain}{i.category ? ` · ${i.category}` : ''}</p>
        <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-600 dark:text-slate-400">
          {i.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {i.location}
            </span>
          )}
          {i.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {i.duration}
            </span>
          )}
          {i.stipendLabel && (
            <span className="flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5" /> {i.stipendLabel}
            </span>
          )}
        </div>
        {i.matchScore != null && (
          <p className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
            <Target className="w-4 h-4" /> Your Match Score: {i.matchScore}%
          </p>
        )}
        {!compact && i.requiredSkills && i.requiredSkills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {i.requiredSkills.slice(0, 4).map((s) => (
              <span key={s} className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                {s}
              </span>
            ))}
          </div>
        )}
        {!compact && i.mentorName && (
          <p className="mt-2 text-xs text-slate-500">
            Mentor: {i.mentorName} · {i.mentorRole}
          </p>
        )}
        {!compact && i.description && (
          <p className="mt-2 text-sm dark:text-slate-300 line-clamp-2 flex-1">{i.description}</p>
        )}
        <div className="flex gap-2 mt-4">
          <Link to={`/internships/${i.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {onApply && (
            <Button size="sm" className="flex-1" onClick={() => onApply(i.id)}>
              Apply Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
