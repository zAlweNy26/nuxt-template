<script lang="ts" setup>
import { MarqueeKey, type MarqueeProps } from '.'

const { class: mainClass } = defineProps<MarqueeProps>()

const values = inject(MarqueeKey)
</script>

<template>
  <div :class="cn('flex shrink-0 justify-around [gap:var(--gap)]', {
    'animate-marquee flex-row': !values?.vertical,
    'animate-marquee-vertical flex-col': values?.vertical,
    'group-hover:[animation-play-state:paused]': values?.pauseOnHover,
    '[animation-direction:reverse]': values?.reverse,
  }, mainClass)">
    <slot />
  </div>
</template>