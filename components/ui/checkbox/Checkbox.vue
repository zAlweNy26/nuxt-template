<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot, type CheckboxRootEmits, type CheckboxRootProps, useForwardPropsEmits } from 'radix-vue'
import { type CheckboxVariants, checkboxVariants } from '.'

const props = defineProps<CheckboxRootProps & {
	variant?: CheckboxVariants['variant']
	size?: CheckboxVariants['size']
	class?: ClassValue
	labelClass?: ClassValue
	text?: string
}>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'variant', 'size', 'class', 'labelClass', 'text', 'id')

const cbId = computed(() => props.id ?? `cb-${useId()}`)

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<div class="flex items-center space-x-2">
		<CheckboxRoot :id="cbId" v-bind="forwarded" :class="cn(checkboxVariants({ variant, size }), props.class)">
			<CheckboxIndicator class="flex size-full items-center justify-center text-current">
				<slot :checked>
					<Icon v-if="checked === 'indeterminate'" name="ph:minus-bold" class="size-4" />
					<Icon v-else name="ph:check-bold" class="size-4" />
				</slot>
			</CheckboxIndicator>
		</CheckboxRoot>
		<Label v-if="text" :for="cbId" :size :class="props.labelClass">
			{{ text }}
		</Label>
	</div>
</template>
