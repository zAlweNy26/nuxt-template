/* eslint-disable ts/no-explicit-any */
export { default as Tree } from './Tree.vue'

export type TreeItem<T extends Record<string, any>> = {
	class?: ClassValue
	disabled?: boolean
	icon?: string
	children?: TreeItem<T>[]
} & {
	[K in keyof T]: T[K]
}

export type TreeItems<T extends Record<string, any>> = [TreeItem<T>, ...TreeItem<T>[]]
