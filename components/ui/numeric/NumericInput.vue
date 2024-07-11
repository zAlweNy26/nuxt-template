<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'radix-vue'
import { NumberFieldRoot, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement, useForwardPropsEmits } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { type InputVariants, inputVariants } from '.'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'

const props = defineProps<NumberFieldRootProps & { 
  class?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  inputClass?: HTMLAttributes['class']
  size?: InputVariants['size']
  color?: InputVariants['color']
  label?: string
}>()
const emits = defineEmits<NumberFieldRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NumberFieldRoot v-bind="forwarded" :class="cn('grid gap-1.5', props.class)">
    <Label v-if="label" :for="id" :size :class="props.labelClass">{{ label }}</Label>
    <div class="relative">
      <ClientOnly> <!-- Workaround for `window is not defined` bug -->
        <NumberFieldDecrement :class="cn('absolute top-0 left-0 p-2 disabled:cursor-not-allowed disabled:opacity-20')">
          <Icon icon="ph:minus" class="size-4" />
        </NumberFieldDecrement>
      </ClientOnly>
      <NumberFieldInput :class="cn(inputVariants({ color, size }), props.inputClass)" />
      <ClientOnly> <!-- Workaround for `window is not defined` bug -->
        <NumberFieldIncrement :class="cn('absolute top-0 right-0 p-2 disabled:cursor-not-allowed disabled:opacity-20')">
          <Icon icon="ph:plus" class="size-4" />
        </NumberFieldIncrement>
      </ClientOnly>
    </div>
  </NumberFieldRoot>
</template>
