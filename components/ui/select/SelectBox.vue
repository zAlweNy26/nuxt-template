<script lang="ts" setup>
import {
	SelectContent, SelectGroup,
	SelectIcon, SelectItem, SelectItemIndicator, SelectItemText, SelectPortal,
	SelectRoot, type SelectRootEmits, type SelectRootProps, SelectScrollDownButton,
	SelectScrollUpButton, SelectTrigger, SelectValue, SelectViewport, useForwardPropsEmits,
} from 'radix-vue'
import { type SelectItems, type SelectVariants, selectVariants } from '.'

defineOptions({
	inheritAttrs: false,
})

const props = defineProps<{
	root?: SelectRootProps
	class?: ClassValue
	color?: SelectVariants['color']
	size?: SelectVariants['size']
	contentClass?: ClassValue
	placeholder: string
	disabled?: boolean
	items: SelectItems
}>()

const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
	<SelectRoot v-bind="forwarded">
		<SelectTrigger v-bind="$attrs" :class="cn(selectVariants({ color, size }), props.class)">
			<SelectValue :placeholder />
			<SelectIcon asChild>
				<Icon name="ph:caret-up-down" class="size-4 opacity-50" />
			</SelectIcon>
		</SelectTrigger>
		<SelectPortal>
			<SelectContent position="popper"
				:class="cn(
					'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', contentClass)">
				<SelectScrollUpButton class="flex cursor-default items-center justify-center py-1">
					<Icon name="ph:caret-up" class="size-4" />
				</SelectScrollUpButton>
				<SelectViewport
					class="h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width] p-1">
					<SelectGroup class="w-full p-1">
						<SelectItem v-for="item in props.items" :key="item.value" :value="item.value"
							class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground">
							<span class="absolute right-2 flex size-3.5 items-center justify-center">
								<SelectItemIndicator>
									<slot name="icon">
										<Icon name="ph:check-bold" class="size-4" />
									</slot>
								</SelectItemIndicator>
							</span>
							<slot :item>
								<SelectItemText>
									{{ item.label }}
								</SelectItemText>
							</slot>
						</SelectItem>
					</SelectGroup>
				</SelectViewport>
				<SelectScrollDownButton class="flex cursor-default items-center justify-center py-1">
					<Icon name="ph:caret-down" class="size-4" />
				</SelectScrollDownButton>
			</SelectContent>
		</SelectPortal>
	</SelectRoot>
</template>
