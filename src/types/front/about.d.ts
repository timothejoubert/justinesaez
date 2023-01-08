interface AboutContent {
    socials?: Socials[]
    sections?: AboutSection[]
    description?: string
}

interface AboutSection {
    title?: string
    articles: AboutArticle[] | string
}

interface AboutArticle {
    title?: string
    content: string
}

interface Socials {
    name?: 'instagram' | 'github' | 'codepen' | 'p5' | 'facebook' | 'behance'
    icon?: ImageData
    url?: string
}
