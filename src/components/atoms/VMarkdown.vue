<script lang="ts">
import { marked } from 'marked'
import Vue from 'vue'
import type { VNode } from 'vue'
import { joinURL } from 'ufo'

const renderer = new marked.Renderer()
const linkRenderer = renderer.link

renderer.link = (href: string, title: string, text: string) => {
    let html = linkRenderer.call(renderer, href, title, text)

    if (href && href.startsWith('http') && !html.includes('target="_blank"')) {
        html = html.replace(/^<a /, '<a target="_blank" ')
    }

    return html
}

export default Vue.extend({
    name: 'VMarkdown',
    props: {
        content: String, // use this prop or directly default slot
        inline: Boolean,
        parsed: Boolean,
        tag: String,
    },
    mounted() {
        this.$el.querySelectorAll('a').forEach((link) => link.addEventListener('click', this.onLinkClick))
    },
    beforeDestroy() {
        this.$el.querySelectorAll('a').forEach((link) => link.removeEventListener('click', this.onLinkClick))
    },
    methods: {
        onLinkClick(event: MouseEvent) {
            const link = event.currentTarget as HTMLLinkElement

            if (event.metaKey || event.ctrlKey || event.shiftKey) return

            if (event.defaultPrevented) return

            // target blank
            if (link.target === '_blank') return

            // download link or external
            if (link.hasAttribute('download')) return

            const href = link.getAttribute('href')

            if (!href) return

            // mailto
            if (href.startsWith('mailto:')) return

            // anchor
            if (href.startsWith('#')) return

            // not relative or absolute URL without protocol
            if (!href.startsWith('/') || href.startsWith('//')) return

            event.preventDefault()

            this.$router.push(href)
        },
    },
    render(createElement): VNode {
        const { inline, tag, parsed } = this.$props
        const content = this.$slots.default?.[0]?.text?.trim() || this.content

        let parsedContent = ''

        if (typeof content === 'string') {
            if (parsed) {
                parsedContent = content
            } else {
                const $config = this.$config
                const leadingOrTrailingSlash = /^\/|\/$/g
                const documentPath = ($config.documentPath?.trim() || 'assets').replace(leadingOrTrailingSlash, '')
                const interventionRequestBasePath = ($config.interventionRequest?.basePath?.trim() || 'files').replace(
                    leadingOrTrailingSlash,
                    ''
                )
                // replace image relative paths to absolute paths
                const contentWithParsedImages = content.replace(
                    new RegExp(`(\\(\\/(?:${documentPath}|${interventionRequestBasePath})+[^\\)]+)`, 'gm'),
                    (match: string) => '(' + joinURL($config.apiURL, match.slice(1))
                )

                if (inline) parsedContent = marked.parseInline(contentWithParsedImages, { renderer })
                else parsedContent = marked(contentWithParsedImages, { renderer })
            }
        }

        return createElement(tag || 'div', {
            domProps: { innerHTML: parsedContent },
            class: [this.$style.root],
        })
    },
})
</script>

<style lang="scss" module>
@use 'sass:math';

.root {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        &:not(:first-child) {
            margin-top: 1.5em;
        }

        &:not(:last-child) {
            margin-bottom: 0.5em;
        }
    }

    h1 {
        @include text-h1;
    }

    h2 {
        @include text-h2;
    }

    h3,
    h4,
    h5,
    h6 {
        @include text-h3;
    }

    strong {
        font-weight: bold;
    }

    a {
        position: relative;
    }

    a::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--color-main);
        content: '';
        opacity: 0.8;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s;
    }

    a:hover::after {
        transform: scaleX(1);
    }

    hr {
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        margin: 1em 0;
    }

    & > ul,
    & > ol {
        &:not(:first-child),
        &:not(hr + &) {
            margin-top: 1.8em;
        }
    }

    li {
        position: relative;
        padding: rem(8) 0 rem(8) rem(40);
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);

        &:last-child {
            border: none;
        }

        &::before {
            position: absolute;
            top: calc(0.5em + #{rem(math.div(8, 2))});
            left: 0;
            width: rem(8);
            height: rem(8);
            background-color: currentColor;
            border-radius: 50%;
            content: '';
        }

        li {
            @include text-body-m;

            padding: rem(2) 0 rem(2) rem(25);
            border: none;

            &::before {
                top: calc(0.5em + #{rem(math.div(6, 2))});
                width: rem(6);
                height: rem(6);
                background-color: currentColor;
                content: '';
            }
        }
    }

    ol {
        counter-reset: item;
    }

    ol li {
        counter-increment: item;

        &::before {
            top: rem(8);
            width: auto;
            height: auto;
            background-color: transparent;
            content: counters(item, '.') '.';
        }

        li {
            padding-left: rem(40);

            &::before {
                top: rem(2);
            }
        }
    }

    > p + p,
    > ul + p {
        margin-top: 1.5em;
    }

    //blockquote {
    //    @include text-quote;
    //}

    img {
        display: block;
        max-width: 100%;
        height: auto;
        margin: rem(15) 0;
    }
    iframe {
        max-width: 100%;
        margin: rem(15) 0;
        aspect-ratio: 16/9;
    }
}
</style>
