import { NuxtError } from '@nuxt/types'

interface RootState {
    // Data
    commonContent: null | CommonContent
    projectsData: ProjectContent[] | []
    aboutData: AboutContent | null
    // Loading
    animationEnter: boolean
    splashScreenFinish: boolean
    alreadyVisited: boolean
    // General
    windowWidth: number
    windowHeight: number
    errorPage: NuxtError | null
}
