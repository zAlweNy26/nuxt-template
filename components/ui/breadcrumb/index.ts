export { default as Breadcrumb } from './Breadcrumb.vue'
export { default as BreadcrumbEllipsis } from './BreadcrumbEllipsis.vue'

export interface BreadcrumbItem {
	label: string
	href?: string
	icon?: string
	current?: boolean
	class?: ClassValue
	disabled?: boolean
	onClick?: () => void
}

export type BreadcrumbItems = [BreadcrumbItem, ...BreadcrumbItem[]]
