<script setup lang="ts">
import {
	NavigationMenuList, NavigationMenuSub, type NavigationMenuSubEmits,
	type NavigationMenuSubProps, NavigationMenuViewport, useForwardPropsEmits,
} from 'radix-vue'

const props = defineProps<NavigationMenuSubProps & { class?: ClassValue }>()

const emits = defineEmits<NavigationMenuSubEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<NavigationMenuSub v-bind="forwarded" :class="cn(
		'relative z-10 flex max-w-max flex-1 items-center justify-center',
		orientation === 'vertical' ? 'w-fit' : 'h-fit',
		props.class,
	)">
		<NavigationMenuList
			:class="cn('group flex flex-1 list-none items-center justify-center gap-1', orientation === 'vertical' && 'flex-col items-stretch')">
			<slot />
		</NavigationMenuList>
		<div
			:class="cn('absolute flex justify-center', orientation === 'vertical' ? 'top-0 left-full' : 'left-0 top-full')">
			<NavigationMenuViewport :class="cn(
				'relative h-[--radix-navigation-menu-viewport-height] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[--radix-navigation-menu-viewport-width]',
				orientation === 'vertical' ? 'ms-1.5' : 'mt-1.5',
			)" />
		</div>
	</NavigationMenuSub>
</template>
