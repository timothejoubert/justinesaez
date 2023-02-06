export type Theme = 'light' | 'dark' | 'orange'

export interface CommonContent {
    menu: PageData[]
}

export interface AppContent {
    title: string
    url: string
    shareImg: string
}

export interface SocialNetworkItem {
    url: string
    icon: string
    title: string
}

export interface PageData {
    '@id'?: string
    '@type'?: string
    title: string
    slug: string
    relativePath: string
    metaDescription?: string
    shareImg?: string
}
