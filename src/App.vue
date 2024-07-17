
<template>
    <Navbar />

    <main>
        <RouterView />
    </main>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Main/Navbar.vue'

// import { getImageUrl, makeNoScroll } from '@/utils/index.js';
</script>


<style lang="scss">
@import './assets/css/mixins';

#app,
.app {
    background: var(--bg);
    @include wh-screen;
    overflow: auto;
}
</style>
