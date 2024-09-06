<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { AvatarRoot, AvatarImage, type AvatarImageProps, AvatarFallback, type AvatarFallbackProps } from 'radix-vue'
import { type AvatarVariants, avatarVariant } from '.'

const props = defineProps<AvatarImageProps & AvatarFallbackProps & {
  class?: ClassValue
  size?: AvatarVariants['size']
  shape?: AvatarVariants['shape']
}>()
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <AvatarImage :src class="size-full object-cover" />
    <AvatarFallback :delayMs>
      <slot />
    </AvatarFallback>
  </AvatarRoot>
</template>
