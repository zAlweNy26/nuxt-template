<script setup lang="ts">
import { ConfigProvider, useId as useRadixId } from 'radix-vue'

const { title } = useAppConfig()
const textDirection = useTextDirection({ initialValue: 'ltr' })
const configDirection = computed(() => textDirection.value === 'rtl' ? 'rtl' : 'ltr')

useHead({
	titleTemplate: t => t ? `${t} - ${title}` : title,
})

const useIdFn = () => useId() ?? useRadixId()
</script>

<template>
	<ConfigProvider :useId="useIdFn" :dir="configDirection">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<Modals />
		<Toasts />
	</ConfigProvider>
</template>