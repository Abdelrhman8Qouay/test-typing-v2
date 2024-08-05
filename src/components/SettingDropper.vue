
<template>
    <div class="dropper" :id="convertTextSeparator(capitalizeFirstChar(title))">
        <div class="row">
            <h2 @click="is_open = !is_open" class="text-[var(--text)] hover:text-[var(--highlight)] font-semibold text-3xl flex gap-1 cursor-pointer">
                <Icon icon="ic:outline-arrow-right" :class="is_open ? 'rot' : ''" class="ica" height="40" /> {{ capitalizeFirstChar(title) }}
            </h2>
            <div ref="content" class="content" :class="!is_open ? 'hide' : ''">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, toRefs, watch } from 'vue'
import { capitalizeFirstChar, convertTextSeparator } from '@/utils'

import { Icon } from '@iconify/vue'

const props = defineProps({
    tit: String,
    defOpen: {
        type: Boolean,
        default: true
    }
})
const { tit: title, defOpen } = toRefs(props)

// ================= Process =================
const is_open = ref(defOpen.value)
const content = ref(null)
onMounted(() => {
    if (is_open.value) {
        content.value.style.maxHeight = `${content.value.scrollHeight}px`
    }
})
watch(is_open, (newValue) => {
    if (newValue) {
        content.value.style.maxHeight = `${content.value.scrollHeight}px`
    } else {
        content.value.style.maxHeight = '0'
    }
})
</script>

<style lang="scss">
.dropper {
    .row {
        .content {
            margin-left: 3.2rem;
            color: var(--main);
            overflow: hidden;
            transition: max-height var(--hover-trans), opacity var(--hover-trans);
            max-height: 0;
            opacity: 0;

            &.hide {
                max-height: 0;
                opacity: 0;
            }

            &:not(.hide) {
                opacity: 1;
            }
        }

        .ica {
            transition: transform var(--hover-trans);
            &.rot {
                transform: rotate(40deg);
            }
        }
    }
}
</style>