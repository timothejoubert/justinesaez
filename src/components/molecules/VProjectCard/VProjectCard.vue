<template>
    <div :class="$style.root">
        <div :class="$style.head">
            <span :class="$style.counter">
                <span :class="$style.current">{{ index + 1 }} /</span>
                <span :class="$style.length">{{ length }}</span>
            </span>
            <h2>{{ project.title }}</h2>
            <div v-if="year">{{ year }}</div>
        </div>
        <div :class="$style.image"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { Project } from '~/types/app'
import { stringDateToYear } from '~/utils/utils'

export default Vue.extend({
    name: 'VProjectCard',
    props: {
        project: Object as PropType<Project>,
        length: Number,
        index: Number,
    },
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
        year(): number | null {
            return stringDateToYear(this.project.date)
        },
    },
    methods: {},
})
</script>

<style lang="scss" module>
.head {
    min-height: rem(70);
    margin-left: rem(10);
}

.image {
    width: 100%;
    min-height: 100%;
    background-color: lightgrey;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
