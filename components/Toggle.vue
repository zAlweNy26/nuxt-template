<script setup lang="ts">
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from 'reka-ui'
import { type ButtonProps, buttonVariants } from './ui/button'

const props = withDefaults(defineProps<ToggleProps & Omit<ButtonProps, 'variant'>>(), {
	size: 'md',
})

const emits = defineEmits<ToggleEmits>()

const delegatedProps = reactiveOmit(props, 'size', 'square', 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<Toggle v-slot="{ modelValue }" v-bind="forwarded" :class="cn(buttonVariants({
		variant: modelValue ? 'secondary' : 'outline', size, square: square ? size : undefined,
	}), props.class)">
		<slot />
	</Toggle>
</template>
