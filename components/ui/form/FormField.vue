<script lang="ts" setup>
import { Slot as RadixSlot } from 'radix-vue'
import { ErrorMessage as FormError, Field as FormGroup } from 'vee-validate'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
	name: string
	label?: string
	description?: string
	help?: string
}>()

const describedBy = computed(() => props.description ? `${props.name}-form-item-description` : undefined)
</script>

<template>
	<FormGroup v-slot="{ componentField, errorMessage, meta }" :name>
		<div v-auto-animate class="space-y-1" v-bind="$attrs">
			<Label v-if="label || description" :class="cn(errorMessage && 'text-error', 'flex flex-col')" :for="name">
				<span v-if="label">{{ label }}</span>
				<span v-if="description" :id="describedBy" class="text-muted-foreground">{{ description }}</span>
			</Label>
			<RadixSlot :id="name" :aria-describedby="describedBy" :aria-invalid="!!errorMessage">
				<slot v-bind="{ field: componentField, meta }" />
			</RadixSlot>
			<p v-if="help" class="text-sm text-muted-foreground">
				{{ help }}
			</p>
			<FormError :name as="p" class="text-sm font-medium text-error" />
		</div>
	</FormGroup>
</template>
