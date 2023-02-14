<template>
    <v-button :label="name" size="m" outlined :href="url" />
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { Social } from '~/types/app'

export default Vue.extend({
    name: 'VSocial',
    props: {
        social: Object as PropType<Social>,
    },
    computed: {
        name(): string {
            return Object.keys(this.social)[0]
        },
        url(): string {
            return Object.values(this.social)[0]
        },
    },
})
</script>
