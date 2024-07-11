import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm active:scale-95 transition-all whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/80',
        error: 'bg-error text-error-foreground shadow-sm hover:bg-error/80',
        warning: 'bg-warning text-warning-foreground shadow-sm hover:bg-warning/80',
        success: 'bg-success text-success-foreground shadow-sm hover:bg-success/80',
        info: 'bg-info text-info-foreground shadow-sm hover:bg-info/80',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 rounded px-2 text-xs py-1',
        sm: 'h-8 px-3 py-1.5',
        md: 'h-9 rounded-md px-4 text-base py-2',
        lg: 'h-10 rounded-lg px-8 text-lg py-4'
      },
      square: {
        xs: 'w-7 p-0',
        sm: 'w-8 p-0',
        md: 'w-9 p-0',
        lg: 'w-10 p-0',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
