<!-- eslint-disable ts/no-explicit-any -->
<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
import type { TreeItem, TreeItems } from '.'
import { type FlattenedItem, type TreeRootEmits, type TreeRootProps, type TreeVirtualizerProps, useForwardPropsEmits } from 'reka-ui'
import { Tree } from 'reka-ui/namespaced'

const props = defineProps<TreeRootProps<TreeItem<T>, T> & TreeVirtualizerProps & {
	/** Additional classes */
	class?: ClassValue
	/** List of items */
	items: TreeItems<T>
	/** text content for each item to achieve type-ahead feature */
	textContent?: (item: T) => string
}>()

const emits = defineEmits<TreeRootEmits<T>>()

const delegatedProps = reactiveOmit(props, 'class', 'estimateSize', 'textContent')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<Tree.Root
		:class="cn('w-56 select-none list-none rounded-lg border border-muted bg-background p-2 text-sm font-medium text-foreground', props.class)"
		v-bind="forwarded">
		<slot />
		<Tree.Virtualizer v-slot="{ item }" :textContent :estimateSize>
			<Tree.Item v-slot="slotProps" :style="{ 'padding-left': `${item.level - 0.5}rem` }" v-bind="item.bind"
				:class="cn('w-full flex cursor-pointer items-center rounded px-2 py-1 outline-none transition-shadow data-[selected]:bg-primary/20 focus:ring-2 focus:ring-primary', item.value.class)"
				@select="(event) => {
					if (multiple && event.detail.originalEvent.type === 'click') event.preventDefault()
				}" @toggle="(event) => {
					if (multiple && event.detail.originalEvent.type === 'keydown') event.preventDefault()
				}">
				<slot name="item" v-bind="{ ...(item as FlattenedItem<TreeItem<T>>), ...slotProps }">
					<Checkbox v-if="multiple" :modelValue="slotProps.isIndeterminate ? 'indeterminate' : slotProps.isSelected" class="mr-2"
						tabindex="-1" size="xs" @click.stop @update:modelValue="slotProps.handleSelect" />
					<Icon v-if="item.hasChildren" name="ph:caret-right" :class="cn('size-4 transition-transform', slotProps.isExpanded && 'rotate-90')" />
					<div class="pl-2">
						{{ getKey(item.value as TreeItem<T>) }}
					</div>
				</slot>
			</Tree.Item>
		</Tree.Virtualizer>
	</Tree.Root>
</template>
