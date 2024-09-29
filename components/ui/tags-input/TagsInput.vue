<script setup lang="ts" generic="T extends string | Record<string, any>">
// TODO: Wait for AcceptableInputValue to be exported correctly
import type { TagsInputInputProps, TagsInputRootEmits, TagsInputRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { TagsInput } from 'reka-ui/namespaced'
import { type TagsInputVariants, tagsInputVariants } from '.'

const props = defineProps<{
	root?: TagsInputRootProps<T>
	input?: TagsInputInputProps
	inputClass?: ClassValue
	disabled?: boolean
	size?: TagsInputVariants['size']
	color?: TagsInputVariants['color']
	itemClass?: ClassValue
	class?: ClassValue
}>()

const emits = defineEmits<TagsInputRootEmits<T>>()

const items = defineModel<Array<T>>({ default: [] })

const forwarded = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
	<TagsInput.Root v-bind="forwarded" :class="cn(tagsInputVariants({ size, color }), props.class)">
		<TagsInput.Item v-for="(item, index) in items" :key="`tgi-${index}`" :value="item" :disabled
			class="flex h-6 items-center gap-1 rounded-md bg-secondary px-2 py-1 ring-offset-background data-[state=active]:ring-2 data-[state=active]:ring-ring data-[state=active]:ring-offset-2">
			<TagsInput.ItemText class="rounded bg-transparent" />
			<TagsInput.ItemDelete class="flex rounded bg-transparent">
				<Icon name="ph:x-bold" class="size-4 bg-error" />
			</TagsInput.ItemDelete>
		</TagsInput.Item>
		<TagsInput.Input v-bind="props.input" :disabled
			:class="cn('min-h-6 w-min max-w-96 focus:outline-none placeholder:text-muted-foreground flex-1 bg-transparent px-1', props.inputClass)" />
	</TagsInput.Root>
</template>
