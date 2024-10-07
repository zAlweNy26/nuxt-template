<script setup lang="ts">
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits } from 'reka-ui'
import { ToggleGroupKey, type ToggleKey } from '.'
import { type GroupVariants, groupVariants } from '../combo-group'

const props = withDefaults(defineProps<ToggleGroupRootProps & {
	class?: ClassValue
	size?: GroupVariants['size']
}>(), {
	size: 'md',
	class: undefined,
})

const emits = defineEmits<ToggleGroupRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'size')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const context = ref<ToggleKey>({
	size: props.size,
	modelValue: props.modelValue,
})

provide(ToggleGroupKey, context)
</script>

<template>
	<ToggleGroupRoot v-bind="forwarded" :class="cn(groupVariants({ size }), props.class)"
		@update:modelValue="(v) => context.modelValue = v">
		<slot />
	</ToggleGroupRoot>
</template>
