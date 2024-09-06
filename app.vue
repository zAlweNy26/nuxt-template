<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

const { title } = useAppConfig()

useHead({
	titleTemplate: t => t ? `${t} - ${title}` : title,
})

const useIdMethod = () => useId()!
</script>

<template>
	<ConfigProvider :useId="useIdMethod">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</ConfigProvider>
</template>