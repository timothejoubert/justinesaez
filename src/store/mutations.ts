import type { MutationTree } from 'vuex'
import MutationType from '~/constants/mutation-type'
import { RootState } from '~/types/store'

export default {
    [MutationType.WINDOW_WIDTH]: (state, value: number) => (state.windowWidth = value),
    [MutationType.WINDOW_HEIGHT]: (state, value: number) => (state.windowHeight = value),
    [MutationType.COMMON_CONTENT]: (state, value: CommonContent) => (state.commonContent = value),
    [MutationType.PROJECTS_DATA]: (state, value: ProjectContent[]) => (state.projectsData = value),
    [MutationType.ABOUT_DATA]: (state, value: AboutContent) => (state.aboutData = value),
    [MutationType.SPLASH_SCREEN_FINISH]: (state, value: boolean) => (state.splashScreenFinish = value),
    [MutationType.ANIMATION_ENTER]: (state, value: boolean) => (state.animationEnter = value),
    [MutationType.ALREADY_VISITED]: (state, value: boolean) => (state.alreadyVisited = value),
} as MutationTree<RootState>
