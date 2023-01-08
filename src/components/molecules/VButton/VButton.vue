<template>
    <component
        :is="internalTag"
        :class="classNames"
        :disabled="internalTag === 'button' && disabled"
        v-bind="linkProps"
        @click="onClick"
    >
        <span ref="inner" :class="$style.inner">
            <span v-if="$slots.icon || $scopedSlots.icon" :class="$style.icon">
                <slot name="icon" />
            </span>
            <span v-if="$slots.default || $scopedSlots.default || label" :class="$style.label">
                <slot>{{ label }}</slot>
            </span>
        </span>
    </component>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue/types/options'

export type Theme = 'dark' | 'light'
type Size = 's' | 'm'
type Color = 'primary' | 'secondary'
export type Variant = 'navigation'

function isRelativePath(path: string): boolean {
    return path.charAt(0) === '/'
}

export default Vue.extend({
    name: 'VButton',
    props: {
        filled: Boolean,
        label: [String, Boolean] as PropType<string | false>,
        size: [String, Boolean] as PropType<Size | false>,
        elevated: Boolean,
        rounded: {
            type: Boolean,
            default: true,
        },
        theme: {
            type: [String, Boolean] as PropType<Theme | false>,
            default: 'dark',
        },
        outlined: Boolean,
        disabled: Boolean,
        tag: [String, Boolean] as PropType<string | false>,
        color: [String, Boolean] as PropType<Color | false>,
        iconLast: {
            type: Boolean,
            default: true,
        },
        href: [String, Boolean] as PropType<string | false>, // external (absolute) or internal (relative) link
        to: [String, Object, Boolean], // internal link (use NuxtLink)
        variant: [String, Boolean] as PropType<Variant | false>,
    },
    computed: {
        classNames(): (string | boolean | undefined)[] {
            return [
                this.$style.root,
                this.outlined && this.$style['root--outlined'],
                this.filled && this.$style['root--filled'],
                this.elevated && this.$style['root--elevated'],
                this.disabled && this.$style['root--disabled'],
                this.rounded && this.$style['root--rounded'],
                (this.$slots.icon || this.$scopedSlots.icon) && this.$style['root--has-icon'],
                (this.$slots.default || this.$scopedSlots.default || this.label) && this.$style['root--has-label'],
                this.iconLast && this.$style['root--icon-last'],
                typeof this.size === 'string' && this.$style['root--size-' + this.size],
                typeof this.theme === 'string' && this.$style['root--theme-' + this.theme],
                typeof this.color === 'string' && this.$style['root--color-' + this.color],
                typeof this.variant === 'string' && this.$style['root--variant-' + this.variant],
            ]
        },
        internalTag(): string {
            if (typeof this.tag === 'string') return this.tag

            if (this.to || (typeof this.href === 'string' && isRelativePath(this.href))) return 'nuxt-link'
            else if (this.href) return 'a'
            else return 'button'
        },
        linkProps(): Record<string, any> {
            const props: Record<string, any> = {}

            if (this.to) {
                props.to = this.to
            } else if (typeof this.href === 'string' && isRelativePath(this.href)) {
                props.to = this.href
            } else if (this.href) {
                props.href = this.href
                props.target = '_blank'
            }

            return props
        },
    },
    methods: {
        onClick(event: MouseEvent) {
            this.$emit('click', event)
        },
    },
})
</script>

<style lang="scss" module>
@use 'sass:math';

.root {
    @include v-button-default-css-vars($v-button);
    @include theme-variants;

    display: inline-block;
    border: none;
    color: inherit;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    &--disabled {
        pointer-events: none; // prevents click on disabled link (<a> or <nuxt-link>)
    }

    &--rounded {
        @include v-button-default-css-vars($v-button-rounded, 'rounded');
    }

    &--color-primary {
        color: var(--theme-primary);
    }

    &--color-secondary {
        color: var(--theme-secondary);
    }

    &--filled {
        background-color: var(--theme-default);
        color: var(--theme-on-default);
    }

    &--outlined {
        color: var(--theme-default);
    }

    &--filled#{&}--disabled {
        background-color: rgba(#000, 0.2);
        color: rgba(#000, 0.7);
    }

    &:not(#{&}--filled)#{&}--disabled {
        color: rgba(#000, 0.7);
    }

    &--outlined#{&}--disabled {
        background-color: transparent;
        color: rgba(#000, 0.3);
    }

    &--filled#{&}--color-primary {
        background-color: var(--theme-primary);
        color: var(--theme-on-primary);
    }

    &--filled#{&}--color-secondary {
        background-color: var(--theme-secondary);
        color: var(--theme-on-secondary);
    }

    &--elevated {
        box-shadow: 0 2px 32px 0 rgba(#000, 0.1);
    }

    @media (hover: hover) {
        &--filled:not(#{&}--disabled):hover {
            background-color: var(--theme-button-background-hovered);
        }
    }

    // sizes
    @each $key, $value in $v-button {
        &--size-#{$key} {
            @include v-button-size($key);
        }
    }
}

.inner {
    @include v-button-default-css-vars($v-button-inner, 'inner');

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;

    .root--outlined & {
        border-width: var(--v-button-border-width, 1px);
        border-style: solid;
        border-color: var(--theme-button-outline-color);
        border-radius: inherit;
        transition: all 0.3s;
    }

    .root--outlined.root--color-primary & {
        border-color: var(--theme-primary);
    }

    .root--outlined.root--color-secondary & {
        border-color: var(--theme-secondary);
    }

    .root:not(.root--outlined):not(.root--filled) & {
        padding: 0;
    }

    .root--has-icon:not(.root--has-label) & {
        padding: 0;
    }

    .root--has-icon.root--has-label.root--icon-last & {
        @include v-button-default-css-vars($v-button-inner-icon-last, 'inner');
    }

    @media (hover: hover) {
        .root--outlined:not(.root--disabled):hover & {
            border-color: var(--theme-default);
        }
    }
}

.icon {
    @include v-button-default-css-vars($v-button-icon, 'icon');

    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    transition: color 0.3s, transform 0.3s;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    .root:not(.root--icon-last) & {
        margin-left: 0;
    }

    &:first-child:last-child {
        margin: 0;
    }

    .root--icon-last & {
        order: 2;
        margin-right: 0;
    }
}

.label {
    @include v-button-default-css-vars($v-button-label, 'label');

    font-weight: 450;

    .root--outlined.root--icon-last.root--has-icon & {
        padding-right: rem(8);
    }

    .root--outlined:not(.root--icon-last):not(.root--has-icon) & {
        padding-left: 0;
    }

    .root:not(.root--outlined) &,
    .root:not(.root--has-icon) & {
        padding: 0;
    }
}
</style>
