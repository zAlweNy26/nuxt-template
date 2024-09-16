export { default as Marquee } from './Marquee.vue';
export { default as MarqueeItem } from './MarqueeItem.vue';

export interface MarqueeProps {
    class?: ClassValue
    reverse?: boolean
    pauseOnHover?: boolean
    vertical?: boolean
    repeat?: number
    duration?: number
}

export const MarqueeKey: InjectionKey<MarqueeProps> = Symbol('marquee-key')