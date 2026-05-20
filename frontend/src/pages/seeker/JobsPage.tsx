import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { JobCard, Job } from '@/components/jobs/JobCard'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function JobsPage() {
  const [filters, setFilters] = useState({ search: '', role: '', domain: '', location: '', workMode: '' })
  const authed = useAuthStore((s) => s.isAuthenticated())

  const { data, refetch } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([k, v]) => v && params.set(k, v))
      const res = await api.get<ApiResponse<{ content: Job[] }>>(`/jobs?${params}`)
      return res.data.data.content
    },
  })

  const handleSave = async (id: number) => {
    if (!authed) return toast.error('Login to save jobs')
    await api.post(`/jobs/${id}/save`)
    toast.success('Job saved')
    refetch()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Find Your Dream Job</h1>
      <div className="grid md:grid-cols-5 gap-3 mb-8 p-4 rounded-xl bg-slate-100 dark:bg-slate-900">
        <Input placeholder="Search..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <Input placeholder="Role" value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })} />
        <Input placeholder="Domain" value={filters.domain} onChange={(e) => setFilters({ ...filters, domain: e.target.value })} />
        <Input placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <select className="rounded-lg border px-3 dark:bg-slate-800" value={filters.workMode} onChange={(e) => setFilters({ ...filters, workMode: e.target.value })}>
          <option value="">Work mode</option>
          <option value="REMOTE">Remote</option>
          <option value="HYBRID">Hybrid</option>
          <option value="ONSITE">Onsite</option>
        </select>
      </div>
      <Button onClick={() => refetch()} className="mb-6">Search</Button>
      <div className="grid md:grid-cols-2 gap-4">
        {data?.map((job) => <JobCard key={job.id} job={job} onSave={authed ? handleSave : undefined} />)}
      </div>
    </div>
  )
}
