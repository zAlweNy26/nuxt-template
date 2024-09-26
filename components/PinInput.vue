<script setup lang="ts">
import type { PinInputRootEmits, PinInputRootProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { PinInput } from 'radix-vue/namespaced'

const props = defineProps<PinInputRootProps & {
	class?: ClassValue
	itemClass?: ClassValue
	separator?: boolean
	digits: number
}>()

const emits = defineEmits<PinInputRootEmits>()

const delegatedProps = reactiveOmit(props, 'digits', 'separator', 'itemClass', 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<PinInput.Root v-bind="forwarded" :class="cn('flex items-center', separator && 'gap-2', props.class)">
		<template v-for="(_, i) in digits" :key="i">
			<PinInput.Input :index="i" :disabled
				:class="cn('relative bg-accent text-center focus:outline-none focus:ring-2 focus:ring-ring focus:relative focus:z-10 flex h-9 w-9 items-center justify-center border-y border-r border-background text-sm transition-all first:rounded-l-lg first:border-l last:rounded-r-lg', itemClass)" />
			<slot v-if="i < digits - 1 && separator" name="separator">
				<Icon name="ph:minus" class="text-muted-foreground" />
			</slot>
		</template>
	</PinInput.Root>
</template>
