<template>
    <div :class="$style.root" :style="wrapperStyle">
        <div
            v-for="(image, index) in images"
            :key="index"
            ref="image"
            :class="$style.item"
            @mouseenter="onMouseEnter(index)"
        >
            <nuxt-img :src="`/images/cul${image.src}`" :alt="image.title" :class="$style.image" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProviderImage } from '~/types/app'
import { getCssProp, getRandomFromRange } from '~/utils/utils'

type LocationContent = [number, number]

const COLUMNS = 10
const ROWS = 7

export default Vue.extend({
    name: 'VRandomGridImages',
    data() {
        return {
            wrapperStyle: {},
            images: [] as ProviderImage[],
        }
    },
    created() {
        this.initImages()
    },
    mounted() {
        this.setWrapperGridSize()
        this.setImagePosition()
        window.addEventListener('resize', this.setWrapperGridSize)
        window.addEventListener('click', this.setImagePosition)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setWrapperGridSize)
        window.removeEventListener('click', this.setImagePosition)
    },
    methods: {
        initImages() {
            const imagesFile = require.context('~/static/images/cul/', false, /\.png$/)
            const imageArray = Array.from(imagesFile.keys()) as string[]

            this.images = imageArray.map((fileName: string) => {
                return {
                    title: "Titre de l'image",
                    src: fileName.substr(1),
                }
            })
        },
        setWrapperGridSize() {
            const padding = parseInt(getComputedStyle(this.$el).padding) * 2 || 60
            const containerWidth = window.innerWidth - padding
            const containerHeight = window.innerHeight - padding

            this.wrapperStyle = {
                '--width-column': Math.floor(containerWidth / COLUMNS) + 'px',
                '--height-row': Math.floor(containerHeight / ROWS) + 'px',
            }
        },
        generatePositionArray(): LocationContent[] {
            const coordinate: LocationContent[] = []
            let index = 0

            for (let column = 0; column < COLUMNS + 1; column++) {
                for (let row = 0; row < ROWS; row++) {
                    coordinate[index] = [column, row] as LocationContent
                    index++
                }
            }

            return coordinate
        },
        setImagePosition() {
            const positions = this.generatePositionArray()
            const images = this.$refs.image as HTMLElement[]

            images.forEach((img: HTMLElement) => {
                const selectedLocationIndex = this.pickRandomLocation(positions, img)
                positions.splice(selectedLocationIndex, 1)
            })
        },
        pickRandomLocation(positions: LocationContent[], item: HTMLElement): number {
            const randomIndex = getRandomFromRange(0, positions.length - 1)
            const selectedLocation = positions[randomIndex] as LocationContent
            item.style.setProperty('--x-position', selectedLocation[0] + '')
            item.style.setProperty('--y-position', selectedLocation[1] + '')
            return randomIndex
        },
        onMouseEnter(index: number) {
            const images = this.$refs.image as HTMLElement[]
            const selectedImage = images[index]

            const otherImagePositions = images
                .filter((image) => image !== selectedImage)
                .map((img) => {
                    return [
                        Number(getCssProp(img, '--x-position')),
                        Number(getCssProp(img, '--y-position')),
                    ] as LocationContent
                })

            // try to delete current image pos from new generatePositionArray
            const allPosition = this.generatePositionArray()
            allPosition.filter((position: LocationContent, iPos) => {
                const sameXPosition = position[0] === otherImagePositions[iPos]?.[0]
                const sameYPosition = position[1] === otherImagePositions[iPos]?.[1]
                if (sameXPosition && sameYPosition) console.log('find same X', position)
                return sameXPosition && sameYPosition
            })
            console.log(allPosition)
            if (allPosition.length) this.pickRandomLocation(allPosition, selectedImage)
            // console.log(selectedImage, restPosition)
        },
    },
})
</script>

<style lang="scss" module>
$columnWidth: var(--width-column, 140px);
$rowHeight: var(--heigth-row, 140px);

.root {
    position: fixed;
    display: grid;
    width: 100vw;
    height: 100%;
    padding: rem(60);
    grid-template-columns: repeat(10, minmax($columnWidth, $columnWidth));
    grid-template-rows: repeat(7, minmax($rowHeight, $rowHeight));
    min-width: 0;
    min-height: 0;
}

.item {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: var(--x-position) / span 1;
    grid-row: var(--y-position) / span 1;
    min-width: 0;
}

.image {
    width: rem(100);
}
</style>
