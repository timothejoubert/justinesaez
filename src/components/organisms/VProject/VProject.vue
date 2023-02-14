<template>
    <div :class="rootClass">
        <h1>{{ projectItem.title }}</h1>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageProvider from '~/mixins/PageProvider'
import { Project } from '~/types/app'

export default mixins(PageProvider).extend({
    name: 'VProject',
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
        projectItem(): Project {
            return this.pageData as Project
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
