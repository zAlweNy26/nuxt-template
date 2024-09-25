<script setup lang="ts">
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'

const { locale } = storeToRefs(useSettingsStore())

const model = defineModel<DateValue>()
</script>

<template>
	<Popover class="w-auto border-none p-0">
		<Button variant="outline"
			:class="cn('w-72 justify-start text-left font-normal', !model && 'text-muted-foreground')">
			<Icon name="ph:calendar-dots" class="mr-2 size-4" />
			{{ model ? new DateFormatter(locale, { dateStyle: 'long' })
				.format(model.toDate(getLocalTimeZone())) : $t('input.date') }}
		</Button>
		<template #content>
			<Calendar v-model="model" initialFocus />
		</template>
	</Popover>
</template>
