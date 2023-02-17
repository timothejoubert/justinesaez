import VRandomGridImages from '~/components/molecules/VRandomGridImages/VRandomGridImages.vue'

export default {
    component: VRandomGridImages,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VRandomGridImages v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
