<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { useForwardPropsEmits, TooltipRoot, TooltipProvider, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow,
  type TooltipProviderProps, type TooltipRootProps, type TooltipContentProps, type TooltipRootEmits } from 'radix-vue'

const props = defineProps<{
  class?: ClassValue
  root?: TooltipRootProps
  provider?: TooltipProviderProps
  content?: TooltipContentProps
}>()

const emits = defineEmits<TooltipRootEmits>()

const providerProps = computed<TooltipProviderProps>(() => ({ delayDuration: 300, ...props.provider }))
const contentProps = computed<TooltipContentProps>(() => ({ sideOffset: 4, ...props.content }))

const forwarded = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
  <TooltipProvider v-bind="providerProps">
    <TooltipRoot v-bind="forwarded">
      <TooltipTrigger asChild>
        <slot />
      </TooltipTrigger>
      <TooltipPortal v-if="$slots.content">
        <TooltipContent v-bind="contentProps" 
          :class="cn(
            'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', 
            props.class
          )">
          <slot name="content" />
          <TooltipArrow class="fill-primary" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>