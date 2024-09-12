<script setup lang="ts">
import { useForwardPropsEmits, AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger,
  AccordionContent, type AccordionRootEmits, type AccordionRootProps } from 'radix-vue'
import type { AccordionItems } from '.'

const props = withDefaults(defineProps<AccordionRootProps & {
  items: AccordionItems
  class?: ClassValue
  contentClass?: ClassValue
}>(), {
  type: 'single',
  class: undefined,
  contentClass: undefined,
  collapsible: true
})

const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = computed(() => {
  const { items: _, class: __, contentClass: ___, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AccordionRoot v-bind="forwarded" :class="cn('w-full divide-y', props.class)">
    <AccordionItem v-for="item in items" :key="item.id" :value="item.id" :class="cn('pb-2', contentClass)">
      <AccordionHeader class="flex">
        <AccordionTrigger :class="cn(
          'flex flex-1 gap-1 w-full items-center justify-between py-2 text-sm font-medium transition-all cursor-pointer [&[data-state=open]>.accordion-icon]:rotate-180',
          item.class,
        )">
          <slot :item>
            <span>{{ item.label }}</span>
          </slot>
          <slot name="icon">
            <Icon name="ph:caret-down-bold" class="accordion-icon size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <slot :name="`${item.id}-content`" />
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
