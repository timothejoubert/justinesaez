import VSplashScreen from '~/components/organisms/VSplashScreen/VSplashScreen.vue'

export default {
    title: 'Organisms/VSplashScreen',
    component: VSplashScreen,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<v-splash-screen v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
