import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { PageData } from '~/types/app'
import { getPageByPath } from '~/utils/parse-api-data'
import pageDataFallBack from '~/mock-data/page-data-fallback.json'
import { isAbout, isHomePage, isProject, isProjectListing, isSketchBooks } from '~/utils/entity'

export default Vue.extend({
    head(): MetaInfo {
        const meta = [
            {
                hid: 'description',
                name: 'description',
                content: this.pageData?.description || 'fallback de description dans mixin page',
            } as PageMetaPropertyName,
            ...createFacebookMeta(this.getFacebookMetaOptions()),
            ...createTwitterMeta(this.getTwitterMetaOptions()),
            { hid: 'version', name: 'version', content: this.$config.version || '' },
        ]

        return {
            htmlAttrs: {
                lang: 'fr',
            },
            title: this.metaTitle,
            meta,
            script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
        }
    },
    computed: {
        pageData(): PageData {
            return getPageByPath(this.$route.path) || (pageDataFallBack as PageData)
        },
        metaTitle(): string {
            const appName = this.$store.state.headData.siteName
            return this.isHome ? this.pageData.title : appName + ' | ' + this.pageData.title
        },
        isHome(): boolean {
            return isHomePage(this.pageData)
        },
        isProjectListing(): boolean {
            return isProjectListing(this.pageData)
        },
        isSketchBook(): boolean {
            return isSketchBooks(this.pageData)
        },
        isAbout(): boolean {
            return isAbout(this.pageData)
        },
        isProject(): boolean {
            return isProject(this.pageData)
        },
    },
    methods: {
        getMetaImage(): string {
            const imageProviderPath =
                !!this.pageData?.shareImg && typeof this.pageData.shareImg !== 'string' && this.pageData.shareImg?.path
            return imageProviderPath || (this.pageData?.shareImg as string) || '/images/share.jpg'
        },
        getPageUrl(): string {
            return this.$config.baseURL + this.$route.fullPath.substring(1)
        },
        getTwitterMetaOptions(): TwitterMetaOptions {
            return {
                title: this.metaTitle,
                description: this.pageData.description || '',
                url: this.getPageUrl(),
                image: this.getMetaImage(),
            }
        },
        getFacebookMetaOptions(): FacebookMetaOptions {
            return {
                title: this.metaTitle,
                description: this.pageData.description || '',
                url: this.getPageUrl(),
                siteName: this.$config.appTitle,
                image: this.getMetaImage(),
            }
        },
    },
})
