<script setup lang="ts">
const { toggleTheme } = useSettingsStore()
</script>

<template>
	<Button variant="outline" square @click="toggleTheme()">
		<Icon name="ph:moon" class="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
		<Icon name="ph:sun" class="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		<span class="sr-only">{{ $t('theme.toggle') }}</span>
	</Button>
</template>
