export { default as Badge } from './Badge.vue'

export const badgeVariants = compose({
  base: 'inline-flex items-center rounded-md font-medium shadow',
  variants: {
    color: colorsRecord,
    variant: {
      solid: '',
      soft: '',
      outline: ''
    },
    size: {
      xs: 'h-4 px-1 py-0.5 text-2xs',
      sm: 'h-5 px-2 py-1 text-xs',
      md: 'h-6 px-3 py-2 text-sm',
      lg: 'h-7 px-4 py-3 text-base',
    },
  },
  compoundVariants: [
    ...colors.map(color => ({
      color,
      variant: 'solid' as const,
      class: `bg-${color} text-${color}-foreground`,
    })),
    ...colors.map(color => ({
      color,
      variant: 'soft' as const,
      class: `bg-${color} bg-opacity-20 text-${color}`,
    })),
    ...colors.map(color => ({
      color,
      variant: 'outline' as const,
      class: `border text-${color} bg-transparent border-${color}`,
    })),
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'sm'
  },
})

export type BadgeVariants = VariantProps<typeof badgeVariants>

export type BadgeProps = { 
  class?: ClassValue
  variant?: BadgeVariants['variant']
  size?: BadgeVariants['size']
  color?: BadgeVariants['color']
}