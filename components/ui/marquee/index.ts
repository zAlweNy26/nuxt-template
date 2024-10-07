export { default as Marquee } from './Marquee.vue'

export interface MarqueeProps {
	class?: ClassValue
	reverse?: boolean
	pauseOnHover?: boolean
	vertical?: boolean
	repeat?: number
	duration?: number
}
