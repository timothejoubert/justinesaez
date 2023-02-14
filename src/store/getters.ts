import type { GetterTree } from 'vuex'
import { RootState } from '~/types/store'

export const getters: GetterTree<RootState, RootState> = {
    // alreadyVisited: (state: RootState) => state.alreadyVisited,
}

export default getters
