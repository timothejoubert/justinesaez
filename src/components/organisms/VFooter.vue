<template>
    <footer :class="rootClasses">
        <h1>footer</h1>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VFooter',
    computed: {
        rootClasses(): (string | false | undefined)[] {
            return [this.$style.root]
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
