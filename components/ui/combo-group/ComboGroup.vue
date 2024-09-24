<script lang="ts" setup>
import { groupVariants, type GroupVariants } from '.'

const props = defineProps<{
	class?: ClassValue
	size?: GroupVariants['size']
}>()
</script>

<template>
	<div :class="cn(groupVariants({ size }), props.class)">
		<slot />
	</div>
</template>
