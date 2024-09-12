import type { DropdownMenuRadioItemProps } from 'radix-vue'

export { default as DropdownMenu } from './DropdownMenu.vue'
export { DropdownMenuGroup } from 'radix-vue'
export { default as DropdownMenuRadioGroup } from './DropdownMenuRadioGroup.vue'
export { default as DropdownMenuItem } from './DropdownMenuItem.vue'
export { default as DropdownMenuCheckItem } from './DropdownMenuCheckItem.vue'
export { default as DropdownMenuSeparator } from './DropdownMenuSeparator.vue'
export { default as DropdownMenuLabel } from './DropdownMenuLabel.vue'
export { default as DropdownMenuSub } from './DropdownMenuSub.vue'

export type DropdownRadioItem = DropdownMenuRadioItemProps & {
    label: string
    slot?: string
    value: string
}

export type DropdownRadioItems = [DropdownRadioItem, ...DropdownRadioItem[]]