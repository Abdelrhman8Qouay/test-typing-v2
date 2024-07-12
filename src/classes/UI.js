//======================== import what need it ========================
import { addClass, removeClass, hasClass, config } from '../utils'
// import Game from './Game'
import KeyboardI from './KeyboardI'

// ======================== User Interface ========================
export class UI {
  constructor() {
    this.Keyboard = new KeyboardI()
  }

  static addParagraph(gameObj) {
    // empty paragraph interface >>> then >>>
    config.paraContainerEle.innerHTML = ''

    // the first char added
    config.paraContainerEle.innerHTML += `<span class="letter letter-active start_char" data-char="${gameObj.current_para_content[0]}">${gameObj.current_para_content[0]}</span>`
    KeyboardI.activeKeyboardKey(0, gameObj)

    // iterate for all chars
    for (let i = 1; i < gameObj.current_para_content.length; i++) {
      config.paraContainerEle.innerHTML += `<span class="letter" data-char="${gameObj.current_para_content[i]}">${gameObj.current_para_content[i]}</span>`
    }

    // get the letters as variables
    config.para_letters = document.querySelectorAll('.game_box .writerBox .para_container .letter')
  }

  // --------------- Input Process ---------------
  // focus the input
  static focusInput(eleInput) {
    eleInput.focus()
  }
  // scroll the container to active letter
  static scrollToActiveLetter() {
    const activeLetter = config.paraContainerEle.querySelector('.letter-active')
    console.log('scroll here')

    if (activeLetter) {
      // Calculate the position to scroll to
      const containerRect = config.paraContainerEle.getBoundingClientRect()
      const activeLetterRect = activeLetter.getBoundingClientRect()

      // Calculate the horizontal scroll position to center the active letter
      const scrollLeft =
        activeLetterRect.left -
        containerRect.left +
        config.paraContainerEle.scrollLeft -
        containerRect.width / 2 +
        activeLetterRect.width / 2

      // Smoothly scroll the container to the calculated position
      config.paraContainerEle.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  }

  // --------------- More Rest ---------------
  // return the game information to default again
  static defaultGameInfo(gameObj) {
    config.typeInput.value = ''
    config.paraContainerEle.innerHTML = ''
    config.gameLiveTime.innerText = gameObj.const_time
    if (hasClass(config.typeInput, 'error')) removeClass(config.typeInput, 'error')
  }

  // true(appear >> board, hide >> game) false(appear >> game, hide >> board)
  static showBoard(board) {
    if (board) {
      addClass(config.gameBox, 'hide')
      removeClass(config.boardBox, 'hide')
    } else {
      addClass(config.boardBox, 'hide')
      removeClass(config.gameBox, 'hide')
    }
  }
}
