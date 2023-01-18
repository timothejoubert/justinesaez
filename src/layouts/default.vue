<template>


    <div :class="$style.root">


        <transition name="fade">


            <v-splash-screen
                v-if="displaySplashScreen && !isSplashScreenDone"
                :start="displaySplashScreen"
                @splashScreenDone="onSplashScreenDone"
            />


        </transition>


        <h1 v-if="isSplashScreenDone">Default layout</h1>


        <!--        <cld-image-->


        <!--            public-id="your-public-image-id"-->


        <!--            width="200"-->


        <!--            crop="scale"-->


        <!--            fetchFormat="auto"-->


        <!--            quality="auto"-->


        <!--            loading="lazy"-->


        <!--        />-->


    </div>


</template>


<script lang="ts">
import mixins from 'vue-typed-mixins'
import Resize from '~/mixins/Resize'
import SplashScreen from '~/mixins/SplashScreen'

export default mixins(Resize, SplashScreen).extend({
    components: {},
})
</script>


<style lang="scss" module>
.root {
    position: relative;
}
</style>


