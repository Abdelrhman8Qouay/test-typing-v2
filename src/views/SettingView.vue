<template>
    <div class="settings relative">
        <div class="titleLink sticky translate-x-1/4 top-[10vh] w-max bg-[#0000005b] backdrop-blur-sm px-2 p-1 flex justify-between items-center gap-5 border-2 border-[var(--text)] rounded-md z-50">
            <span
                v-for="(tit, i) in Object.keys(compo_game_setting)"
                :key="i"
                @click="scrollToSection(convertTextSeparator(capitalizeFirstChar(tit)))"
                class="text-[var(--text)] hover:text-[var(--highlight)] transition text-lg font-bold cursor-pointer"
                >{{ convertTextSeparator(capitalizeFirstChar(tit)) }}</span
            >
        </div>

        <div class="container">
            <SettingDropper v-for="(row, i) in Object.keys(compo_game_setting)" :key="i" :tit="row">
                <div v-for="(set, i) in Object.keys(compo_game_setting[row])" :key="i" class="box mb-4" v-show="compo_game_setting[row][set].visible">
                    <div class="col first">
                        <h2 class="text-[var(--text)] flex gap-1"><Icon :icon="compo_game_setting[row][set].icon" height="25" /> {{ set }}</h2>
                        <span class="text-[var(--highlight)]" v-html="compo_game_setting[row][set].comment"></span>
                    </div>
                    <div class="col clicker" v-if="compo_game_setting[row][set].type == 'many'">
                        <div
                            v-for="(s, i) in compo_game_setting[row][set].set"
                            :key="i"
                            @click="compo_game_setting[row][set].func(s)"
                            class="point"
                            :class="{ active: s == compo_game_setting[row][set].as }"
                        >
                            {{ s }}
                        </div>
                    </div>
                    <div class="col clicker" v-else-if="compo_game_setting[row][set].type == 'button'">
                        <div @click="compo_game_setting[row][set].func(s)" class="point" :class="compo_game_setting[row][set].attrs.class">
                            {{ compo_game_setting[row][set].attrs.text }}
                        </div>
                    </div>
                    <div class="col clicker" v-else-if="compo_game_setting[row][set].type == 'input'">
                        <input
                            :type="compo_game_setting[row][set]['input type'] || 'text'"
                            @input="(e) => compo_game_setting[row][set].func(e.target.value)"
                            class="pointInput"
                            :class="compo_game_setting[row][set].attrs.class"
                            :id="'inp-' + s"
                            :placeholder="compo_game_setting[row][set].attrs.placeholder"
                            :value="compo_game_setting[row][set].as"
                        />
                    </div>

                    <div class="col clicker" v-else-if="compo_game_setting[row][set].type == 'bothMany'">
                        <div>
                            <input
                                :type="compo_game_setting[row][set].attrs.type || 'text'"
                                @input="(e) => compo_game_setting[row][set].attrs.func(e.target.value)"
                                class="pointInput"
                                :class="compo_game_setting[row][set].attrs.class"
                                :id="compo_game_setting[row][set].attrs.id"
                                :placeholder="compo_game_setting[row][set].attrs.placeholder"
                                :value="compo_game_setting[row][set].attrs.value"
                                :autocomplete="compo_game_setting[row][set].attrs.autocomplete"
                            />
                        </div>
                        <div
                            v-for="(se, i) in compo_game_setting[row][set].set"
                            :key="i"
                            @click="compo_game_setting[row][set].func(se)"
                            class="point"
                            :class="{ active: se == compo_game_setting[row][set].as }"
                        >
                            {{ se }}
                        </div>
                    </div>
                    <div class="col clicker w-full h-max" v-else-if="compo_game_setting[row][set].type == 'setting'">
                        <div class="flex flex-col items-center" v-for="(se, i) in Object.keys(compo_game_setting[row][set].set)" :key="i">
                            <div class="text-[var(--main)] text-base">{{ capitalizeFirstChar(se) }}</div>
                            <div class="text-[var(--text)] text-xl font-semibold">{{ compo_game_setting[row][set].set[se].value }}</div>
                            <input
                                :type="compo_game_setting[row][set].attrs.type || 'text'"
                                @input="(e) => compo_game_setting[row][set].set[se].func(e.target.value)"
                                class="verticalProgressInput"
                                :id="compo_game_setting[row][set].set[se].id || se + 'Input'"
                                :value="compo_game_setting[row][set].set[se].value"
                                :min="compo_game_setting[row][set].set[se].min || 0"
                                :max="compo_game_setting[row][set].set[se].max || 100"
                                :step="compo_game_setting[row][set].attrs.step || 1"
                            />
                        </div>
                    </div>
                </div>
            </SettingDropper>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, toRefs, watch } from 'vue'
