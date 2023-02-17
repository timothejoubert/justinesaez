import { getAllPagePath } from '../utils/parse-api-data'

export default function createSitemap() {
    return {
        path: `/sitemap.xml`,
        routes() {
            return getAllPagePath()
        },
    }
}
