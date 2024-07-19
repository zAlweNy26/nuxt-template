<script setup lang="ts">
const { t } = useI18n()

useHead({
	title: () => t('headers.home'),
})

const radioItems = [
  { name: 'Text', value: 'text' },
  { name: 'Example', value: 'example' },
  { name: 'Bar', value: 'bar' },
  { name: 'Foo', value: 'foo' },
]

const progress = ref(50)
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <ThemeButton />
    <LanguageSwitcher />
    <ResponsiveDialog title="Example title" description="Example description">
      <Button variant="primary">DialogBox</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </ResponsiveDialog>
    <SideSheet title="Example title" side="bottom" description="Example description">
      <Button variant="primary">Bottom Sheet</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </SideSheet>
    <SideSheet title="Example title" side="left" description="Example description">
      <Button variant="primary" size="md">Left Sheet</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </SideSheet>
    <SideSheet title="Example title" side="right" description="Example description">
      <Button variant="primary" size="lg">Right Sheet</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </SideSheet>
    <SideSheet title="Example title" side="top" description="Example description">
      <Button variant="primary" size="xs">Top Sheet</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </SideSheet>
    <Separator class="my-4" label="Or" />
    <ProgressBar v-model="progress" :max="60" />
    <Slider :max="100" :step="5" :modelValue="[50]" />
    <Switch id="test-switch" label="Test Switch" />
    <Button variant="error">Error</Button>
    <Button variant="warning">Warning</Button>
    <Button variant="success">Success</Button>
    <Button variant="info">Info</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="error" size="lg">Error</Badge>
    <Badge variant="warning" size="md">Warning</Badge>
    <Badge variant="info" size="sm">Info</Badge>
    <Badge variant="outline" size="xs">Outline</Badge>
    <Checkbox id="terms1" size="xs" text="Accept terms and conditions" />
    <Checkbox id="terms2" size="sm" text="Accept terms and conditions" />
    <Checkbox id="terms3" size="md" text="Accept terms and conditions" />
    <Checkbox id="terms4" size="lg" text="Accept terms and conditions" />
    <InputBox label="Username" color="primary" size="xs" />
    <InputBox label="Username" color="warning" size="md" />
    <InputBox label="Username" color="info" size="sm" />
    <RadioGroup :items="radioItems" />
    <NumericInput label="Quantity" :defaultValue="18" :min="3" :max="21" />
    <InputBox label="Username" color="success" size="lg" />
  </div>
</template>