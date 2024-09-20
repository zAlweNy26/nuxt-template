import type { AvatarFallbackProps, AvatarImageProps } from 'radix-vue'

export { default as Avatar } from './Avatar.vue'

export const avatarVariants = compose({
  slots: {
    root: 'inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-secondary font-normal text-foreground',
    image: 'size-full object-cover',
    icon: 'animate-spin',
  },
  variants: {
    size: {
      xs: {
        root: 'size-6 text-xs',
        icon: 'size-2'
      },
      sm: {
        root: 'size-8 text-sm',
        icon: 'size-4'
      },
      md: {
        root: 'size-10 text-base',
        icon: 'size-4'
      },
      lg: {
        root: 'size-12 text-lg',
        icon: 'size-6'
      },
      xl: {
        root: 'size-14 text-xl',
        icon: 'size-6'
      },
      "2xl": {
        root: 'size-16 text-2xl',
        icon: 'size-8'
      }
    },
    shape: {
      circle: {
        root: 'rounded-full'
      },
      square: {
        root: 'rounded-md'
      },
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  }
})

export type AvatarVariants = VariantProps<typeof avatarVariants>

export type AvatarProps = AvatarImageProps & AvatarFallbackProps & {
  size?: AvatarVariants['size']
  shape?: AvatarVariants['shape']
  class?: ClassValue
  ui?: {
    [K in keyof typeof avatarVariants.slots]?: ClassValue
  }
}