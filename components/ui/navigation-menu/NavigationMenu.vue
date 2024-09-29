<script setup lang="ts">
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { NavigationMenu } from 'reka-ui/namespaced'

const props = defineProps<NavigationMenuRootProps & { class?: ClassValue }>()

const emits = defineEmits<NavigationMenuRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<NavigationMenu.Root v-bind="forwarded" :class="cn(
		'relative z-10 flex max-w-max flex-1 items-center justify-center',
		orientation === 'vertical' ? 'w-fit' : 'h-fit',
		props.class,
	)">
		<NavigationMenu.List
			:class="cn('group flex flex-1 list-none items-center justify-center gap-1', orientation === 'vertical' && 'flex-col items-stretch')">
			<slot />
			<NavigationMenu.Indicator :class="cn(
				'z-[1] flex justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
				orientation === 'vertical' ? 'left-full w-1.5 items-center' : 'top-full h-1.5 items-end',
			)">
				<div
					:class="cn('relative size-2 rotate-45 rounded-tl-sm bg-border shadow-md', orientation === 'vertical' ? 'left-[60%]' : 'top-[60%]')" />
			</NavigationMenu.Indicator>
		</NavigationMenu.List>
		<div :class="cn('absolute flex justify-center', orientation === 'vertical' ? 'top-0 left-full' : 'left-0 top-full')">
			<!-- TODO: Fix Component <Anonymous> is missing template or render function. -->
			<NavigationMenu.Viewport :class="cn(
				'relative h-[--reka-navigation-menu-viewport-height] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[--reka-navigation-menu-viewport-width]',
				orientation === 'vertical' ? 'ms-1.5' : 'mt-1.5',
			)" />
		</div>
	</NavigationMenu.Root>
</template>
