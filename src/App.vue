
<template>
    <div :style="['--f-fam: ' + compo_game_setting['appearance']['font family'].as, customBackground.url ? backgroundImageStyle : '']" class="bg-cover bg-fixed bg-no-repeat">
        <div class="w-full h-full" :style="contentImageStyle">
            <Navbar />

            <main>
                <RouterView />
            </main>

            <Footer />
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import Navbar from './components/Main/Navbar.vue'
import Footer from './components/Main/Footer.vue'

import { findNextKey, loadFont, strToBool } from '@/utils/'

import { storeToRefs } from 'pinia'
import { useSettingStore, useGameStore } from '@/stores'
const settingStore = useSettingStore(),
    gameStore = useGameStore()
const { compo_game_setting } = storeToRefs(settingStore)
const { customBackground } = storeToRefs(gameStore)

// auto switch color theme
const autoColorInterval = ref(null)

// Handle Custom Background
const backgroundImageStyle = computed(() => {
    return {
        backgroundImage: `url(${customBackground.value.url})`,
        backgroundSize: customBackground.value.mode
    }
})
const contentImageStyle = computed(() => {
    return {
        backdropFilter: `blur(${customBackground.value.blur}px) brightness(${customBackground.value.brightness}) opacity(${customBackground.value.opacity}) saturate(${customBackground.value.saturate})`
    }
})

// ================================= onMounted
onMounted(() => {
    // make the current font family
    loadFont(compo_game_setting.value['appearance']['font family'].as)

    // toggle the current mode color
    settingStore.toggleMode(compo_game_setting.value.theme.theme.as)

    // default values for the sound
    gameStore.soundVolume = settingStore.soundMap[compo_game_setting.value.sound['sound volume'].as]
    gameStore.soundOnClick = settingStore.soundMap[compo_game_setting.value.sound['play sound on click'].as]
    gameStore.soundOnError = settingStore.soundMap[compo_game_setting.value.sound['play sound on error'].as]

    // auto change the color mode
    if (strToBool(compo_game_setting.value.theme['auto switch theme'].as)) {
        autoChangeMode()
    }
})

// ================================= While Watching
watch(compo_game_setting.value, (newVal) => {
    // auto change the color mode
    if (strToBool(newVal.theme['auto switch theme'].as)) {
        if (!autoColorInterval.value) {
            autoChangeMode()
        }
    } else {
        if (autoColorInterval.value) {
            clearInterval(autoColorInterval.value)
        }
    }
})

// ================================= Functions Used
function autoChangeMode() {
    autoColorInterval.value = setInterval(() => {
        const objColors = settingStore.color_modes,
            currColorName = compo_game_setting.value.theme.theme.as,
            nextColorName = findNextKey(objColors, currColorName)

        // toggle the color mode
        settingStore.toggleMode(nextColorName, currColorName)

        // while the (auto switch theme) is 'off' >> stop
        if (!strToBool(compo_game_setting.value.theme['auto switch theme'].as)) {
            clearInterval(autoColorInterval.value)
        }
    }, 300000) // 300,000 millie second >> 5 minute
}
</script>


<style lang="scss">
@import './assets/css/mixins';

* {
    font-family: var(--f-fam); // auto-import for the font
}

#app,
.app {
    background: var(--bg);
    @include wh-screen;
    overflow: auto;
}
</style>
