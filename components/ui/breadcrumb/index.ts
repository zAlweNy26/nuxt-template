
export { default as Breadcrumb } from './Breadcrumb.vue'

export type BreadcrumbItem = {
    label: string
    href?: string
    icon?: string
    current?: boolean
    class?: ClassValue
    disabled?: boolean
    onClick?: () => void
}

export type BreadcrumbItems = [BreadcrumbItem, ...BreadcrumbItem[]]

export const breadcrumbVariants = compose({
    slots: {
        list: 'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
        item: 'inline-flex items-center gap-1.5',
        separator: 'inline-flex items-center gap-1.5',
    },
})

export type BreadcrumbProps = { 
    items: BreadcrumbItems
    class?: ClassValue
    ui?: {
        [K in keyof typeof breadcrumbVariants.slots]?: ClassValue
    }
}