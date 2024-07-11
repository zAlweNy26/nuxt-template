import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'border-transparent bg-primary text-primary-foreground shadow',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        error: 'border-transparent bg-error text-error-foreground shadow',
        warning: 'border-transparent bg-warning text-warning-foreground shadow80',
        info: 'border-transparent bg-info text-info-foreground shadow',
        success: 'border-transparent bg-success text-success-foreground shadow',
        outline: 'text-foreground',
      },
      size: {
        xs: 'px-1.5 py-0.5 h-4 text-2xs',
        sm: 'px-2.5 py-1.5 h-5 text-xs',
        md: 'px-3 py-2 h-6 text-sm',
        lg: 'px-4 py-3 h-7 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm'
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
