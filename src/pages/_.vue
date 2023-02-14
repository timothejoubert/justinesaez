<template>
    <div :class="$style.root">
        <lazy-v-home v-if="isHome" />
        <lazy-v-sketch-books v-else-if="isSketchBook" />
        <lazy-v-project-list v-else-if="isProjectListing" />
        <lazy-v-about v-else-if="isAbout" />
        <lazy-v-project v-else-if="isProject" />
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Page from '~/mixins/Page'

export default mixins(Page).extend({
    name: 'DefaultPage',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    overflow: hidden;
    height: 100vh;
}

.title {
    position: absolute;
    z-index: 99;
    top: 30%;
    left: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    user-select: none;
}
</style>
