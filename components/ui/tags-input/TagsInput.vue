<script setup lang="ts">
import type { TagsInputInputProps, TagsInputRootEmits, TagsInputRootProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { TagsInput } from 'radix-vue/namespaced'
import { type TagsInputVariants, tagsInputVariants } from '.'

const props = defineProps<{
	root?: TagsInputRootProps
	input?: TagsInputInputProps
	inputClass?: ClassValue
	disabled?: boolean
	size?: TagsInputVariants['size']
	color?: TagsInputVariants['color']
	itemClass?: ClassValue
	class?: ClassValue
}>()

const emits = defineEmits<TagsInputRootEmits>()

const items = defineModel<string[]>({ default: [] })

const forwarded = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
	<TagsInput.Root v-bind="forwarded" :class="cn(tagsInputVariants({ size, color }), props.class)">
		<TagsInput.Item v-for="item in items" :key="item" :value="item" :disabled
			class="flex h-6 items-center gap-1 rounded-md bg-secondary p-1 ring-offset-background data-[state=active]:ring-2 data-[state=active]:ring-ring data-[state=active]:ring-offset-2">
			<TagsInput.ItemText class="rounded bg-transparent" />
			<TagsInput.ItemDelete class="flex rounded bg-transparent">
				<Icon name="ph:x-bold" class="size-4 bg-error" />
			</TagsInput.ItemDelete>
		</TagsInput.Item>
		<TagsInput.Input v-bind="props.input" :disabled
			:class="cn('min-h-6 w-min max-w-96 focus:outline-none flex-1 bg-transparent px-1', props.inputClass)" />
	</TagsInput.Root>
</template>
