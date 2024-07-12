
import { type VariantProps, cva } from 'class-variance-authority'

export { default as NumericInput } from './NumericInput.vue'

export const inputVariants = cva(
    'w-full rounded-md border border-input bg-transparent py-1 text-center transition-shadow placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            color: {
                primary: 'focus-visible:ring-primary',
                secondary: 'focus-visible:ring-secondary',
                success: 'focus-visible:ring-success',
                warning: 'focus-visible:ring-warning',
                error: 'focus-visible:ring-error',
                info: 'focus-visible:ring-info',
            },
            size: {
                xs: 'text-xs h-7 px-8 shadow',
                sm: 'text-sm h-8 px-9 shadow-sm',
                md: 'text-base h-9 px-10 shadow-sm',
                lg: 'text-lg h-10 px-11 shadow-md'
            }
        },
        defaultVariants: {
            color: 'primary',
            size: 'sm',
        },
    }
)

export type InputVariants = VariantProps<typeof inputVariants>