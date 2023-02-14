import VProjectCard from '~/components/molecules/VProjectCard/VProjectCard.vue'

export default {
    component: VProjectCard,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VProjectCard v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
