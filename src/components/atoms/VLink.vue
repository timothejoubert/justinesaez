<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode } from 'vue'
import { isExternalPath, isRelativePath } from '~/types/link'

interface LinkDocument {
    type?: string
    url?: string
}

export default Vue.extend({
    name: 'VLink',
    functional: true,
    props: {
        label: [String, Boolean],
        href: String,
        to: String,
        document: Object as PropType<LinkDocument>,
    },
    render(createElement, context): VNode | VNode[] {
        const src = context.props.href || context.props.to
        const document = context.props.document
        const label: string | undefined | boolean = context.props.label

        const isExternal = isExternalPath(src)
        const isInternal = isRelativePath(src)
        const isDocument = !isInternal && !isExternal && !!document && !!document?.url

        if (!src && !document && !label) {
            return (
                context.scopedSlots.default?.({ label: context.props.label }) ||
                context.slots()?.default ||
                (context.props.label && createElement('span', [context.props.label])) ||
                createElement('')
            )
        }

        if (!src && !document) {
            return context.slots()?.default || (label ? createElement('span', String(label)) : createElement(''))
        }

        let target!: string
        let href!: string
        let rel!: string
        let to!: string
        let tag!: string

        if (isExternal || isDocument) {
            tag = 'a'
            href = src
            target = '_blank'
            rel = 'noopener'
        } else if (isInternal) {
            tag = 'nuxt-link'
            to = src
        }

        return createElement(
            tag,
            {
                ...context.data,
                attrs: {
                    ...context.data.attrs,
                    rel,
                    href,
                    target,
                },
                props: {
                    to,
                },
            },
            context.slots()?.default || (label && String(label)) || ''
        )
    },
})
</script>
