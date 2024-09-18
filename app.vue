<script setup lang="ts">
import { ConfigProvider, useId as useRadixId } from 'radix-vue'

const { title } = useAppConfig()
const { textDirection } = storeToRefs(useSettingsStore())

useHead({
	titleTemplate: t => t ? `${t} - ${title}` : title,
})

const useIdFn = () => useId() ?? useRadixId()
</script>

<template>
	<ConfigProvider :useId="useIdFn" :dir="textDirection">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<Modals />
		<Toasts />
	</ConfigProvider>
</template>