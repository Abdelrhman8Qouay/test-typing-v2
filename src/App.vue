
<template>
    <div :style="'--f-fam: ' + compo_game_setting['appearance']['font family'].as">
        <Navbar />

        <main>
            <RouterView />
        </main>
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
