import VNav from '~/components/organisms/VNav/VNav.vue'
import { MENU } from '~/mock-data/app'
import MutationType from '~/constants/mutation-type'

export default {
    title: 'Organisms/VNav',
    component: VNav,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    mounted() {
        this.$store.commit(MutationType.COMMON_CONTENT, { menu: this.menu })
    },
    template: `<VNav v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {
    menu: MENU,
}

export const longTitle = Template.bind({})
longTitle.args = {
    menu: [...MENU, { title: 'un titre de page long', slug: 'un-titre-long', relativePath: '/url' }]
}
