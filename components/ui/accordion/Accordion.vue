<script setup lang="ts">
import { Accordion } from 'radix-vue/namespaced'
import { useForwardPropsEmits, type AccordionRootEmits } from 'radix-vue'
import { type AccordionProps, accordionVariants } from '.'

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'single',
  collapsible: true
})

const rootProps = reactivePick(props, (v, k) => !['items', 'class', 'ui'].includes(k))

const { trigger, icon, content, item: element } = accordionVariants()

const emits = defineEmits<AccordionRootEmits>()

const forwarded = useForwardPropsEmits(rootProps, emits)
</script>

<template>
  <Accordion.Root v-bind="forwarded" :class="cn('w-full divide-y', props.class)">
    <Accordion.Item v-for="item in items" :key="item.id" :value="item.id" :class="cn(element(), ui?.item, item.class)">
      <Accordion.Header asChild>
        <Accordion.Trigger :class="cn(trigger(), ui?.trigger)">
          <slot :item>
            <span>{{ item.label }}</span>
          </slot>
          <slot name="icon">
            <Icon name="ph:caret-down-bold" :class="cn(icon(), ui?.icon)" />
          </slot>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content :class="cn(content(), ui?.content)">
        <slot :name="`${item.id}-content`" />
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</template>
