import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins : [vue()],
    resolve : {
        alias : {
            '~' : fileURLToPath(new URL('.', import.meta.url)),
            '@' : fileURLToPath(new URL('.', import.meta.url)),
        },
    },
    test : {
        projects : [
            {
                test : {
                    name    : 'unit',
                    include : [
                        'test/unit/**/*.{test,spec}.{ts,js,vue}',
                        'test/components/**/*.{test,spec}.{ts,js,vue}',
                        'test/composables/**/*.{test,spec}.{ts,js,vue}',
                        'test/utils/**/*.{test,spec}.{ts,js,vue}'
                    ],
                    environment : 'jsdom',
                },
            },
            await defineVitestProject({
                test : {
                    name    : 'nuxt',
                    include : [
                        'test/nuxt/**/*.{test,spec}.{ts,js,vue}',
                        'test/nuxt/components/**/*.{test,spec}.{ts,js,vue}'
                    ],
                    environment        : 'nuxt',
                    environmentOptions : {
                        nuxt : {
                            rootDir        : fileURLToPath(new URL('.', import.meta.url)),
                            domEnvironment : 'happy-dom',
                        },
                    },
                },
            }),
        ],
    },
});
