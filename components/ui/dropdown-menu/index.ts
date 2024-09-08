import type { DropdownMenuRadioItemProps } from 'radix-vue'

export { default as DropdownMenu } from './DropdownMenu.vue'
export { DropdownMenuGroup } from 'radix-vue'
export { default as DropdownMenuRadioGroup } from './DropdownMenuRadioGroup.vue'
export { default as DropdownMenuItem } from './DropdownMenuItem.vue'
export { default as DropdownMenuCheckGroup } from './DropdownMenuCheckGroup.vue'
export { default as DropdownMenuSeparator } from './DropdownMenuSeparator.vue'
export { default as DropdownMenuLabel } from './DropdownMenuLabel.vue'
export { default as DropdownMenuSub } from './DropdownMenuSub.vue'

export type AcceptableValue = string | number

export type DropdownMenuItem<T extends AcceptableValue = AcceptableValue> = DropdownMenuRadioItemProps & {
    label: string
    slot?: string
    value: T
}

export type DropdownMenuItems<T extends AcceptableValue = AcceptableValue> = [DropdownMenuItem<T>, ...DropdownMenuItem<T>[]]