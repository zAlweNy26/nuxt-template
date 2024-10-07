<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { type ButtonProps, buttonVariants } from '.'

const props = withDefaults(defineProps<Omit<ButtonProps, 'asChild'>>(), {
	as: 'button',
	size: 'md',
})
</script>

<template>
	<Primitive :as
		:class="cn(buttonVariants({ variant, size, square: square ? size : undefined }), props.class)">
		<slot />
	</Primitive>
</template>
