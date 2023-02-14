import VProject from '~/components/organisms/VProject/VProject.vue'

export default {
    component: VProject,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VProject v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
