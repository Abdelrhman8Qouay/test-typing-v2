
<template>
    <div :style="'--f-fam: ' + compo_game_setting['appearance']['font family'].as">
        <Navbar />

        <main>
            <RouterView />
        </main>

        <div class="w-full h-full flex justify-center items-center p-3 mt-32">
            <p class="text-[var(--text)]">
                Created By <a class="text-[var(--highlight)] font-semibold" target="_blank" href="https://abdelrhmanqouayportfolio.netlify.app/"> -Abdelrhman Ashraf- </a> With 💖
            </p>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Main/Navbar.vue'

import { loadFont } from '@/utils/'

import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores'
const settingStore = useSettingStore()
const { compo_game_setting } = storeToRefs(settingStore)

onMounted(() => {
    loadFont(compo_game_setting.value['appearance']['font family'].as)
    settingStore.toggleMode(settingStore.curr_color_mode)
})
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
