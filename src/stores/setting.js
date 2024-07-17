import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { removeClass, addClass } from '@/utils'

export const useSettingStore = defineStore('setting', () => {
    // paragraph type that can decide what is the option got
    const para_type = ref('time')

    // For Page Color Mode
    const curr_color_mode = ref('paper')
    const color_modes = {
        dark: 'darkMode',
        midnight: 'midnightMode',
        paper: 'paperMode',
        'cyber space': 'cyberspaceMode',
        'desert oasis': 'desertOasisMode',
        matrix: 'matrixMode',
        waves: 'wavesMode',
        voc: 'vocMode',
        taro: 'taroMode',
        vscode: 'vscodeMode',
        dev: 'devMode',
        laser: 'laserMode',
        superuser: 'superuserMode',
        strawberry: 'strawberryMode',
        stealth: 'stealthMode',
        sonokai: 'sonokaiMode',
        'sewing tin light': 'sewingTinLightMode',
        'repose light': 'reposeLightMode',
        'red samurai': 'redSamuraiMode',
        peaches: 'peachesMode',
        pastel: 'pastelMode',
        'modern ink': 'modernInkMode'
    }
    function toggleMode(modeName) {
        let body = document.body
        removeClass(body, color_modes[curr_color_mode.value])
        curr_color_mode.value = modeName
        addClass(body, color_modes[modeName])
    }

    return { para_type, curr_color_mode, color_modes, toggleMode }
})
