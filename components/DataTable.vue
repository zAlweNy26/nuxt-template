<script lang="ts" setup generic="TData, TValue">
import type { AccessorKeyColumnDef, ColumnDef, ColumnFiltersState, ColumnPinningState,
	ExpandedState, RowSelectionState, SortingState, Updater, VisibilityState } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel,
	getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'

export type DataColumnDef<D, V = unknown> = ColumnDef<D, V> & {
	pinned?: 'left' | 'right'
	headerClass?: ClassValue
	cellClass?: ClassValue
}

const props = withDefaults(defineProps<{
	class?: ClassValue
	columns: DataColumnDef<TData, TValue>[]
	captionClass?: ClassValue
	loading?: boolean
	total: number
	selectable?: boolean
	pagination?: 'client' | 'server' | 'none'
	sorting?: 'client' | 'server'
	rowClass?: ClassValue
	rows: TData[]
}>(), {
	captionClass: undefined,
	class: undefined,
	loading: false,
	selectable: false,
	pagination: 'client',
	sorting: 'client',
	rowClass: undefined,
})

function valueUpdater<T, U extends Updater<T>>(updaterOrValue: U, ref: Ref<T>) {
	ref.value = typeof updaterOrValue === 'function'
		? updaterOrValue(ref.value)
		: updaterOrValue
}

function getColumnId(column: DataColumnDef<TData, TValue>, index: number) {
	if ((column as AccessorKeyColumnDef<TData, TValue>).accessorKey)
		return (column as AccessorKeyColumnDef<TData, TValue>).accessorKey as string
	if (column.id) return column.id
	if (typeof column.header === 'string') return column.header
	return index.toString()
}

const selectedState = defineModel<RowSelectionState>({ default: {} })
const sortingState = defineModel<SortingState>('sort', { default: [] })
const columnVisibility = defineModel<VisibilityState>('visible', { default: {} })
const expandedState = ref<ExpandedState>({})
const columnFilters = ref<ColumnFiltersState>([])
const columnPinning = ref<ColumnPinningState>(props.columns.reduce((acc, c, i) => {
	const left = [...acc.left ?? []]
	const right = [...acc.right ?? []]
	if (c.pinned === 'left') left.push(getColumnId(c, i))
	if (c.pinned === 'right') right.push(getColumnId(c, i))
	return { left, right }
}, {} as ColumnPinningState))

const table = useVueTable({
	get data() { return props.rows },
	get columns() { return props.columns },
	getCoreRowModel: getCoreRowModel(),
	get rowCount() { return props.total },
	get manualPagination() { return props.pagination === 'server' },
	get manualSorting() { return props.sorting === 'server' },
	getPaginationRowModel: props.pagination === 'server' ? undefined : getPaginationRowModel(),
	getSortedRowModel: props.pagination === 'server' ? undefined : getSortedRowModel(),
	getFilteredRowModel: props.pagination === 'server' ? undefined : getFilteredRowModel(),
	getExpandedRowModel: props.pagination === 'server' ? undefined : getExpandedRowModel(),
	onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sortingState),
	onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
	onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
	onColumnPinningChange: updaterOrValue => valueUpdater(updaterOrValue, columnPinning),
	onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, selectedState),
	onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expandedState),
	state: {
		get sorting() { return sortingState.value },
		get columnFilters() { return columnFilters.value },
		get columnVisibility() { return columnVisibility.value },
		get columnPinning() { return columnPinning.value },
		get rowSelection() { return selectedState.value },
		get expanded() { return expandedState.value },
	},
})

defineExpose({ table })
</script>

<template>
	<div class="relative w-full overflow-x-auto overflow-y-hidden">
		<table :class="cn('w-full caption-bottom text-sm', props.class)">
			<caption v-if="$slots.caption" :class="captionClass">
				<slot name="caption" />
			</caption>
			<thead class="[&_tr]:border-b">
				<tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id"
					class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
					<th v-for="header in headerGroup.headers" :key="header.id" :data-pinned="header.column.getIsPinned()"
						:class="cn(
							'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5',
							{ 'sticky bg-background/95': header.column.getIsPinned() },
							header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
							(header.column.columnDef as DataColumnDef<TData>).headerClass,
						)">
						<slot v-if="$slots[`${header.id}-column`]" :name="`${header.id}-column`" v-bind="header.getContext()" />
						<FlexRender v-else-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
					</th>
				</tr>
			</thead>
			<tbody v-auto-animate class="[&_tr:last-child]:border-0">
				<template v-if="table.getRowModel().rows?.length">
					<template v-for="row in table.getRowModel().rows" :key="row.id">
						<tr :data-state="row.getIsSelected() ? 'selected' : undefined"
							:class="cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', rowClass)">
							<td v-for="cell in row.getVisibleCells()" :key="cell.id" :data-pinned="cell.column.getIsPinned()"
								:class="cn(
									'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5',
									{ 'sticky bg-background/95': cell.column.getIsPinned() },
									cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
									(cell.column.columnDef as DataColumnDef<TData>).cellClass,
								)">
								<slot v-if="$slots[`${cell.column.id}-row`]" :name="`${cell.column.id}-row`" :context="cell.getContext()" />
								<FlexRender v-else :render="cell.column.columnDef.cell" :props="cell.getContext()" />
							</td>
						</tr>
						<tr v-if="row.getIsExpanded() && $slots.expanded"
							class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
							<td :colspan="row.getAllCells().length"
								class="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5">
								<slot name="expanded" :row />
							</td>
						</tr>
					</template>
				</template>
				<template v-else-if="loading">
					<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
						<td :colspan="columns.length"
							class="h-24 p-2 text-center align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5">
							<slot name="loading">
								<div class="grid place-content-center gap-2">
									<Icon name="ph:arrow-clockwise" class="mx-auto size-6 animate-spin" />
									<p class="text-center text-sm font-medium italic">
										{{ $t('table.loading') }}
									</p>
								</div>
							</slot>
						</td>
					</tr>
				</template>
				<template v-else>
					<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
						<slot name="empty">
							<td :colspan="columns.length"
								class="h-24 p-2 text-center align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5">
								{{ $t('table.noData') }}
							</td>
						</slot>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>
