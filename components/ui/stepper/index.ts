export { default as Stepper } from './Stepper.vue'

export interface StepperItem {
	title: string
	description?: string
	icon?: string
	disabled?: boolean
	class?: ClassValue
	completed?: boolean
}

export type StepperItems = [StepperItem, StepperItem, ...StepperItem[]]
