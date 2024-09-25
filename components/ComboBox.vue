<script setup lang="ts" generic="T extends AcceptableValue">
import type { AcceptableValue, CommandItems } from './ui/command'

defineProps<{
	placeholder: string
	searchPlaceholder?: string
	items: CommandItems<T>
}>()

const open = ref(false)
const value = ref<T>()
</script>

<template>
	<Popover v-model:open="open" class="w-[--radix-popper-anchor-width] max-w-full p-0">
		<slot>
			<Button variant="outline" role="combobox" :aria-expanded="open" class="w-48 justify-between">
				{{ value ? items.find((item) => item.value === value)?.label : placeholder }}
				<Icon name="ph:caret-up-down" class="ml-2 size-4 shrink-0 opacity-50" />
			</Button>
		</slot>
		<template #content>
			<Command v-model="value" v-model:open="open" :items itemClass="justify-between">
				<template v-if="$slots.empty" #empty>
					<slot name="empty" />
				</template>
				<template #item="{ item }">
					<slot name="item" :item>
						{{ item.label }}
						<Icon name="ph:check-bold"
							:class="cn('ml-2 size-4', value === item.value ? 'opacity-100' : 'opacity-0')" />
					</slot>
				</template>
			</Command>
		</template>
	</Popover>
</template>
