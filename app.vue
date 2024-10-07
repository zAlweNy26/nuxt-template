<script setup lang="ts">
import { ConfigProvider, useId as useRekaId } from 'reka-ui'

const { title } = useAppConfig()
const { textDirection, isDark } = storeToRefs(useSettingsStore())

useHead({
	titleTemplate: t => t ? `${t} - ${title}` : title,
})

const useIdFn = () => useId() ?? useRekaId()
</script>

<template>
	<ConfigProvider :useId="useIdFn" :dir="textDirection">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<Modals />
		<Toasts :theme="isDark ? 'dark' : 'light'" richColors />
	</ConfigProvider>
</template>
