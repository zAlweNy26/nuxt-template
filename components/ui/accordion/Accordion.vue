<script setup lang="ts">
import { useForwardPropsEmits, AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger,
  AccordionContent, type AccordionRootEmits, type AccordionRootProps } from 'radix-vue'
import type { AccordionItems } from '.'
import type { ClassValue } from 'clsx'

const props = withDefaults(defineProps<AccordionRootProps & {
  items: AccordionItems
  contentClass?: ClassValue
}>(), {
  type: 'single',
  contentClass: undefined,
  collapsible: true
})

const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = computed(() => {
  const { items: _, contentClass: __, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AccordionRoot v-bind="forwarded">
    <AccordionItem v-for="item in items" :key="item.id" :value="item.id">
      <AccordionHeader class="flex">
        <AccordionTrigger :class="cn(
          'flex flex-1 gap-1 items-center justify-between py-2 text-sm font-medium transition-all cursor-pointer [&[data-state=open]>.accordion-item]:rotate-180',
          item.class,
        )">
          <slot :item>
            <span>{{ item.label }}</span>
          </slot>
          <slot name="icon">
            <Icon name="ph:caret-down-bold" class="accordion-item size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div :class="cn('pb-4 pt-0', contentClass)">
          <slot :name="`${item.id}-content`" />
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
