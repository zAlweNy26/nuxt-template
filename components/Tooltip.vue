<script setup lang="ts">
import { useForwardPropsEmits, TooltipRoot, TooltipProvider, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow,
  type TooltipProviderProps, type TooltipRootProps, type TooltipContentProps, type TooltipRootEmits } from 'radix-vue'

const props = defineProps<{
  class?: ClassValue
  root?: TooltipRootProps
  provider?: TooltipProviderProps
  content?: TooltipContentProps
  shortcuts?: Shortcuts
  arrowClass?: ClassValue
}>()

const emits = defineEmits<TooltipRootEmits>()

const providerProps = computed<TooltipProviderProps>(() => ({ delayDuration: 300, ...props.provider }))
const contentProps = computed<TooltipContentProps>(() => ({ sideOffset: 4, avoidCollisions: true, ...props.content }))

const forwarded = useForwardPropsEmits(() => ({ delayDuration: 300, ...props.root }), emits)
</script>

<template>
  <TooltipProvider v-bind="providerProps">
    <TooltipRoot v-bind="forwarded">
      <TooltipTrigger asChild>
        <slot />
      </TooltipTrigger>
      <TooltipPortal v-if="$slots.content">
        <TooltipContent v-bind="contentProps" :class="cn(
          'z-50 overflow-hidden rounded-md flex items-center gap-1 bg-accent px-3 py-1.5 text-xs text-accent-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', 
          props.class
        )">
          <slot name="content" />
          <template v-if="shortcuts">
            <Icon name="ph:circle-fill" class="size-1 fill-current" />
            <span class="flex gap-0.5">
              <Shortcut v-for="(k, i) in shortcuts" :key="i" :cap="k" />
            </span>
          </template>
          <TooltipArrow :class="cn('fill-accent', arrowClass)" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>