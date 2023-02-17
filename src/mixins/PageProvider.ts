import Vue from 'vue'
import { PageData } from '~/types/app'
import { getPageByPath } from '~/utils/parse-api-data'
import pageDataFallBack from '~/static/mock-data/page-data-fallback.json'

export default Vue.extend({
    computed: {
        pageData(): PageData {
            return getPageByPath(this.$route.path) || (pageDataFallBack as PageData)
        },
    },
})
