<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode } from 'vue'
import ImagePlaceHolder from '~/assets/images/icons/not-found.svg?sprite'

function isImageObject(image: CloudinaryImage | string): image is CloudinaryImage {
    return typeof image !== 'string'
}

interface CloudinaryImage {
    formats: CloudinaryImageFormats
}

type CloudinaryFormats = 'large' | 'medium' | 'small' | string

type CloudinaryImageFormats = {
    [key in CloudinaryFormats]: CloudinaryImageContent
}

interface CloudinaryImageContent {
    url?: string
    width?: number
    height?: number
    alternativeText?: string
    extension?: ImageExtension
}

type ImageExtension = 'gif' | 'png' | 'jpg' | 'jpeg' | 'webp'

export default Vue.extend({
    name: 'VImage',
    components: { ImagePlaceHolder },
    props: {
        image: [String, Object] as PropType<CloudinaryImage | string>,
    },
    data() {
        return {
            loaded: false,
            isSourceNotFound: false,
        }
    },
    mounted() {
        if ('querySelector' in this.$el) {
            const img = this.$el.querySelector('img')
            if (img?.complete) this.loaded = true
        }
    },
    render(createElement): VNode {
        const img = this.image
        if (!img) return createElement('')

        const imgAttributes: Record<string, any> = {}

        if (!isImageObject(img)) {
            imgAttributes.src = img as string
        } else {
            const largeImage = (img as CloudinaryImage)?.formats?.large
            imgAttributes.src = largeImage?.url || ''
            imgAttributes.alt = largeImage?.alternativeText || 'text alternative fallback'
            imgAttributes.width = largeImage?.width || ''
            imgAttributes.height = largeImage?.height || ''

            if ('formats' in img && !!img.formats) {
                // (max-width: 640px) 100vw,
                Object.keys(img.formats)
                    .sort((prev: CloudinaryFormats, next: CloudinaryFormats) => {
                        const formats = img?.formats
                        if (!formats) return 0
                        const prevFormat = formats[prev]
                        const nextFormat = formats[next]
                        return (prevFormat?.width || 0) - (nextFormat?.width || 0)
                    })
                    .forEach((formatKey: string, index: number, formatsKey: string[]) => {
                        const format = img?.formats
                        const formatData = format[formatKey]
                        if (!formatData) return
                        const separator = index === formatsKey.length - 1 ? '' : ','
                        imgAttributes.srcSet += `${formatData.url} ${formatData.width}w` + separator
                        imgAttributes.imgSizes += `(max-width: ${formatData.width}px) 50vw` + separator
                    })
            }
        }

        const imgNode = createElement('img', {
            attrs: {
                ...imgAttributes,
            },
            class: [this.$style.image],
            on: {
                load: () => {
                    this.loaded = true
                },
                error: () => {
                    this.isSourceNotFound = true
                },
            },
        })

        return this.isSourceNotFound
            ? createElement('div', { class: this.$style.placeholder }, [createElement(ImagePlaceHolder)])
            : createElement(
                  'figure',
                  {
                      class: [this.$style.root],
                  },
                  [imgNode]
              )
    },
})
</script>

<style lang="scss" module>
.root {
    display: inline-block;
    width: var(--figure-width);
    height: var(--figure-height);
    background-color: var(--image-background-color);
    border-radius: var(--image-border-radius, 0);
    transform: translate(0); // update context to prevent crop glitch on safari

    &--loaded.root--rounded-ready,
    &--loaded.root--rounded {
        background-color: inherit !important;
        transform: none;
        transition: var(--image-transition, all 0s), background 300ms 600ms, transform 0ms 600ms;
    }

    &--ratio {
        position: relative;
        display: block;
    }

    &--rounded-ready,
    &--rounded {
        overflow: hidden;
        backface-visibility: hidden;
    }
}

// targets direct <img /> child or <picture /> nested <img />
.root img {
    display: block;
    width: var(--image-width, auto);
    max-width: var(--image-max-width, 100%);
    height: var(--image-height, auto);
    object-fit: var(--image-object-fit, initial);
    object-position: var(--image-object-position, initial);
}

.root--ratio img {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--image-width, 100%);
    height: var(--image-height, 100%);
    object-fit: var(--image-object-fit, cover);
}

.root--lazy img {
    opacity: 0;
    transition: var(--image-img-transition, all 0s), opacity 0.3s;
}

.root--loaded img {
    opacity: 1;
}

.placeholder {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 250px;
    align-items: center;
    justify-content: center;

    &::before {
        position: absolute;
        background-color: var(--color-main);
        content: '';
        inset: 0;
        opacity: 0.05;
    }

    & > svg {
        width: 35px;
        height: auto;
        opacity: 0.45;
    }
}
</style>
