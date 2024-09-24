<script setup lang="ts">
import { MenubarSeparator, type MenubarSeparatorProps, useForwardProps } from 'radix-vue'

const props = defineProps<MenubarSeparatorProps & { class?: ClassValue }>()

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props
	return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<MenubarSeparator :class=" cn('-mx-1 my-1 h-px bg-muted', props.class)" v-bind="forwardedProps" />
</template>
