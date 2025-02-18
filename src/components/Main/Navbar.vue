
<template>
    <nav class="navbar">
        <div class="container">
            <div class="left">
                <div class="logo w-13 h-max">
                    <Icon class="w-full h-full" icon="arcticons:keyman" :color="getCssColorVar('--highlight')" />
                </div>
                <!-- Navbar Content -->
                <div class="nav-above gap-2 p-2">
                    <RouterLink :class="{ active: $route.path === '/' }" to="/"><Icon icon="mdi:keyboard-variant" /></RouterLink>
                    <a :class="{ active: $route.path === '/about' }" href="https://abdelrhmanqouayportfolio.netlify.app" target="_blank" title="about us"><Icon icon="mdi:information-variant" /></a>
                    <RouterLink :class="{ active: $route.path === '/setting' }" to="/setting"><Icon icon="mdi:cogs" /></RouterLink>
                </div>
            </div>
            <div class="right">
                <div class="relative" tabindex="0">
                    <span
                        class="flex justify-center items-center opt !text-base"
                        @click.self="open_color_mode_menu = !open_color_mode_menu"
                        :class="open_color_mode_menu ? '!text-[var(--highlight)]' : ''"
                    >
                        <Icon icon="mdi:theme-light-dark" class="mx-1 inline-block" />
                        {{ compo_game_setting.theme.theme.as }}</span
                    >
                    <ul
                        class="absolute top-full right-0 w-[25vw] max-h-[70vh] overflow-y-auto rounded-md m-0 transition-all duration-200 z-[11000] bg-[var(--sub)] shadow shadow-[var(--caret)]"
                        :class="open_color_mode_menu ? 'visible opacity-100' : 'invisible opacity-0'"
                    >
                        <li
                            class="list-none py-1 px-2 cursor-pointer flex text-[var(--text)] hover:text-[var(--highlight)] hover:bg-[var(--text)]"
                            v-for="(val, i) in Object.keys(settingStore.color_modes)"
                            :key="i"
                            :tabindex="i"
                            @click="settingStore.toggleMode(val, compo_game_setting.theme.theme.as)"
                        >
                            <div class="balls flex justify-items-start items-center gap-1 bg-[var(--sub)] mx-1 p-1 px-2 rounded-md" :class="settingStore.color_modes[val]">
                                <div class="ball w-4 h-4 bg-[var(--main)] rounded-full"></div>
                                <div class="ball w-4 h-4 bg-[var(--text)] rounded-full"></div>
                                <div class="ball w-4 h-4 bg-[var(--highlight)] rounded-full"></div>
                            </div>
                            <span>{{ val }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// ===================== Stores =====================
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores'
import { getCssColorVar } from '@/utils'
const settingStore = useSettingStore()
const { compo_game_setting } = storeToRefs(settingStore)

// ========================== Process ==========================
let open_color_mode_menu = ref(false)
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixins.scss';

// =============== Styles ===============
.active-nav {
    @include wh-full;
    transition: all 0.4s ease-out;
}

.navbar {
    .container {
        @include flex-center;
        justify-content: space-between;
    }

    .left {
        @include flex-center;
        .logo {
            @include wh-custom(150px, 70px);
            img {
                @include wh-full;
            }
        }
        .nav-above {
            @include flex-center;
            a {
                @include wh-max;
                font-size: 25px;
                position: relative;
                text-decoration: none;
                background: transparent;

                user-select: none;
                transition: var(--hover-trans);
                color: var(--text);
                z-index: 10;
                &::before {
                    content: '';
                    @include wh-custom(100%, 2px);
                    background: var(--text);
                    position: absolute;
                    left: 0;
                    top: 100%;
                    z-index: 0;

                    transform: scaleX(0);
                    transition: transform var(--hover-trans);
                }

                &:hover {
                    // transform: translateY(-5px) scale(1.10);
                    color: var(--highlight);
                }

                &.active {
                    color: var(--highlight);
                    font-weight: 600;

                    &::before {
                        content: '';
                        @include wh-custom(100%, 2px);
                        background: var(--highlight);
                        transform: scaleX(1);
                    }
                }
            }
        }
    }

    .right {
        @include flex-center;
        .opt {
            @include wh-max;
            font-size: 22px;
            position: relative;
            text-decoration: none;
            background: transparent;
            cursor: pointer;
            user-select: none;

            transition: var(--hover-trans);
            color: var(--text);
            z-index: 10;

            &:hover {
                // transform: translateY(-5px) scale(1.10);
                color: var(--highlight);
            }

            &.active {
                color: var(--main);
                font-weight: 600;
            }
        }
    }
}

// =============== All Key Frames ===============
</style>