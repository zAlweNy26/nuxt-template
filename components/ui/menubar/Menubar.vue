<script setup lang="ts">
import { MenubarRoot, type MenubarRootEmits, type MenubarRootProps, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<MenubarRootProps & { class?: ClassValue }>()
const emits = defineEmits<MenubarRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<MenubarRoot v-bind="forwarded"
		:class="cn('flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm', props.class)">
		<slot />
	</MenubarRoot>
</template>
