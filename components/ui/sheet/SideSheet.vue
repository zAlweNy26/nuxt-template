<script setup lang="ts">
import { Dialog } from 'reka-ui/namespaced'
import { type SheetProps, type SheetVariants, sheetVariants } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SheetProps & { side?: SheetVariants['side'] }>(), {
	closable: true,
	side: 'right',
})

const open = defineModel<boolean>()
</script>

<template>
	<Dialog.Root v-model:open="open" :defaultOpen modal>
		<Dialog.Trigger asChild>
			<slot />
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay :class="cn(
				'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
				props.class,
			)" />
			<Dialog.Content v-bind="props.content" :class="cn(sheetVariants({ side }), props.contentClass)"
				@pointerDownOutside="(e) => !closable && e.preventDefault()">
				<div class="flex items-start justify-between gap-2">
					<slot name="header" :title :description>
						<div class="flex flex-col">
							<Dialog.Title class="text-lg font-semibold leading-none tracking-tight">
								{{ title }}
							</Dialog.Title>
							<Dialog.Description class="text-sm text-muted-foreground">
								{{ description }}
							</Dialog.Description>
						</div>
					</slot>
					<slot name="close">
						<Dialog.Close
							class="grid place-content-center rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
							<Icon name="ph:x-bold" class="size-4" />
							<span class="sr-only">{{ $t('button.close') }}</span>
						</Dialog.Close>
					</slot>
				</div>
				<slot name="content" />
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</template>
