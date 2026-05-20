import { useQuery } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Card, CardContent } from '@/components/ui/Card'

interface Notification {
  id: number
  title: string
  message?: string
  read: boolean
  createdAt?: string
}

export default function NotificationsPage() {
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: Notification[] }>>('/notifications')
      return res.data.data.content
    },
  })

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Notifications</h1>
      <div className="space-y-3">
        {data?.map((n) => (
          <Card key={n.id} className={n.read ? 'opacity-60' : ''}>
            <CardContent>
              <h3 className="font-medium dark:text-white">{n.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{n.message}</p>
              <p className="text-xs text-slate-400 mt-2">{n.createdAt?.slice(0, 16)}</p>
            </CardContent>
          </Card>
        ))}
        {!data?.length && <p className="text-slate-500">No notifications yet</p>}
      </div>
    </div>
  )
}
