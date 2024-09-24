<script setup lang="ts">
import { NavigationMenuIndicator, NavigationMenuList, NavigationMenuRoot,
	type NavigationMenuRootEmits, type NavigationMenuRootProps, NavigationMenuViewport, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<NavigationMenuRootProps & { class?: ClassValue }>()

const emits = defineEmits<NavigationMenuRootEmits>()

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props
	return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<NavigationMenuRoot v-bind="forwarded" :class="cn(
		'relative z-10 flex max-w-max flex-1 items-center justify-center',
		orientation === 'vertical' ? 'w-fit' : 'h-fit',
		props.class,
	)">
		<NavigationMenuList :class="cn('group flex flex-1 list-none items-center justify-center gap-1', orientation === 'vertical' && 'flex-col items-stretch')">
			<slot />
			<NavigationMenuIndicator :class="cn(
				'z-[1] flex justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
				orientation === 'vertical' ? 'left-full w-1.5 items-center' : 'top-full h-1.5 items-end',
			)">
				<div :class="cn('relative size-2 rotate-45 rounded-tl-sm bg-border shadow-md', orientation === 'vertical' ? 'left-[60%]' : 'top-[60%]')" />
			</NavigationMenuIndicator>
		</NavigationMenuList>
		<div :class="cn('absolute flex justify-center', orientation === 'vertical' ? 'top-0 left-full' : 'left-0 top-full')">
			<NavigationMenuViewport :class="cn(
				'relative h-[--radix-navigation-menu-viewport-height] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[--radix-navigation-menu-viewport-width]',
				orientation === 'vertical' ? 'ms-1.5' : 'mt-1.5',
			)" />
		</div>
	</NavigationMenuRoot>
</template>
