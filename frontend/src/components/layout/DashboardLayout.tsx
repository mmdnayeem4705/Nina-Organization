import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { cn } from '@/utils/cn'
import { Briefcase, LogOut, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavItem {
  to: string
  label: string
  icon?: React.ReactNode
}

export function DashboardLayout({ items, title }: { items: NavItem[]; title: string }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, firstName } = useAuthStore()
  const { dark, toggle } = useThemeStore()

  return (
    <motion.div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 md:flex md:flex-col">
        <div className="flex h-16 items-center gap-2 border-b px-6 font-bold text-indigo-600">
          <Briefcase className="h-6 w-6" />
          {title}
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                location.pathname === item.to
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-4 space-y-2">
          <p className="text-xs text-slate-500 px-3">{firstName}</p>
          <button type="button" onClick={toggle} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Toggle theme
          </button>
          <button
            type="button"
            onClick={() => { logout(); navigate('/') }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <Outlet />
      </main>
    </motion.div>
  )
}
