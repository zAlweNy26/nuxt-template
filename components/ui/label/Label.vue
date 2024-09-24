<script setup lang="ts">
import { Label, type LabelProps } from 'radix-vue'
import { type LabelVariants, labelVariants } from '.'

const props = defineProps<LabelProps & {
	size?: LabelVariants['size']
	class?: ClassValue
}>()

const delegatedProps = computed(() => {
	const { class: _, size: __, ...delegated } = props
	return delegated
})
</script>

<template>
	<Label v-bind="delegatedProps" :class="cn(labelVariants({ size }), props.class)">
		<slot />
	</Label>
</template>
