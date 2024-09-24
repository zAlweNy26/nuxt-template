<script setup lang="ts">
import { DropdownMenuLabel } from 'radix-vue'

const props = defineProps<{ class?: ClassValue }>()
</script>

<template>
	<DropdownMenuLabel :class="cn('px-2 py-1.5 text-sm font-semibold', props.class)">
		<slot />
	</DropdownMenuLabel>
</template>
