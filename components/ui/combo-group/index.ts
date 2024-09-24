import { cva, type VariantProps } from 'class-variance-authority'

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
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
)

export type GroupVariants = VariantProps<typeof groupVariants>
