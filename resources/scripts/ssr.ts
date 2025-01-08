import '@/scripts/icons'
import routes from '@/scripts/routes/routes.json'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from '@vue/server-renderer'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { trail } from 'momentum-trail'
import { createSSRApp, DefineComponent, h } from 'vue'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        title: title => `${title} - ${appName}`,
        resolve: name =>
            resolvePageComponent(
                `../views/Pages/${name}.vue`,
                import.meta.glob<DefineComponent>('../views/Pages/**/*.vue'),
            ),
        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(FloatingVue, { distance: 8 })
                .use(trail, { routes, url: props.initialPage.url })
        },
    }),
)
