<script setup lang="ts">
import { SplitterGroup, type SplitterGroupEmits, type SplitterGroupProps, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<SplitterGroupProps & { class?: ClassValue }>()
const emits = defineEmits<SplitterGroupEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<SplitterGroup v-bind="forwarded"
		:class="cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', props.class)">
		<slot />
	</SplitterGroup>
</template>
