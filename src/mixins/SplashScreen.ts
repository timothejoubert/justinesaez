import Vue from 'vue'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/generals'

export default Vue.extend({
    data() {
        return {
            enterSplashScreen: false,
            isSplashScreenDone: false,
            isSplashScreenHidden: false,
        }
    },
    computed: {
        isFirstConnexion(): boolean {
            return !localStorage.getItem('visited')
        },
        displaySplashScreen(): boolean {
            return (
                toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN) || toBoolean(GeneralsConst.DISPLAY_ALWAYS_SPLASH_SCREEN)
            )
        },
    },
    mounted() {
        this.updateSplashScreenState()
        window.localStorage.setItem('visited', 'true')
    },
    beforeDestroy() {
        window.localStorage.removeItem('visited')
    },
    methods: {
        updateSplashScreenState() {
            const displayOnFirstConnexion = toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN) && this.isFirstConnexion

            if (!this.displaySplashScreen || !displayOnFirstConnexion) {
                this.isSplashScreenHidden = true
            }
        },
        onSplashScreenDone() {
            this.isSplashScreenDone = true
        },
    },
})
