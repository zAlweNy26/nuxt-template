import type { ComboboxItemProps } from 'radix-vue'

export { default as Command } from './Command.vue'
export { default as CommandInput } from './CommandInput.vue'
export { default as CommandSeparator } from './CommandSeparator.vue'

export type AcceptableValue = string | number | boolean | Record<string, any>

export type CommandItem<T extends AcceptableValue> = {
    group?: string
    label: string
    slot?: string
} & ComboboxItemProps<T>

export type CommandItems<T extends AcceptableValue> = [CommandItem<T>, ...CommandItem<T>[]]