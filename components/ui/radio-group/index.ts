import { type VariantProps, cva } from 'class-variance-authority'

export { default as RadioGroup } from './RadioGroup.vue'

export const radioVariants = cva(
  'aspect-square rounded-full border shadow transition-[border-width] focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border-primary text-primary',
        error: 'border-error text-error',
        warning: 'border-warning text-warning',
        success: 'border-success text-success',
        info: 'border-info text-info',
      },
      size: {
        xs: 'size-3 data-[state=checked]:border-4',
        sm: 'size-4 data-[state=checked]:border-[5px]',
        md: 'size-5 data-[state=checked]:border-[6px]',
        lg: 'size-6 data-[state=checked]:border-[7px]'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm'
    },
  },
)

export type RadioVariants = VariantProps<typeof radioVariants>