<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { type CheckboxVariants, checkboxVariants } from '.'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'

interface Props extends CheckboxRootProps {
  variant?: CheckboxVariants['variant']
  size?: CheckboxVariants['size']
  class?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  text: string
}

const props = defineProps<Props>()
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
      <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
        <slot>
          <Icon icon="ph:check-bold" class="size-4" />
        </slot>
      </CheckboxIndicator>
    </CheckboxRoot>
    <Label :for="id" :size :class="props.labelClass">
      {{ text }}
    </Label>
  </div>
</template>
