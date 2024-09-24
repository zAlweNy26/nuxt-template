import { cva, type VariantProps } from 'class-variance-authority'

export { default as TagsInput } from './TagsInput.vue'

export const tagsInputVariants = cva(
	'flex h-min flex-wrap items-center gap-2 rounded-md border border-input bg-background px-2 py-1 transition-shadow has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2',
	{
		variants: {
			color: {
				primary: 'has-[:focus-visible]:ring-primary',
				secondary: 'has-[:focus-visible]:ring-secondary',
				success: 'has-[:focus-visible]:ring-success',
				warning: 'has-[:focus-visible]:ring-warning',
				error: 'has-[:focus-visible]:ring-error',
				info: 'has-[:focus-visible]:ring-info',
			},
			size: {
				xs: 'text-xs shadow',
				sm: 'text-sm shadow-sm',
				md: 'text-base shadow-sm',
				lg: 'text-lg shadow-md',
			},
		},
		defaultVariants: {
			color: 'primary',
			size: 'sm',
		},
	},
)

export type TagsInputVariants = VariantProps<typeof tagsInputVariants>
