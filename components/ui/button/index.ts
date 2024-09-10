import { type VariantProps, cva } from 'class-variance-authority'
import type { ClassValue } from 'clsx'
import type { PrimitiveProps } from 'radix-vue'

export { default as Button } from './Button.vue'

export interface ButtonProps extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  square?: boolean
  class?: ClassValue
}

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95 disabled:pointer-events-none disabled:opacity-50',
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
        sm: 'h-7 rounded px-2 py-1 text-xs',
        md: 'h-8 px-3 py-1.5',
        lg: 'h-9 rounded-md px-4 py-2 text-base',
        xl: 'h-10 rounded-lg px-8 py-4 text-lg',
      },
      square: {
        sm: 'w-7 p-0',
        md: 'w-8 p-0',
        lg: 'w-9 p-0',
        xl: 'w-10 p-0',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
