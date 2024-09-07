export default defineNuxtPlugin((nuxtApp) => {
    const modalState = shallowRef<ModalState>({
        component: 'div',
        props: {}
    })

    nuxtApp.vueApp.provide(modalInjectionKey, modalState)
})