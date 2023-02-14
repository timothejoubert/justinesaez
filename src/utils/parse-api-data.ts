import api from '~/mock-data/api.json'
import { HeadData, PageData, Project, apiResponse, ListingPage, ProjectListing } from '~/types/app'
import { isListingPage, isNodeMenu } from '~/utils/entity'

export const getApiResponse = (): apiResponse => {
    return api as unknown as apiResponse
}

export const getProjects = (): Project[] => {
    return (getApiResponse().projects as ProjectListing).children
}

export const getHeadData = (): HeadData => {
    return api.headData as unknown as HeadData
}

export const getPageByPath = (path: string): PageData | undefined => {
    return getAllPage().filter((page) => page.relativePath === path)[0]
}

export const getProjectBySlug = (slug: string): Project => {
    const projects = getProjects()
    return projects.filter((project: Project) => project.slug === slug)?.[0]
}

export const getProjectTags = (): string[] => {
    const projects = getProjects()
    const tags = projects
        .map((project: Project) => project.tags)
        .flat()
        .filter((tag: string | null) => !!tag) as string[]
    return [...new Set(tags)]
}

const getRootPages = (): PageData[] => {
    const nodes = []
    const apiData = getApiResponse()

    for (const item in apiData) {
        const node = apiData[item]
        if (isNodeMenu(node)) nodes.push(node as PageData)
    }

    return nodes
}

export const getChildrenPages = (page: ListingPage): PageData[][] => {
    return page.children.map((childPage) => {
        if (isListingPage(childPage)) return [page, ...getChildrenPages(childPage as ListingPage).flat()]
        else return [childPage]
    })
}

export const getNestedChildrenPages = (page: PageData): PageData | PageData[] => {
    if (isListingPage(page)) return [page, ...getChildrenPages(page as ListingPage).flat()]
    return [page]
}

export const getMenu = (level: 0 | 1 = 0): (PageData | PageData[])[] => {
    const rootPages = getRootPages()
    if (level === 0) return rootPages
    return rootPages.map((page) => getNestedChildrenPages(page))
}

export const getAllPage = (): PageData[] => {
    return getMenu(1).flat(2)
}
