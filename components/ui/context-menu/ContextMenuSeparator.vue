<script setup lang="ts">
import { ContextMenuSeparator, type ContextMenuSeparatorProps } from 'radix-vue'

const props = defineProps<ContextMenuSeparatorProps & { class?: ClassValue }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
	<ContextMenuSeparator v-bind="delegatedProps" :class="cn('-mx-1 my-1 h-px bg-border', props.class)" />
</template>
