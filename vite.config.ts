import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'
import autoimport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { watch } from 'vite-plugin-watch'

export default defineConfig({
    resolve: {
        alias: {
            '@': '/resources',
            '@scripts': '/resources/scripts',
            '@views': '/resources/views',
            '@Layouts': '/resources/views/Layouts',
        },
    },
    plugins: [
        laravel({
            input: 'resources/scripts/app.ts',
            ssr: 'resources/scripts/ssr.ts',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
            script: {
                defineModel: true,
                propsDestructure: true,
            },
        }),
        watch({
            pattern: 'app/{Data,Enums,Pages}/**/*.php',
            command: 'php artisan typescript:transform -q',
        }),
        watch({
            pattern: 'routes/**/*.php',
            command: 'php artisan trail:generate',
        }),
        watch({
            pattern: 'resources/scripts/types/generated.d.ts',
            command: 'yarn format --log-level=silent',
        }),
        autoimport({
            vueTemplate: true,
            dts: 'resources/scripts/types/auto-imports.d.ts',
            dirs: ['resources/scripts/composables', 'resources/scripts/libs'],
            imports: [
                'vue',
                { 'momentum-lock': ['can'] },
                { '@inertiajs/vue3': ['router', 'useForm', 'usePage'] },
                { 'momentum-trail': ['route', 'current'] },
            ],
        }),
        components({
            dirs: ['resources/views/Components', 'resources/views/Layouts'],
            dts: 'resources/scripts/types/components.d.ts',
            directoryAsNamespace: true,
            collapseSamePrefixes: true,
            resolvers: [
                (name: string) => {
                    const components = ['Link', 'Head']

                    if (components.includes(name)) {
                        return { name, from: '@inertiajs/vue3' }
                    }
                },
            ],
        }),
    ],
})
