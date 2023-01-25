import VMarquee from '~/components/molecules/VMarquee/VMarquee.vue'

export default {
    title: 'Molecules/Marquee',
    component: VMarquee,
    argTypes: {
        fontSize: {
            options: ['text-h1', 'text-h2', 'text-h3', 'text-h4'],
            type: 'select',
        },
        tag: {
            options: ['div', 'v-pill'],
            type: 'select',
        },
    },
    args: {
        content: 'un exemple de texte',
        tag: 'div',
    },
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
        <v-marquee :class="fontSize" v-bind="$props">
          <component :is="tag">{{ content }}</component>
        </v-marquee>`,
})

export const Default = Template.bind({})

export const LongText = Template.bind({})
LongText.args = {
    content: 'What’s new in Modelec?',
    fontSize: 'text-h1',
}

const TemplateHover = (_args, { argTypes }) => ({
    props: Object.keys(argTypes).concat('active'),
    data() {
        return {
            active: false,
        }
    },
    methods: {
        updateActive(isActive) {
            this.active = isActive
        },
    },
    template: `<v-marquee :class="fontSize" v-bind="$props" @mouseenter.native="updateActive(true)" @mouseleave.native="updateActive(false)" />`,
})

export const ActiveOnHover = TemplateHover.bind({})
ActiveOnHover.args = {
    fontSize: 'text-h1',
}

export const InsideCard = TemplateHover.bind({})
InsideCard.args = {
    fontSize: 'text-h1',
}

InsideCard.decorators = [
    () => ({
        template: `<div style="max-width: 400px; overflow: hidden; padding: 3rem 1rem; background-color: lightgrey"><story /></div>`,
    }),
]
