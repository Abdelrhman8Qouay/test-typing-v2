<template>
    <div class="relative" tabindex="0">
        <span tabindex="0" :class="btnColors ? btnColors : 'text-[var(--text)]'" @blur="open_down_menu = false" @click="open_down_menu = !open_down_menu">
            <component v-if="iconName" class="mx-1 inline-block" :fillColor="iconColor ? iconColor : '#fff'" :size="iconSize" :is="Icons"></component>
            {{ txt }}</span
        >
        <ul
            class="absolute top-full w-max m-0 transition-all duration-200 z-[5000]"
            :class="(flowCurve == 'left' ? 'right-0' : 'left-0')(open_down_menu ? 'visible opacity-100' : 'invisible opacity-0')(menuColors ? menuColors : 'bg-white')"
        >
            <li
                class="list-none py-1 px-2"
                :class="liColors ? liColors : 'hover:bg-black text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)]'"
                v-for="(val, i) in list"
                :key="i"
                :tabindex="i"
            >
                <span class="no-underline w-full">{{ val }}</span>
            </li>
        </ul>
    </div>

    <!-- Custom Content Dropdown -->
    <!-- <div class="relative" tabindex="0">
        <span tabindex="0" :class="btnColors ? btnColors : 'text-[var(--gpSystemLighterGrey)]'"
            @blur="open_down_menu = !open_down_menu" @click="open_down_menu = !open_down_menu">{{
                txt }} <Icon v-if="iconName" :name="iconName" :size="iconSize" :color="iconColor" class="ml-1" /></span>

        <ul class="absolute top-full w-max m-0 transition-all duration-200 z-[5000]"
            :class="(flowCurve == 'left' ? 'right-0' : 'left-0'), (open_down_menu ? 'visible opacity-100' : 'invisible opacity-0'), menuColors ? menuColors : 'bg-white'">
            <slot />
        </ul>
    </div> -->
</template>

<script setup>
import { ref, defineProps, toRefs, shallowRef } from 'vue'

import Github from 'vue-material-design-icons/Github.vue'
import ThemeLightDark from 'vue-material-design-icons/ThemeLightDark.vue'

const props = defineProps({
    txt: String,
    flowCurve: String, // if want to make menu flow with [ bottom right >> right or bottom left >> left ]
    list: {
        // each item with name and value
        type: [Array, Object],
        default: []
    },
    btnColors: String, // any style for button with tailwind classes
    menuColors: String, // any style for menu with tailwind classes or [default: bg-white]
    liColors: String, // any style for li with tailwind classes

    iconName: String,
    iconSize: [String, Number],
    iconColor: String,
    whereIcon: String // left or right
})

let { txt, flowCurve, list, btnColors, menuColors, liColors, iconName, iconSize, iconColor, whereIcon } = toRefs(props)

// dropdown take the value to the parent

let open_down_menu = ref(false)

// handle the icons to work
const Icons = shallowRef(null)
if (iconName.value === 'themeLightDark') Icons.value = ThemeLightDark
else if (iconName.value === 'github') Icons.value = Github
</script>

<style lang="scss">
.menu_dropdown_parent {
    color: var(--text);
    position: relative;

    &:hover {
        color: var(--text);
    }

    .dropdown-menu {
        box-shadow: 0 0 8px #000;
        min-width: 100px;
        max-height: 500px;
        overflow-y: auto;
        padding: 8px;
        position: absolute;
    }
}
</style>