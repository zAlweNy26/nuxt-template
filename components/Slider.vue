<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { Slider } from 'radix-vue/namespaced'

const props = defineProps<SliderRootProps & { class?: ClassValue }>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<Slider.Root :class="cn('relative flex my-2 w-full touch-none select-none items-center', props.class)"
		v-bind="forwarded">
		<Slider.Track class="relative h-2 w-full grow overflow-hidden rounded-full bg-primary/20">
			<Slider.Range class="absolute h-full bg-primary" />
		</Slider.Track>
		<Slider.Thumb v-for="(_, key) in modelValue" :key="key"
			class="block size-5 cursor-pointer rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
	</Slider.Root>
</template>
