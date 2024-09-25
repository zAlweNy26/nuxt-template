<script lang="ts" setup>
import { MarqueeKey, type MarqueeProps } from '.'

const props = withDefaults(defineProps<MarqueeProps>(), {
	vertical: false,
	repeat: 4,
	pauseOnHover: false,
	reverse: false,
	duration: 10,
})

provide(MarqueeKey, props)
</script>

<template>
	<div class="relative overflow-hidden bg-background md:shadow-xl">
		<div :class="cn(
			`group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]`,
			vertical ? 'flex-col' : 'flex-row',
			props.class,
		)" :style="{ '--duration': `${duration}s` }">
			<slot />
		</div>
		<div
			class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
		<div
			class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
	</div>
</template>
