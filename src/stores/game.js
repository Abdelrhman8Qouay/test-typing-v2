import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getImageUrl, hasClass } from '../utils'

export const useGameStore = defineStore('game', () => {
    // ========== behavior sys
    // const quickRestart = ref('esc')
    // // ========== input sys
    // const freedomMode = ref('off')
    // const stopOnError = ref('off')
    // const confidenceMode = ref('off')
    // const lazyMode = ref('off')
    // // ========== sound sys
    const soundVolume = ref(0.5) // default value
    const soundOnClick = ref(getImageUrl('assets/sound/clicks/click.mp3')) // default value
    const soundOnError = ref(getImageUrl('assets/sound/errors/modern_checker.wav')) // default value

    // ========== Appearance sys
    // --------- game info & user info
    const userInfo = ref({
        are: 'turtle',
        accuracy: 0,
        per: {
            type: 'wpm',
            value: 0
        },
        time: 0,
        correct: 0,
        total: 0
    })
    // const fontSize = ref(2)

    // // ========== theme sys
    // const flipTestColors = ref('off')
    // const colorfulMode = ref('off')

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
        userInfo
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
