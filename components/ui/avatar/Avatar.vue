<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { AvatarRoot, AvatarImage, type AvatarImageProps, AvatarFallback, type AvatarFallbackProps } from 'radix-vue'
import { type AvatarVariants, avatarVariant } from '.'

const { class: mainClass } = defineProps<AvatarImageProps & AvatarFallbackProps & {
  class?: ClassValue
  alt?: string
  size?: AvatarVariants['size']
  shape?: AvatarVariants['shape']
}>()
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), mainClass)">
    <AvatarImage :src :alt class="size-full object-cover" />
    <AvatarFallback :delayMs>
      <slot />
    </AvatarFallback>
  </AvatarRoot>
</template>
