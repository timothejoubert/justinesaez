<template>
    <div :class="$style.root">
        <div :class="$style.center">
            <v-split-word
                :class="[$style.title, 'text-h1']"
                :content="titleSite"
                :displayed="start"
                default-hidden
                transition-end-event
                break-word
                @transitionend="onTransitionEnd"
            />
            <div :class="$style.slider"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VSplashScreen',
    props: {
        start: Boolean,
    },
    data() {
        return {
            titleSite: this.$config.appTitle || 'tim',
            animateInDone: false,
        }
    },
    watch: {
        start(state: boolean) {
            if (state) this.startLoading()
        },
    },
    mounted() {
        if (this.start) this.startLoading()
    },
    methods: {
        startLoading() {
            this.$el.classList.add('load')
        },
        loadingReverse() {
            this.$el.classList.remove('load')
            this.$el.classList.add('load--finish')
        },
        onTransitionEnd() {
            if (this.animateInDone) this.onSplashScreenFadeOut()
            this.setFadeOut()
            this.animateInDone = true
        },
        setFadeOut() {
            this.loadingReverse()
        },
        onSplashScreenFadeOut() {
            this.$emit('splashScreenDone')
        },
    },
})
</script>

<style lang="scss" module>
$delay-bar: 0s;
$duration-bar: 0.5s;

$delay-cursor: $delay-bar + $duration-bar;
$duration-cursor: 1.4s;

$delay-background: 0.9s;
$duration-background: 1s;

.root {
    position: fixed;
    z-index: 100;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--color-main);

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-bg);
        border-radius: 8px 64px 8px 8px;
        content: '';
        transform: scale(0.996, 0.992);
        transition: transform $duration-background $delay-background ease(in-back);
    }

    &:global(.load)::after {
        transform: scale(1.08);
    }

    &:global(.load--finish)::after {
        transform: scale(1.08);
    }
}

.center {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title {
    margin-bottom: 40px;
    color: var(--color-main);
    text-align: center;
}

.slider {
    position: relative;
    width: 300px;
    height: 2px;
    margin: 0 auto;
    background-color: var(--color-main);
    opacity: 0;
    transition: opacity $duration-bar $delay-bar ease(out-quart);

    .root:global(.load) & {
        opacity: 1;
    }

    &::after {
        position: absolute;
        top: -8px;
        width: 18px;
        height: 18px;
        border: 2px solid var(--color-main);
        background-color: var(--color-bg);
        content: '';
        transition: transform $duration-cursor $delay-cursor ease(out-quart);
    }

    .root:global(.load) &::after {
        transform: translateX(300px) !important;
    }
    .root:global(.load--finish) &::after {
        transition-delay: 0.2s;
    }
}
</style>
