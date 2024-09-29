import type { ToggleGroupRootProps } from 'reka-ui'
import type { GroupVariants } from '../combo-group'

export { default as ToggleGroup } from './ToggleGroup.vue'
export { default as ToggleGroupItem } from './ToggleGroupItem.vue'

export type ToggleKey = GroupVariants & Pick<ToggleGroupRootProps, 'modelValue'>

export const ToggleGroupKey: InjectionKey<Ref<ToggleKey>> = Symbol('toggle-group-key')
