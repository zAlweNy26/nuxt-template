import { cva, type VariantProps } from 'class-variance-authority'

export { default as Textarea } from './Textarea.vue'

export const textareaVariants = cva(
	'flex w-full rounded-md border border-input bg-transparent px-2 py-1 transition-shadow placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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
				xs: 'min-h-10 text-xs shadow',
				sm: 'min-h-12 text-sm shadow-sm',
				md: 'min-h-14 text-base shadow-sm',
				lg: 'min-h-16 text-lg shadow-md',
			},
		},
		defaultVariants: {
			color: 'primary',
			size: 'sm',
		},
	},
)

export type TextareaVariants = VariantProps<typeof textareaVariants>
