import { cva, type VariantProps } from 'class-variance-authority'

export { default as NumberInput } from './NumberInput.vue'

export const numberInputVariants = cva(
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
				xs: 'h-7 px-8 text-xs shadow',
				sm: 'h-8 px-9 text-sm shadow-sm',
				md: 'h-9 px-10 text-base shadow-sm',
				lg: 'h-10 px-11 text-lg shadow-md',
			},
		},
		defaultVariants: {
			color: 'primary',
			size: 'sm',
		},
	},
)

export type NumberInputVariants = VariantProps<typeof numberInputVariants>
