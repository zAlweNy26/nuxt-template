<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  DialogRoot, type DialogRootEmits, DialogTrigger, DialogOverlay, DialogContent,
  DialogPortal, type DialogRootProps, useForwardPropsEmits,
  DialogClose, DialogTitle, DialogDescription
} from 'radix-vue'

const props = withDefaults(defineProps<DialogRootProps & {
  title?: string
  description?: string
  closable?: boolean
  class?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
}>(), {
  title: undefined,
  description: undefined,
  closable: true,
  class: undefined,
  contentClass: undefined
})

defineOptions({
  inheritAttrs: false
})

const emits = defineEmits<DialogRootEmits>()

const { title, description, closable, contentClass, ...rootProps } = toReactive(props)

const forwarded = useForwardPropsEmits(() => rootProps, emits)
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <DialogTrigger asChild>
      <slot />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        :class="cn('fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', props.class)" />
      <DialogContent :class="cn(
        'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        props.contentClass,
      )" @pointerDownOutside="(e) => !closable && e.preventDefault()">
        <div class="flex flex-col gap-y-1.5 text-center sm:text-left">
          <slot name="header" :title :description>
            <DialogTitle class="text-lg font-semibold leading-none tracking-tight">
              {{ title }}
            </DialogTitle>
            <DialogDescription class="text-sm text-muted-foreground">
              {{ description }}
            </DialogDescription>
            <DialogClose
              class="absolute right-4 top-4 grid place-content-center rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <Icon name="ph:x-bold" class="size-4" />
              <span class="sr-only">{{ $t('button.close') }}</span>
            </DialogClose>
          </slot>
        </div>
        <slot name="content" />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
