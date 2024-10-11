<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { Checkbox } from 'reka-ui/namespaced'
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
	<div class="flex items-center gap-2">
		<Checkbox.Root :id="cbId" v-slot="{ modelValue }" v-bind="forwarded" :class="cn(checkboxVariants({ variant, size }), props.class)">
			<Checkbox.Indicator class="flex size-full items-center justify-center text-current">
				<slot :state="modelValue">
					<Icon v-if="modelValue === 'indeterminate'" name="ph:minus-bold" class="size-4" />
					<Icon v-else name="ph:check-bold" class="size-4" />
				</slot>
			</Checkbox.Indicator>
		</Checkbox.Root>
		<Label v-if="text" :for="cbId" :size :class="props.labelClass">
			{{ text }}
		</Label>
	</div>
</template>
