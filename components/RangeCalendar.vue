<script lang="ts" setup>
import { getLocalTimeZone, today } from '@internationalized/date'
import {
	RangeCalendarCell, RangeCalendarCellTrigger, RangeCalendarGrid,
	RangeCalendarGridBody, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell,
	RangeCalendarHeader, RangeCalendarHeading, RangeCalendarNext, RangeCalendarPrev,
	RangeCalendarRoot, type RangeCalendarRootEmits, type RangeCalendarRootProps, useForwardPropsEmits,
} from 'radix-vue'
import { buttonVariants } from './ui/button'

const props = withDefaults(defineProps<RangeCalendarRootProps & { class?: ClassValue }>(), {
	class: undefined,
	placeholder() {
		return today(getLocalTimeZone())
	},
	fixedWeeks: true,
	weekdayFormat: 'short',
})

const emits = defineEmits<RangeCalendarRootEmits>()

const { locale } = storeToRefs(useSettingsStore())

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props
	return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<RangeCalendarRoot v-slot="{ grid, weekDays }" v-bind="{ ...forwarded, locale }"
		:class="cn('rounded-lg border p-2', props.class)">
		<RangeCalendarHeader class="relative flex w-full items-center justify-between pt-1">
			<RangeCalendarPrev
				:class="cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:opacity-100')">
				<Icon name="ph:caret-left-bold" class="size-4" />
			</RangeCalendarPrev>
			<RangeCalendarHeading v-slot="{ headingValue }" class="text-sm font-medium">
				<slot name="heading" :headingValue>
					{{ _StartCase(headingValue) }}
				</slot>
			</RangeCalendarHeading>
			<RangeCalendarNext
				:class="cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:opacity-100')">
				<Icon name="ph:caret-right-bold" class="size-4" />
			</RangeCalendarNext>
		</RangeCalendarHeader>
		<div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
			<RangeCalendarGrid v-for="month in grid" :key="month.value.toString()"
				class="w-full border-collapse space-y-2">
				<RangeCalendarGridHead class="grid">
					<RangeCalendarGridRow class="flex gap-1">
						<RangeCalendarHeadCell v-for="day in weekDays" :key="day"
							class="w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground">
							{{ _StartCase(day) }}
						</RangeCalendarHeadCell>
					</RangeCalendarGridRow>
				</RangeCalendarGridHead>
				<RangeCalendarGridBody class="grid space-y-1">
					<RangeCalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`"
						class="flex gap-1">
						<RangeCalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate"
							class="relative size-8 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-view])]:bg-accent/50 [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-selection-start])]:rounded-l-md">
							<RangeCalendarCellTrigger :day="weekDate" :month="month.value" :class="cn(
								buttonVariants({ variant: 'ghost' }),
								'size-8 p-0 font-normal data-[selected]:opacity-100',
								'[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground data-[highlighted]:bg-accent',
								// Selection Start
								'data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-start]:focus:bg-primary data-[selection-start]:focus:text-primary-foreground',
								// Selection End
								'data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:hover:text-primary-foreground data-[selection-end]:focus:bg-primary data-[selection-end]:focus:text-primary-foreground',
								// Outside months
								'data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50 [&[data-outside-view][data-selected]]:text-muted-foreground [&[data-outside-view][data-selected]]:opacity-30',
								// Disabled
								'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
								// Unavailable
								'data-[unavailable]:text-error-foreground data-[unavailable]:line-through',
							)" />
						</RangeCalendarCell>
					</RangeCalendarGridRow>
				</RangeCalendarGridBody>
			</RangeCalendarGrid>
		</div>
	</RangeCalendarRoot>
</template>
