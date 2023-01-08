<template>
    <div :class="$style.root">
        <h1>page project</h1>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Page from '~/mixins/Page'

export default mixins(Page).extend({
    name: 'Project',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
