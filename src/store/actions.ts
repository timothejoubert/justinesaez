import type { ActionTree, ActionContext } from 'vuex'
import MutationType from '~/constants/mutation-type'
import { RootState } from '~/types/store'
import { getHeadData } from '~/utils/parse-api-data'
// import { Context, NuxtError } from '@nuxt/types'

const actions: ActionTree<RootState, RootState> = {
    nuxtServerInit({ commit }: ActionContext<RootState, RootState>) {
        // try {
        //     const projects = await this.$content('projects').fetch()
        //     commit(MutationType.PROJECTS, projects)
        //     console.log('fetch content/project data')
        // } catch (error) {
        console.log('fetch static data')
        commit(MutationType.HEAD_DATA, getHeadData())
        // }
    },
}

export default actions
