import type { AcceptableValue, ComboboxItemProps } from 'reka-ui'

export { default as Command } from './Command.vue'

export type CommandItem<T extends AcceptableValue> = {
	group?: string
	label: string
	slot?: string
	shortcuts?: Shortcuts
} & ComboboxItemProps<T>

export type CommandItems<T extends AcceptableValue> = [CommandItem<T>, ...CommandItem<T>[]]
