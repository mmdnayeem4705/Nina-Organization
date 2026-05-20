import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { Button } from '@/components/ui/Button'
import { Briefcase, Moon, Sun, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const seekerLinks = [
  { to: '/', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/internships', label: 'Internships' },
  { to: '/prepare', label: 'Prepare' },
  { to: '/participate', label: 'Participate' },
]

export function Navbar() {
  const { isAuthenticated, role, logout, firstName } = useAuthStore()
  const { dark, toggle } = useThemeStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const authed = isAuthenticated()

  const dashboardPath =
    role === 'ROLE_ADMIN' ? '/admin' : role === 'ROLE_HR' ? '/hr' : '/tracker'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg">
      <motion.div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4" layout>
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Briefcase className="h-7 w-7" />
          Nina Organization
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {(!authed || role === 'ROLE_JOBSEEKER') &&
            seekerLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300">
                {l.label}
              </Link>
            ))}
        </nav>

        <motion.div className="flex items-center gap-3">
          <button type="button" onClick={toggle} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {authed ? (
            <>
              <span className="hidden sm:inline text-sm text-slate-600 dark:text-slate-400">
                Hi, {firstName || 'User'}
              </span>
              <Button size="sm" onClick={() => navigate(dashboardPath)}>Dashboard</Button>
              <Button size="sm" variant="outline" onClick={() => { logout(); navigate('/') }}>Logout</Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => navigate('/login')}>Login</Button>
              <Button size="sm" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
          <button type="button" className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </motion.div>
      </motion.div>

      {open && (
        <div className="md:hidden border-b bg-white dark:bg-slate-950 p-4 flex flex-col gap-2">
          {(!authed || role === 'ROLE_JOBSEEKER') &&
            seekerLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2">{l.label}</Link>
            ))}
        </div>
      )}
    </header>
  )
}
