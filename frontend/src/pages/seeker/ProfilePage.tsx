import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { data: profile, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ firstName?: string; lastName?: string; email: string; phone?: string }>>('/users/me')
      return res.data.data
    },
  })
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' })
  const [resumeUrl, setResumeUrl] = useState('')

  useEffect(() => {
    if (profile) {
      setForm({ firstName: profile.firstName || '', lastName: profile.lastName || '', phone: profile.phone || '' })
    }
  }, [profile])

  const update = useMutation({
    mutationFn: () => api.put('/users/me', form),
    onSuccess: () => { toast.success('Profile updated'); refetch() },
  })

  const uploadResume = useMutation({
    mutationFn: () => api.post('/users/resume', { fileName: 'resume.pdf', fileUrl: resumeUrl || 'https://example.com/resume.pdf' }),
    onSuccess: () => toast.success('Resume uploaded'),
  })

  const analyze = useMutation({
    mutationFn: () => api.post<ApiResponse<{ atsScore: number; feedback: string }>>('/users/resume/analyze', {}),
    onSuccess: (res) => toast.success(`ATS Score: ${res.data.data.atsScore}%`),
  })

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold dark:text-white">Profile</h1>
      <Card>
        <CardContent>
          <CardTitle>Personal Info</CardTitle>
          <div className="space-y-3 mt-4">
            <Input placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            <Input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <p className="text-sm text-slate-500">Email: {profile?.email}</p>
            <Button onClick={() => update.mutate()}>Save</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardTitle>Resume & ATS</CardTitle>
          <Input className="mt-4" placeholder="Resume URL" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />
          <div className="flex gap-2 mt-4">
            <Button onClick={() => uploadResume.mutate()}>Upload Resume</Button>
            <Button variant="outline" onClick={() => analyze.mutate()}>AI ATS Check</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
