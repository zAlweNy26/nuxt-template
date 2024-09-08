import { type VariantProps, cva } from 'class-variance-authority'

export { default as ComboGroup } from './ComboGroup.vue'

export const groupVariants = cva(
    'flex [&>*]:rounded-none',
    {
        variants: {
            size: {
                sm: '[&>*:first-child]:rounded-l-sm [&>*:last-child]:rounded-r-sm',
                md: '[&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md',
                lg: '[&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg',
                xl: '[&>*:first-child]:rounded-l-xl [&>*:last-child]:rounded-r-xl',
                '2xl': '[&>*:first-child]:rounded-l-2xl [&>*:last-child]:rounded-r-2xl',
                '3xl': '[&>*:first-child]:rounded-l-3xl [&>*:last-child]:rounded-r-3xl',
            }
        },
        defaultVariants: {
            size: 'md',
        },
    }
)

export type GroupVariants = VariantProps<typeof groupVariants>