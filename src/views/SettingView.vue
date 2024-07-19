<template>
    <div class="settings">
        <div class="container">
            <SettingDropper v-for="(row, i) in Object.keys(settingStore.compo_game_setting)" :key="i" :tit="row">
                <div v-for="(set, i) in Object.keys(compo_game_setting[row])" :key="i" class="box mb-8">
                    <div class="col flex flex-row">
                        <h2 class="text-[var(--text)] flex gap-1"><Icon :icon="compo_game_setting[row][set].icon" height="25" /> {{ set }}</h2>
                        <span class="text-[var(--highlight)]" v-html="compo_game_setting[row][set].comment"></span>
                    </div>
                    <div class="col" v-if="compo_game_setting[row][set].type == 'many'">
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
                    <div class="col" v-else-if="compo_game_setting[row][set].type == 'button'">
                        <div @click="compo_game_setting[row][set].func(s)" class="point">
                            {{ s }}
                        </div>
                    </div>
                    <div class="col" v-else-if="compo_game_setting[row][set].type == 'input'">
                        <input
                            :type="compo_game_setting[row][set]['input type'] || 'text'"
                            @input="(e) => compo_game_setting[row][set].func(e.target.value)"
                            class="pointInput"
                            :id="'inp-' + s"
                            :placeholder="s"
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
const settingStore = useSettingStore()
const { compo_game_setting } = storeToRefs(settingStore)

// ===================== Components =====================
import SettingDropper from '@/components/SettingDropper.vue'

// ================================= While Watching
watch(compo_game_setting.value, (newVal) => {
    // ========== wpm
    useGameStore().per.type = newVal['appearance']['typing speed unit'].as
    useGameStore().per.value = 0
})
</script>

<style lang="scss">
@import '../assets/css/mixins.scss';

.settings {
    .box {
        .col {
            @include flex-custom(row, wrap, start, start);
            gap: 6px;
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