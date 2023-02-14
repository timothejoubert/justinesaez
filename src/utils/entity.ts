import { NodeElement, PageData, ProjectListing } from '~/types/app'

//
// Node type
//

export function isEntityType(entity: NodeElement, type: string): boolean {
    return entity['@type'] === type
}

export const isPage = (entity: NodeElement): entity is PageData => {
    return isEntityType(entity, 'Page')
}

export const isListingPage = (entity: NodeElement): Boolean => {
    return isEntityType(entity, 'PageListing')
}

export const isNodeMenu = (entity: NodeElement): boolean => {
    return isPage(entity) || isProjectListing(entity)
}

//
// Node name
//

export function isNodeElement(entity: NodeElement, name: string): boolean {
    return entity.nodeName === name
}

export const isProjectListing = (entity: NodeElement): entity is ProjectListing => {
    return isNodeElement(entity, 'projectListing')
}

export const isSketchBooks = (entity: NodeElement): entity is ProjectListing => {
    return isNodeElement(entity, 'sketchbooks')
}

export const isAbout = (entity: NodeElement): entity is ProjectListing => {
    return isNodeElement(entity, 'about')
}

export const isHomePage = (entity: NodeElement): entity is ProjectListing => {
    return isNodeElement(entity, 'homePage')
}

export const isProject = (entity: NodeElement): entity is ProjectListing => {
    return isNodeElement(entity, 'project')
}
