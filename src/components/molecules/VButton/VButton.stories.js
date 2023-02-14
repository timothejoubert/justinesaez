import VButton from '~/components/molecules/VButton/VButton.vue'
import IconConfigurator from '~/assets/images/icons/setting.svg?inline'
import IconArrowRight from '~/assets/images/icons/arrow-right.svg?inline'
import IconChevronRight from '~/assets/images/icons/chevron-right.svg?inline'

export default {
    title: 'Molecules/Button',
    component: VButton,
    argTypes: {
        theme: {
            options: ['dark', 'light', 'orange'],
            control: 'radio',
        },
        color: {
            options: ['primary', 'secondary'],
            control: 'radio',
        },
        size: {
            options: ['s', 'm', 'l'],
            control: 'radio',
        },
    },
    args: {
        label: 'Ouvrir le configurateur',
        iconLast: true,
    },
}

const Template = (_args, { argTypes }) => {
    return {
        props: Object.keys(argTypes).concat(['label']),
        components: { VButton, IconChevronRight, IconConfigurator, IconArrowRight },
        template: `
            <v-button v-bind="$props">
                <template #default v-if="label">
                    {{ label }}
                </template>
                <template #icon v-if="icon">
                    <component :is="icon" />
                </template>
            </v-button>
        `,
    }
}

export const Filled = Template.bind({})
Filled.args = {
    filled: true,
}

export const FilledSizeSmall = Template.bind({})
FilledSizeSmall.args = {
    size: 's',
    filled: true,
}

export const Outlined = Template.bind({})
Outlined.args = {
    outlined: true,
}

export const OutlinedSizeSmall = Template.bind({})
OutlinedSizeSmall.args = {
    size: 's',
    outlined: true,
}

export const TextAndIcon = Template.bind({})
TextAndIcon.args = {
    filled: true,
    icon: 'IconArrowRight',
}

export const TextAndIconSizeSmall = Template.bind({})
TextAndIconSizeSmall.args = {
    size: 's',
    filled: true,
    icon: 'IconConfigurator',
}

export const OutlinedTextAndIcon = Template.bind({})
OutlinedTextAndIcon.args = {
    outlined: true,
    icon: 'IconConfigurator',
}

export const Text = Template.bind({})
Text.args = {}

export const Icon = Template.bind({})
Icon.args = {
    label: false,
    icon: 'IconConfigurator',
    filled: true,
}
Icon.parameters = {
    controls: {
        exclude: ['label'],
    },
}
