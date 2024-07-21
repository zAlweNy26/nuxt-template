
import { type VariantProps, cva } from 'class-variance-authority'

export { default as SelectBox } from './SelectBox.vue'

export const selectVariants = cva(
    'flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    {
        variants: {
            color: {
                primary: 'focus:ring-primary',
                secondary: 'focus:ring-secondary',
                success: 'focus:ring-success',
                warning: 'focus:ring-warning',
                error: 'focus:ring-error',
                info: 'focus:ring-info',
            },
            size: {
                xs: 'h-7 text-xs shadow',
                sm: 'h-8 text-sm shadow-sm',
                md: 'h-9 text-base shadow-sm',
                lg: 'h-10 text-lg shadow-md'
            }
        },
        defaultVariants: {
            color: 'primary',
            size: 'sm',
        },
    }
)

export type SelectItem = {
    label: string
    value: string
}

export type SelectItems = [SelectItem, ...SelectItem[]]

export type SelectVariants = VariantProps<typeof selectVariants>