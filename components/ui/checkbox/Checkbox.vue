<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { type CheckboxVariants, checkboxVariants } from '.'

interface Props extends CheckboxRootProps {
  variant?: CheckboxVariants['variant']
  size?: CheckboxVariants['size']
  class?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'sm',
  text: undefined,
  class: undefined,
  labelClass: undefined,
})
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <div class="flex items-center space-x-2">
    <CheckboxRoot v-bind="forwarded" :class="cn(checkboxVariants({ variant, size }), props.class)">
      <CheckboxIndicator class="flex size-full items-center justify-center text-current">
        <slot>
          <Icon name="ph:check-bold" class="size-4" />
        </slot>
      </CheckboxIndicator>
    </CheckboxRoot>
    <Label v-if="text" :for="id" :size :class="props.labelClass">
      {{ text }}
    </Label>
  </div>
</template>
