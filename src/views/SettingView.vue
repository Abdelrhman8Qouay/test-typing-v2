<template>
    <div class="settings">
        <div class="container">
            <SettingDropper v-for="(row, i) in Object.keys(settingStore.compo_game_setting)" :key="i" :tit="row">
                <div v-for="(set, i) in Object.keys(compo_game_setting[row])" :key="i" class="box mb-8">
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

// ================================= While Watching
watch(compo_game_setting.value, (newVal) => {
    // ========== appearance
    gameStore.per.type = newVal['appearance']['typing speed unit'].as
    gameStore.per.value = 0
    //---------
    settingStore.toggleMode(newVal['theme']['theme'].as)
    // ========== sound
    gameStore.soundOnClick = settingStore.soundMap[newVal['sound']['play sound on click'].as]
    gameStore.soundOnError = settingStore.soundMap[newVal['sound']['play sound on error'].as]
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
                padding: 0.3rem 4.5rem;
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
</style>