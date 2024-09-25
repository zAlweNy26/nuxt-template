import { cva, type VariantProps } from 'class-variance-authority'

export { default as Checkbox } from './Checkbox.vue'

export const checkboxVariants = cva(
	'peer size-4 shrink-0 rounded-sm shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: 'border border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary',
				error: 'border border-error data-[state=checked]:bg-error data-[state=checked]:text-error-foreground data-[state=indeterminate]:text-error',
				warning: 'border border-warning data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground data-[state=indeterminate]:text-warning',
				success: 'border border-success data-[state=checked]:bg-success data-[state=checked]:text-success-foreground data-[state=indeterminate]:text-success',
				info: 'border border-info data-[state=checked]:bg-info data-[state=checked]:text-info-foreground data-[state=indeterminate]:text-info',
			},
			size: {
				xs: 'size-3 rounded',
				sm: 'size-4 rounded-sm',
				md: 'size-5 rounded-md',
				lg: 'size-6 rounded-lg',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'sm',
		},
	},
)

export type CheckboxVariants = VariantProps<typeof checkboxVariants>
