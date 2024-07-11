// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import securityPlugin from 'eslint-plugin-security'

const { configs } = securityPlugin

export default withNuxt([configs.recommended])
