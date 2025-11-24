import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
}

const variantMap: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-brand-blue to-brand-indigo text-white shadow-card hover:shadow-lg',
  secondary:
    'bg-white text-brand-blue border border-brand-blue/30 hover:bg-brand-blue/5 dark:bg-slate-900 dark:text-white dark:border-white/10',
  ghost:
    'text-slate-600 hover:text-brand-blue hover:bg-brand-blue/10 dark:text-slate-300 dark:hover:text-white',
}

const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, icon, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'focus-ring inline-flex items-center gap-2 rounded-full font-medium transition',
          variantMap[variant],
          sizeMap[size],
          rest.disabled && 'opacity-60 cursor-not-allowed',
          className,
        )}
        {...rest}
      >
        {icon}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

