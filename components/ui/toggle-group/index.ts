import type { GroupVariants } from '../combo-group'

export { default as ToggleGroup } from './ToggleGroup.vue'
export { default as ToggleGroupItem } from './ToggleGroupItem.vue'

export const ToggleGroupKey: InjectionKey<Ref<GroupVariants & { 
    state: string | string[] | undefined
}>> = Symbol('toggle-group-key')