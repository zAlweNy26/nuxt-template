<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits, type CheckboxRootEmits } from 'radix-vue'
import { type CheckboxProps, checkboxVariants } from '.'

const props = defineProps<CheckboxProps>()
const emits = defineEmits<CheckboxRootEmits>()

const rootProps = reactiveOmit(props, 'class', 'text', 'color', 'size', 'ui', 'id')

const cbId = computed(() => props.id ?? `cb-${useId()}`)

const { root, indicator, label } = checkboxVariants()

const forwarded = useForwardPropsEmits(rootProps, emits)
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <CheckboxRoot :id="cbId" v-bind="forwarded" :class="cn(root({ color, size }), ui?.root)">
      <CheckboxIndicator :class="cn(indicator(), ui?.indicator)">
        <slot>
          <Icon name="ph:check-bold" class="size-4" />
        </slot>
      </CheckboxIndicator>
    </CheckboxRoot>
    <Label v-if="text" :for="cbId" :size :class="cn(label({ size }), ui?.label)">
      {{ text }}
    </Label>
  </div>
</template>
