<script lang="ts" setup>
import type { MarqueeProps } from '.'

withDefaults(defineProps<MarqueeProps>(), {
	vertical: false,
	repeat: 4,
	pauseOnHover: false,
	reverse: false,
	duration: 10,
})
</script>

<template>
	<div class="group relative flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]" :class="[
		vertical ? 'flex-col' : 'flex-row',
		$props.class,
	]" :style="{ '--duration': `${duration}s` }">
		<div v-for="index in repeat" :key="index" class="flex shrink-0 justify-around [gap:var(--gap)]" :class="[
			vertical
				? 'animate-marquee-vertical flex-col'
				: 'animate-marquee flex-row',
			pauseOnHover ? 'group-hover:[animation-play-state:paused]' : '',
			reverse ? '[animation-direction:reverse]' : '',
		]">
			<slot />
		</div>
		<div class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-foreground dark:from-background" />
		<div class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-foreground dark:from-background" />
	</div>
</template>
