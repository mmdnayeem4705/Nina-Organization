import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { ApiResponse } from '@/services/api'
import { useAuthStore, Role } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

interface AuthData {
  accessToken: string
  refreshToken: string
  email: string
  firstName?: string
  lastName?: string
  role: Role
  userId: number
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post<ApiResponse<AuthData>>('/auth/login', { email, password })
      setAuth(data.data)
      toast.success('Welcome back!')
      const role = data.data.role
      navigate(role === 'ROLE_ADMIN' ? '/admin' : role === 'ROLE_HR' ? '/hr' : '/')
    } catch {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <Card>
          <CardContent>
            <CardTitle className="mb-6 text-2xl text-center">Sign in to Nina</CardTitle>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-slate-500">
              <Link to="/forgot-password" className="text-indigo-600 hover:underline">Forgot password?</Link>
            </p>
            <p className="mt-2 text-center text-sm">
              No account? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Register</Link>
            </p>
            <div className="mt-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <p>Demo: seeker@nina.com / seeker123</p>
              <p>HR: hr@nina.com / hr123456</p>
              <p>Admin: admin@nina.com / admin123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
