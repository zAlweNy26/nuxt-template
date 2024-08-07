<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import { useForwardPropsEmits, type DialogRootEmits, type DialogRootProps } from 'radix-vue'

const props = withDefaults(defineProps<DialogRootProps & {
  title?: string
  description?: string
  closable?: boolean
  class?: ClassValue
  contentClass?: ClassValue
}>(), {
  title: undefined,
  description: undefined,
  closable: true,
  class: undefined,
  contentClass: undefined
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