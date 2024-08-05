import { ref } from 'vue'
import { defineStore } from 'pinia'
import { removeClass, addClass, loadFont, getImageUrl, playClick } from '@/utils'

export const useSettingStore = defineStore(
    'setting',
    () => {
        // =========================== All Maps Used ===========================
        const soundMap = {
            off: '',
            quiet: 0.2,
            medium: 0.5,
            loud: 0.8,
            // ----------
            click: getImageUrl('assets/sound/clicks/click.mp3').href,
            camera: getImageUrl('assets/sound/clicks/camera.wav').href,
            'mechanical typewriter': getImageUrl('assets/sound/clicks/mechanical_typewriter.wav').href,
            tip: getImageUrl('assets/sound/clicks/tip.wav').href,
            typewriter: getImageUrl('assets/sound/clicks/typewriter.wav').href,
            // ----------
            arcade: getImageUrl('assets/sound/errors/arcade.wav').href,
            'game alert': getImageUrl('assets/sound/errors/game_alert.wav').href,
            'hard typewriter': getImageUrl('assets/sound/errors/hard_typewriter.wav').href,
            'modern checker': getImageUrl('assets/sound/errors/modern_checker.wav').href
        }

        // =========================== For Page Color Mode ===========================
        // all color modes available
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
            'modern ink': 'modernInkMode',
            shadow: 'shadowMode',
            viridescent: 'viridescentMode',
            // ============ from ai generation
            'blue ocean': 'blueOceanMode',
            'green forest': 'greenForestMode',
            'sunny yellow': 'sunnyYellowMode',
            'purple night': 'purpleNightMode',
            'orange sunset': 'orangeSunsetMode'
        }

        // toggle the color mode function
        function toggleMode(currModeName, oldModeName = null) {
            let body = document.body
            if (oldModeName) {
                removeClass(body, color_modes[oldModeName])
            }
            compo_game_setting.value.theme.theme.as = currModeName
            addClass(body, color_modes[currModeName])
        }

        // =========================== For game settings Row ===========================
        // show all option for each type of the paragraphs
        const setting_of_paras = {
            time: {
                set: [15, 30, 60, 120],
                icon: 'fluent:timer-28-regular'
            },
            words: {
                set: [10, 25, 50, 100],
                icon: 'ph:newspaper-light'
            },
            quote: {
                set: ['short', 'medium', 'large'],
                got: {
                    short: 20,
                    medium: 45,
                    large: 80
                },
                icon: 'lets-icons:paper-light'
            }
        }
        // paragraph type that can decide what is the option got
        const game_state = ref({
            type: 'time',
            setting: setting_of_paras['time']
        })

        // =========================== For game settings Page ===========================
        /*
        // set is: array set of available choices to use them
        // func is: the function of this setting to use it
        // def is: default value used in first time
        // as is: the current value for this setting or the live time value
        // attrs is: are attributes for (input) type [text, class, id, type, placeholder, min, max, autocomplete, ...]
        // visible is: if the current setting is visible or invisible now
        // type is: >>>
            input >> custom input (to fill {as} value) by custom value
            button >> one button make a function (more accurate for a function)
            many >> many buttons also that can make a function
            bothMany >> input + many
            bothButton >> input + button
    */
        const compo_game_setting = ref({
            behavior: {
                'test difficulty': {
                    set: ['normal', 'expert', 'master'],
                    def: 'normal',
                    as: 'normal',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment:
                        'Normal is the classic type test experience. Expert fails the test if you submit (press space) an incorrect word. Master fails if you press a single incorrect key (meaning you have to achieve 100% accuracy).',
                    icon: 'mdi:star-shooting'
                },
                'quick restart': {
                    set: ['off', 'tab', 'enter', 'esc'],
                    def: 'esc',
                    as: 'esc',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: `<div class="text"> Press <key>tab</key> ,
<key>esc</key> or <key>enter</key> to quickly restart the test, or to quickly jump to the test page. These
options disable tab navigation on most parts of the website. Using the "esc" option will move opening the commandline to the <key>tab</key> key.</div>`,
                    icon: 'mdi:restart'
                }
            },
            'when input': {
                'freedom mode': {
                    set: ['off', 'on'],
                    def: 'off',
                    as: 'off',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: `Allows you to delete any word, even if it was typed correctly.`,
                    icon: 'mdi:typewriter'
                },
                'stop on error': {
                    set: ['off', 'word', 'letter'],
                    def: 'off',
                    as: 'off',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: `Letter mode will stop input when pressing any incorrect letters. Word mode will not allow you to continue to the next word until you correct all mistakes.`,
                    icon: 'mdi:hand-back-right'
                },
                'confidence mode': {
                    set: ['off', 'on', 'max'],
                    def: 'off',
                    as: 'off',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: `When enabled, you will not be able to go back to previous words to fix mistakes. When turned up to the max, you won't be able to backspace at all.`,
                    icon: 'mdi:backspace'
                },
                'lazy mode': {
                    set: ['off', 'on'],
                    def: 'off',
                    as: 'off',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: `Replaces accents / diacritics / special characters with their normal letter equivalents.`,
                    icon: 'mdi:cradle-outline'
                }
            },
            sound: {
                'sound volume': {
                    set: ['quiet', 'medium', 'loud'],
                    def: 'medium',
                    as: 'medium',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: `Change the volume of the sound effects.`,
                    icon: 'mdi:volume-medium'
                },
                'play sound on click': {
                    set: ['off', 'click', 'camera', 'mechanical typewriter', 'tip', 'typewriter'],
                    def: 'camera',
                    as: 'camera',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                        if (inp != 'off') {
                            playClick(soundMap[inp], soundMap[compo_game_setting.value.sound['sound volume'].as])
                        }
                    },
                    comment: `Plays a short sound when you press a key.`,
                    icon: 'mdi:volume-source'
                },
                'play sound on error': {
                    set: ['off', 'arcade', 'game alert', 'hard typewriter', 'modern checker'],
                    def: 'modern checker',
                    as: 'modern checker',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                        if (inp != 'off') {
                            playClick(soundMap[inp], soundMap[compo_game_setting.value.sound['sound volume'].as])
                        }
                    },
                    comment: `Plays a short sound if you press an incorrect key or press space too early.`,
                    icon: 'mdi:volume-mute'
                }
            },
            appearance: {
                'show keyboard': {
                    set: ['off', 'on'],
                    def: 'on',
                    as: 'on',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: 'display the keyboard animation',
                    icon: 'ph:keyboard-thin'
                },
                leaves: {
                    set: ['off', 'on'],
                    def: 'on',
                    as: 'on',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: 'make you see the leaves animation while playing (that leads to a greater sense of comfort)',
                    icon: 'game-icons:three-leaves'
                },
                'typing speed unit': {
                    set: ['wpm', 'cpm', 'wps', 'cps'],
                    def: 'wpm',
                    as: 'wpm',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: `Display typing speed in the specified unit.`,
                    icon: 'mdi:car-speed-limiter'
                },
                'font family': {
                    set: [
                        'Roboto',
                        'Open Sans',
                        'Lato',
                        'Montserrat',
                        'Oswald',
                        'Raleway',
                        'Merriweather',
                        'Noto Sans',
                        'Ubuntu',
                        'Playfair Display',
                        'Poppins',
                        'Source Sans Pro',
                        'Indie Flower',
                        'Dancing Script',
                        'Rubik',
                        'Pacifico',
                        'Cinzel',
                        'Bebas Neue',
                        'Quicksand',
                        'Josefin Sans',
                        'Cabin',
                        'Fira Sans',
                        'Nunito',
                        'Comfortaa',
                        'Baloo 2',
                        'Abril Fatface',
                        'Cairo',
                        'PT Sans',
                        'Lobster',
                        'Muli',
                        'Mukta',
                        'Heebo',
                        'Karla',
                        'Yanone Kaffeesatz',
                        'Crimson Text',
                        'Varela Round'
                    ],
                    def: 'Lato',
                    as: 'Lato',
                    visible: true,
                    type: 'many',
                    func: function (inp) {
                        this.as = inp
                        loadFont(inp)
                    },
                    comment: ``,
                    icon: 'ic:baseline-font-download'
                }
            },
            theme: {
                'flip test colors': {
                    set: ['off', 'on'],
                    def: 'off',
                    as: 'off',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: 'By default, typed text is brighter than the future text. When enabled, the colors will be flipped and the future text will be brighter than the already typed text.',
                    icon: 'mdi:compare'
                },
                'custom background': {
                    set: ['cover', 'contain', 'max'],
                    def: 'cover',
                    as: 'cover',
                    type: 'bothMany',
                    attrs: {
                        type: 'url',
                        placeholder: 'Your custom url..',
                        autocomplete: 'off',
                        id: 'customBackground',
                        class: 'w-[350px]',
                        value: '',
                        func: function (inp) {
                            this.value = inp
                        }
                    },
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment:
                        'Set an image url to be a custom background image. Cover fits the image to cover the screen. Contain fits the image to be fully visible. Max fits the image corner to corner. (do not write letter by letter, copy and paste the url only)',
                    icon: 'gala:image'
                },
                'custom background filter': {
                    set: {
                        blur: {
                            min: 0,
                            max: 15,
                            value: 0,
                            func: function (inp) {
                                this.value = inp
                            }
                        },
                        brightness: {
                            min: 0,
                            max: 2,
                            value: 1,
                            func: function (inp) {
                                this.value = inp
                            }
                        },
                        saturate: {
                            min: 0,
                            max: 2,
                            value: 1,
                            func: function (inp) {
                                this.value = inp
                            }
                        },
                        opacity: {
                            min: 0,
                            max: 1,
                            value: 1,
                            func: function (inp) {
                                this.value = inp
                            }
                        }
                    },
                    type: 'setting',
                    attrs: {
                        type: 'range',
                        step: '0.1'
                    },
                    visible: false,
                    comment: 'Apply various effects to the custom background.',
                    icon: 'lets-icons:filter'
                },
                'auto switch theme': {
                    set: ['off', 'on'],
                    def: 'off',
                    as: 'off',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: 'Enabling this will automatically switch the theme between light and dark depending on the system theme.',
                    icon: 'mdi:palette'
                },
                theme: {
                    set: Object.keys(color_modes),
                    def: 'dev',
                    as: 'dev',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        toggleMode(inp, this.as)
                    },
                    comment: '',
                    icon: 'mdi:palette'
                }
            },
            'hide elements': {
                'out of focus warning': {
                    set: ['hide', 'show'],
                    def: 'show',
                    as: 'show',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: `Shows an out of focus reminder after 1 second of being 'out of focus' (not being able to type).`,
                    icon: 'tabler:alert-small'
                },
                'caps lock warning': {
                    set: ['hide', 'show'],
                    def: 'show',
                    as: 'show',
                    type: 'many',
                    visible: true,
                    func: function (inp) {
                        this.as = inp
                    },
                    comment: 'Displays a warning when caps lock is on.',
                    icon: 'mdi:alert'
                }
            },
            'danger zone': {
                'reset settings': {
                    def: null,
                    set: null,
                    as: null,
                    type: 'button',
                    attrs: {
                        text: 'restart settings',
                        class: '!text-[var(--bg)] !bg-[var(--error)]'
                    },
                    visible: true,
                    func: function () {
                        Object.keys(compo_game_setting.value).forEach((row) => {
                            Object.keys(compo_game_setting.value[row]).forEach((set) => {
                                compo_game_setting.value[row][set].as = compo_game_setting.value[row][set].def
                            })
                        })
                        compo_game_setting.value.theme['custom background'].attrs.value = ''
                        let rest = confirm('Reload the page, to go the original content!?')
                        if (rest) {
                            history.go(0)
                        }
                    },
                    comment: `Resets settings to the default (but doesn't touch your tags). <br> <span class="text-[var(--error)]">You can't undo this action!</span>`,
                    icon: 'mdi:restart'
                }
            }
        })

        return {
            soundMap,
            // ----------
            color_modes,
            toggleMode,
            // ----------
            setting_of_paras,
            game_state,
            // ----------
            compo_game_setting
        }
    },
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    key: 'my_store',
                    storage: localStorage // or sessionStorage
                }
            ]
        }
    }
)
