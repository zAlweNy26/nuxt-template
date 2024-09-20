import type { PrimitiveProps } from 'radix-vue'

export { default as Button } from './Button.vue'

export const buttonVariants = compose({
  base: 'inline-flex items-center justify-center whitespace-nowrap shadow font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    color: colorsRecord,
    variant: {
      solid: '',
      soft: '',
      outline: '',
      ghost: '',
      link: ''
    },
    size: {
      xs: 'h-4 rounded-sm px-1 py-0.5 text-2xs',
      sm: 'h-7 rounded px-2 py-1 text-xs',
      md: 'h-8 rounded-md px-3 py-1.5 text-sm',
      lg: 'h-9 rounded-lg px-4 py-2 text-base',
      xl: 'h-10 rounded-xl px-5 py-2.5 text-lg',
    },
    square: {
      true: ''
    }
  },
  compoundVariants: [
    ...colors.map(color => ({
      color,
      variant: 'solid' as const,
      class: `bg-${color} text-${color}-foreground hover:bg-opacity-80`,
    })),
    ...colors.map(color => ({
      color,
      variant: 'soft' as const,
      class: `bg-${color} bg-opacity-10 text-${color} hover:bg-opacity-20`,
    })),
    ...colors.map(color => ({
      color,
      variant: 'outline' as const,
      class: `ring-1 ring-inset text-${color} ring-${color} bg-${color} bg-opacity-0 hover:bg-opacity-20`,
    })),
    ...colors.map(color => ({
      color,
      variant: 'ghost' as const,
      class: `text-${color} hover:bg-${color} bg-${color} bg-opacity-0 hover:bg-opacity-20 shadow-none`,
    })),
    ...colors.map(color => ({
      color,
      variant: 'link' as const,
      class: `text-${color} underline-offset-4 hover:underline shadow-none`,
    })),
    {
      square: true,
      size: 'xs',
      class: 'w-4 p-0.5',
    },
    {
      square: true,
      size: 'sm',
      class: 'w-7 p-1',
    },
    {
      square: true,
      size: 'md',
      class: 'w-8 p-1.5',
    },
    {
      square: true,
      size: 'lg',
      class: 'w-9 p-2',
    },
    {
      square: true,
      size: 'xl',
      class: 'w-10 p-2.5',
    },
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
})

export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps extends PrimitiveProps {
  color?: ButtonVariants['color']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  square?: boolean
  class?: ClassValue
}