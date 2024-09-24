<script setup lang="ts">
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot,
	type NumberFieldRootEmits, type NumberFieldRootProps, useForwardPropsEmits } from 'radix-vue'
import { type NumberInputVariants, numberInputVariants } from '.'

const props = defineProps<{
	root?: NumberFieldRootProps
	class?: ClassValue
	color?: NumberInputVariants['color']
	size?: NumberInputVariants['size']
	buttonClass?: ClassValue
	wrapperClass?: ClassValue
}>()

const emits = defineEmits<NumberFieldRootEmits>()

const forwarded = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
	<NumberFieldRoot v-bind="forwarded">
		<div :class="cn('relative w-full max-w-32', props.wrapperClass)">
			<ClientOnly>
				<!-- Workaround for `window is not defined` bug -->
				<NumberFieldDecrement :class="cn('absolute top-0 inline-flex left-0 p-2 disabled:cursor-not-allowed disabled:opacity-20', props.buttonClass)">
					<Icon name="ph:minus" class="size-4" />
				</NumberFieldDecrement>
				<template #fallback>
					<div :class="cn('absolute top-0 left-0 inline-flex p-2 disabled:cursor-not-allowed disabled:opacity-20', props.buttonClass)">
						<Icon name="ph:minus" class="size-4" />
					</div>
				</template>
			</ClientOnly>
			<NumberFieldInput :class="cn(numberInputVariants({ color, size }), props.class)" />
			<ClientOnly>
				<!-- Workaround for `window is not defined` bug -->
				<NumberFieldIncrement :class="cn('absolute top-0 inline-flex right-0 p-2 disabled:cursor-not-allowed disabled:opacity-20', props.buttonClass)">
					<Icon name="ph:plus" class="size-4" />
				</NumberFieldIncrement>
				<template #fallback>
					<div :class="cn('absolute top-0 right-0 inline-flex p-2 disabled:cursor-not-allowed disabled:opacity-20', props.buttonClass)">
						<Icon name="ph:plus" class="size-4" />
					</div>
				</template>
			</ClientOnly>
		</div>
	</NumberFieldRoot>
</template>
