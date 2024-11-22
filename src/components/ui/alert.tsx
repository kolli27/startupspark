import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AlertProps {
  variant?: 'default' | 'destructive'
  children: ReactNode
  className?: string
}

export function Alert({
  variant = 'default',
  children,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-lg border p-4',
        {
          'bg-red-50 border-red-200 text-red-700': variant === 'destructive',
          'bg-gray-50 border-gray-200 text-gray-700': variant === 'default',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
