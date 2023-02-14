import VSocial from '~/components/molecules/VSocial/VSocial.vue'

export default {
    component: VSocial,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<v-social v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
