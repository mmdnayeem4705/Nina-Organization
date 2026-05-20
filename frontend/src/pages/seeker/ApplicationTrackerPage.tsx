import { useQuery } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  SELECTED: 'success',
  REJECTED: 'danger',
  APPLIED: 'info',
  UNDER_REVIEW: 'warning',
}

interface Application {
  id: number
  jobTitle?: string
  internshipTitle?: string
  status: string
  appliedAt?: string
}

export default function ApplicationTrackerPage() {
  const { data } = useQuery({
    queryKey: ['my-applications'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Application[]>>('/applications/my')
      return res.data.data
    },
  })

  const steps = ['APPLIED', 'UNDER_REVIEW', 'RESUME_SHORTLISTED', 'ASSESSMENT_ROUND', 'TECHNICAL_INTERVIEW', 'HR_INTERVIEW', 'SELECTED']

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Application Tracker</h1>
      <p className="text-slate-500 mb-8">Real-time status updates for your applications</p>
      <div className="space-y-4">
        {data?.map((app) => (
          <Card key={app.id}>
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold dark:text-white">{app.jobTitle || app.internshipTitle}</h3>
                  <p className="text-xs text-slate-500 mt-1">Applied {app.appliedAt?.slice(0, 10)}</p>
                </div>
                <Badge variant={statusVariant[app.status] || 'default'}>{app.status.replace(/_/g, ' ')}</Badge>
              </div>
              <div className="flex gap-1 mt-4 overflow-x-auto">
                {steps.map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full min-w-[40px] ${
                      steps.indexOf(s) <= steps.indexOf(app.status) ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                    title={s}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {!data?.length && <p className="text-slate-500">No applications yet. Browse jobs to apply!</p>}
      </div>
    </div>
  )
}
