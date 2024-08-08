<script lang="ts" setup>
import { useForwardPropsEmits, type DialogRootEmits } from 'radix-vue'
import type { SheetProps } from './ui/sheet'

const props = withDefaults(defineProps<SheetProps>(), {
  closable: true,
})

const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const isDesktop = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <DialogBox v-if="isDesktop" v-bind="forwarded">
    <slot />
    <template #header>
      <slot name="header" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </DialogBox>
  <SideSheet v-else v-bind="forwarded" side="bottom">
    <slot />
    <template #header>
      <slot name="header" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </SideSheet>
</template>