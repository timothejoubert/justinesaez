import VAboutTags from '~/components/molecules/VAboutTags/VAboutTags.vue'

export default {
    title: 'Molecules/AboutTags',
    component: VAboutTags,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<v-about-tags v-bind="$props" />',
})

export const Default = Template.bind({})
Default.args = {}
