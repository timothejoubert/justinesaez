<template>
    <div :class="$style.root">
        <h1>{{ pageData.title }}</h1>
        <!--        <v-about-tags :class="$style.tags" />-->
        <v-marquee-carousel />

        <div :class="$style.left">
            <h2 v-if="about.subTitle" class="text-h3" :class="$style.title">{{ about.subTitle }}</h2>
            <p class="text-h4" :class="$style.content">{{ about.description }}</p>
            <div :class="$style.socials">
                <v-social v-for="(social, i) in socials" :key="i" :social="social" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { AboutPage } from '~/types/app'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VAbout',
    computed: {
        about(): AboutPage {
            return this.pageData as AboutPage
        },
        socials() {
            return this.$store.state.headData.socials
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}

.tags {
    position: fixed;
    top: rem(65);
    left: rem(-30);
    transform: rotate(-4deg);
    transform-origin: center;
}

.title {
    margin-bottom: rem(30);
}

.left {
    max-width: 60%;
    margin-top: 35vh;
    margin-left: 8vw;
}

.content {
    margin-bottom: rem(60);
}

.socials {
    display: flex;
    flex-wrap: wrap;
    gap: rem(15);
}
</style>
