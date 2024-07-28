<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AvatarRoot, AvatarImage, type AvatarImageProps, AvatarFallback, type AvatarFallbackProps } from 'radix-vue'
import { type AvatarVariants, avatarVariant } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  size?: AvatarVariants['size']
  shape?: AvatarVariants['shape']
} & AvatarImageProps & AvatarFallbackProps>(), {
  class: undefined,
  size: 'sm',
  shape: 'circle',
})
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <AvatarImage :src class="size-full object-cover" />
    <AvatarFallback :delayMs>
      <slot />
    </AvatarFallback>
  </AvatarRoot>
</template>
