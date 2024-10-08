<script setup lang="ts" generic="T extends AcceptableValue">
import type { ComboboxContentEmits, ComboboxContentProps, ComboboxInputProps, ComboboxRootEmits, ComboboxRootProps } from 'radix-vue'
import type { AcceptableValue, CommandItems } from '.'
import { useForwardPropsEmits } from 'radix-vue'
import { Combobox } from 'radix-vue/namespaced'

const props = defineProps<{
	class?: ClassValue
	contentClass?: ClassValue
	inputClass?: ClassValue
	groupClass?: ClassValue
	itemClass?: ClassValue
	root?: Omit<ComboboxRootProps<T>, 'modelValue' | 'displayValue'>
	input?: Omit<ComboboxInputProps, 'asChild' | 'as' | 'disabled'>
	content?: ComboboxContentProps
	items: CommandItems<T>
	noGroupAsFirst?: boolean
	searchPlaceholder?: string
}>()

const emits = defineEmits<ComboboxRootEmits<T> & ComboboxContentEmits>()

const model = defineModel<T | Array<T>>()

const rootProps = useForwardPropsEmits(() => props.root ?? {}, emits)
const contentProps = useForwardPropsEmits(() => props.content ?? {}, emits)

const groups = computed(() => {
	const res = Object.entries(_GroupBy(props.items, 'group'))
	if (props.noGroupAsFirst) res.reverse()
	return res
})
</script>

<template>
	<Combobox.Root v-model="model" v-bind="rootProps"
		:displayValue="(v) => items.find((item) => item.value === v)!.label"
		:class="cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', props.class)">
		<div class="flex items-center px-2" cmdk-input-wrapper>
			<Icon name="ph:magnifying-glass" class="mr-2 size-4 shrink-0 opacity-50" />
			<Combobox.Input :disabled="root?.disabled" v-bind="props.input" :class="cn(
				'flex h-8 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
				inputClass,
			)" />
		</div>
		<Combobox.Content v-bind="contentProps" :class="cn('max-h-32 transition-all overflow-y-auto overflow-x-hidden', contentClass)">
			<div role="presentation">
				<Combobox.Empty asChild>
					<slot name="empty">
						<div class="py-6 text-center text-sm">
							{{ $t('table.noResults') }}
						</div>
					</slot>
				</Combobox.Empty>
				<Combobox.Separator class="-mx-1 h-px bg-border" />
				<template v-for="([heading, children], gindex) in groups" :key="gindex">
					<Combobox.Group
						:class="cn(
							'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
							props.groupClass,
						)">
						<Combobox.Label v-if="heading && heading !== 'undefined'"
							class="px-2 py-1 text-xs font-medium text-muted-foreground">
							{{ heading }}
						</Combobox.Label>
						<Combobox.Item v-for="(item, index) in children" :key="index" :value="item.value"
							:disabled="item.disabled"
							:class="cn('relative flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.itemClass)">
							<slot :name="item.slot || 'item'" :item>
								{{ item.label }}
							</slot>
							<span v-if="item.shortcuts" class="flex gap-0.5">
								<Shortcut v-for="(k, i) in item.shortcuts" :key="i" :cap="k" />
							</span>
						</Combobox.Item>
					</Combobox.Group>
					<Combobox.Separator v-if="gindex < groups.length - 1" class="-mx-1 h-px bg-border" />
				</template>
			</div>
		</Combobox.Content>
	</Combobox.Root>
</template>
