import Vue from 'vue'
import { DefaultProps } from 'vue/types/options'

declare module '*.vue' {
    export default Vue
}

/**
 * fix CSS module
 * @see https://stackoverflow.com/a/53999913
 */
declare module 'vue/types/vue' {
    interface Vue {
        $style: { [key: string]: string }
        $documentURL(path: string | undefined): string
        $resourceUrl(path: string | undefined): string | undefined
    }
}

declare module 'vue/types/options' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface RenderContext<Props = DefaultProps> {
        $style: { [key: string]: string }
    }
}
