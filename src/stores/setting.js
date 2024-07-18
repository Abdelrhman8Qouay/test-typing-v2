import { ref } from 'vue'
import { defineStore } from 'pinia'
import { removeClass, addClass } from '@/utils'

export const useSettingStore = defineStore('setting', () => {
    // paragraph type that can decide what is the option got
    const para_type = ref('time')

    // For Page Color Mode ===========================
    const curr_color_mode = ref('superuser')
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

    // For game settings ===========================
    // show all option for each type of the paragraphs
    const setting_of_paras = {
        time: [15, 30, 60, 120, 'custom'],
        words: [10, 25, 50, 100, 'custom'],
        quote: ['short', 'medium', 'long']
    }
    // paragraph type that can decide what is the option got
    const game_setting = ref({
        type: 'time',
        setting: setting_of_paras['time']
    })
    const curr_game_setting = ref(game_setting.value.setting[0]) // 15 or 'short' or (one of any from settings)
    function liveGameSetting(value /* ex: words <string> */, toClick) {
        if (toClick == 'type') {
            game_setting.value.type = value
            game_setting.value.setting = setting_of_paras[value]
            curr_game_setting.value = game_setting.value.setting[0]
        } else if (toClick == 'setting') {
            if (value == 'custom') {
                // do nothing now <<< @@@@@@@@@@@@@@@@@@@
                curr_game_setting.value = value
            } else {
                curr_game_setting.value = value
            }
        }
    }

    // For game settings ===========================
    const compo_game_setting = ref({
        behavior: {
            'show keyboard': {
                set: ['off', 'on'],
                as: 'on',
                comment: 'display the keyboard animation',
                icon: 'keyboardOffOutline'
            },
            'test difficulty': {
                set: ['normal', 'expert', 'master'],
                as: 'normal',
                comment:
                    'Normal is the classic type test experience. Expert fails the test if you submit (press space) an incorrect word. Master fails if you press a single incorrect key (meaning you have to achieve 100% accuracy).',
                icon: 'starShooting'
            },
            'quick restart': {
                set: ['off', 'tab', 'enter', 'esc'],
                as: 'esc',
                comment: `<div class="text"> Press <key>tab</key> ,
<key>esc</key> or <key>enter</key> to quickly restart the test, or to quickly jump to the test page. These
options disable tab navigation on most parts of the website. Using the "esc" option will move opening the commandline to the <key>tab</key> key.</div>`,
                icon: 'restart'
            }
        },
        'when input': {
            'freedom mode': {
                set: ['off', 'on'],
                as: 'off',
                comment: `Allows you to delete any word, even if it was typed correctly.`,
                icon: 'typewriter'
            },
            'stop on error': {
                set: ['off', 'word', 'letter'],
                as: 'off',
                comment: `Letter mode will stop input when pressing any incorrect letters. Word mode will not allow you to continue to the next word until you correct all mistakes.`,
                icon: 'handBackRight'
            },
            'confidence mode': {
                set: ['off', 'on', 'max'],
                as: 'off',
                comment: `When enabled, you will not be able to go back to previous words to fix mistakes. When turned up to the max, you won't be able to backspace at all.`,
                icon: 'backspace'
            },
            'lazy mode': {
                set: ['off', 'on'],
                as: 'off',
                comment: `Replaces accents / diacritics / special characters with their normal letter equivalents.`,
                icon: 'cradleOutline'
            }
        },
        sound: {
            'sound volume': {
                set: ['quiet', 'medium', 'loud'],
                as: 'medium',
                comment: `Change the volume of the sound effects.`,
                icon: 'volumeMedium'
            },
            'play sound on click': {
                set: ['off', 'click', 'pop', 'typewriter', 'hit master', 'square', 'nk creams', 'rubber keys'],
                as: 'nk creams',
                comment: `Plays a short sound when you press a key.`,
                icon: 'volumeSource'
            },
            'play sound on error': {
                set: ['off', 'damage', 'square', 'triangle'],
                as: 'damage',
                comment: `Plays a short sound if you press an incorrect key or press space too early.`,
                icon: 'volumeMute'
            }
        },
        appearance: {
            'typing speed unit': {
                set: ['wpm', 'cpm', 'wps', 'cps'],
                as: 'wpm',
                comment: `Display typing speed in the specified unit.`,
                icon: 'carSpeedLimiter'
            },
            'font size': {
                set: function getFontSize() {},
                as: 2,
                comment: `Change the font size of the test words.`,
                icon: 'formatSize'
            }
            // 'font family': {
            //     set: ['off', 'damage', 'square', 'triangle'],
            //     as: 'damage',
            //     comment: `Plays a short sound if you press an incorrect key or press space too early.`,
            //     icon: 'fontAwesome'
            // },
        },
        theme: {
            'flip test colors': {
                set: ['off', 'on'],
                as: 'off',
                comment: 'By default, typed text is brighter than the future text. When enabled, the colors will be flipped and the future text will be brighter than the already typed text.',
                icon: 'compare'
            },
            'colorful mode': {
                set: ['off', 'on'],
                as: 'off',
                comment: 'When enabled, the test words will use the main color, instead of the text color, making the website more colorful.',
                icon: 'formatColorFill'
            },
            theme: {
                set: Object.keys(color_modes),
                as: curr_color_mode.value,
                comment: '',
                icon: 'palette'
            }
        },
        'hide elements': {
            'out of focus warning': {
                set: ['hide', 'show'],
                as: 'show',
                comment: `Shows an out of focus reminder after 1 second of being 'out of focus' (not being able to type).`,
                icon: 'alert'
            },
            'caps lock warning': {
                set: ['hide', 'show'],
                as: 'show',
                comment: 'Displays a warning when caps lock is on.',
                icon: 'alert'
            }
        },
        'danger zone': {
            'reset settings': {
                set: null,
                as: function resetGameSetting() {},
                comment: `Resets settings to the default (but doesn't touch your tags). <br> <span class="text-[var(--error)]">You can't undo this action!</span>`,
                icon: 'restart'
            }
        }
    })

    return { para_type, curr_color_mode, color_modes, toggleMode, setting_of_paras, game_setting, liveGameSetting, curr_game_setting }
})
