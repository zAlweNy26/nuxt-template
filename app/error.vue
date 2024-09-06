<script setup lang="ts">
import type { H3Error } from 'h3'

const props = defineProps<{
	error: H3Error
}>()

const { error } = toRefs(props)
const localePath = useLocalePath()

const errorMsg = computed(() => `errors.routes.${error.value.statusCode}`)

const handleError = () => clearError({ redirect: localePath('/') })
</script>

<template>
	<NuxtLayout>
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
</template>