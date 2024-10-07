import type { MenubarRadioItemProps } from 'reka-ui'

export { default as Menubar } from './Menubar.vue'
export { default as MenubarCheckItem } from './MenubarCheckItem.vue'
export { default as MenubarItem } from './MenubarItem.vue'
export { default as MenubarLabel } from './MenubarLabel.vue'
export { default as MenubarMenu } from './MenubarMenu.vue'
export { default as MenubarRadioGroup } from './MenubarRadioGroup.vue'
export { default as MenubarSeparator } from './MenubarSeparator.vue'
export { default as MenubarSub } from './MenubarSub.vue'
export { MenubarGroup } from 'reka-ui'

export type MenuRadioItem = MenubarRadioItemProps & {
	label: string
	slot?: string
	value: string
}

export type MenuRadioItems = [MenuRadioItem, ...MenuRadioItem[]]
