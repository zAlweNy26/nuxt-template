<script setup lang="ts" generic="T extends z.AnyZodObject">
import type { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { type FlattenAndMapPathsValidationResult, Form as FormRoot, type InvalidSubmissionContext } from 'vee-validate'

const props = defineProps<{
	schema: T
}>()

const emit = defineEmits<{
	submit: [value: z.infer<T>]
	error: [value: FlattenAndMapPathsValidationResult<z.infer<T>, z.infer<T>>]
	reset: []
}>()
const typedSchema = computed(() => toTypedSchema(props.schema))
const form = ref<InstanceType<typeof FormRoot> | null>(null)

function onError(ctx: InvalidSubmissionContext<z.infer<T>>) {
	// For some reasons the `value` in the `results` record is not present
	emit('error', _Merge(ctx.results, _MapValues(ctx.values, value => ({ value }))))
}

defineExpose({
	errors: () => form.value!.getErrors<z.infer<T>>(),
	validate: () => form.value!.validate({ mode: 'silent', warn: false }),
	values: () => form.value!.getValues() as z.infer<T>,
})
</script>

<template>
	<FormRoot ref="form" class="flex flex-col gap-2" :validationSchema="typedSchema"
		:initialValues="getZodDefaults(props.schema)" @submit="$emit('submit', $event)" @invalidSubmit="onError"
		@reset="$emit('reset')">
		<slot />
	</FormRoot>
</template>
