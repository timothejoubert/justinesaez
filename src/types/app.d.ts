export type Theme = 'light' | 'dark' | 'orange'

export type Social = {
    [key: string]: string
}

type apiResponse = {
    [key: string]: NodeElement
}

export interface NodeElement {
    '@type': string
    '@id': string
    nodeName: string
}

export interface HeadData extends NodeElement {
    siteName: string
    metaTitle: string
    mainColor: string
    metaDescription: string
    locale: string
    homePageUrl: string
    shareImg: Image
    socials: Social[]
    loadingMedias: Image[]
}

export interface PageData extends NodeElement {
    title: string
    slug: string
    relativePath: string
    description?: string
    shareImg?: Image
}

export interface HomePage extends PageData {}

export interface ListingPage extends PageData {
    children: PageData[]
}

export interface ProjectListing extends ListingPage {
    children: Project[]
}

export interface Project extends PageData {
    tags: string[] | null
    scope: string | null
    date: string | null
    thumbnail: Image
    gallery: Image[] | null
}

export interface SketchbooksPage extends PageData {
    content: Sketchbook[]
}

export interface Sketchbook extends PageData {
    title: string
    date: string
}

export interface AboutPage extends PageData {
    subTitle: string
}

export interface ProviderImage {
    title: string
    src: string
}

export type Image = string | ProviderImage
