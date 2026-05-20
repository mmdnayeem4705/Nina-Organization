import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MapPin, Briefcase, IndianRupee } from 'lucide-react'

export interface Job {
  id: number
  title: string
  description?: string
  roleTitle?: string
  domain?: string
  location?: string
  salaryMin?: number
  salaryMax?: number
  experience?: string
  workMode?: string
  saved?: boolean
}

export function JobCard({ job, onSave }: { job: Job; onSave?: (id: number) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold text-lg dark:text-white">{job.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{job.roleTitle} · {job.domain}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {job.workMode && <Badge variant="info">{job.workMode}</Badge>}
              {job.experience && <Badge>{job.experience}</Badge>}
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600 dark:text-slate-400">
              {job.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>}
              {job.salaryMax != null && (
                <span className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />
                  {((job.salaryMin || 0) / 100000).toFixed(0)}-{(job.salaryMax / 100000).toFixed(0)} LPA
                </span>
              )}
            </div>
          </div>
          <Briefcase className="h-10 w-10 text-indigo-200 dark:text-indigo-800 shrink-0" />
        </div>
        <div className="flex gap-2 mt-4">
          <Link to={`/jobs/${job.id}`}><Button size="sm">View & Apply</Button></Link>
          {onSave && (
            <Button size="sm" variant="outline" onClick={() => onSave(job.id)}>
              {job.saved ? 'Saved' : 'Save'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
