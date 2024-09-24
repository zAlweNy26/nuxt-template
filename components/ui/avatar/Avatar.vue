<script setup lang="ts">
import { AvatarFallback, type AvatarFallbackProps, AvatarImage, type AvatarImageProps, AvatarRoot } from 'radix-vue'
import { avatarVariant, type AvatarVariants } from '.'

const props = defineProps<AvatarImageProps & AvatarFallbackProps & {
	class?: ClassValue
	size?: AvatarVariants['size']
	shape?: AvatarVariants['shape']
}>()
</script>

<template>
	<AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
		<AvatarImage :src class="size-full object-cover" />
		<AvatarFallback :delayMs asChild>
			<slot />
		</AvatarFallback>
	</AvatarRoot>
</template>
