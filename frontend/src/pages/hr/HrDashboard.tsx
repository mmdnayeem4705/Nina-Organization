import { useQuery } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function HrDashboard() {
  const { data: apps } = useQuery({
    queryKey: ['hr-apps'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: { status: string }[] }>>('/hr/applications?size=100')
      return res.data.data.content
    },
  })

  const chartData = ['APPLIED', 'UNDER_REVIEW', 'SELECTED', 'REJECTED'].map((s) => ({
    name: s.replace(/_/g, ' '),
    count: apps?.filter((a) => a.status === s).length || 0,
  }))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">HR Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {chartData.map((d) => (
          <Card key={d.name}><CardContent><p className="text-sm text-slate-500">{d.name}</p><p className="text-3xl font-bold text-indigo-600">{d.count}</p></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardContent>
          <CardTitle>Applications Overview</CardTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#6366f1" /></BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

