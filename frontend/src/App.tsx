import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@/components/layout/Navbar'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { useThemeStore } from '@/store/themeStore'

import HomePage from '@/pages/seeker/HomePage'
import JobsPage from '@/pages/seeker/JobsPage'
import JobDetailPage from '@/pages/seeker/JobDetailPage'
import InternshipsPage from '@/pages/seeker/InternshipsPage'
import InternshipDetailPage from '@/pages/seeker/InternshipDetailPage'
import PreparePage from '@/pages/seeker/PreparePage'
import ParticipatePage from '@/pages/seeker/ParticipatePage'
import ApplicationTrackerPage from '@/pages/seeker/ApplicationTrackerPage'
import ProfilePage from '@/pages/seeker/ProfilePage'
import NotificationsPage from '@/pages/seeker/NotificationsPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import HrDashboard from '@/pages/hr/HrDashboard'
import HrJobsPage from '@/pages/hr/HrJobsPage'
import HrApplicantsPage from '@/pages/hr/HrApplicantsPage'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminUsersPage from '@/pages/admin/AdminUsersPage'

const queryClient = new QueryClient()

const hrNav = [
  { to: '/hr', label: 'Dashboard' },
  { to: '/hr/jobs', label: 'Manage Jobs' },
  { to: '/hr/applicants', label: 'Applicants' },
  { to: '/hr/events', label: 'Events' },
]

const adminNav = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/hr', label: 'HR Management' },
  { to: '/admin/analytics', label: 'Analytics' },
]

function HrEventsPlaceholder() {
  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white">Events Management</h1>
      <p className="text-slate-500 mt-2">Create hackathons and workshops from HR panel (API ready).</p>
    </div>
  )
}

function AdminHrPlaceholder() {
  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white">HR Management</h1>
      <p className="text-slate-500 mt-2">Promote users to HR from User Management.</p>
    </div>
  )
}

function AdminAnalyticsPlaceholder() {
  return <AdminDashboard />
}

function AppShell() {
  useRealtimeNotifications()
  const dark = useThemeStore((s) => s.dark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/internships/:id" element={<InternshipDetailPage />} />
        <Route path="/prepare" element={<PreparePage />} />
        <Route path="/participate" element={<ParticipatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/tracker" element={<ProtectedRoute roles={['ROLE_JOBSEEKER']}><ApplicationTrackerPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

        <Route path="/hr" element={<ProtectedRoute roles={['ROLE_HR', 'ROLE_ADMIN']}><DashboardLayout items={hrNav} title="HR Portal" /></ProtectedRoute>}>
          <Route index element={<HrDashboard />} />
          <Route path="jobs" element={<HrJobsPage />} />
          <Route path="applicants" element={<HrApplicantsPage />} />
          <Route path="events" element={<HrEventsPlaceholder />} />
        </Route>

        <Route path="/admin" element={<ProtectedRoute roles={['ROLE_ADMIN']}><DashboardLayout items={adminNav} title="Admin" /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="hr" element={<AdminHrPlaceholder />} />
          <Route path="analytics" element={<AdminAnalyticsPlaceholder />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
