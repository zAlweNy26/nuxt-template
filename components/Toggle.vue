<script setup lang="ts">
import { Toggle, type ToggleProps, useForwardProps } from 'radix-vue'
import { type ButtonProps, buttonVariants } from './ui/button'

const props = withDefaults(defineProps<Omit<ToggleProps, 'pressed'> & Omit<ButtonProps, 'variant'>>(), {
	size: 'md',
})

const delegatedProps = computed(() => {
	const { class: _, size, square, ...rest } = props
	return rest
})

const forwarded = useForwardProps(delegatedProps)

const model = defineModel<boolean>()
</script>

<template>
	<Toggle v-model:pressed="model" v-bind="forwarded" :class="cn(buttonVariants({
		variant: model ? 'secondary' : 'outline', size, square: square ? size : undefined,
	}), props.class)">
		<slot />
	</Toggle>
</template>
