import VNav from '~/components/organisms/VNav/VNav.vue'

export default {
    title: 'Organisms/VNav',
    component: VNav,
    parameters: {
        layout: 'centered',
    },
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VNav v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
