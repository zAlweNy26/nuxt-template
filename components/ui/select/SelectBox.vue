<script lang="ts" setup generic="T extends AcceptableValue">
import type { AcceptableValue, SelectRootEmits, SelectRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { Select } from 'reka-ui/namespaced'
import { type SelectItems, type SelectVariants, selectVariants } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
	root?: Omit<SelectRootProps, 'modelValue'>
	class?: ClassValue
	color?: SelectVariants['color']
	size?: SelectVariants['size']
	contentClass?: ClassValue
	placeholder: string
	disabled?: boolean
	items: SelectItems<T>
}>()

const emits = defineEmits<SelectRootEmits<T>>()

const model = defineModel<T | Array<T>>()

const forwarded = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
	<Select.Root v-model="model" v-bind="forwarded">
		<Select.Trigger v-bind="$attrs" :class="cn(selectVariants({ color, size }), props.class)">
			<Select.Value aria-label="value">
				{{ items.find((item) => item.value === model)?.label || placeholder }}
			</Select.Value>
			<Select.Icon asChild>
				<Icon name="ph:caret-up-down" class="size-4 opacity-50" />
			</Select.Icon>
		</Select.Trigger>
		<Select.Portal>
			<Select.Content position="popper"
				:class="cn(
					'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', contentClass)">
				<Select.ScrollUpButton class="flex cursor-default items-center justify-center py-1">
					<Icon name="ph:caret-up" class="size-4" />
				</Select.ScrollUpButton>
				<Select.Viewport
					class="h-[--reka-select-trigger-height] w-full min-w-[--reka-select-trigger-width] p-1">
					<Select.Group class="w-full p-1">
						<Select.Item v-for="(item, index) in props.items" :key="`si-${index}`" :value="item.value"
							class="relative flex w-full cursor-default select-none items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground">
							<slot :item>
								<Select.ItemText>
									{{ item.label }}
								</Select.ItemText>
							</slot>
							<Select.ItemIndicator asChild>
								<slot name="icon">
									<Icon name="ph:check-bold" class="size-4" />
								</slot>
							</Select.ItemIndicator>
						</Select.Item>
					</Select.Group>
				</Select.Viewport>
				<Select.ScrollDownButton class="flex cursor-default items-center justify-center py-1">
					<Icon name="ph:caret-down" class="size-4" />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
</template>
