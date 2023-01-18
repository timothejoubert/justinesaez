#!/bin/sh
## if direction not exist
[ ! -d "$2" ] && mkdir -p "src/components/${2}"
path="src/components/${2}/${1}"
mkdir ${path}


# files content
echo "<template>
    <div :class=\"rootClass\"></div>
</template>

<script lang=\"ts\">
import Vue from 'vue'

export default Vue.extend({
    name: '${1}',
    props: {},
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.\$style.root]
        },
    },
    methods: {},
})
</script>

<style lang=\"scss\" module>
.root {
}
</style>
" > "${path}/${1}.vue"


kebab_name=$(echo ${1} | sed 's/\(.\)\([A-Z]\)/\1-\2/g' | tr '[:upper:]' '[:lower:]')

echo "
import ${1} from '~/components/${2}/${1}/${1}.vue'

export default {
    component: ${1},
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<${kebab_name} v-bind=\"\$props\" />',
})

export const Default = Template.bind({})
Default.args = {}
" > "${path}/${1}.stories.js"
