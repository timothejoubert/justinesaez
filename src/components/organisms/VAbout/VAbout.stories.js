import VAbout from '~/components/organims/VAbout/VAbout.vue'

export default {
    component: VAbout,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VAbout v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
