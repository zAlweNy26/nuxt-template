export { default as Accordion } from './Accordion.vue'

export type AccordionItem = {
    id: string
    label?: string
    class?: ClassValue
    disabled?: boolean
}

export type AccordionItems = [AccordionItem, ...AccordionItem[]]