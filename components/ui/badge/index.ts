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
        warning: 'border-transparent bg-warning text-warning-foreground shadow',
        info: 'border-transparent bg-info text-info-foreground shadow',
        success: 'border-transparent bg-success text-success-foreground shadow',
        outline: 'text-foreground',
      },
      size: {
        xs: 'h-4 px-1.5 py-0.5 text-2xs',
        sm: 'h-5 px-2.5 py-1.5 text-xs',
        md: 'h-6 px-3 py-2 text-sm',
        lg: 'h-7 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm'
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
