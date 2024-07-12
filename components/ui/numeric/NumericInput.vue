<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'radix-vue'
import { NumberFieldRoot, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement, useForwardPropsEmits } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { type InputVariants, inputVariants } from '.'

const props = defineProps<NumberFieldRootProps & { 
  class?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  buttonClass?: HTMLAttributes['class']
  inputClass?: HTMLAttributes['class']
  wrapperClass?: HTMLAttributes['class']
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
  <NumberFieldRoot v-bind="forwarded" :class="cn('flex flex-col gap-2', props.class)">
    <Label v-if="label" :for="id" :size :class="cn('ps-1', props.labelClass)">{{ label }}</Label>
    <div :class="cn('relative w-full max-w-32', props.wrapperClass)">
      <ClientOnly> <!-- Workaround for `window is not defined` bug -->
        <NumberFieldDecrement :class="cn('absolute top-0 inline-flex left-0 p-2 disabled:cursor-not-allowed disabled:opacity-20', props.buttonClass)">
          <Icon name="ph:minus" class="size-4" />
        </NumberFieldDecrement>
        <template #fallback>
          <div :class="cn('absolute top-0 left-0 inline-flex p-2 disabled:cursor-not-allowed disabled:opacity-20', props.buttonClass)">
            <Icon name="ph:minus" class="size-4" />
          </div>
        </template>
      </ClientOnly>
      <NumberFieldInput :class="cn(inputVariants({ color, size }), props.inputClass)" />
      <ClientOnly> <!-- Workaround for `window is not defined` bug -->
        <NumberFieldIncrement :class="cn('absolute top-0 inline-flex right-0 p-2 disabled:cursor-not-allowed disabled:opacity-20', props.buttonClass)">
          <Icon name="ph:plus" class="size-4" />
        </NumberFieldIncrement>
        <template #fallback>
          <div :class="cn('absolute top-0 right-0 inline-flex p-2 disabled:cursor-not-allowed disabled:opacity-20', props.buttonClass)">
            <Icon name="ph:plus" class="size-4" />
          </div>
        </template>
      </ClientOnly>
    </div>
  </NumberFieldRoot>
</template>
