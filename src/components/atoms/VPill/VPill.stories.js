import VPill from '~/components/atoms/VPill/VPill.vue'
import { tags } from '~/mock-data/tags'
import { getThemes } from '~/utils/storybook/get-theme'

export default {
    title: 'Atoms/Pill',
    component: VPill,
    argTypes: {
        label: {
            options: tags.map((tag) => tag),
            control: { type: 'select' },
            default: tags[0],
        },
    },
}

console.log(getThemes())

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<v-pill v-bind="$props" />',
})

export const Default = Template.bind({})
Default.args = {
    label: 'Un tag',
}

export const Long = Template.bind({})
Long.args = {
    label: 'Couverture d’album & de magazine',
}

const TemplateSlot = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<v-pill>{{ label }}</v-pill>',
})

export const SlotContent = TemplateSlot.bind({})
SlotContent.args = {
    label: 'slot content',
}
