<script setup lang="ts">
import type { H3Error } from 'h3'
import { ConfigProvider, useId as useRekaId } from 'reka-ui'

const props = defineProps<{
	error: H3Error
}>()

const { title } = useAppConfig()

useHead({
	titleTemplate: t => t ? `${t} - ${title}` : title,
})

const { error } = toRefs(props)
const { textDirection } = storeToRefs(useSettingsStore())
const localePath = useLocalePath()

const errorMsg = computed(() => `errors.routes.${error.value.statusCode}`)

const handleError = () => clearError({ redirect: localePath('/') })

const useIdFn = () => useId() ?? useRekaId()
</script>

<template>
	<ConfigProvider :useId="useIdFn" :dir="textDirection">
		<NuxtLayout name="default">
			<div class="flex h-svh w-screen flex-col items-center justify-evenly gap-8 text-center">
				<div class="flex flex-col gap-4 text-5xl font-bold">
					<span class="text-error">{{ error.statusCode }}</span>
					<span>{{ $t('errors.routes.notAccessible') }}</span>
					<span class="whitespace-break-spaces text-2xl text-error">
						{{ $t($te(errorMsg) ? errorMsg : 'errors.routes.fallback') }}
					</span>
				</div>
				<Button variant="error" size="lg" @click="handleError">
					{{ $t('button.backHome') }}
				</Button>
			</div>
		</NuxtLayout>
	</ConfigProvider>
</template>
