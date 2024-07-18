<template>
    <div class="gameSettings p-2 rounded-lg h-max w-max">
        <!-- paragraph types -->
        <div class="col">
            <div
                v-for="(val, i) in Object.keys(settingStore.setting_of_paras)"
                :key="i"
                class="tag option"
                :class="{ active: game_setting.type == val }"
                @click="settingStore.liveGameSetting(val, 'type')"
            >
                {{ val }}
            </div>
        </div>
        <div class="break-v"></div>
        <!-- game times -->
        <div class="col" v-auto-animate>
            <div v-for="(val, i) in game_setting.setting" @click="settingStore.liveGameSetting(val, 'setting')" :key="i" :class="{ active: curr_game_setting == val }" class="tag option">
                {{ val }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// ===================== Stores =====================
import { storeToRefs } from 'pinia'
import { usePublicStore } from '@/stores/public'
import { useSettingStore } from '@/stores/setting'
const publicStore = usePublicStore(),
    settingStore = useSettingStore()
const { game_setting, curr_game_setting } = storeToRefs(settingStore)
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