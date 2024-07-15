import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getImageUrl } from '../utils'

export const usePublicStore = defineStore('public', () => {
    const sound_click = {
        err: new Audio(getImageUrl('assets/sound/clicks/err_click.wav')),
        click: new Audio(getImageUrl('assets/sound/clicks/click.mp3'))
    }

    return { sound_click }
})
