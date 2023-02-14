<template>
    <div :class="$style.root">
        <v-carousel v-model="slideIndex" :options="carouselOptions" :class="$style.carousel" wrapper-tag="ul">
            <li v-for="(project, i) in projects" :key="i" :class="$style.project">
                <v-link :to="project.relativePath">
                    <v-project-card :index="i" :project="project" :length="projects.length" :class="$style.card" />
                </v-link>
            </li>
        </v-carousel>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { getProjects } from '~/utils/parse-api-data'
import { Project } from '~/types/app'
import { CarouselOptions } from '~/components/molecules/VCarousel/VCarousel.vue'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VProjectList',
    data() {
        return {
            slideIndex: 0,
        }
    },
    computed: {
        projects(): Project[] {
            const p = getProjects()
            return [...p, ...p, ...p, ...p]
        },
        carouselOptions(): CarouselOptions {
            return {
                freeMode: {
                    enabled: true,
                    sticky: true,
                    momentumBounce: false,
                    momentumRatio: 0.4,
                },
                mousewheel: {
                    sensitivity: 1.2,
                },
                loop: true,
            }
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: fixed;
    width: 100%;
    height: 100vh;
}
.carousel {
    position: relative;
    display: flex;
    overflow: hidden;
    min-width: 100%;
    height: 100%;
}

.root :global(.swiper-wrapper) {
    display: flex;
    align-items: flex-end;
}

.project {
    width: max(300px, 25vw);
    height: 50vh;
    flex-shrink: 0;
    border-right: 1px solid black;
}

.card {
    display: flex;
    height: 100%;
    flex-direction: column;
}
</style>
