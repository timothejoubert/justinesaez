<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode } from 'vue'

export default Vue.extend({
    name: 'VPill',
    functional: true,
    props: {
        label: String as PropType<String>,
    },
    render(createElement, context): VNode | VNode[] {
        const { label } = context.props
        if (!label) createElement('')

        return createElement(
            'div',
            { ...context.data, class: [context.data.staticClass, context.data.class, context.$style.root, 'text-h3'] },
            label?.toString()
        )
    },
})
</script>


<style lang="scss" module>
.root {
    display: inline-block;
    padding: rem(14) rem(50);
    background-color: var(--color-main-soft);
    border-radius: rem(75);
    min-width: rem(220);
    color: var(--color-main);
}
</style>


