import type { CheckboxRootProps } from 'radix-vue'

export { default as Checkbox } from './Checkbox.vue'

export const checkboxVariants = compose({
  slots: {
    root: 'peer size-4 shrink-0 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50',
    indicator: 'flex size-full items-center justify-center text-current',
    label: 'cursor-pointer'
  },
  variants: {
    color: colors.reduce((acc, color) => ({
      ...acc,
      [color]: {
        root: `border border-${color} data-[state=checked]:bg-${color} data-[state=checked]:text-${color}-foreground`,
      }
    }), colorsRecord),
    size: {
      xs: {
        root: 'size-3 rounded-sm',
        label: 'text-xs'
      },
      sm: {
        root: 'size-4 rounded',
        label: 'text-sm'
      },
      md: {
        root: 'size-5 rounded-md',
        label: 'text-base'
      },
      lg: {
        root: 'size-6 rounded-lg',
        label: 'text-lg'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'sm'
  },
})

export type CheckboxVariants = VariantProps<typeof checkboxVariants>

export interface CheckboxProps extends CheckboxRootProps {
  color?: CheckboxVariants['color']
  size?: CheckboxVariants['size']
  class?: ClassValue
  text?: string
  ui?: {
    [K in keyof typeof checkboxVariants.slots]?: ClassValue
  }
}