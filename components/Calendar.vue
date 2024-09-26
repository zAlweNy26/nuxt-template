<script setup lang="ts">
import type { CalendarRootEmits, CalendarRootProps } from 'radix-vue'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { useForwardPropsEmits } from 'radix-vue'
import { Calendar } from 'radix-vue/namespaced'
// import { createDecade, createYear, toDate } from 'radix-vue/date'
// import type { SelectItems } from './ui/select'
import { buttonVariants } from './ui/button'

const props = withDefaults(defineProps<CalendarRootProps & { class?: ClassValue }>(), {
	class: undefined,
	modelValue: undefined,
	placeholder() {
		return today(getLocalTimeZone())
	},
	fixedWeeks: true,
	weekdayFormat: 'short',
})

const emits = defineEmits<CalendarRootEmits>()

const { locale } = storeToRefs(useSettingsStore())

const delegatedProps = reactiveOmit(props, 'class', 'placeholder')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const placeholder = defineModel<DateValue>({ default: today(getLocalTimeZone()) })

/* const formatter = useDateFormatter(locale.value)

const monthItems = (date: DateValue) =>
  createYear({ dateObj: date }).map((d) => ({
	value: d.month.toString(),
	label: _StartCase(formatter.custom(toDate(d), { month: 'long' })),
  })) as SelectItems

const yearItems = (date: DateValue) =>
  createDecade({ dateObj: date, startIndex: -10, endIndex: 10 }).map((d) => ({
	value: d.year.toString(),
	label: d.year.toString(),
  })) as SelectItems */
</script>

<template>
	<Calendar.Root v-slot="{ grid, weekDays }" v-model:placeholder="placeholder" v-bind="{ ...forwarded, locale }"
		:class="cn('rounded-lg border p-2', props.class)">
		<Calendar.Header class="relative flex w-full items-center justify-between pt-1">
			<Calendar.Prev
				:class="cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:opacity-100')">
				<Icon name="ph:caret-left-bold" class="size-4" />
			</Calendar.Prev>
			<Calendar.Heading v-slot="{ headingValue }" class="text-sm font-medium">
				<slot name="heading" :headingValue>
					{{ _StartCase(headingValue) }}
				</slot>
			</Calendar.Heading>
			<Calendar.Next
				:class="cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:opacity-100')">
				<Icon name="ph:caret-right-bold" class="size-4" />
			</Calendar.Next>
			<!-- <Calendar.Heading class="flex w-full text-sm font-medium items-center justify-between gap-2">
				<SelectBox placeholder="Select month" aria-label="Select month" :root="{ defaultValue: placeholder.month.toString() }"
				class="w-3/5" contentClass="h-52" :items="monthItems(date)" @update:modelValue="(v) => {
					if (!v || !placeholder) return
					if (Number(v) === placeholder?.month) return
					placeholder = placeholder.set({ month: Number(v) })
				}" />
				<SelectBox placeholder="Select year" aria-label="Select year" :root="{ defaultValue: placeholder.year.toString() }"
				class="w-2/5" contentClass="h-52" :items="yearItems(date)" @update:modelValue="(v) => {
					if (!v || !placeholder) return
					if (Number(v) === placeholder?.year) return
					placeholder = placeholder.set({ year: Number(v) })
				}" />
			</Calendar.Heading> -->
		</Calendar.Header>
		<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
			<Calendar.Grid v-for="month in grid" :key="month.value.toString()" class="w-full border-collapse space-y-2">
				<Calendar.GridHead class="grid">
					<Calendar.GridRow class="flex gap-1">
						<Calendar.HeadCell v-for="day in weekDays" :key="day"
							class="w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground">
							{{ _StartCase(day) }}
						</Calendar.HeadCell>
					</Calendar.GridRow>
				</Calendar.GridHead>
				<Calendar.GridBody class="grid space-y-1">
					<Calendar.GridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`"
						class="flex gap-1">
						<Calendar.Cell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate"
							class="relative size-8 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-view])]:bg-accent/50">
							<Calendar.CellTrigger :day="weekDate" :month="month.value" :class="cn(
								buttonVariants({ variant: 'ghost' }),
								'size-8 p-0 font-normal',
								'[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground',
								// Selected
								'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground',
								// Disabled
								'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
								// Unavailable
								'data-[unavailable]:text-error-foreground data-[unavailable]:line-through',
								// Outside months
								'data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50 [&[data-outside-view][data-selected]]:bg-accent/50 [&[data-outside-view][data-selected]]:text-muted-foreground [&[data-outside-view][data-selected]]:opacity-30',
							)" />
						</Calendar.Cell>
					</Calendar.GridRow>
				</Calendar.GridBody>
			</Calendar.Grid>
		</div>
	</Calendar.Root>
</template>
