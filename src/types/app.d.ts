type Theme = 'light' | 'dark' | 'orange'

interface CommonContent {
    menu: PageData[]
}

interface AppContent {
    title: string
    url: string
    shareImg: string
}

interface SocialNetworkItem {
    url: string
    icon: string
    title: string
}

interface PageData {
    '@id'?: string
    '@type'?: string
    title: string
    slug: string
    relativePath: string
    metaDescription?: string
    shareImg?: string
}
