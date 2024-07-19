// @ts-nocheck
import withNuxt from './.nuxt/eslint.config.mjs'
import securityPlugin from 'eslint-plugin-security'
import tailwind from 'eslint-plugin-tailwindcss'

const { configs } = securityPlugin

export default withNuxt([configs.recommended, ...tailwind.configs["flat/recommended"], {
    rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "vue/multi-word-component-names": "off",
        "vue/v-on-event-hyphenation": "off",
        "vue/attribute-hyphenation": "off",
        "vue/first-attribute-linebreak": "off",
    }
}])
