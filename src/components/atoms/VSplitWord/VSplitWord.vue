<script lang="ts">
import Vue from 'vue'
import type { VNode, PropType } from 'vue'
import { throttle } from 'throttle-debounce'

interface SplitWordProps {
    enabled: boolean
    content: string
    defaultHidden: boolean
    breakWord: boolean
    transitionEndEvent: boolean
    split: SplitItem[]
    numberOfWordInLine: number
}

type SplitItem = 'letter' | 'word' | 'line'

export default Vue.extend({
    name: 'VSplitWord',
    props: {
        enabled: { type: Boolean, default: true },
        split: {
            type: Array as PropType<SplitItem[]>,
            default: () => ['letter'],
        },
        breakWord: Boolean,
        numberOfWordInLine: {
            type: Number,
            default: 2,
        },
        content: String,
        defaultHidden: Boolean,
        transitionEndEvent: Boolean,
    },
    data() {
        return {
            triggerEventCount: 0,
        }
    },
    mounted() {
        if (this.transitionEndEvent) this.initTransitionEnd()
    },
    methods: {
        initTransitionEnd() {
            this.triggerEventCount++
            const letters = this.$el.querySelectorAll('.split-letter')
            if (!letters) return
            letters[letters.length - 1]?.addEventListener('transitionend', this.onTransitionEnd, { once: true })
        },
        onTransitionEnd() {
            this.$emit('transitionend')
            if (this.triggerEventCount > 1) return
            window.setTimeout(() => this.initTransitionEnd(), 300)
        },
    },
    render(createElement): VNode {
        const { content, defaultHidden, enabled, split, numberOfWordInLine } = this.$props as SplitWordProps

        const displayLetter = split.includes('letter')
        const displayWord = split.includes('word')
        const displayLine = split.includes('line')

        const wrapperData = {
            ...this.$data,
            class: [
                this.$style.root,
                enabled && this.$style['root--enable'],
                split.map((displayedItem: string) => this.$style['root--display-' + displayedItem]),
            ],
        }
        const slots = this.$slots && (this.$slots?.default?.[0] as VNode)

        if (!enabled)
            return ((slots || content) && createElement('div', wrapperData, [slots || content])) || createElement('')

        let indexLetter = 0

        const parsedLetters = (word: string): VNode[] => {
            const letters = word.split('')
            // console.log('letters:', letters)
            return letters.map((letter: string, index: number) => {
                indexLetter++
                return createElement(
                    'div',
                    {
                        class: [
                            this.$style.letter,
                            defaultHidden && this.$style['letter--hide'],
                            letter === ' ' && this.$style['letter--last'],
                            this.breakWord && this.$style['letter--break'],
                            'split-letter',
                        ],
                        style: { '--index-letter-in-word': index, '--index-letter-total': indexLetter },
                    },
                    letter
                )
            })
        }

        const words: string[] = content.split(' ')
        const parsedWords = (line: string): VNode[] => {
            const words = line.split(' ')
            return words.map((word: string, wordIndex: number) => {
                return createElement(
                    'div',
                    {
                        class: [this.$style.word],
                        style: { '--index-word': wordIndex },
                    },
                    displayLetter ? parsedLetters(word) : word
                )
            })
        }

        const lineNodes = (): VNode[] => {
            const lineLength = Math.ceil(words.length / numberOfWordInLine)
            const lines = Array.from(Array(lineLength).keys()).map((count: number) => {
                const indexOfFirstWord = count * numberOfWordInLine
                return words.slice(indexOfFirstWord, indexOfFirstWord + numberOfWordInLine).join(' ')
            })

            return lines.map((line: string, lineIndex: number): VNode => {
                return createElement(
                    'div',
                    {
                        class: [this.$style.line],
                        style: { '--index-line': lineIndex },
                    },
                    displayWord ? parsedWords(line) : displayLetter ? parsedLetters(line) : line
                )
            })
        }

        return createElement(
            'div',
            wrapperData,
            displayLine
                ? lineNodes()
                : displayWord
                ? parsedWords(content)
                : displayLetter
                ? parsedLetters(content)
                : content
        )
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    font-family: $noi;
}

.line {
    display: inline-block;

    .root:not(.root--display-word) &::after {
        position: relative;
        display: inline-block;
        content: '\00a0';
        font-size: 2rem;
    }
}

.word {
    display: inline-block;

    &::after {
        position: relative;
        display: inline-block;
        content: '\00a0';
        font-size: 2rem;
    }
}

.letter {
    position: relative;
    display: inline-block;
    transition-delay: calc(60ms * var(--index-letter-total, 1));
    transition-duration: 0.6s;
    transition-property: transform, opacity, font-variation-settings;
    transition-timing-function: ease(out-quart);

    .root:not(.root--enable) & {
        display: inline;
    }

    &--last#{&}--break {
        display: flex;
        line-height: 0;
    }

    &--last::after {
        position: relative;
        display: inline-block;
        content: '\00a0';
        font-size: 2rem;
    }

    &.letter--hide {
        font-variation-settings: 'wght' 100;
        opacity: 0;
        transform: translateY(-50px);
    }

    :global(.load) & {
        font-variation-settings: 'wght' 900;
        opacity: 1;
        transform: translateY(0);
    }

    :global(.load--finish) & {
        transition-delay: calc(20ms * var(--index-letter-total, 1));
        transition-duration: 0.4s;
        transition-timing-function: ease(out-quad);
    }
}
</style>
