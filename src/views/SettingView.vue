<template>
    <div class="settings p-2 rounded-lg fixed top-10 left-1/2 -translate-x-1/2 h-max w-max bg-[#0000009c]">
        <!-- paragraph types -->
        <div class="col">
            <div class="tag">words</div>
            <div class="tag">words</div>
            <div class="tag">words</div>
            <div class="tag">words</div>
        </div>
        <!-- game times -->
        <div class="col">
            <div class="tag">10</div>
            <div class="tag">10</div>
            <div class="tag">10</div>
            <div class="tag">10</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue'

// ===================== Stores =====================
import { usePublicStore } from '@/stores/public'
import { useSettingStore } from '@/stores/setting'
const publicStore = usePublicStore()
const settingStore = useSettingStore()

// get components
// import CursorMagic from '@/components/Used/CursorMagic.vue'

const open = ref(false)

// setting options
const cursor_magic_work = ref(true)
</script>

<style lang="scss" scoped>
@import '../assets/css/mixins.scss';

.gameSettings {
    @include flex-center;
    .col {
        @include flex-center;
        gap: 6px;
        .tag {
            cursor: pointer;
            color: var(--secondary);
            &:hover {
                color: var(--main);
            }
            &.active {
                color: var(--main);
            }
        }
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>