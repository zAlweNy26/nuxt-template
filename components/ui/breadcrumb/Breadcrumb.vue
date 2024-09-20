<script lang="ts" setup>
import { Primitive } from 'radix-vue'
import { breadcrumbVariants, type BreadcrumbProps } from '.'

const props = defineProps<BreadcrumbProps>()

const { list, separator, item: element } = breadcrumbVariants()
</script>

<template>
  <nav aria-label="breadcrumb" :class="props.class">
    <ol :class="cn(list(), ui?.list)">
      <template v-for="(item, index) in items" :key="index">
        <li :class="cn(element(), ui?.item, item.class)">
          <slot :item>
            <Primitive :as="item.href ? 'a' : 'p'" 
              :class="cn(
                'transition-colors flex items-center select-none gap-1 justify-center hover:text-foreground', 
                item.class, { 'font-normal text-foreground': item.current }
              )" v-bind="item.current ? { role: 'link', 'aria-disabled': true, 'aria-current': 'page' } : 
                { href: item.href, onClick: item.onClick }">
              <Icon v-if="item.icon" :name="item.icon" class="size-4" />
              <span>{{ item.label }}</span>
            </Primitive>
          </slot>
        </li>
        <li v-if="index < items.length - 1" role="presentation" aria-hidden="true" :class="cn(separator(), ui?.separator)">
          <slot name="separator">
            <Icon name="ph:caret-right-bold" class="size-4" />
          </slot>
        </li>
      </template>
    </ol>
  </nav>
</template>
