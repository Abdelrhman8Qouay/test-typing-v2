
<template>
    <nav class="NavbarComp">
        <!-- Top Navbar -->
        <div class="w-full h-max p-3 flex flex-col items-center justify-end gap-3">
            <div class="topLab">
                <div class="nav-above max-lg:hidden w-full flex items-center gap-2 p-2">
                    <RouterLink :class="{ active: $route.path === '/' }" to="/" @click="openTab = false">HOME </RouterLink>
                    <RouterLink :class="{ active: $route.path === '/about' }" to="/about" @click="openTab = false"> ABOUT </RouterLink>
                    <RouterLink :class="{ active: $route.path === '/contact' }" to="/contact" @click="openTab = false"> CONTACT </RouterLink>
                </div>
                <Menu fillColor="#fff" :size="40" @click="openTab = !openTab" class="lg:hidden transition-transform ease-in duration-200" :class="{ 'rotate-180': openTab }" />
            </div>
        </div>

        <!-- Menu Tab -->
        <transition name="tab">
            <div v-if="openTab" class="w-full h-full fixed flex justify-center items-center top-0 left-0 bg-[rgba(72,72,72,1)] z-[28000]">
                <div class="nav w-full mx-auto flex flex-col items-center gap-5 pt-5 p-7">
                    <RouterLink :class="{ active: $route.path === '/' }" to="/" @click="openTab = false">HOME </RouterLink>
                    <RouterLink :class="{ active: $route.path === '/about' }" to="/about" @click="openTab = false"> ABOUT </RouterLink>
                    <RouterLink :class="{ active: $route.path === '/contact' }" to="/contact" @click="openTab = false"> CONTACT </RouterLink>
                </div>
            </div>
        </transition>

        <!-- <SettingButton class="hovered" ico="facebook" :ico-size="20" shadow-color="white" :url="all_links[0]['facebook']" />
            <SettingButton class="hovered" ico="twitter" :ico-size="20" shadow-color="white" :url="all_links[0]['twitter']" />
            <SettingButton class="hovered" ico="linkedin" :ico-size="20" shadow-color="white" :url="all_links[0]['linkedin']" />
            <SettingButton class="hovered" ico="github" :ico-size="20" shadow-color="white" :url="all_links[0]['github']" /> -->
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import data_links from '@/data/links.json'
const all_links = ref(null)
onMounted(() => (all_links.value = data_links))

// ========================== get icons ==========================
import Menu from 'vue-material-design-icons/Menu.vue'
import Cog from 'vue-material-design-icons/Cog.vue'

// ========================== get components ==========================

// ========================== Main Options ==========================
const openTab = ref(false)
</script>

<style lang="scss" scoped>
// =============== Animated ===============
.tab-enter-active {
    transform-origin: top;
    animation: openNav 2.5s cubic-bezier(0.5, 0.2, 0.2, -0.1);
    z-index: 28000;
}

.tab-leave-active {
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.38s ease-in;
    z-index: 28000;
}

.tab-enter-from {
    transform-origin: top;
    transform: scaleY(0);
}

.setting-enter-active {
    transform-origin: top;
    animation: openNav 2.5s cubic-bezier(0.5, 0.2, 0.2, -0.1);
    z-index: 28000;
}

.setting-leave-active {
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.38s ease-in;
    z-index: 28000;
}

.setting-enter-from {
    transform-origin: top;
    transform: scaleY(0);
}

.hovered {
    &:hover {
        transform: translateX(10px);
        transition: all 0.32s;
    }
}

// =============== Styles ===============
.active-nav {
    width: 100%;
    height: 100%;
    transition: all 0.4s ease-out;
}

.nav {
    $color: #6e6e6e;
    $active_color: #fff;

    a {
        font-size: 30px;
        transition: var(--hover-trans);
        position: relative;
        text-decoration: none;
        background: transparent;
        border-radius: 7px;
        margin: 0 auto 0 auto;
        height: max-content;
        padding: 5px 15px;
        z-index: 10;
        color: $color;

        &::before {
            content: '';
            width: 100%;
            height: 2px;
            background: $color;
            position: absolute;
            left: 0;
            top: 100%;
            z-index: 0;
        }

        &:hover {
            // transform: translateY(-5px) scale(1.10);
            color: $active_color;

            &::before {
                transform: scaleY(1);
            }
        }

        &.active {
            color: $active_color;
            font-weight: 600;

            &::before {
                content: '';
                width: 100%;
                height: 4px;
                background: $active_color;
            }
        }
    }
}

.nav-above {
    $color: #c1c1c1;
    $active_color: #fff;

    a {
        font-size: 15px;
        font-weight: 200;
        position: relative;
        text-decoration: none;
        background: transparent;
        border-radius: 7px;
        margin: 0 auto 0 auto;
        height: max-content;
        padding: 5px 15px;
        z-index: 10;
        color: $color;

        transition: all var(--hover-trans);

        &::before {
            content: '';
            width: 100%;
            transform: scaleX(0);
            transition: transform 0.34s ease-in-out;
            transform-origin: left;
            height: 2px;
            background: $color;
            position: absolute;
            left: 0;
            top: 100%;
            z-index: 0;
        }

        &:hover {
            color: $active_color;
            font-weight: 500;

            &::before {
                transform: scaleY(1);
            }
        }

        &.active {
            color: $active_color;
            font-weight: 500;

            &::before {
                transform: scaleX(1);
                content: '';
                width: 100%;
                height: 4px;
                background: $active_color;
            }
        }
    }
}

// =============== All Key Frames ===============
@keyframes openNav {
    0% {
        transform: scaleY(0);
    }

    10% {
        transform: scaleY(1);
    }

    20% {
        transform: scaleY(0.89);
    }

    30% {
        transform: scaleY(1);
    }

    40% {
        transform: scaleY(0.99);
    }

    50% {
        transform: scaleY(1);
    }

    70% {
        transform: scaleY(1);
    }

    100% {
        transform: scaleY(1);
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes bounce-in {
    0% {
        transform: scaleX(0) scaleY(0);
    }

    50% {
        transform: scaleX(1) scaleY(0);
    }

    100% {
        transform: scaleX(1) scaleY(1);
    }
}

.cursorColor {
    width: 100%;
    border: none;
    outline: none;
    -webkit-appearance: none;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;
    }
}
</style>