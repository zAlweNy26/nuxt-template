<script setup lang="ts">
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from 'reka-ui'

const props = defineProps<DropdownMenuSeparatorProps & { class?: ClassValue }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
	<DropdownMenuSeparator v-bind="delegatedProps" :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>
