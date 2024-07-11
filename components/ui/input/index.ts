
import { type VariantProps, cva } from 'class-variance-authority'

export { default as InputBox } from './InputBox.vue'

export const inputVariants = cva(
    'flex w-full rounded-md border border-input px-2 py-1 bg-transparent transition-shadow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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
                xs: 'text-xs h-7 shadow',
                sm: 'text-sm h-8 shadow-sm',
                md: 'text-base h-9 shadow-sm',
                lg: 'text-lg h-10 shadow-md'
            }
        },
        defaultVariants: {
            color: 'primary',
            size: 'sm',
        },
    }
)

export type InputVariants = VariantProps<typeof inputVariants>