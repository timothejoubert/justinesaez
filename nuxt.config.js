import { resolve } from 'path'
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'
import api from './src/static/mock-data/api.json'
import { version } from './package.json'
import createSitemap from './src/utils/create-sitemap'

const locale = process.env.DEFAULT_LOCALE || 'fr'
const siteName = api.headData.siteName

export default {
    // Target: https://go.nuxtjs.dev/config-target
    // target: 'static',

    // define if this file isn't same folder as nuxt front folder
    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-srcdir
    srcDir: 'src',

    alias: {
        images: resolve('', './assets/images'),
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: siteName,
        htmlAttrs: {
            lang: locale,
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: api.metaDescription || 'fallBack meta description',
            },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'google-site-verification', content: 'o5sD6l8eVydQy3O8y0D3ETIcgafZZZwbNwKjh_1qimc' },
            { hid: 'version', name: 'version', content: version || '' },
        ],
        link: [
            // favicon
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
            { rel: 'manifest', href: '/favicon/site.webmanifest' },
            { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#da532c' },
        ],
        script: [
            { src: '/netlify-identity.js' }, // load script in your static folder
        ],
    },

    env: {
        url: process.env.NODE_ENV === 'production' ? process.env.APP_URL : 'http://localhost:3000',
        lang: locale,
    },

    // The content property: https://content.nuxtjs.org/configuration
    content: {
        dir: './content',
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/scss/main'],

    // https://github.com/nuxt-community/style-resources-module#setup
    // can access @include... in all files
    styleResources: {
        scss: ['@/scss/_style-resources.scss'],
        hoistUseStatements: true,
    },

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: ['@/components', '@/components/atoms', '@/components/molecules', '@/components/organisms'],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://github.com/nuxt/postcss8
        '@nuxt/postcss8',
        // https://github.com/nuxt-community/svg-module
        '@nuxtjs/svg',
        // https://github.com/nuxt-community/style-resources-module#setup
        '@nuxtjs/style-resources',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/gsap.client.ts'],
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxt/content',
        // https://sitemap.nuxtjs.org/guide/setup
        '@nuxtjs/sitemap',
        //
        '@nuxt/image',
        // https://cloudinary.nuxtjs.org/setup
        // '@nuxtjs/cloudinary',
    ],

    // https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware/
    // serverMiddleware: ['./src/serverMiddleware/redirect-on-unknown-path'],

    // https://sitemap.nuxtjs.org/guide/setup
    sitemap: {
        // hostname: process.env.BASE_URL,
        // i18n: true,
        path: '/sitemap.xml',
        cacheTime: 1000 * 60 * 60 * 20,
        defaults: {
            changefreq: 'daily',
            lastmod: new Date(),
        },
        sitemaps: createSitemap(),
    },

    // image provider - don't work with storybook ?
    // cloudinary: {
    //     cloudName: process.env.CLOUDINARY_NAME,
    //     apiKey: process.env.CLOUDINARY_KEY,
    //     apiSecret: process.env.CLOUDINARY_SECRET,
    //     useComponent: true,
    // },

    // https://fr.nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config/
    publicRuntimeConfig: {
        siteUrl: process.env.APP_URL,
        baseUrl: process.env.STRAPI_API_URL || process.env.LOCAL_API_URL,
    },

    // https://github.com/nuxt-community/svg-module
    svg: {
        svgSpriteLoader: {
            extract: true,
            runtimeGenerator: require.resolve('./src/utils/svg/sprite-component-generator.js'),
            spriteFilename: 'image/sprite.[hash:8].svg',
        },
    },

    // loading: '@/components/organisms/VLoadingPage.vue',

    // https://storybook.nuxtjs.org/api/options
    storybook: {
        port: 4000,
        stories: ['~/components/**/*.stories.js', '~/stories/**/*.stories.js'],
        parameters: {
            layout: 'fullScreen',
            backgrounds: {
                default: 'light',
                values: [
                    { name: 'dark', value: '#000' },
                    { name: 'ligth', value: '#fff' },
                ],
            },
            viewport: {
                viewports: {
                    iPhoneSE: {
                        name: 'iPhone SE',
                        styles: {
                            width: '375px',
                            height: '660px',
                        },
                    },
                    iPadPortrait: {
                        name: 'iPad portrait',
                        styles: {
                            width: '768px',
                            height: '1024px',
                        },
                    },
                    iPadLandscape: {
                        name: 'iPad landscape',
                        styles: {
                            width: '1024px',
                            height: '768px',
                        },
                    },
                },
            },
        },
        addons: [
            {
                name: '@storybook/preset-scss',
                options: {
                    cssLoaderOptions: {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]',
                    },
                },
            },
        ],
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            sass: {
                implementation: require('sass'),
            },
            scss: {
                implementation: require('sass'),
            },
            cssModules: {
                modules: {
                    localIdentName: '[local]--[Frida]_[hash:base64:4]',
                },
            },
        },
        plugins: [
            new SpriteLoaderPlugin({
                plainSprite: true,
                spriteAttrs: {
                    id: 'svg-sprite',
                },
            }),
        ],
        transpile: ['gsap'],
    },
}
