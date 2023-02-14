<script lang="ts">
import type { Swiper, SwiperOptions } from 'swiper'
import type { PropType, VNode, VueConstructor } from 'vue'
import Vue from 'vue'
import { CreateElement } from 'vue/types/umd'
import { SwiperModule } from 'swiper/types'

export interface Inject {
    registerSlide(): void
}

export interface Component extends Vue {
    swiper?: Swiper
    resizeObserver?: ResizeObserver | null
    isLoadingSwiper?: boolean
}
export interface CarouselOptions extends SwiperOptions {
    role?: string
}

export interface CarouselData {
    snap?: number
}

export default (Vue as VueConstructor<Component>).extend({
    name: 'VCarousel',
    provide(): Inject {
        return {
            registerSlide: this.registerSlide,
        }
    },
    props: {
        options: {
            type: Object as PropType<CarouselOptions>,
        },
        value: {
            type: Number,
            default: 0,
        },
        wrapperTag: {
            type: String,
            default: 'div',
        },
        asyncSlides: Boolean,
    },
    data() {
        return {
            numSlides: 0,
        }
    },
    watch: {
        // options() {
        //     this.reset()
        // },
        value(current: number) {
            if (this.swiper && !this.swiper.destroyed) {
                this.$emit('carouselUpdate', { snap: this.swiper.snapGrid?.length })
                this.swiper.slideTo(current)
            }
        },
        numSlides() {
            this.checkIfSlidesAreReady()
        },
    },
    beforeDestroy() {
        this.disposeSwiper()
    },
    mounted() {
        if (this.asyncSlides) this.checkIfSlidesAreReady()
        else this.createSwiper()
    },
    methods: {
        registerSlide() {
            this.numSlides++
        },
        checkIfSlidesAreReady() {
            if (this.$children.length === this.$slots.default?.length) {
                this.$nextTick(this.createSwiper)
            }
        },
        async createSwiper() {
            if (!this.$slots.default || this.swiper || this.isLoadingSwiper) return

            this.isLoadingSwiper = true

            const SwiperBundle = await import('swiper')
            const modules: SwiperModule[] = []

            this.isLoadingSwiper = false

            if (this.options?.freeMode) {
                modules.push(SwiperBundle.FreeMode)
            }

            if (this.options?.mousewheel) {
                modules.push(SwiperBundle.Mousewheel)
            }

            this.resizeObserver = new ResizeObserver(this.onResizeObserverChange)
            this.swiper = new SwiperBundle.Swiper(this.$el as HTMLElement, {
                modules,
                grabCursor: true,
                preventInteractionOnTransition: true,
                threshold: 6,
                slidesPerView: 'auto',
                watchOverflow: true,
                initialSlide: this.value,
                ...this.options,
                on: {
                    slideChange: (swiper: Swiper): void => {
                        this.$emit('input', swiper.activeIndex)
                    },
                    init: (swiper: Swiper): void => {
                        this.$emit('swiper-init', swiper)
                        this.resizeObserver?.observe(swiper.wrapperEl)
                        this.computeSwiperActivation(swiper)
                    },
                    update: (swiper: Swiper): void => {
                        this.computeSwiperActivation(swiper)
                    },
                },
            })
        },
        computeSwiperActivation(swiper: Swiper): void {
            this.$emit('carouselUpdate', { snap: swiper.snapGrid?.length })

            if (swiper.allowSlideNext || swiper.allowSlidePrev) {
                swiper.enable()
                this.$emit('enable')
            } else {
                swiper.disable()
                this.$emit('disable')
            }
        },
        refresh(): void {
            this.swiper && this.swiper.update()
        },
        disposeSwiper(): void {
            this.resizeObserver?.disconnect()
            this.resizeObserver = null

            this.swiper && this.swiper.destroy()
        },
        async reset(): Promise<void> {
            await this.disposeSwiper()
            await this.createSwiper()
        },
        next(): void {
            this.swiper && this.swiper.slideNext()
        },
        previous(): void {
            this.swiper && this.swiper.slidePrev()
        },
        slideTo(index: number, speed?: number, runCallbacks?: boolean) {
            this.swiper?.slideTo(index, speed, runCallbacks)
        },
        onResizeObserverChange() {
            this.swiper?.update()
        },
    },
    render(createElement: CreateElement): VNode {
        const children = this.$slots.default

        if (!children) return createElement('')

        children.forEach((vNode: VNode) => {
            vNode.data = { ...vNode.data, class: [vNode.data?.class, 'swiper-slide'] }
        })

        return createElement('div', [
            createElement(
                this.wrapperTag,
                {
                    attrs: { role: this.options?.role },
                    class: this.options?.wrapperClass || 'swiper-wrapper',
                    style: { 'touch-action': 'pan-y' },
                },
                children
            ),
        ])
    },
})
</script>
