<template>
    <div :class="$style.root">
        <pre>default layout</pre>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Resize from '~/mixins/Resize'

export default mixins(Resize).extend()
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
