<script setup lang="ts">
import { type InputVariants, inputVariants } from '.'

const props = defineProps<{
	defaultValue?: string
	class?: ClassValue
	color?: InputVariants['color']
	size?: InputVariants['size']
}>()

const model = defineModel<string>()

onMounted(() => {
	model.value = model.value ?? props.defaultValue
})
</script>

<template>
	<input v-model="model" :class="cn(inputVariants({ color, size }), props.class)">
</template>
