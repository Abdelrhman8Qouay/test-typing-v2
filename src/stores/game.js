import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getImageUrl, hasClass } from '../utils'

export const useGameStore = defineStore(
    'game',
    () => {
        // // ========== sound sys
        const soundVolume = ref(0)
        const soundOnClick = ref('')
        const soundOnError = ref('')

        // ========== Appearance sys
        // --------- game info & user info
        const user_nicknames = [
            {
                maxSpeed: 10,
                nickname: 'Sloth',
                messages: [
                    'You are a sloth, but every journey starts with a single step. Keep going!',
                    'Slow and steady wins the race. Keep moving, sloth!',
                    'You are a sloth, taking your time. Consistency is key!'
                ],
                icon: 'game-icons:sloth'
            },
            {
                maxSpeed: 30,
                nickname: 'Turtle',
                messages: ['You are a turtle, moving steadily. Persistence is key!', 'Steady as a turtle, you’re making progress!', 'Slow and sure, like a turtle. Keep it up!'],
                icon: 'game-icons:sea-turtle'
            },
            {
                maxSpeed: 45,
                nickname: 'Octopus',
                messages: [
                    'You are an octopus, showing incredible multitasking skills. Keep those tentacles moving!',
                    'An octopus in action, juggling tasks with ease!',
                    'Octopus mode: activated! Your multitasking is amazing!'
                ],
                icon: 'game-icons:octopus'
            },
            {
                maxSpeed: 70,
                nickname: 'Cheetah',
                messages: ['You are a cheetah, incredibly fast! Keep pushing your limits!', 'Blazing fast like a cheetah! Amazing speed!', 'Cheetah speed! You’re breaking barriers!'],
                icon: 'arcticons:cheetah-keyboard'
            },
            {
                maxSpeed: 90,
                nickname: 'Eagle',
                messages: ['You are an eagle, soaring to new heights! Aim higher!', 'Eagle-eyed and flying high! Keep soaring!', 'Eagle in flight! Your performance is top-notch!'],
                icon: 'emojione-monotone:eagle'
            },
            {
                maxSpeed: Infinity,
                nickname: 'Lightning',
                messages: ['You are lightning, unstoppable and blazing ahead! Nothing can catch you!', 'Lightning speed! You’re ahead of the game!', 'Blazing fast like lightning! Incredible speed!'],
                icon: 'game-icons:lightning-trio'
            }
        ]
        const userInfo = ref({
            are: {
                name: user_nicknames[0].nickname,
                msg: user_nicknames[0].messages[0],
                icon: user_nicknames[0].icon
            },
            accuracy: 0,
            per: {
                type: 'wpm',
                value: 0
            },
            time: 0,
            letters: {
                total: 0,
                correct: 0,
                words: 0
            }
        })
        // const fontSize = ref(2)

        // // ========== theme sys
        const customBackground = ref({
            url: '',
            mode: 'cover',
            blur: 0,
            brightness: 1,
            saturate: 1,
            opacity: 1
        })

        return {
            soundVolume,
            soundOnClick,
            soundOnError,
            // // ----------
            // show_keyboard,
            user_nicknames,
            userInfo,
            // fontName,
            // fontSize,
            // // ----------
            customBackground
            // colorfulMode,
            // currTheme,
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
