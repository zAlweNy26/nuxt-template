<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type SheetVariants, sheetVariants } from '.'
import {
  DialogRoot, type DialogRootEmits, DialogTrigger, DialogOverlay, DialogContent,
  DialogPortal, type DialogRootProps, useForwardPropsEmits,
  type DialogContentProps, DialogClose, DialogTitle, DialogDescription
} from 'radix-vue'

const props = withDefaults(defineProps<DialogRootProps & DialogContentProps & {
  title?: string
  description?: string
  closable?: boolean
  class?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
  side?: SheetVariants['side']
}>(), {
  title: undefined,
  description: undefined,
  closable: true,
  class: undefined,
  contentClass: undefined,
  side: 'right'
})
const { title, description, forceMount, side, closable, ...rootProps } = toReactive(props)
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(rootProps, emits)
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <DialogTrigger asChild>
      <slot />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        :class="cn('fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', props.class)" />
      <DialogContent :forceMount :class="cn(sheetVariants({ side }), props.contentClass)">
        <div class="flex flex-col gap-y-1.5 text-center sm:text-left">
          <slot name="header" :title :description>
            <DialogTitle class="text-lg font-semibold leading-none tracking-tight">
              {{ title }}
            </DialogTitle>
            <DialogDescription class="text-sm text-muted-foreground">
              {{ description }}
            </DialogDescription>
          </slot>
        </div>
        <slot name="content" />
        <slot v-if="closable" name="close">
          <DialogClose
            class="absolute right-4 top-4 grid place-content-center rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <Icon name="ph:x-bold" class="size-4" />
            <span class="sr-only">{{ $t('button.close') }}</span>
          </DialogClose>
        </slot>
      </DialogContent>
      <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2">
        <slot name="footer" />
      </div>
    </DialogPortal>
  </DialogRoot>
</template>