import VProjectList from '~/components/organisms/VProjectList/VProjectList.vue'

export default {
    title: 'Organisms/VProjectList',
    component: VProjectList,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<v-project-list v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
