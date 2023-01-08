import type { ActionTree, ActionContext } from 'vuex'
import MutationType from '~/constants/mutation-type'
import { RootState } from '~/types/store'
import PROJECTS_DATA from '~/mock-data/projects'
import ABOUT_DATA from '~/mock-data/about'
// import { Context, NuxtError } from '@nuxt/types'

const actions: ActionTree<RootState, RootState> = {
    nuxtServerInit({ commit }: ActionContext<RootState, RootState>) {
        try {
            // const projects = await this.$content('projects').fetch()
            commit(MutationType.PROJECTS_DATA, PROJECTS_DATA)
            commit(MutationType.ABOUT_DATA, ABOUT_DATA)
        } catch (error) {
            console.log('cant fetch static and backend data in actions store', error)
        }
    },
}

export default actions
