<script setup lang="ts">
import type { CollapsibleContentProps, CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue'
import { CollapsibleContent, CollapsibleRoot, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<CollapsibleRootProps & CollapsibleContentProps>()
const emits = defineEmits<CollapsibleRootEmits>()

const delegatedProps = computed(() => {
	const { forceMount, ...delegated } = props
	return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<CollapsibleRoot v-slot="{ open }" v-bind="forwarded">
		<slot :open="open" />
		<CollapsibleContent :forceMount class="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
			<slot :open="open" name="content" />
		</CollapsibleContent>
	</CollapsibleRoot>
</template>
