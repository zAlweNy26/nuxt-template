<script setup lang="ts" generic="T extends AcceptableValue">
import type { ClassValue } from 'clsx'
import type { ComboboxRootEmits, ComboboxRootProps, ComboboxContentProps } from 'radix-vue'
import { ComboboxRoot, useForwardPropsEmits, ComboboxContent, 
  ComboboxSeparator, ComboboxEmpty, ComboboxGroup, ComboboxLabel, ComboboxItem } from 'radix-vue'
import type { AcceptableValue, CommandItems } from '.'

const props = defineProps<{ 
  class?: ClassValue
  contentClass?: ClassValue
  groupClass?: ClassValue
  itemClass?: ClassValue
  root?: ComboboxRootProps<T>
  content?: ComboboxContentProps
  items: CommandItems<T>
  noGroupAsFirst?: boolean
}>()

const emits = defineEmits<ComboboxRootEmits<T>>()

const rootProps = useForwardPropsEmits(() => props.root ?? {}, emits)
const contentProps = useForwardPropsEmits(() => props.content ?? {}, emits)

const groups = computed(() => {
  const res = Object.entries(_GroupBy(props.items, 'group'))
  if (props.noGroupAsFirst) res.reverse()
  return res
})
</script>

<template>
  <ComboboxRoot v-bind="rootProps" :class="cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', props.class)">
    <slot />
    <ComboboxContent v-bind="contentProps" :class="cn('max-h-[138px] transition-all overflow-y-auto overflow-x-hidden', props.contentClass)">
      <div role="presentation">
        <ComboboxEmpty asChild>
          <slot name="empty">
            <div class="py-6 text-center text-sm">
              {{ $t('table.noResults') }}
            </div>
          </slot>
        </ComboboxEmpty>
        <ComboboxSeparator class="-mx-1 h-px bg-border" />
        <template v-for="([heading, children], gindex) in groups" :key="gindex">
          <ComboboxGroup
            :class="cn('overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground', props.groupClass)">
            <ComboboxLabel v-if="heading && heading !== 'undefined'" class="px-2 py-1 text-xs font-medium text-muted-foreground">
              {{ heading }}
            </ComboboxLabel>
            <ComboboxItem v-for="(item, index) in children" :key="index" :value="item.value" :disabled="item.disabled"
              :class="cn('relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.itemClass)">
              <slot name="item" :item>
                {{ item.label }}
              </slot>
            </ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator v-if="gindex < groups.length - 1" class="-mx-1 h-px bg-border" />
        </template>
      </div>
    </ComboboxContent>
  </ComboboxRoot>
</template>
