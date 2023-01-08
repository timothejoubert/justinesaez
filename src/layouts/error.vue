<template>
    <section :class="rootClasses">
        <div :class="$style.head">
            <h1>## Page error ## 🤦‍ Probablement une 404...️</h1>
        </div>
        <p>{{ message }}</p>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'

export interface ErrorComponent extends Vue {
    onClick(): void
}

export default Vue.extend({
    layout: 'error',
    computed: {
        rootClasses(): (undefined | false | string)[] {
            return [this.$style.root, this.isPageProject && this.$style['root--project']]
        },
        message(): string {
            return this.isPageProject
                ? `J'en peux plus de cette page de projet qui bug !!`
                : "Y a un pb je sais pas d'ou ça vient"
        },
        isPageProject(): boolean {
            return !!this.$route.path.includes('project')
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
