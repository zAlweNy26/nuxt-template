<script lang="ts" setup>
import { Toaster, type ToasterProps } from 'vue-sonner'

const props = withDefaults(defineProps<ToasterProps>(), {
	position: 'top-right',
	duration: 3000,
	offset: 16,
})
</script>

<template>
	<Toaster
		class="toaster group"
		v-bind="props"
		:toastOptions="{
			classes: {
				toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
				error: 'group-[.toaster]:bg-error group-[.toaster]:text-error-foreground',
				success: 'group-[.toaster]:bg-success group-[.toaster]:text-success-foreground',
				warning: 'group-[.toaster]:bg-warning group-[.toaster]:text-warning-foreground',
				info: 'group-[.toaster]:bg-info group-[.toaster]:text-info-foreground',
				description: 'group-[.toast]:text-muted-foreground',
				actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
				cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
			},
		}"
	/>
</template>
