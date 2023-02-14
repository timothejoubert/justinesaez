import VHome from '~/components/organisms/VHome/VHome.vue'

export default {
    component: VHome,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VHome v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
