const theme = ref(localStorage.theme || '')

watchEffect(() => {
    if (theme.value === 'dark' || (theme.value === '' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})

export const useDarkMode = () => {
    function enable(): void {
        theme.value = 'dark'
        localStorage.theme = 'dark'
    }

    function disable(): void {
        theme.value = 'light'
        localStorage.theme = 'light'
    }

    function toggle(): void {
        return localStorage.theme === 'dark' ? disable() : enable()
    }

    function reset(): void {
        theme.value = ''
        localStorage.removeItem('theme')
    }

    return {
        theme,
        enable,
        disable,
        toggle,
        reset,
    }
}
