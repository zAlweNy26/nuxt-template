<script lang="ts" setup>
import { chipVariants, type ChipProps } from '.'

const props = withDefaults(defineProps<ChipProps>(), {
  show: true,
  inset: true,
  animate: true,
  position: 'top-right',
  color: 'primary',
  size: 'sm',
})
</script>

<template>
  <div :class="cn('relative inline-flex h-fit shrink-0 items-center justify-center', props.class)">
    <slot />
    <template v-if="show">
      <span v-if="animate" :class="cn(chipVariants({ color, position, size, inset }), 'animate-ping', ui?.base)" />
      <span :class="cn(chipVariants({ color, position, size, inset }), ui?.base)">
        <slot name="content">
          {{ text }}
        </slot>
      </span>
    </template>
  </div>
</template>