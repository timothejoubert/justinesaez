<template>
    <nav :class="rootClass" @mouseleave="onMouseLeave">
        <div ref="slider" :class="$style.slider"></div>
        <ul v-if="pages && pages.length" :class="$style.list">
            <li
                v-for="link in pages"
                :key="link['@id']"
                ref="link"
                :class="$style.item"
                @mouseenter="onMouseEnter(link.slug)"
            >
                <nuxt-link :to="link.relativePath">{{ link.title }}</nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { gsap } from 'gsap'

export default Vue.extend({
    name: 'VNav',
    data() {
        return {
            selectedIndex: 0,
            indicatorTimeline: null as null | GSAPTimeline,
        }
    },
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
        pages(): PageData[] | undefined {
            return this.$store.state.commonContent?.menu
        },
    },
    watch: {
        $route() {
            this.updateSelectedIndexByRoute()
        },
        selectedIndex(newIndex: number, oldIndex: number) {
            this.updateIndicatorPosition(newIndex, oldIndex)
        },
    },
    mounted() {
        this.updateSelectedIndexByRoute()
        this.updateIndicatorPosition(this.selectedIndex)
    },
    methods: {
        onMouseLeave() {
            this.updateSelectedIndexByRoute()
        },
        onMouseEnter(slug: string) {
            this.updateSelectedIndexBySlug(slug)
        },
        updateSelectedIndexByRoute() {
            this.updateSelectedIndexBySlug(this.$route.path)
        },
        updateSelectedIndexBySlug(selectedSlug: string) {
            this.selectedIndex = Math.max(this.pages?.findIndex((page) => page.slug === selectedSlug) || 0, 0)
        },
        updateIndicatorPosition(newIndex: number, oldIndex?: number) {
            const targets = this.$refs.link as HTMLElement[]
            const selectedTarget = targets?.[newIndex] || targets?.[0]
            const slider = this.$refs.slider

            if (!selectedTarget || !slider) return

            this.indicatorTimeline = gsap.timeline({ defaults: { duration: 0.4 } })
            this.indicatorTimeline.to(slider, { x: selectedTarget.offsetLeft, width: selectedTarget.offsetWidth })

            if (typeof oldIndex === 'number' && targets?.[oldIndex]) this.indicatorTimeline.to(targets[oldIndex], { color: 'red', ease: 'none' }, 0)
            this.indicatorTimeline.to(selectedTarget, { color: '#fff', ease: 'none' }, 0)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}

.list {
    display: inline-flex;
    padding: rem(4);
    border: 2px solid red;
    border-radius: rem(30);
}

.item {
    display: flex;
    min-width: rem(68);
    min-height: rem(34);
    align-items: center;
    justify-content: center;
    padding-inline: rem(14);
}

.slider {
    position: absolute;
    z-index: -1;
    top: rem(4);
    left: 0;
    bottom: rem(4);
    background: red;
    border-radius: rem(30);
    pointer-events: none;
    user-select: none;
    color: red;
}
</style>
