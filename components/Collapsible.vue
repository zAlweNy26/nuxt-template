<script setup lang="ts">
import type { CollapsibleContentProps, CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { Collapsible } from 'radix-vue/namespaced'

const props = defineProps<CollapsibleRootProps & CollapsibleContentProps>()
const emits = defineEmits<CollapsibleRootEmits>()

const delegatedProps = reactiveOmit(props, 'forceMount')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<Collapsible.Root v-slot="{ open }" v-bind="forwarded">
		<Collapsible.Trigger asChild>
			<slot :open="open" />
		</Collapsible.Trigger>
		<Collapsible.Content :forceMount
			class="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
			<slot :open="open" name="content" />
		</Collapsible.Content>
	</Collapsible.Root>
</template>
