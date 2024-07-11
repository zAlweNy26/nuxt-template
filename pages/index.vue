<script setup lang="ts">
const { t } = useI18n()

useHead({
	title: () => t('headers.home'),
})
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <ThemeButton />
    <LanguageSwitcher />
    <Button variant="primary" size="xs">Default</Button>
    <Button variant="primary" size="sm">Default</Button>
    <Button variant="primary" size="md">Default</Button>
    <Button variant="primary" size="lg">Default</Button>
    <Button variant="error">Error</Button>
    <Button variant="warning">Warning</Button>
    <Button variant="success">Success</Button>
    <Button variant="info">Info</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <Checkbox id="terms1" size="xs" text="Accept terms and conditions" />
    <Checkbox id="terms2" size="sm" text="Accept terms and conditions" />
    <Checkbox id="terms3" size="md" text="Accept terms and conditions" />
    <Checkbox id="terms4" size="lg" text="Accept terms and conditions" />
    <InputBox label="Username" color="primary" size="xs" />
    <InputBox label="Username" color="info" size="sm" />
    <InputBox label="Username" color="warning" size="md" />
    <InputBox label="Username" color="success" size="lg" />
    <NumericInput label="Quantity" :defaultValue="18" :min="3" :max="21" />
  </div>
</template>