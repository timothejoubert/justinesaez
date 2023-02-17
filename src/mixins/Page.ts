import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { PageData } from '~/types/app'
import { getAllPagePath, getAppTitle, getPageByPath } from '~/utils/parse-api-data'
import pageDataFallBack from '~/static/mock-data/page-data-fallback.json'
import { isAbout, isHomePage, isProject, isProjectListing, isSketchBooks } from '~/utils/entity'

export default Vue.extend({
    middleware({ req, redirect }: Context) {
        if (!req?.url) return

        const allPath = getAllPagePath()
        const slugifyPath = req?.url?.toLowerCase()?.replace(/\/$/, '')

        const isNotExactly = allPath.includes(slugifyPath)
        const findNoMatch = !allPath.includes(req?.url)

        if (findNoMatch && !isNotExactly) return redirect('/')
        if (isNotExactly) return redirect(slugifyPath)
    },
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
            const appName = getAppTitle()
            return this.isHome ? appName : `${this.pageData.title} | ${appName}`
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
            // TODO: store relative path if providerImg used
            const image =
                typeof this.pageData.shareImg === 'string' ? this.pageData.shareImg : this.pageData.shareImg?.src

            return image || '/images/share.jpg'
        },
        getPageUrl(): string {
            return this.$config.siteUrl + this.$route.fullPath.substring(1)
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
                siteName: getAppTitle(),
                title: this.metaTitle,
                description: this.pageData.description || '',
                url: this.getPageUrl(),
                image: this.getMetaImage(),
            }
        },
    },
})
