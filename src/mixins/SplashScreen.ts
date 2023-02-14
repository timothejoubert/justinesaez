import Vue from 'vue'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/app'

export type SplashScreenState = 'pending' | 'hidden' | 'starting' | 'ended' | 'done'

export default Vue.extend({
    data() {
        return {
            splashScreenState: 'pending' as SplashScreenState,
            isReady: false,
        }
    },
    watch: {
        splashScreenState(currentState: SplashScreenState) {
            if (currentState === 'ended') this.splashScreenState = 'done'
            this.isReady = currentState === 'done' || (currentState === 'hidden' && this.hasAlreadyVisited())
        },
    },
    mounted() {
        this.setSplashScreenState()

        this.initVisited()
    },
    beforeDestroy() {
        this.unvisited()
    },
    methods: {
        setSplashScreenState() {
            const hide =
                !toBoolean(GeneralsConst.DISPLAY_ALWAYS_SPLASH_SCREEN) &&
                !toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN_ONCE)

            const display =
                toBoolean(GeneralsConst.DISPLAY_ALWAYS_SPLASH_SCREEN) ||
                (toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN_ONCE) && !this.hasAlreadyVisited())

            if (hide) this.splashScreenState = 'hidden'
            else if (display) this.splashScreenState = 'starting'
            else this.splashScreenState = 'done'
        },
        hasAlreadyVisited(): boolean {
            return !!localStorage.getItem('visited')
        },
        initVisited() {
            window.localStorage.setItem('visited', 'true')
        },
        unvisited() {
            window.localStorage.removeItem('visited')
        },
    },
})
