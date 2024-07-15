//======================== import what need it ========================
import { addClass, removeClass, hasClass } from '../utils'
// import Game from './Game'
import KeyboardI from './KeyboardI'

// ======================== User Interface ========================
export default class UI {
    constructor() {
        this.Keyboard = new KeyboardI()
    }

    static addParagraph(gameObj, paraContainerEle, para_letters) {
        // empty paragraph interface >>> then >>>
        paraContainerEle.innerHTML = ''

        // the first char added
        paraContainerEle.innerHTML += `<span class="letter letter-active start_char" data-char="${gameObj.current_para_content[0]}">${gameObj.current_para_content[0]}</span>`
        KeyboardI.activeKeyboardKey(0, gameObj)

        // iterate for all chars
        for (let i = 1; i < gameObj.current_para_content.length; i++) {
            paraContainerEle.innerHTML += `<span class="letter" data-char="${gameObj.current_para_content[i]}">${gameObj.current_para_content[i]}</span>`
        }

        // get the letters as variables
        para_letters = document.querySelectorAll('.game_box .writerBox .para_container .letter')
    }

    // --------------- Input Process ---------------
    // focus the input
    static focusInput(eleInput) {
        eleInput.focus()
    }
    // scroll the container to active letter
    static scrollToActiveLetter(paraContainerEle) {
        const activeLetter = paraContainerEle.querySelector('.letter-active')
        console.log('scroll here')

        if (activeLetter) {
            // Calculate the position to scroll to
            const containerRect = paraContainerEle.getBoundingClientRect()
            const activeLetterRect = activeLetter.getBoundingClientRect()

            // Calculate the horizontal scroll position to center the active letter
            const scrollLeft = activeLetterRect.left - containerRect.left + paraContainerEle.scrollLeft - containerRect.width / 2 + activeLetterRect.width / 2

            // Smoothly scroll the container to the calculated position
            paraContainerEle.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            })
        }
    }

    static defaultGameInfo(gameObj, typeInput, paraContainerEle, gameLiveTime) {
        typeInput.value = ''
        paraContainerEle.innerHTML = ''
        gameLiveTime.innerText = gameObj.const_time
        if (hasClass(typeInput, 'error')) {
            removeClass(typeInput, 'error')
        }
    }
}
