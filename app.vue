<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

const { title } = useAppConfig()

useHead({
	titleTemplate: t => t ? `${t} - ${title}` : title,
})

const useIdMethod = () => useId()
</script>

<template>
	<ConfigProvider :use-id="useIdMethod">
		<NuxtLayout>
			<main id="main" class="flex grow flex-col p-1 md:p-2">
				<NuxtPage />
			</main>
		</NuxtLayout>
	</ConfigProvider>
</template>