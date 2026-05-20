import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '@/services/api'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/auth/forgot-password', { email })
    setSent(true)
    toast.success('If email exists, reset link sent')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent>
          <CardTitle className="mb-4">Forgot Password</CardTitle>
          {sent ? (
            <p className="text-slate-600">Check your email for reset instructions.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required />
              <Button type="submit" className="w-full">Send Reset Link</Button>
            </form>
          )}
          <Link to="/login" className="mt-4 block text-center text-sm text-indigo-600">Back to login</Link>
        </CardContent>
      </Card>
    </div>
  )
}
