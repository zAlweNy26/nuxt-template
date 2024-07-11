// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import { configs } from 'eslint-plugin-security'

export default withNuxt([configs.recommended])
