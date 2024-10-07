import type { ContextMenuRadioItemProps } from 'reka-ui'

export { default as ContextMenu } from './ContextMenu.vue'
export { default as ContextMenuCheckItem } from './ContextMenuCheckItem.vue'
export { default as ContextMenuItem } from './ContextMenuItem.vue'
export { default as ContextMenuLabel } from './ContextMenuLabel.vue'
export { default as ContextMenuRadioGroup } from './ContextMenuRadioGroup.vue'
export { default as ContextMenuSeparator } from './ContextMenuSeparator.vue'
export { default as ContextMenuSub } from './ContextMenuSub.vue'
export { ContextMenuGroup } from 'reka-ui'

export type ContextRadioItem = ContextMenuRadioItemProps & {
	label: string
	slot?: string
	value: string
}

export type ContextRadioItems = [ContextRadioItem, ...ContextRadioItem[]]
