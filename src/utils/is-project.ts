const necessaryProjectKey = ['slug', 'title', 'thumbnail']

// Type Guards project
export default function isValidProject(object: Partial<ProjectContent>): object is ProjectContent {
    // Find a way to find all no optional key in ProjectContent
    // Pick<ProjectContent, 'id' | 'slug' | 'title'>
    return necessaryProjectKey.every((key) => key in object)
}
