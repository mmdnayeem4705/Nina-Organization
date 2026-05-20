import { useQuery, useMutation } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import toast from 'react-hot-toast'

interface User {
  id: number
  email: string
  firstName?: string
  lastName?: string
  role: string
  banned: boolean
}

export default function AdminUsersPage() {
  const { data, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: User[] }>>('/admin/users?size=50')
      return res.data.data.content
    },
  })

  const ban = useMutation({
    mutationFn: ({ id, banned }: { id: number; banned: boolean }) => api.patch(`/admin/users/${id}/ban`, { banned }),
    onSuccess: () => { toast.success('Updated'); refetch() },
  })

  const promote = useMutation({
    mutationFn: (id: number) => api.patch(`/admin/users/${id}/promote-hr`),
    onSuccess: () => { toast.success('Promoted to HR'); refetch() },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">User Management</h1>
      <div className="space-y-3">
        {data?.map((u) => (
          <Card key={u.id}>
            <CardContent className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="font-medium dark:text-white">{u.firstName} {u.lastName}</p>
                <p className="text-sm text-slate-500">{u.email}</p>
              </div>
              <Badge variant="info">{u.role.replace('ROLE_', '')}</Badge>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => promote.mutate(u.id)}>Make HR</Button>
                <Button size="sm" variant="danger" onClick={() => ban.mutate({ id: u.id, banned: !u.banned })}>
                  {u.banned ? 'Unban' : 'Ban'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


