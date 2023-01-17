export { default as VButton } from '../../src/components/atoms/VButton.vue'
export { default as VCounterDom } from '../../src/components/atoms/VCounterDom.vue'
export { default as VImage } from '../../src/components/atoms/VImage.vue'
export { default as VLink } from '../../src/components/atoms/VLink.vue'
export { default as VMarkdown } from '../../src/components/atoms/VMarkdown.vue'
export { default as VPill } from '../../src/components/atoms/VPill.vue'
export { default as VSplitWord } from '../../src/components/atoms/VSplitWord/VSplitWord.vue'
export { default as VFooter } from '../../src/components/organisms/VFooter.vue'
export { default as VSplashScreen } from '../../src/components/organisms/VSplashScreen.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
