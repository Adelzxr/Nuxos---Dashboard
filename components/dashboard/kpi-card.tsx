import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  accentColor?: 'purple' | 'blue' | 'cyan' | 'pink' | 'green'
}

const accentStyles = {
  purple: {
    gradient: 'from-violet-600 to-purple-600',
    glow: 'shadow-violet-500/20',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  blue: {
    gradient: 'from-blue-600 to-indigo-600',
    glow: 'shadow-blue-500/20',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  cyan: {
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'shadow-cyan-500/20',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  pink: {
    gradient: 'from-pink-500 to-rose-500',
    glow: 'shadow-pink-500/20',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
  green: {
    gradient: 'from-emerald-500 to-green-500',
    glow: 'shadow-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
}

export function KPICard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  accentColor = 'purple',
}: KPICardProps) {
  const styles = accentStyles[accentColor]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6',
        'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl',
        'border border-white/20 dark:border-gray-700/50',
        'shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
        styles.glow,
        className
      )}
    >
      {/* Gradient accent line */}
      <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', styles.gradient)} />
      
      {/* Decorative background glow */}
      <div className={cn('absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br', styles.gradient)} />
      
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <div className={cn('p-2 rounded-xl', styles.iconBg)}>
            <Icon className={cn('h-5 w-5', styles.iconColor)} />
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-2 mt-2">
              <span
                className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold',
                  trend.isPositive 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-red-500/10 text-red-600 dark:text-red-400'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
          
          {description && !trend && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

