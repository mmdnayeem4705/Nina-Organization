import { Navigate } from 'react-router-dom'
import { useAuthStore, Role } from '@/store/authStore'

export function ProtectedRoute({
  children,
  roles,
}: {
  children: React.ReactNode
  roles?: Role[]
}) {
  const { isAuthenticated, role } = useAuthStore()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (roles && role && !roles.includes(role)) {
    const redirect =
      role === 'ROLE_ADMIN' ? '/admin' : role === 'ROLE_HR' ? '/hr' : '/'
    return <Navigate to={redirect} replace />
  }

  return <>{children}</>
}
