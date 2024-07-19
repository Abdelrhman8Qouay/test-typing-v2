import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

// import { getImageUrl, hasClass } from '../utils'
import { useSettingStore } from './setting'

export const useGameStore = defineStore('game', () => {
    // ========== behavior sys
    // const testDifficulty = ref('normal')
    // const quickRestart = ref('esc')
    // // ========== input sys
    // const freedomMode = ref('off')
    // const stopOnError = ref('off')
    // const confidenceMode = ref('off')
    // const lazyMode = ref('off')
    // // ========== sound sys
    // const soundVolume = ref('medium')
    // const soundOnClick = ref('nk creams')
    // const soundOnError = ref('damage')

    // ========== Appearance sys
    // const show_keyboard = ref('show')
    const per = ref({
        type: 'wpm',
        value: 0
    })
    // const fontSize = ref(2)
    // const fontName = ref('Lato')

    // // ========== theme sys
    // const flipTestColors = ref('off')
    // const colorfulMode = ref('off')
    // const currTheme = ref('superuser')
    // // ========== hide elements sys
    // const outOfFocusWarning = ref('show')
    // const capsLockWarning = ref('show')

    // ========== danger zone sys

    return {
        // testDifficulty,
        // quickRestart,
        // // ----------
        // freedomMode,
        // stopOnError,
        // confidenceMode,
        // lazyMode,
        // // ----------
        // soundVolume,
        // soundOnClick,
        // soundOnError,
        // // ----------
        // show_keyboard,
        per
        // fontName,
        // fontSize,
        // // ----------
        // flipTestColors,
        // colorfulMode,
        // currTheme,
        // // ----------
        // outOfFocusWarning,
        // capsLockWarning
        // ========================
    }
})
