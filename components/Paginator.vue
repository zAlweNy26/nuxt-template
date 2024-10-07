<script lang="ts" setup>
import type { PaginationRootProps } from 'reka-ui'
import type { ButtonProps } from './ui/button'
import { Pagination } from 'reka-ui/namespaced'

const props = withDefaults(defineProps<Omit<PaginationRootProps, 'as' | 'asChild' | 'page'> & {
	size?: ButtonProps['size']
	showText?: boolean
	total: number
}>(), {
	disabled: false,
	defaultPage: 1,
	siblingCount: 1,
	showEdges: true,
	showText: false,
	size: 'sm',
})

defineEmits<{
	first: []
	prev: []
	next: []
	last: []
	update: [value: number]
}>()

const model = defineModel<number>({ default: 1 })

const pageFrom = computed(() => (model.value - 1) * props.itemsPerPage + 1)
const pageTo = computed(() => Math.min(model.value * props.itemsPerPage, props.total))
</script>

<template>
	<div class="flex w-full flex-col gap-2">
		<slot :page="model" />
		<div class="flex items-center justify-between gap-2">
			<slot v-if="showText" name="text" :page="model" :pageFrom :pageTo>
				<i18n-t keypath="table.pagination" tag="p" class="text-sm leading-5">
					<span class="font-semibold">{{ pageFrom }}</span>
					<span class="font-semibold">{{ pageTo }}</span>
					<span class="font-semibold">{{ total }}</span>
				</i18n-t>
			</slot>
			<Pagination.Root v-slot="{ page }" v-model:page="model" v-bind="$props">
				<Pagination.List v-slot="{ items }" class="flex items-center gap-1">
					<Pagination.First asChild>
						<Button square variant="outline" :size @click="$emit('first')">
							<Icon name="ph:caret-double-left-bold" class="size-4" />
						</Button>
					</Pagination.First>
					<Pagination.Prev asChild>
						<Button square variant="outline" :size @click="$emit('prev')">
							<Icon name="ph:caret-left-bold" class="size-4" />
						</Button>
					</Pagination.Prev>
					<template v-for="(item, index) in items">
						<Pagination.ListItem v-if="item.type === 'page'" :key="index" :value="item.value" asChild>
							<Button square :size :variant="item.value === page ? 'primary' : 'outline'"
								@click="$emit('update', item.value)">
								{{ item.value }}
							</Button>
						</Pagination.ListItem>
						<Pagination.Ellipsis v-else :key="item.type" :index="index" asChild>
							<slot name="ellipsis">
								<Ellipsis />
							</slot>
						</Pagination.Ellipsis>
					</template>
					<Pagination.Next asChild>
						<Button square variant="outline" :size @click="$emit('next')">
							<Icon name="ph:caret-right-bold" class="size-4" />
						</Button>
					</Pagination.Next>
					<Pagination.Last asChild>
						<Button square variant="outline" :size @click="$emit('last')">
							<Icon name="ph:caret-double-right-bold" class="size-4" />
						</Button>
					</Pagination.Last>
				</Pagination.List>
			</Pagination.Root>
		</div>
	</div>
</template>
