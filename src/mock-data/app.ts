export const app: AppContent = {
    title: 'site name',
    url: 'https://localhost:3000',
    shareImg: '/share.jpg',
}

export const MENU: PageData[] = [
    {
        '@id': '01',
        title: 'Accueil',
        slug: 'accueil',
        relativePath: '/',
    },
    {
        '@id': '02',
        title: 'Carnet',
        slug: 'carnet',
        relativePath: '/carnet',
    },
    {
        '@id': '03',
        title: 'Projets',
        slug: 'projects',
        relativePath: '/project',
    },
    {
        '@id': '04',
        title: 'Justine',
        slug: 'a-propos',
        relativePath: '/a-propos',
    },
]
