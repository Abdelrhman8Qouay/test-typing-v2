<template>
    <div class="gameSettings p-2 rounded-lg h-max w-max">
        <!-- paragraph types -->
        <div class="col">
            <div v-for="(val, i) in Object.keys(setting_of_paras)" :key="i" class="tag option" @click="para_type = val">{{ val }}</div>
            <div class="tag">custom</div>
        </div>
        <div class="break-v"></div>
        <!-- game times -->
        <div class="col" v-auto-animate>
            <div v-for="(val, i) in setting_of_paras[para_type]" :key="i" class="tag option">{{ val }}</div>
            <div class="tag">custom</div>
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

// show all option for each type of the paragraphs
const setting_of_paras = {
    time: [15, 30, 60, 120],
    words: [10, 25, 50, 100],
    quote: ['short', 'medium', 'long']
}

// paragraph type that can decide what is the option got
const para_type = ref('time')

onMounted(() => {})
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixins.scss';

.gameSettings {
    @include flex-center;
    z-index: 10000;
    background: var(--sub);
    .col {
        @include flex-center;
        @include font-custom(14px, 500);
        gap: 6px;
        margin-left: 6px;
        margin-right: 6px;
        .tag {
            cursor: pointer;
            color: var(--text);
            user-select: none;
            &:hover {
                color: var(--highlight);
            }
            &.active {
                color: var(--main);
            }
        }
    }
}

.break-v {
    @include wh-custom(3px, 30px);
    background: var(--caret);
    border-radius: 6px;
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