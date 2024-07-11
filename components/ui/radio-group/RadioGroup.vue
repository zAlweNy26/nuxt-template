<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type RadioVariants, radioVariants } from '.'
import { RadioGroupRoot, type RadioGroupRootEmits, RadioGroupIndicator,
  RadioGroupItem, type RadioGroupRootProps, type RadioGroupItemProps, useForwardPropsEmits } from 'radix-vue'

type RadioGroupItem = Required<Pick<RadioGroupItemProps, 'name' | 'value'>> & Omit<RadioGroupItemProps, 'name' | 'id'>

const props = withDefaults(defineProps<RadioGroupRootProps & {
  items: RadioGroupItem[]
  class?: HTMLAttributes['class']
  itemClass?: HTMLAttributes['class']
  variant?: RadioVariants['variant']
  size?: RadioVariants['size']
}>(), {
  variant: 'primary',
  size: 'sm',
  class: undefined,
  itemClass: undefined,
})
const emits = defineEmits<RadioGroupRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <RadioGroupRoot :class="cn('grid gap-2', props.class)" v-bind="forwarded">
    <div v-for="i in items" :key="i.value" class="flex items-center space-x-2">
      <RadioGroupItem :id="i.value" :value="i.value" :class="cn(radioVariants({ variant, size }), props.itemClass)">
        <RadioGroupIndicator class="flex items-center justify-center" />
      </RadioGroupItem>
      <Label :for="i.value">{{ i.name }}</Label>
    </div>
  </RadioGroupRoot>
</template>
