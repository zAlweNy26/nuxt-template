import { type VariantProps, cva } from 'class-variance-authority'

export { default as Label } from './Label.vue'

export const labelVariants = cva(
    'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    {
        variants: {
            size: {
                xs: 'text-xs',
                sm: 'text-sm',
                md: 'text-base',
                lg: 'text-lg'
            }
        },
        defaultVariants: {
            size: 'sm',
        },
    }
)

export type LabelVariants = VariantProps<typeof labelVariants>