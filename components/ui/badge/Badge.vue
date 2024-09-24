<script setup lang="ts">
import { type BadgeVariants, badgeVariants } from '.'

const props = defineProps<{
	class?: ClassValue
	variant?: BadgeVariants['variant']
	size?: BadgeVariants['size']
}>()
</script>

<template>
	<div :class="cn(badgeVariants({ variant, size }), props.class)">
		<slot />
	</div>
</template>
