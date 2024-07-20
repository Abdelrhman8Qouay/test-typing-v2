import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import { getImageUrl, hasClass } from '../utils'
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
    const soundVolume = ref(0.5) // quiet >> 0.2 | medium >> 0.5 | loud >> 0.9
    const soundOnClick = ref(getImageUrl('assets/sound/clicks/click.mp3'))
    const soundOnError = ref(getImageUrl('assets/sound/errors/err_click.wav'))

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
        soundVolume,
        soundOnClick,
        soundOnError,
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
