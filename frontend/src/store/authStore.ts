import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = 'ROLE_JOBSEEKER' | 'ROLE_HR' | 'ROLE_ADMIN'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  email: string | null
  firstName: string | null
  lastName: string | null
  role: Role | null
  userId: number | null
  setAuth: (data: {
    accessToken: string
    refreshToken: string
    email: string
    firstName?: string
    lastName?: string
    role: Role
    userId: number
  }) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null,
      userId: null,
      setAuth: (data) => set({ ...data }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          email: null,
          firstName: null,
          lastName: null,
          role: null,
          userId: null,
        }),
      isAuthenticated: () => !!get().accessToken,
    }),
    { name: 'nina-auth' }
  )
)
