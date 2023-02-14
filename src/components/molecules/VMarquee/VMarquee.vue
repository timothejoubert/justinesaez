<template>
    <div v-if="content" :class="[$style.root, !active && $style['root--hidden']]" :data-content="content">
        <slot :class="$style.content" />
        <slot v-for="key in missingElementsToAdd" :id="key" aria-hidden="true" :class="$style.content" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import { gsap } from 'gsap'
import { throttle } from 'throttle-debounce'
// import { isPassiveSupported } from '~/utils/passive-supported'
// import { mapRange } from '~/utils/utils'

interface Component extends Vue {
    scrollY: number
    scrollDirection: 1 | -1
    scrollOffset: number
    scrollCallback: EventListener
}

export default (Vue as VueConstructor<Component>).extend({
    name: 'VMarquee',
    props: {
        content: String,
        active: { type: Boolean, default: true },
        speed: { type: Number, default: 50 },
    },
    data() {
        return {
            element: null as null | HTMLElement,
            offsetTranslateDistance: 0,
            missingElementsToAdd: 0,
            timeline: null as null | GSAPTween,
            contentObserver: null as ResizeObserver | null,
        }
    },
    watch: {
        active(isActive: boolean) {
            if (!this.timeline) this.initAnimation()
            if (isActive) this.playAnimation()
            else this.pauseAnimation()
        },
    },
    mounted() {
        this.scrollY = window.scrollY
        this.scrollCallback = throttle(100, (this as any).onScroll)

        this.update()

        window.addEventListener('scroll', this.scrollCallback)
        // window.addEventListener('scroll', this.scrollCallback, isPassiveSupported() ? { passive: true } : false)

        const el = this.$slots?.default?.[0]?.elm
        if (!el) return

        // window.addEventListener('wheel', this.onWheel)
        this.element = el as HTMLElement
        this.initContentObserver()
        if (this.active) this.initAnimation()
        else this.pauseAnimation()
    },
    beforeDestroy() {
        // window.removeEventListener('wheel', this.onWheel)
        this.contentObserver?.disconnect()

        window.removeEventListener('scroll', this.scrollCallback)
    },
    methods: {
        update() {
            const scrollY = window.scrollY
            const scrollDirection = scrollY > this.scrollY ? 1 : -1

            if (scrollDirection === this.scrollDirection) {
                this.scrollOffset += scrollY - this.scrollY
            } else {
                this.scrollOffset = 0
            }
            this.scrollY = scrollY
            this.scrollDirection = scrollDirection
        },
        onScroll() {
            this.update()
        },
        initContentObserver() {
            this.contentObserver = new ResizeObserver((entries: ResizeObserverEntry[]) =>
                this.onContentResized(entries)
            )
            this.contentObserver.observe(this.element as HTMLElement)
        },
        onContentResized(entries: ResizeObserverEntry[]) {
            if (entries[0].contentBoxSize) {
                this.updateTranslateDistance(entries[0])
                this.updateDuplicateContent()
                if (this.timeline) this.resetAnimation()
            }
        },
        updateTranslateDistance(entry: ResizeObserverEntry) {
            this.offsetTranslateDistance =
                entry.contentRect.width + parseInt(window.getComputedStyle(entry.target).marginRight) || 0
        },
        updateDuplicateContent() {
            const offsetWidth = Math.ceil(window.innerWidth / this.offsetTranslateDistance)
            this.missingElementsToAdd = Math.max(offsetWidth, 1)
        },
        pauseAnimation() {
            gsap.to(this.$el, { opacity: 0, duration: 0.2 }).then(() => this.timeline?.pause())
        },
        playAnimation() {
            this.timeline?.resume()
            gsap.to(this.$el, { opacity: 1, duration: 0.2 })
        },
        resetAnimation() {
            this.timeline?.kill()
            this.timeline = null
            this.initAnimation()
        },
        initAnimation() {
            if (this.timeline) return
            const duration = this.offsetTranslateDistance / this.speed

            this.timeline = gsap.fromTo(
                this.$el,
                { x: 0 },
                {
                    repeat: -1,
                    x: '-' + this.offsetTranslateDistance,
                    ease: 'none',
                    duration,
                }
            )
        },
    },
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    width: fit-content;
    min-width: 100%;
    grid-column: 1 / -1;
    white-space: nowrap;
}

.content {
    position: relative;
    display: inline-block;
    margin-right: rem(30);
}
</style>
