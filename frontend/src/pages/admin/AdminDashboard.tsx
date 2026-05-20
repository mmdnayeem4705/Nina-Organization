import { useQuery } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Card, CardContent } from '@/components/ui/Card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface Stats {
  totalUsers: number
  totalJobs: number
  totalApplications: number
  totalEvents: number
  jobSeekers: number
  hrUsers: number
  bannedUsers: number
  selectedCandidates: number
}

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Stats>>('/admin/stats')
      return res.data.data
    },
  })

  const pieData = stats ? [
    { name: 'Job Seekers', value: stats.jobSeekers },
    { name: 'HR', value: stats.hrUsers },
    { name: 'Selected', value: stats.selectedCandidates },
    { name: 'Banned', value: stats.bannedUsers },
  ] : []

  const cards = stats ? [
    { label: 'Total Users', value: stats.totalUsers },
    { label: 'Jobs', value: stats.totalJobs },
    { label: 'Applications', value: stats.totalApplications },
    { label: 'Events', value: stats.totalEvents },
  ] : []

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <Card key={c.label}><CardContent><p className="text-sm text-slate-500">{c.label}</p><p className="text-3xl font-bold text-indigo-600">{c.value}</p></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart><Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /><Legend /></PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

