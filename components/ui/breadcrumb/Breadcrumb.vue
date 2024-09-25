<script lang="ts" setup>
import type { BreadcrumbItems } from '.'
import { Primitive } from 'radix-vue'

defineProps<{
	listClass?: ClassValue
	items: BreadcrumbItems
}>()
</script>

<template>
	<nav aria-label="breadcrumb">
		<ol
			:class="cn('flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5', listClass)">
			<template v-for="(item, index) in items" :key="index">
				<li :class="cn('inline-flex items-center gap-1.5', item.class)">
					<slot :item>
						<Primitive :as="item.href ? 'a' : 'p'" :class="cn(
							'transition-colors flex items-center select-none gap-1 justify-center hover:text-foreground',
							item.class, { 'font-normal text-foreground': item.current },
						)" v-bind="item.current ? { 'role': 'link', 'aria-disabled': true, 'aria-current': 'page' }
							: { href: item.href, onClick: item.onClick }">
							<Icon v-if="item.icon" :name="item.icon" class="size-4" />
							<span>{{ item.label }}</span>
						</Primitive>
					</slot>
				</li>
				<li v-if="index < items.length - 1" role="presentation" aria-hidden="true"
					:class="cn('inline-flex items-center gap-1.5', item.class)">
					<slot name="separator">
						<Icon name="ph:caret-right-bold" class="size-4" />
					</slot>
				</li>
			</template>
		</ol>
	</nav>
</template>
