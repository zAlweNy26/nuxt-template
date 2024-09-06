<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, DialogTrigger, DialogOverlay, DialogContent,
  DialogPortal, useForwardPropsEmits, DialogClose, DialogTitle, DialogDescription } from 'radix-vue'
import type { SheetProps } from './ui/sheet'

const { root, class: mainClass, closable = true } = defineProps<SheetProps>()

defineOptions({ inheritAttrs: false })

const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(() => root ?? {}, emits)
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <DialogTrigger asChild>
      <slot />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay :class="cn(
        'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', 
        mainClass
      )" />
      <DialogContent v-bind="content" :class="cn(
        'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        contentClass,
      )" @pointerDownOutside="(e) => !closable && e.preventDefault()">
        <div class="flex items-start justify-between gap-2">
          <slot name="header" :title :description>
            <div class="flex flex-col">
              <DialogTitle class="text-lg font-semibold leading-none tracking-tight">
                {{ title }}
              </DialogTitle>
              <DialogDescription class="text-sm text-muted-foreground">
                {{ description }}
              </DialogDescription>
            </div>
          </slot>
          <slot name="close">
            <DialogClose
              class="grid place-content-center rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
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
