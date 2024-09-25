<script setup lang="ts">
import { Label, type LabelProps } from 'radix-vue'
import { type LabelVariants, labelVariants } from '.'

const props = defineProps<LabelProps & {
	size?: LabelVariants['size']
	class?: ClassValue
}>()

const delegatedProps = reactiveOmit(props, 'size', 'class')
</script>

<template>
	<Label v-bind="delegatedProps" :class="cn(labelVariants({ size }), props.class)">
		<slot />
	</Label>
</template>
