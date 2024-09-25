<script setup lang="ts">
import type { TabItems } from '.'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, type TabsRootProps, TabsTrigger } from 'radix-vue'

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
	<TabsRoot v-model="model" v-bind="props.root"
		:class="cn('flex gap-2', { 'flex-col': props.root?.orientation === 'horizontal' })">
		<TabsList :loop :class="cn(
			'inline-flex relative items-center justify-center transition-colors gap-1 rounded-lg bg-muted p-1 text-muted-foreground',
			props.root?.orientation === 'vertical' ? 'flex-col' : '',
		)">
			<TabsIndicator :class="cn(
				'absolute left-0 transition-[width,transform] duration-200', props.root?.orientation === 'vertical'
					? 'w-full top-0 px-1 h-[--radix-tabs-indicator-size] translate-y-[--radix-tabs-indicator-position]'
					: 'h-full translate-x-[--radix-tabs-indicator-position] py-1 bottom-0 w-[--radix-tabs-indicator-size]',
			)">
				<div class="size-full rounded-md bg-background shadow" />
			</TabsIndicator>
			<TabsTrigger v-for="item in items" :key="item.id" :value="item.id" :disabled="item.disabled" :class="cn(
				'inline-flex z-10 items-center justify-center data-[state=active]:text-foreground whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
