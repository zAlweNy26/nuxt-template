<script setup lang="ts">
import type { DateRange } from 'reka-ui'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

const { locale } = storeToRefs(useSettingsStore())
const { t } = useI18n()
const model = defineModel<DateRange>({ default: {} })

const dateText = computed(() => {
	const date = model.value
	if (date.start && date.end) {
		const areEqual = date.start.compare(date.end) === 0
		if (areEqual) {
			const df = new DateFormatter(locale.value, { dateStyle: 'long' })
			return df.format(date.start.toDate(getLocalTimeZone()))
		}
		else {
			const df = new DateFormatter(locale.value, { dateStyle: 'medium' })
			return `${df.format(date.start.toDate(getLocalTimeZone()))} - ${df.format(date.end.toDate(getLocalTimeZone()))}`
		}
	}
	else
		return t('input.dateRange')
})
</script>

<template>
	<Popover class="w-auto border-none p-0">
		<Button variant="outline"
			:class="cn('w-72 justify-start text-left font-normal', !model.start && 'text-muted-foreground')">
			<Icon name="ph:calendar-dots" class="mr-2 size-4" />
			{{ dateText }}
		</Button>
		<template #content>
			<RangeCalendar v-model="model" initialFocus @update:startValue="(startDate) => model.start = startDate" />
		</template>
	</Popover>
</template>
