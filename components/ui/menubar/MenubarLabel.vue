<script setup lang="ts">
import { MenubarLabel } from 'radix-vue'

const props = defineProps<{ class?: ClassValue }>()
</script>

<template>
	<MenubarLabel :class="cn('px-2 py-1.5 text-sm font-semibold', props.class)">
		<slot />
	</MenubarLabel>
</template>
