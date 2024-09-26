import type { ComboboxItemProps } from 'radix-vue'

export { default as Command } from './Command.vue'

// eslint-disable-next-line ts/no-explicit-any
export type AcceptableValue = string | number | boolean | Record<string, any>

export type CommandItem<T extends AcceptableValue> = {
	group?: string
	label: string
	slot?: string
	shortcuts?: Shortcuts
} & ComboboxItemProps<T>

export type CommandItems<T extends AcceptableValue> = [CommandItem<T>, ...CommandItem<T>[]]
