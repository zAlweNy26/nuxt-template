<script setup lang="ts">
import { type SheetVariants, type SheetProps, sheetVariants } from '.'
import { DialogRoot, type DialogRootEmits, DialogTrigger, DialogOverlay, DialogContent,
  DialogPortal, useForwardPropsEmits, DialogClose, DialogTitle, DialogDescription } from 'radix-vue'

const { root, closable = true, side = 'right', class: mainClass } = defineProps<SheetProps & { side?: SheetVariants['side'] }>()

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
      <DialogContent v-bind="content" :class="cn(sheetVariants({ side }), contentClass)"
        @pointerDownOutside="(e) => !closable && e.preventDefault()">
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
