import type { ClassValue } from 'clsx'

export { default as Tabs } from './Tabs.vue'

export type TabItem = {
    id: string
    label: string
    class?: ClassValue
    disabled?: boolean
    icon?: string
}

export type TabItems = [TabItem, ...TabItem[]]