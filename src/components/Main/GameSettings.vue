<template>
    <div class="gameSettings h-max w-full">
        <h2 class="text-3xl font-semibold">Take a Free Typing Test</h2>
        <span class="text-[var(--text)] font-bold">It’s never been easier to check your Words Per Minute (WPM) score</span>
        <p class="text-md font-extralight mt-4">
            Want to know how to improve your typing speed? The first step to learn to type fast and increase your typing speed is to take a timed typing test!
            <br />
            Our 1-minute, 3-minute, and 5-minute timed typing speed tests are free and can be used by children or adults to check average words per minute (WPM).
            <br />
            The results of this WPM keyboard test will give you both your typing speed and your typing accuracy results.
        </p>

        <div class="set flex flex-col gap-4 mt-4">
            <div class="row flex items-center gap-3 bg-[var(--bg)] px-10 p-5" v-for="(type, i) in Object.keys(settingStore.setting_of_paras)" :key="i">
                <h2 class="text-[var(--highlight)] text-2xl font-bold">{{ capitalizeFirstChar(type) }} test</h2>
                <div class="subSet flex justify-around gap-2 flex-1">
                    <div class="col relative" v-for="(set, j) in settingStore.setting_of_paras[type].set" :key="j">
                        <div class="bg-[var(--highligh)] w-full flex justify-center">
                            <div class="bg-[var(--sub)] rounded-full py-1"><Icon :icon="settingStore.setting_of_paras[type].icon" /></div>
                        </div>
                        <div>{{ set }} Test</div>
                        <Button class="!bg-[var(--main)] !text-[var(--bg)] w-max" @click="openGame(type, set)" :is-button="true" txt="Typing test" ico="ic:sharp-arrow-right" :ico-size="22" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

import Button from '@/components/Used/Button.vue'

// ===================== Stores =====================
import { useGameStore, useSettingStore } from '@/stores'
import { capitalizeFirstChar } from '@/utils'
const settingStore = useSettingStore()

function openGame(type, setting) {
    settingStore.game_state.type = type
    settingStore.game_state.setting = setting
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixins.scss';

.gameSettings {
    z-index: 10000;
    color: var(--highlight);

    .col {
        @include flex-center-col;
        background: var(--sub);
        border-radius: 6px;
        padding: 6px 1rem;

        h2 {
            color: var(--sub);
            @include font-custom(22px, 500);
            font-size: 22px;
            font-weight: 500;
        }
        span {
            color: var(--main);
            font-size: 22px;
            font-weight: 500;
        }
        .tag {
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