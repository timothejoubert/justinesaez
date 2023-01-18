import VPill from '~/components/atoms/VPill/VPill.vue'
import { tags } from '~/mock-data/tags'

export default {
    title: 'Atoms/Pill',
    component: VPill,
    argTypes: {
        label: {
            options: tags.map((tag) => tag),
            control: 'select',
        },
    },
    args: {
        label: 'un tag',
    },
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<v-pill v-bind="$props" />',
})

export const Default = Template.bind({})

export const Long = Template.bind({})
Long.args = {
    label: 'Couverture d’album & de magazine',
}
