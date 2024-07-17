
<template>
    <div class="home">
        <div class="changerContainer container">
            <GameBox />
        </div>
    </div>
</template>


<script setup>
// ============ Import ============
import { ref, onMounted } from 'vue'

import GameBox from '@/components/GameBox.vue'

// ===================== Stores =====================
import { usePublicStore } from '@/stores/public'
import { useSettingStore } from '@/stores/setting'
const publicStore = usePublicStore()
const settingStore = useSettingStore()
</script>


<style lang="scss">
@import '../assets/css/mixins';
</style>
