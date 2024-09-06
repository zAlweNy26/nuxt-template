<script setup lang="ts">
import { CollapsibleRoot, useForwardPropsEmits, CollapsibleContent } from 'radix-vue'
import type { CollapsibleRootEmits, CollapsibleRootProps, CollapsibleContentProps } from 'radix-vue'

const { forceMount, ...root } = defineProps<CollapsibleRootProps & CollapsibleContentProps>()
const emits = defineEmits<CollapsibleRootEmits>()

const forwarded = useForwardPropsEmits(() => root, emits)
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded">
    <slot :open="open" />
    <CollapsibleContent :forceMount class="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
      <slot :open="open" name="content" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
