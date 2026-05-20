import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Job } from '@/components/jobs/JobCard'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function JobDetailPage() {
  const { id } = useParams()
  const authed = useAuthStore((s) => s.isAuthenticated())

  const { data: job } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Job>>(`/jobs/${id}`)
      return res.data.data
    },
  })

  const apply = useMutation({
    mutationFn: () => api.post('/applications', { jobId: Number(id), resumeUrl: 'uploaded-resume.pdf' }),
    onSuccess: () => toast.success('Application submitted!'),
    onError: () => toast.error('Apply failed - login required'),
  })

  if (!job) return <p className="p-8">Loading...</p>

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardContent>
          <h1 className="text-3xl font-bold dark:text-white">{job.title}</h1>
          <p className="text-slate-500 mt-2">{job.roleTitle} · {job.domain} · {job.location}</p>
          <p className="mt-6 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{job.description}</p>
          {authed && <Button className="mt-6" onClick={() => apply.mutate()} disabled={apply.isPending}>Apply Now</Button>}
          {!authed && <p className="mt-4 text-indigo-600">Login to apply</p>}
        </CardContent>
      </Card>
    </div>
  )
}
