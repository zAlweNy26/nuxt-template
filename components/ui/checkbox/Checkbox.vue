<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { Checkbox } from 'radix-vue/namespaced'
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
		<Checkbox.Root :id="cbId" v-bind="forwarded" :class="cn(checkboxVariants({ variant, size }), props.class)">
			<Checkbox.Indicator class="flex size-full items-center justify-center text-current">
				<slot :checked>
					<Icon v-if="checked === 'indeterminate'" name="ph:minus-bold" class="size-4" />
					<Icon v-else name="ph:check-bold" class="size-4" />
				</slot>
			</Checkbox.Indicator>
		</Checkbox.Root>
		<Label v-if="text" :for="cbId" :size :class="props.labelClass">
			{{ text }}
		</Label>
	</div>
</template>
