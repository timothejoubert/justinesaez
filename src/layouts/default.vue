<template>
    <div :class="$style.root">
        <nuxt-link v-if="siteName && isReady" to="/" :class="$style.title">
            <h1>{{ siteName }}</h1>
        </nuxt-link>

        <template v-if="splashScreenState !== 'hidden'">
            <transition :name="$style['splash-screen']">
                <v-splash-screen v-if="splashScreenState !== 'done'" v-model="splashScreenState" />
            </transition>
        </template>

        <Nuxt v-show="isReady" />

        <v-nav v-show="isReady" :class="$style.nav" />
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Resize from '~/mixins/Resize'
import SplashScreen from '~/mixins/SplashScreen'

export default mixins(Resize, SplashScreen).extend({
    computed: {
        siteName(): string | undefined {
            return this.$store.state.headData.siteName
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}

.title {
    position: fixed;
    z-index: 11;
    top: rem(30);
    left: 50%;
    color: color(orange);
    font-family: $dida;
    transform: translateX(-50%);

    h1 {
        font-weight: 300;
    }
}

.nav {
    .root & {
        position: fixed;
        z-index: 100;
        bottom: rem(40);
        width: 100%;
    }
}

.splash-screen:global(#{'-enter-active'}),
.splash-screen:global(#{'-leave-active'}) {
    transition-duration: 2s;
    transition-delay: 1s;
    transition-property: opacity;
}

.splash-screen:global(#{'-enter'}),
.splash-screen:global(#{'-leave-to'}) {
    opacity: 0;
}
</style>
