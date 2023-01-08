import Vue from 'vue'
import { throttle } from 'throttle-debounce'

interface MousePosition {
    x: number
    y: number
}

export default Vue.extend({
    data() {
        return {
            mousePosition: {} as MousePosition,
            moveCallback: throttle(300, (this as any).onMouseMove),
        }
    },
    mounted() {
        window.addEventListener('mousemove', this.moveCallback)
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.moveCallback)
    },
    methods: {
        onMouseMove(event: MouseEvent) {
            this.mousePosition = {
                x: event.clientX,
                y: event.clientY,
            }
            this.onMousePositionUpdate()
        },
        onMousePositionUpdate() {},
    },
})
