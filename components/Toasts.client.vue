<script lang="ts" setup>
import { Toaster, type ToasterProps } from 'vue-sonner'

const props = withDefaults(defineProps<Omit<ToasterProps, 'toastOptions'>>(), {
	position: 'top-right',
	duration: 3000,
	offset: 16,
})
</script>

<template>
	<Toaster class="toaster group" v-bind="props" />
</template>

<style scoped>
:deep([data-sonner-toaster][data-theme="dark"]),
:deep([data-sonner-toaster][data-theme="light"]) {
	--normal-bg: theme("colors.accent.DEFAULT");
	--normal-text: theme("colors.accent.foreground");
	--border-radius: theme("borderRadius.lg");
	--success-bg: theme('colors.success.DEFAULT');
    --success-text: theme('colors.success.foreground');
    --info-bg: theme('colors.info.DEFAULT');
    --info-text: theme('colors.info.foreground');
    --warning-bg: theme('colors.warning.DEFAULT');
    --warning-text: theme('colors.warning.foreground');
    --error-bg: theme('colors.error.DEFAULT');
    --error-text: theme('colors.error.foreground');
}

:deep([data-sonner-toast]) {
	@apply border-0;
}

:deep([data-sonner-toast] [data-title]) {
	@apply text-sm font-semibold;
}

:deep([data-sonner-toast] [data-description]) {
	@apply text-sm;
}

:deep([data-sonner-toast] [data-close-button]) {
	@apply border border-border bg-background text-foreground hover:!border-inherit hover:!bg-inherit hover:!text-accent-foreground;
}

:deep(.sonner-loading-bar) {
	@apply bg-muted-foreground;
}

:deep([data-sonner-toast][data-invert="true"][data-type="info"]) {
	@apply bg-background text-info border-accent border;
}

:deep([data-sonner-toast][data-invert="true"][data-type="success"]) {
	@apply bg-background text-success border-accent border;
}

:deep([data-sonner-toast][data-invert="true"][data-type="warning"]) {
	@apply bg-background text-warning border-accent border;
}

:deep([data-sonner-toast][data-invert="true"][data-type="error"]) {
	@apply bg-background text-error border-accent border;
}
</style>
