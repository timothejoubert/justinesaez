<template>
    <v-carousel v-model="slideIndex" :options="carouselOptions" :class="$style.root" wrapper-tag="ul">
        <v-pill v-for="(tag, i) in tags" :key="i" :label="tag" :class="$style.tag" />
    </v-carousel>
</template>

<script lang="ts">
import Vue from 'vue'
import { getProjectTags } from '~/utils/parse-api-data'
import { CarouselOptions } from '~/components/molecules/VCarousel/VCarousel.vue'

export default Vue.extend({
    name: 'VMarqueeCarousel',
    data() {
        return {
            slideIndex: 0,
        }
    },
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
        tags(): string[] {
            return getProjectTags()
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
    methods: {},
})
</script>

<style lang="scss" module>
.root :global(.swiper-wrapper) {
    display: flex;
    align-items: flex-end;
}

.tag {
    flex-shrink: 0;
}
</style>
