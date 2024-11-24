<template>
    <span v-html="icon" />
</template>

<script lang="ts" setup>
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { icon as faIcon } from '@fortawesome/fontawesome-svg-core'
import { computed } from 'vue'

const {
    prefix = 'fal',
    name,
    sharp,
    fixedWidth,
} = defineProps<{
    name: IconName
    prefix?: IconPrefix
    sharp?: boolean
    fixedWidth?: boolean
}>()

const icon = computed(() => {
    let classes: string[] = []

    if (fixedWidth) {
        classes.push('fa-fw')
    }

    if (sharp) {
        classes.push('fa-sharp')
    }

    return faIcon({ prefix, iconName: name }, { classes }).html
})
</script>
