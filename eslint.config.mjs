import antfu from '@antfu/eslint-config'
import securityPlugin from 'eslint-plugin-security'
import tailwind from 'eslint-plugin-tailwindcss'
// @ts-nocheck
import withNuxt from './.nuxt/eslint.config.mjs'

const { configs } = securityPlugin

export default withNuxt(antfu(
	{
		stylistic: {
			indent: 'tab',
			quotes: 'single',
			semi: false,
		},
		componentExts: ['vue'],
		typescript: true,
		vue: true,
		jsonc: true,
		yaml: true,
		markdown: true,
	},
	configs.recommended,
	tailwind.configs['flat/recommended'],
	{
		rules: {
			'node/prefer-global/process': 'off',
			'vue/first-attribute-linebreak': 'off',
			'vue/v-on-event-hyphenation': 'off',
			'vue/attribute-hyphenation': 'off',
			'array-bracket-spacing': 'off',
			'one-var': 'off',
			'no-console': 'off',
			'jsdoc/check-param-names': 'off',
			'curly': ['warn', 'multi-or-nest'],
			'antfu/if-newline': 'off',
			'antfu/curly': 'off',
			'antfu/consistent-list-newline': 'off',
			'brace-style': 'off',
			'vue/html-closing-bracket-newline': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'tailwindcss/no-custom-classname': 'off',
			'vue/multi-word-component-names': 'off',
		},
	},
))
