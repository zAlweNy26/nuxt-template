<script setup lang="ts">
import { Avatar } from 'radix-vue/namespaced'
import { type AvatarProps, avatarVariants } from '.'

const props = defineProps<AvatarProps>()

const { root, image, icon } = avatarVariants()
</script>

<template>
  <Avatar.Root :class="cn(root({ size, shape }), props.class)">
    <Avatar.Image :src :class="cn(image(), ui?.image)" />
    <Avatar.Fallback :delayMs asChild>
      <slot>
        <Icon name="ph:arrow-clockwise" :class="cn(icon({ size }), ui?.icon)" />
      </slot>
    </Avatar.Fallback>
  </Avatar.Root>
</template>
