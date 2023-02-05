type Theme = 'light' | 'dark'

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
    '@type': string
    title?: string
    metaDescription?: string
    shareImg?: string
}