import { Icon } from '@iconify/vue'

// ===================== Stores =====================
import { storeToRefs } from 'pinia'
import { useSettingStore, useGameStore } from '@/stores'
const settingStore = useSettingStore(),
    gameStore = useGameStore()
const { compo_game_setting } = storeToRefs(settingStore)

// ===================== Components =====================
import SettingDropper from '@/components/SettingDropper.vue'
import { capitalizeFirstChar, convertTextSeparator, isValidImageURL, scrollToSection } from '@/utils'

// ================================= While Watching
watch(compo_game_setting.value, (newVal) => {
    // ========== appearance
    gameStore.userInfo.per.type = newVal['appearance']['typing speed unit'].as || 'wpm'
    gameStore.userInfo.per.value = 0
    // ========== sound
    gameStore.soundOnClick = settingStore.soundMap[newVal['sound']['play sound on click'].as]
    gameStore.soundOnError = settingStore.soundMap[newVal['sound']['play sound on error'].as]

    // ========== theme background
    let customBack = newVal.theme['custom background']
    let filterBack = newVal.theme['custom background filter']
    if (customBack.attrs.value) {
        isValidImageURL(customBack.attrs.value).then((isValid) => {
            if (isValid) {
                gameStore.customBackground.url = customBack.attrs.value
                settingStore.compo_game_setting.theme['custom background filter'].visible = true
                gameStore.customBackground.mode = customBack.as

                gameStore.customBackground.blur = filterBack.set.blur.value
                gameStore.customBackground.brightness = filterBack.set.brightness.value
                gameStore.customBackground.opacity = filterBack.set.opacity.value
                gameStore.customBackground.saturate = filterBack.set.saturate.value
            } else {
                alert('The URL is not a valid image URL.')
                setCustomBack(true)
            }
        })
    } else {
        setCustomBack()
    }
    function setCustomBack(back_default) {
        if (back_default) {
            const custom = settingStore.compo_game_setting.theme['custom background']
            const filter = settingStore.compo_game_setting.theme['custom background filter']
            custom.as = custom.def
            custom.attrs.value = ''
            filter.set.blur.value = 0
            filter.set.brightness.value = 0
            filter.set.opacity.value = 0
            filter.set.saturate.value = 0
        }
        gameStore.customBackground.url = ''
        settingStore.compo_game_setting.theme['custom background filter'].visible = false
        gameStore.customBackground.mode = 'cover'

        gameStore.customBackground.blur = 0
        gameStore.customBackground.brightness = 0
        gameStore.customBackground.opacity = 0
        gameStore.customBackground.saturate = 0
    }
})
</script>

<style lang="scss">
@import '../assets/css/mixins.scss';

.settings {
    .box {
        .col {
            gap: 6px;
            &.first {
                @include flex-custom(column, nowrap, start, start);
            }
            &.clicker {
                @include flex-custom(row, wrap, start, start);
            }
            .point {
                @include flex-center;
                border-radius: 6px;
                background: var(--sub);
                color: var(--highlight);
                cursor: pointer;
                padding: 0.3rem 4.5rem;
                transition: all var(--hover-trans);
                &:hover {
                    background: var(--highlight);
                    color: var(--bg);
                }
                &.active {
                    background: var(--main);
                    color: var(--bg);
                }
            }
            .pointInput {
                outline: none;
                padding: 0.3rem 0.8rem;
                border: 1px solid rgb(53, 53, 53);
                border-radius: 5px;
                font-size: 1em;

                background: var(--sub);
                color: var(--white);
                transition: var(--hover-trans);
            }
        }
    }
}

.verticalProgressInput {
    width: 200px;
    transform: rotate(-90deg);
    -webkit-appearance: none;
    background: transparent;
    appearance: none;
    margin-top: 90px; /* Adjust based on the input position */
    margin-bottom: 60px; /* Adjust based on the input position */

    &::-webkit-slider-runnable-track {
        height: 20px;
        background: var(--sub);
        border-radius: 8px;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 50px;
        height: 20px;
        background: var(--highlight);
        border-radius: 8px;
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: var(--sub);
        border-radius: 50%;
        cursor: pointer;
    }
}
</style>