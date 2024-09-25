<script lang="ts" setup>
const modalState = inject(modalInjectionKey)

const { isOpen, reset } = useModal()
</script>

<template>
	<ResponsiveDialog v-if="modalState" v-model="isOpen" v-bind="modalState.options"
		@update:modelValue="(v) => v && reset()">
		<template #content>
			<component :is="modalState.component" v-bind="modalState.props" />
		</template>
	</ResponsiveDialog>
</template>
