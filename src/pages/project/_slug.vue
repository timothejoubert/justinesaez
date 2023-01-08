<template>
    <v-counter-dom :class="$style.project" :enter="enter" transition-name="item-project">
        <nuxt-link ref="back-link" to="/" :class="$style.head">
            <v-button-cross :class="$style.cross" />
            <v-split-word
                v-if="project.title"
                ref="title"
                :class="[$style.title, 'text-h3']"
                :content="project.title"
            />
        </nuxt-link>
        <div v-if="displayTags" :class="$style.tags">
            <v-pill
                v-for="(tag, indexTag) in project.tags"
                :key="indexTag"
                :class="$style.tag"
                size="s"
                :label="tag.name"
            />
        </div>
        <p :class="[$style.description, 'body-xs']">{{ project.description }}</p>
        <template v-if="links">
            <nuxt-link v-for="link in links" :key="link.id" :to="link.url" :class="$style.link">{{
                link.label
            }}</nuxt-link>
        </template>
        <ul v-if="medias && medias.length" :class="$style.images">
            <v-counter-dom inline :enter="enter" transition-name="item-project" :start-index="5">
                <li v-for="(media, i) in medias" :key="i" :class="$style.image">
                    <v-image :image="media" />
                </li>
            </v-counter-dom>
        </ul>
    </v-counter-dom>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import VSplitWord from '~/components/atoms/VSplitWord.vue'
import Page from '~/mixins/Page'
import VPill from '~/components/atoms/VPill.vue'
import VButtonCross from '~/components/atoms/VButtonCross.vue'
import VCounterDom from '~/components/atoms/VCounterDom.vue'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/generals'
import VImage from '~/components/atoms/VImage.vue'

export default mixins(Page).extend({
    name: 'Project',
    components: { VImage, VSplitWord, VPill, VButtonCross, VCounterDom },
    data() {
        return {
            project: {} as ProjectContent,
            enter: false,
        }
    },
    computed: {
        medias(): string[] | null {
            const thumb = this.project.thumbnail
            const gallery = this.project?.gallery?.filter((media) => !!media) || []
            if (thumb && !!gallery.length) return gallery // others.splice(0, 0, thumb)
            return typeof thumb === 'string' ? [thumb] : null
        },
        links(): Link[] | undefined {
            return this.project.links?.filter((link) => link.url)
        },
        displayTags(): boolean {
            return toBoolean(GeneralsConst.DISPLAY_PROJECT_TAGS)
        },
    },
    beforeDestroy() {
        this.enter = false
    },
    mounted() {
        this.enter = true
        const pageSlug = this.$route.params.slug
        const projects = this.$store.state.projectsData
        this.project = projects.filter((project: ProjectContent) => project.slug === pageSlug)[0]
        console.log('current project', this.project)
        ;((this.$refs['back-link'] as Vue)?.$el as HTMLElement)?.focus()
    },
})
</script>

<style lang="scss" module>
.project {
    width: 100%;
    min-height: 100vh;
    padding: 0 var(--padding-border) calc(var(--top-bar-height) * 1px);
}

.head {
    display: flex;
    height: calc(var(--top-bar-height) * 1px);
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
}

.title {
    display: inline-flex;
    align-items: center;
    text-transform: uppercase;

    & :global(.split-letter) {
        font-variation-settings: 'wght' 900;
        transition: font-variation-settings 0.3s ease(out-quad) calc(40ms * var(--index-letter-total));
    }

    .head:hover & :global(.split-letter) {
        font-variation-settings: 'wght' 100;
    }
}

.link {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-right: rem(12);
}

.tags {
    display: flex;
}

.tag {
    margin-bottom: rem(10);

    &:not(:last-child) {
        margin-right: rem(8);
    }
}

.description {
    margin: rem(15) 0 rem(25);
    opacity: 0.8;

    *:not(.tags) + & {
        margin-top: 0;
    }
}

.images {
    position: relative;
    *:not(.description) + & {
        margin-top: rem(33);
    }
}

.image {
    position: relative;
    display: flex;

    --figure-width: 100%;
    --image-width: 100%;

    &:not(:last-child) {
        margin-bottom: rem(25);
    }
}
</style>
