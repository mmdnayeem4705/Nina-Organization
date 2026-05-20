import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import toast from 'react-hot-toast'

export default function HrJobsPage() {
  const [showForm, setShowForm] = useState(false)
  const [job, setJob] = useState({ title: '', description: '', roleTitle: '', domain: '', location: '', experience: '', workMode: 'HYBRID', durationMonths: 3 })

  const { data, refetch } = useQuery({
    queryKey: ['jobs-hr'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: { id: number; title: string }[] }>>('/jobs?size=50')
      return res.data.data.content
    },
  })

  const create = useMutation({
    mutationFn: () => api.post('/hr/jobs', job),
    onSuccess: () => { toast.success('Job created'); setShowForm(false); refetch() },
  })

  const remove = async (id: number) => {
    await api.delete(`/hr/jobs/${id}`)
    toast.success('Job removed')
    refetch()
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Manage Jobs</h1>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Create Job'}</Button>
      </div>
      {showForm && (
        <Card className="mb-6"><CardContent className="grid md:grid-cols-2 gap-3">
          <Input placeholder="Title" value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} />
          <Input placeholder="Role" value={job.roleTitle} onChange={(e) => setJob({ ...job, roleTitle: e.target.value })} />
          <Input placeholder="Domain" value={job.domain} onChange={(e) => setJob({ ...job, domain: e.target.value })} />
          <Input placeholder="Location" value={job.location} onChange={(e) => setJob({ ...job, location: e.target.value })} />
          <textarea className="md:col-span-2 rounded-lg border p-3 dark:bg-slate-900" placeholder="Description" value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} rows={3} />
          <Button onClick={() => create.mutate()}>Publish</Button>
        </CardContent></Card>
      )}
      <div className="space-y-3">
        {data?.map((j) => (
          <Card key={j.id}><CardContent className="flex justify-between items-center">
            <span className="font-medium dark:text-white">{j.title}</span>
            <Button size="sm" variant="danger" onClick={() => remove(j.id)}>Delete</Button>
          </CardContent></Card>
        ))}
      </div>
    </div>
  )
}

