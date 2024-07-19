
<template>
    <div class="dropper">
        <div class="row">
            <h2 @click="is_open = !is_open" class="text-[var(--text)] hover:text-[var(--highlight)] font-semibold text-3xl flex gap-1 cursor-pointer">
                <Icon icon="ic:outline-arrow-right" :class="is_open ? 'rot' : ''" class="ica" height="40" /> {{ capitalizeFirstChar(title) }}
            </h2>
            <div class="content" :class="!is_open ? 'hide' : ''">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue'
import { capitalizeFirstChar } from '@/utils'

import { Icon } from '@iconify/vue'

const props = defineProps({
    tit: String
})
const { tit: title } = toRefs(props)

// ========================== Process ==========================
const is_open = ref(true)
</script>

<style lang="scss">
.dropper {
    .row {
        .content {
            margin-left: 3.2rem;
            height: max-content;
            color: var(--main);

            transition: all var(--hover-trans);
            &.hide {
                height: 0px;
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