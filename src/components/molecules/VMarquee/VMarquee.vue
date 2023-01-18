<template>


    <div v-if="content" :class="[$style.root, !active && $style['root--hidden']]" :data-content="content">


        <slot :class="$style.content">


            <div ref="title" :class="$style.content">{{ content }}</div>


        </slot>


        <span v-for="element in missingElementsToAdd" :key="element" aria-hidden="true" :class="$style.content">
             {{ content }}
        </span>


    </div>


</template>


<script lang="ts">
import Vue from 'vue'
import { gsap, timeline } from 'gsap'
import { mapRange } from '~/utils/utils'

export default Vue.extend({
    name: 'VMarquee',
    props: {
        content: String,
        active: { type: Boolean, default: true },
        speed: { type: Number, default: 50 },
    },
    data() {
        return {
            offsetTranslateDistance: 0,
            missingElementsToAdd: 0,
            timeline: null as null | GSAPTween,
            titleObserver: null as ResizeObserver | null,
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
        window.addEventListener('wheel', this.onWheel)
        this.initTitleObserver()
        if (this.active) this.initAnimation()
        else this.pauseAnimation()
    },
    beforeDestroy() {
        window.removeEventListener('wheel', this.onWheel)
        this.titleObserver?.disconnect()
    },
    methods: {
        onWheel(event: WheelEvent) {
            const newValue = mapRange(Math.abs(event.deltaY), 0, 100, -0.001, 0.001)
            const newProgress = this.timeline.progress() + newValue

            console.log(newValue, newProgress)

            this.timeline.progress(newProgress)
        },
        initTitleObserver() {
            this.titleObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => this.onTitleResize(entries))
            console.log(this.$refs.title, this.$slots)
            if (this.$refs.title) this.titleObserver.observe(this.$refs.title as HTMLElement)
            else if (this.$slots?.default?.[0]) {
                this.titleObserver.observe(this.$slots.default[0].elm as HTMLElement)
            }
        },
        onTitleResize(entries: ResizeObserverEntry[]) {
            if (entries[0].contentBoxSize) {
                this.updateTranslateDistance(entries[0])
                this.updateDuplicateTitle()
                if (this.timeline) this.resetAnimation()
            }
        },
        updateTranslateDistance(entry: ResizeObserverEntry) {
            this.offsetTranslateDistance =
                entry.contentRect.width + parseInt(window.getComputedStyle(entry.target).marginRight) || 0
        },
        updateDuplicateTitle() {
            this.missingElementsToAdd = Math.max(Math.ceil(window.innerWidth / this.offsetTranslateDistance) - 2, 0)
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
                    repeat: 1,
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

    &::before,
    &::after {
        position: relative;
        display: inline;
        order: 2;
        margin-right: rem(30);
        content: attr(data-content);
    }
}

.content {
    position: relative;
    display: inline-block;
    margin-right: rem(30);
}
</style>


