<script setup lang="ts">
import { TabsRoot, TabsTrigger, TabsList, TabsContent, type TabsRootProps } from 'radix-vue'
import type { TabItems } from '.'
import type { ClassValue } from 'clsx'

const props = defineProps<{
  root?: TabsRootProps
  loop?: boolean
  forceMount?: boolean
  items: TabItems
  listClass?: ClassValue
  contentClass?: ClassValue
}>()

const model = defineModel<string | number>()

onMounted(() => {
  model.value = model.value ?? props.root?.defaultValue
})
</script>

<template>
  <TabsRoot v-model="model" v-bind="props.root" :class="cn('flex gap-2', { 'flex-col': props.root?.orientation === 'horizontal' })">
    <TabsList :loop :class="cn(
      'inline-flex items-center justify-center transition-colors gap-1 rounded-lg bg-muted p-1 text-muted-foreground',
      props.root?.orientation === 'vertical' ? 'flex-col' : '',
    )">
      <TabsTrigger v-for="item in items" :key="item.id" :value="item.id" :disabled="item.disabled" :class="cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        props.root?.orientation === 'vertical' ? 'w-full' : '',
        item.class,
      )">
        <slot :name="`${item.id}-trigger`">
          <Icon v-if="item.icon" :name="item.icon" class="size-4" />
          <span>{{ item.label }}</span>
        </slot>
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="item in items" :key="item.id" :value="item.id" :forceMount
      :class="cn('ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.contentClass)">
      <slot :name="`${item.id}-content`" />
    </TabsContent>
  </TabsRoot>
</template>
