import { type VariantProps, cva } from 'class-variance-authority'

export { default as Shortcut } from './Shortcut.vue'

export const shortcutVariants = cva(
  'inline-flex items-center justify-center rounded border border-input bg-background px-1 font-sans font-medium shadow-sm',
  {
    variants: {
      size: {
        xs: 'h-4 min-w-[16px] text-[10px]',
        sm: 'h-5 min-w-[20px] text-[11px]',
        md: 'h-6 min-w-[24px] text-[12px]',
        lg: 'h-7 min-w-[28px] text-[13px]',
      },
    },
    defaultVariants: {
      size: 'sm'
    },
  },
)

export type ShortcutVariants = VariantProps<typeof shortcutVariants>