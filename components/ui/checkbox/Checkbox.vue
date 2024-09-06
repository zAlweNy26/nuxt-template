<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits, type CheckboxRootEmits } from 'radix-vue'
import { type CheckboxProps, checkboxVariants } from '.'

const { root, class: mainClass } = defineProps<CheckboxProps>()
const emits = defineEmits<CheckboxRootEmits>()

const forwarded = useForwardPropsEmits(() => root ?? {}, emits)
</script>

<template>
  <div class="flex items-center space-x-2">
    <CheckboxRoot v-bind="forwarded" :class="cn(checkboxVariants({ variant, size }), mainClass)">
      <CheckboxIndicator class="flex size-full items-center justify-center text-current">
        <slot>
          <Icon name="ph:check-bold" class="size-4" />
        </slot>
      </CheckboxIndicator>
    </CheckboxRoot>
    <Label v-if="text" :for="root?.id" :size :class="labelClass">
      {{ text }}
    </Label>
  </div>
</template>
