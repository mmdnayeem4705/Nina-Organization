import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { ApiResponse } from '@/services/api'
import { useAuthStore, Role } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post<ApiResponse<{
        accessToken: string; refreshToken: string; email: string
        firstName?: string; lastName?: string; role: Role; userId: number
      }>>('/auth/register', { ...form, role: 'ROLE_JOBSEEKER' })
      setAuth(data.data)
      toast.success('Account created!')
      navigate('/')
    } catch {
      toast.error('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent>
          <CardTitle className="mb-6 text-2xl text-center">Join Nina Organization</CardTitle>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
            <Input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Input type="password" placeholder="Password (min 6)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</Button>
          </form>
          <p className="mt-4 text-center text-sm">Have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
        </CardContent>
      </Card>
    </div>
  )
}
