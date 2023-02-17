import { Project } from '~/types/app'

const rootKeyName = ['home', 'sketchbooks', 'projects', 'about'] as const
type Pages = (typeof rootKeyName)[number]

const necessaryProjectKey = ['slug', 'title', 'thumbnail', 'description']

export default function isValidProject(object: Partial<Project>): object is Project {
    // Find a way to find all no optional key in ProjectContent
    // Pick<ProjectContent, 'id' | 'slug' | 'title'>
    return necessaryProjectKey.every((key) => key in object)
}

export const isExistingPage = (name: unknown): name is Pages => {
    return rootKeyName.includes(name as any)
}
