import { useQuery, useMutation } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import toast from 'react-hot-toast'

interface App {
  id: number
  applicantName?: string
  applicantEmail?: string
  jobTitle?: string
  status: string
}

const nextStatus: Record<string, string> = {
  APPLIED: 'UNDER_REVIEW',
  UNDER_REVIEW: 'RESUME_SHORTLISTED',
  RESUME_SHORTLISTED: 'ASSESSMENT_ROUND',
  ASSESSMENT_ROUND: 'TECHNICAL_INTERVIEW',
  TECHNICAL_INTERVIEW: 'HR_INTERVIEW',
  HR_INTERVIEW: 'SELECTED',
}

export default function HrApplicantsPage() {
  const { data, refetch } = useQuery({
    queryKey: ['hr-applications'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: App[] }>>('/hr/applications?size=50')
      return res.data.data.content
    },
  })

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      api.patch(`/hr/applications/${id}/status`, { status }),
    onSuccess: () => { toast.success('Status updated'); refetch() },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Applicant Management</h1>
      <div className="space-y-3">
        {data?.map((app) => (
          <Card key={app.id}>
            <CardContent className="flex flex-wrap justify-between gap-4 items-center">
              <div>
                <p className="font-medium dark:text-white">{app.applicantName}</p>
                <p className="text-sm text-slate-500">{app.applicantEmail} · {app.jobTitle}</p>
              </div>
              <Badge>{app.status.replace(/_/g, ' ')}</Badge>
              <div className="flex gap-2">
                {nextStatus[app.status] && (
                  <Button size="sm" onClick={() => updateStatus.mutate({ id: app.id, status: nextStatus[app.status] })}>
                    Move Next
                  </Button>
                )}
                <Button size="sm" variant="danger" onClick={() => updateStatus.mutate({ id: app.id, status: 'REJECTED' })}>Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

