export { default as Chip } from './Chip.vue'

export const chipVariants = compose({
  base: 'absolute flex items-center justify-center whitespace-nowrap rounded-full font-medium text-white ring-1 ring-white dark:text-gray-900 dark:ring-gray-900',
  variants: {
    color: colors.reduce((acc, color) => ({
      ...acc,
      [color]: `bg-${color}`
    }), colorsRecord),
    size: {
      '3xs': 'h-[4px] min-w-[4px] p-px text-[4px]',
      '2xs': 'h-[5px] min-w-[5px] p-px text-[5px]',
      xs: 'h-1.5 min-w-1.5 p-px text-[6px]',
      sm: 'h-2 min-w-2 p-0.5 text-[7px]',
      md: 'h-2.5 min-w-2.5 p-0.5 text-[8px]',
      lg: 'h-3 min-w-3 p-0.5 text-[10px]',
      xl: 'h-3.5 min-w-3.5 p-1 text-[11px]',
      '2xl': 'h-4 min-w-4 p-1 text-[12px]',
      '3xl': 'h-5 min-w-5 p-1 text-[14px]',
    },
    position: {
      'top-right': 'right-0 top-0',
      'bottom-right': 'bottom-0 right-0',
      'top-left': 'left-0 top-0',
      'bottom-left': 'bottom-0 left-0',
    },
    inset: {
      true: ''
    },
  },
  compoundVariants: [
    {
      inset: false,
      position: 'top-right',
      class: '-translate-y-1/2 translate-x-1/2 transform',
    },
    {
      inset: false,
      position: 'bottom-right',
      class: 'translate-x-1/2 translate-y-1/2 transform',
    },
    {
      inset: false,
      position: 'top-left',
      class: '-translate-x-1/2 -translate-y-1/2 transform',
    },
    {
      inset: false,
      position: 'bottom-left',
      class: '-translate-x-1/2 translate-y-1/2 transform',
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'sm',
    position: 'top-right',
    inset: true
  },
})

export type ChipVariants = VariantProps<typeof chipVariants>

export interface ChipProps {
  class?: ClassValue
  show?: boolean
  text?: string | number
  animate?: boolean
  inset?: boolean
  position?: ChipVariants['position']
  color?: ChipVariants['color']
  size?: ChipVariants['size']
  ui?: {
    base?: ClassValue
  }
}