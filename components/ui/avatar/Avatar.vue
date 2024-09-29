<script setup lang="ts">
import type { AvatarFallbackProps, AvatarImageProps } from 'reka-ui'
import { Avatar } from 'reka-ui/namespaced'
import { avatarVariant, type AvatarVariants } from '.'

const props = defineProps<AvatarImageProps & AvatarFallbackProps & {
	class?: ClassValue
	size?: AvatarVariants['size']
	shape?: AvatarVariants['shape']
}>()
</script>

<template>
	<Avatar.Root :class="cn(avatarVariant({ size, shape }), props.class)">
		<Avatar.Image :src class="size-full object-cover" />
		<Avatar.Fallback :delayMs asChild>
			<slot />
		</Avatar.Fallback>
	</Avatar.Root>
</template>
