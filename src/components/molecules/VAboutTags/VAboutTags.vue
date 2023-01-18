<template>


    <div :class="rootClass">


        <v-marquee content="test">


            <div :class="$style.tags">


                <v-pill v-for="(tag, i) in tags" :key="i" :label="tag" :class="$style.tag" />


            </div>


        </v-marquee>


    </div>


</template>


<script lang="ts">
import Vue from 'vue'
import { tags } from '~/mock-data/tags'

export default Vue.extend({
    name: 'VAboutTags',
    props: {},
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
        tags(): string[] {
            return tags
        },
    },
    methods: {},
})
</script>


<style lang="scss" module>
.root {
    overflow: hidden;
    padding: rem(160) 0;
}
.tags {
    transform: rotate(-4deg);
    transform-origin: center;
}
.tag {
    margin-inline: rem(13);
}
</style>


