import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { getSupabase, isSupabaseRealtimeEnabled } from '@/lib/supabase'
import toast from 'react-hot-toast'

/** Supabase Realtime when configured; otherwise rely on Spring WebSocket (see useStomp). */
export function useRealtimeNotifications(onUpdate?: () => void) {
  const userId = useAuthStore((s) => s.userId)

  useEffect(() => {
    if (!userId || !isSupabaseRealtimeEnabled()) return

    const supabase = getSupabase()
    if (!supabase) return

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const row = payload.new as { title?: string; message?: string }
          toast(row.title || 'New notification', { icon: '🔔' })
          onUpdate?.()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, onUpdate])
}
