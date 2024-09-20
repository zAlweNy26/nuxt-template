import type { AccordionRootProps } from 'radix-vue'

export { default as Accordion } from './Accordion.vue'

export type AccordionItem = {
    id: string
    label?: string
    class?: ClassValue
    disabled?: boolean
}

export type AccordionItems = [AccordionItem, ...AccordionItem[]]

export const accordionVariants = compose({
    slots: {
        trigger: 'flex flex-1 gap-1 w-full items-center justify-between py-2 text-sm font-medium transition-all cursor-pointer [&[data-state=open]>.accordion-icon]:rotate-180',
        content: 'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        item: 'pb-2',
        icon: 'accordion-icon size-4 shrink-0 text-muted-foreground transition-transform duration-200'
    },
})

export type AccordionProps = AccordionRootProps & { 
    items: AccordionItems
    class?: ClassValue
    ui?: {
        [K in keyof typeof accordionVariants.slots]?: ClassValue
    }
}