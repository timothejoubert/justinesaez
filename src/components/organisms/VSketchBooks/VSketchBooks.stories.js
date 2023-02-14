import VSketchBooks from '~/components/organisms/VSketchBooks/VSketchBooks.vue'

export default {
    component: VSketchBooks,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VSketchBooks v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
