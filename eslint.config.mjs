// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import securityPlugin from 'eslint-plugin-security'

const { configs } = securityPlugin

export default withNuxt([configs.recommended, {
    rules: {
        "vue/v-on-event-hyphenation": "off",
        "vue/attribute-hyphenation": "off",
        "vue/first-attribute-linebreak": "off",
    }
}])
