<script setup lang="ts">
import { MenubarSeparator } from 'reka-ui'

const props = defineProps<{ class?: ClassValue }>()
</script>

<template>
	<MenubarSeparator :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>
