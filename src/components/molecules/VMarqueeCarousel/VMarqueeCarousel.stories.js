import VMarqueeCarousel from '~/components/molecules/VMarqueeCarousel/VMarqueeCarousel.vue'

export default {
    component: VMarqueeCarousel,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VMarqueeCarousel v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
