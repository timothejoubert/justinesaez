<template>
    <div :class="rootClass">
        <h1>{{ pageData.title }}</h1>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VHome',
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
    },
    methods: {},
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
