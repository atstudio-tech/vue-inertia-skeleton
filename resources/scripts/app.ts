import '../css/app.css'

import '@/scripts/icons'
import routes from '@/scripts/routes/routes.json'
import { createInertiaApp } from '@inertiajs/vue3'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { trail } from 'momentum-trail'
import { createApp, DefineComponent, h } from 'vue'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name =>
        resolvePageComponent(
            `../views/Pages/${name}.vue`,
            import.meta.glob<DefineComponent>('../views/Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(FloatingVue, { distance: 8 })
            .use(trail, { routes })
            .mount(el)
    },
    progress: {
        color: '#4b5563',
    },
})
