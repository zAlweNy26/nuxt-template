import type { MenubarRadioItemProps } from 'radix-vue'

export { default as Menubar } from './Menubar.vue'
export { default as MenubarItem } from './MenubarItem.vue'
export { default as MenubarContent } from './MenubarContent.vue'
export { MenubarMenu, MenubarGroup } from 'radix-vue'
export { default as MenubarRadioGroup } from './MenubarRadioGroup.vue'
export { default as MenubarCheckItem } from './MenubarCheckItem.vue'
export { default as MenubarSeparator } from './MenubarSeparator.vue'
export { default as MenubarSub } from './MenubarSub.vue'
export { default as MenubarTrigger } from './MenubarTrigger.vue'
export { default as MenubarLabel } from './MenubarLabel.vue'

export type MenuRadioItem = MenubarRadioItemProps & {
    label: string
    slot?: string
    value: string
}

export type MenuRadioItems = [MenuRadioItem, ...MenuRadioItem[]]