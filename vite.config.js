import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import mkcert from 'vite-plugin-mkcert';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        server: {
            port: 3000,
            host: process.env.VITE_HOST,
            https: process.env.VITE_SECURE === 'true' ? true : false,
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        plugins: [
            mkcert(),
            vue({
                template: { transformAssetUrls },
            }),
            quasar({
                sassVariables: 'src/assets/quasar.variables.scss',
            }),
            AutoImport({
                // targets to transform
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/, // .md
                ],

                // global imports to register
                imports: [
                    // presets
                    'vue',
                    'vue-router',
                    '@vueuse/core',
                    // custom
                    {
                        '@vueuse/core': ['TransitionPresets', 'promiseTimeout'],
                        'vue-router': ['createRouter', 'createWebHistory'],
                    },
                ],
                // Enable auto import by filename for default module exports under directories
                defaultExportByFilename: false,

                // Auto import for module exports under directories
                // by default it only scan one level of modules under the directory
                dirs: ['./src/stores'],

                // Filepath to generate corresponding .d.ts file.
                // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
                // Set `false` to disable.
                dts: false,

                // Auto import inside Vue template
                // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
                vueTemplate: false,

                // Custom resolvers, compatible with `unplugin-vue-components`
                // see https://github.com/antfu/unplugin-auto-import/pull/23/
                resolvers: [
                    /* ... */
                ],

                // Generate corresponding .eslintrc-auto-import.json file.
                // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
                eslintrc: {
                    enabled: true, // Default `false`
                    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                    globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
                },
            }),
        ],
    });
};
