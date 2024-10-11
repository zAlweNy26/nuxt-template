<script setup lang="ts">
import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { PinInput } from 'reka-ui/namespaced'

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
				:class="cn(
					'relative bg-accent text-center border-r focus:outline-none focus:ring-2 focus:ring-ring focus:relative focus:z-10 flex h-9 w-9 items-center justify-center border-y border-background text-sm transition-all',
					i === 0 && 'rounded-l-lg',
					i === digits - 1 && 'rounded-r-lg',
					itemClass,
				)" />
			<slot v-if="i < digits - 1 && separator" name="separator">
				<Icon name="ph:minus" class="text-muted-foreground" />
			</slot>
		</template>
	</PinInput.Root>
</template>
