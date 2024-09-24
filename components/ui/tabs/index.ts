export { default as Tabs } from './Tabs.vue'

export interface TabItem {
	id: string
	label: string
	class?: ClassValue
	disabled?: boolean
	icon?: string
}

export type TabItems = [TabItem, ...TabItem[]]
