<script setup lang="ts">
import { ContextMenuLabel, type ContextMenuLabelProps } from 'reka-ui'

const props = defineProps<ContextMenuLabelProps & { class?: ClassValue }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
	<ContextMenuLabel v-bind="delegatedProps"
		:class="cn('px-2 py-1.5 text-sm font-semibold text-foreground', props.class)">
		<slot />
	</ContextMenuLabel>
</template>
