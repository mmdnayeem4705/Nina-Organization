import { cn } from '@/utils/cn'
import { InputHTMLAttributes, forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
