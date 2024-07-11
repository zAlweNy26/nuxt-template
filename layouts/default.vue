<script setup lang="ts">
const head = useLocaleHead({
	addDirAttribute: true,
	identifierAttribute: 'id',
	addSeoAttributes: true,
})
</script>

<template>
	<div>
		<NuxtLoadingIndicator :duration="3000" :throttle="300"
			color="repeating-linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" />
		<Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
			<Head>
				<template v-for="link in head.link" :key="link.id">
					<Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
				</template>
				<template v-for="meta in head.meta" :key="meta.id">
					<Meta :id="meta.id" :property="meta.property" :content="meta.content" />
				</template>
			</Head>
			<Body class="flex min-h-screen flex-col scroll-smooth antialiased transition-colors">
				<slot />
			</Body>
		</Html>
	</div>
</template>