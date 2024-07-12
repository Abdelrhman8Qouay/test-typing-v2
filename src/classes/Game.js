//======================== import what need it ========================
import { addClass, removeClass, hasClass, playAudio, pauseEle, isSpaceChar, config } from '../utils'
import KeyboardI from './KeyboardI'
import UI from './UI'

// ======================== Game Class ========================
export class Game {
  // options to control the shape of the game
  static pass_click = './assets/sound/click.mp3'
  static err_click = './assets/sound/err_click.wav'
  static #total_times_played = 0

  constructor(paragraphs, timeout = 140) {
    Game.#total_times_played++
    this.paras = paragraphs
    this.const_time = timeout
    this.game_timeout = timeout
    this.random_para = Math.floor(Math.random() * this.paras.length) // random number with length of paragraphs exists
    this.current_para = this.paras[this.random_para] // get random content from data
    this.current_para_content = this.paras[this.random_para].para // get the content of para

    // main options when play {typing racer game}
    this.content = this.current_para.para.split(' ') // split all context to words separate by (space)
    this.para_char_num = 0 // the total character numbers of paragraph as [index] {access on all chars in para}
    this.total_chars_typed = 0 // total characters typed {not include spaces}
    this.correct_chars = 0 // correct characters typed
    this.words_done = 0 // number of words done correctly

    this.event_key = { code: '' /*Example: KeyE or KeyE the same */, key: '' /*Example: e or E */ }
    this.added_char = true

    // this finally get result
    this.wpm = 0 // words per minute // Math.round( wordsWrote / minutesTimeout )
    this.accuracy = 0
  }

  // Functions USED ---------------
  // set interval to check timeout of game (if end the timeout >> endGame)
  checkGameTime() {
    var game_stop = setInterval(() => {
      // info changed
      this.game_timeout--
      config.gameLiveTime.innerText = this.game_timeout + ' Seconds'
      config.wpmLiveTime.innerText = this.#wpmCalc()

      // if the time is 0 >>> endGame
      if (this.game_timeout <= 0) {
        clearInterval(game_stop)
        return this.endGame()
      }
    }, 1000)
  }

  // return the time spent as seconds (with timeout of the game)
  #calcTimeSpent() {
    return this.const_time - this.game_timeout // total seconds of game - at game time done
  }
  // return words per minute (wpm)
  #wpmCalc() {
    let words = this.para_char_num / 5, // use the standard definition that one word is equal to 5 characters
      time_to_minute = this.#calcTimeSpent() / 60 // convert seconds to minutes // seconds(timeout) / 60

    this.wpm = Math.round(words / time_to_minute) // words per minute // Math.round( wordsWrote / minutesTimeout )
    return this.wpm
  }
  // accuracy calculation (return the percentage of the user typing accuracy)
  #accCalc() {
    let accuracy = (this.correct_chars / this.total_chars_typed) * 100 // (correctCharactersTyped / totalCharactersTyped) * 100;
    return Math.floor(accuracy)
  }

  // start the game after create the class
  startGame() {
    // first add the paragraph
    UI.addParagraph(this)

    // put the background of each para
    config.changerContainer.style.background = `url(${this.current_para.background}) no-repeat`
    config.changerContainer.style.backgroundSize = 'cover'
    config.changerContainer.style.backgroundPosition = 'center'

    // play background audio
    config.backgroundAudio.src = this.current_para.audio
    playAudio(config.backgroundAudio, true)

    // open the animate for parent then close it
    // addClass(changerContainer, 'animate');
    // setTimeout(()=> removeClass(changerContainer, 'animate'), 700);

    // check timeout every second (when start the game)
    this.checkGameTime()

    // remove boardBox & add gameBox
    UI.showBoard(false)
  }

  // ending the game anyway
  endGame() {
    // first removeEventListener for the elements (will not work if these elements is not exists in the DOM {so we do if first})
    config.paraContainerEle.removeEventListener('click', () => UI.focusInput(config.typeInput))
    config.typeInput.removeEventListener('keydown', (e) => this.keyActivated(e))
    config.typeInput.removeEventListener('input', (e) => this.typing(e))

    // put the result of the last game
    config.gameTimeEle.innerText = this.#calcTimeSpent()
    config.wpmEle.innerText = this.#wpmCalc()
    config.accuracyEle.innerText = this.#accCalc() + '%'
    config.wordsEle.innerText = this.words_done
    config.charsEle.innerText = this.total_chars_typed

    console.log('correct chars: ' + this.correct_chars)

    // remove gameBox & add boardBox
    UI.showBoard(true)

    config.changerContainer.style.background = '#fff'

    //open the animate for parent then close it
    // addClass(changerContainer, 'animate');
    // setTimeout(()=> removeClass(changerContainer, 'animate'), 700);

    // pause background audio
    pauseEle(config.backgroundAudio)

    // return game as a default again
    UI.defaultGameInfo(this)
  }

  // get the activated key as info(code >> KeyQ, key >> q or Q)
  keyActivated(e) {
    this.event_key.code = e.code
    this.event_key.key = e.key
  }

  // ------------------ While Typing ------------------
  spacePressed(e, input_char_index, pressKeyAud) {
    if (!input_char_index) {
      // if input Empty >> stop add new char for {input writer}
      if (hasClass(e.target, 'error')) removeClass(e.target, 'error')
      e.target.value = e.target.value.slice(0, input_char_index - 1) // stop add new char for {input writer}
    } else {
      // if input not Empty >>
      if (e.target.value.trim() != this.content[this.words_done]) {
        // if input.trim(remove spaces) not= content[wordsIndex] >>>
        Game.clickError(e.target, null, true) // make error for {input writer}
        e.target.value = e.target.value.slice(0, input_char_index - 1) // stop add new char for {input writer}
      } else {
        // if {input writer} == content[wordsIndex] >>> the space key is true then continue
        this.words_done++ // add words done
        removeClass(config.para_letters[this.para_char_num], 'letter-active') // remove active for space char
        this.para_char_num++ // from space char to first char in new word
        addClass(config.para_letters[this.para_char_num], 'letter-active') // add active for new char
        KeyboardI.activeKeyboardKey(this.para_char_num, this) // add active for new char on keyboard
        e.target.value = ''
        playAudio(pressKeyAud, false)

        // if ended the paragraph >> endGame
        if (
          !this.current_para_content[this.para_char_num] &&
          !isSpaceChar(this.current_para_content[this.para_char_num])
        ) {
          this.endGame()
        }
      }
    }
  }
  backPressed(e, input_char_index, pressKeyAud) {
    if (input_char_index < 0) {
      // if {input writer} Empty >>> do nothing
      if (hasClass(e.target, 'error')) {
        removeClass(e.target, 'error')
      }
      false
    } else if (
      input_char_index >= 0 &&
      !isSpaceChar(this.content[this.words_done][input_char_index - 1])
    ) {
      // if {input writer} has one or more char & if content[previousChar] is not space

      // if the previous letter hasClass done >> correct_chars--
      if (hasClass(config.para_letters[this.para_char_num - 1], 'done')) {
        this.correct_chars--
      }

      // go back by classes
      Game.letterBack(this.para_char_num, this.para_char_num - 1, this)

      this.para_char_num--
      this.total_chars_typed--

      // remove {error input} if input true || input empty
      if (this.content[this.words_done].includes(e.target.value) || !e.target.value) {
        if (!hasClass(e.target, 'error')) {
          removeClass(e.target, 'error')
        }
      }

      // play sound
      playAudio(pressKeyAud, false)
    } else {
      // else
      // go back by classes
      Game.letterBack(
        this.para_char_num /*this current char_index*/,
        this.para_char_num - 1 /*this old char_index*/,
        this
      )

      // remove {error input} if input true || input empty
      if (this.content[this.words_done].includes(e.target.value) || !e.target.value) {
        if (!hasClass(e.target, 'error')) {
          removeClass(e.target, 'error')
        }
      }

      // play sound
      playAudio(pressKeyAud, false)
    }
  }
  normalPressed(e, input_char_index, pressKeyAud) {
    // if input[char] == content[char]
    if (
      e.target.value[input_char_index - 1] == this.content[this.words_done][input_char_index - 1] &&
      this.content[this.words_done][input_char_index - 1].includes(
        e.target.value[input_char_index - 1]
      )
    ) {
      Game.letterActive(this.para_char_num, 'done', this)
      playAudio(pressKeyAud, false)
      this.para_char_num++ // then go next
      this.total_chars_typed++
      this.correct_chars++
      if (hasClass(e.target, 'error')) removeClass(e.target, 'error')
      if (
        !this.current_para_content[this.para_char_num] &&
        this.current_para_content[this.para_char_num] != '&nbsp'
      )
        this.endGame()
    } else {
      // else {that is meaning this char is not correct}
      if (config.para_letters[this.para_char_num - 1]) {
        // if the letter before last exists >>>
        if (hasClass(config.para_letters[this.para_char_num - 1], 'error')) {
          // if before last has error >>> stop add new char for {input type}
          Game.clickError(null, null, true) //open audio error only
          e.target.value = e.target.value.slice(0, input_char_index - 1) // stop add new char for {input type}
        } else {
          // else >>> make error on this char
          Game.clickError(e.target, 'error')
          Game.letterActive(this.para_char_num, 'error', this) // make error on this char
          this.para_char_num++ // then go next
          this.total_chars_typed++
        }
      } else {
        // if before last is not exists >>> go next
        Game.clickError(e.target, 'error')
        Game.letterActive(this.para_char_num, 'error', this) // make error on this char
        this.para_char_num++ // then go next
      }
    }
  }

  // this process while typing in the game
  typing(e) {
    // audio when click
    const pressKeyAud = new Audio(Game.pass_click)

    // if this char is first (add start_char) else (remove start_char)
    this.para_char_num > 0
      ? removeClass(config.para_letters[this.para_char_num], 'start_char')
      : addClass(config.para_letters[this.para_char_num], 'start_char')

    // the default variables when click (then use it)
    let input_char_index = e.target.value.length
    this.added_char = isSpaceChar(e.target.value[input_char_index - 1])

    // Process this key
    if (this.event_key.code == 'Space') {
      // if pressed space
      this.spacePressed(e, input_char_index, pressKeyAud)
    } else if (this.event_key.code == 'Backspace') {
      // if delete key pressed (go back if not first char in a word)
      this.backPressed(e, input_char_index, pressKeyAud)
    } else {
      // else {that meaning normal key pressed
      this.normalPressed(e, input_char_index, pressKeyAud)
    }

    config.wpmLiveTime.innerText = this.#wpmCalc()
    config.accLiveTime.innerText = this.#accCalc() + '%'
  }

  // --------------- Activate animations for the paragraph ---------------
  // activate the letter in the paragraph
  static letterActive(char_index, char_status, gameObj) {
    if (char_index < 0) return
    if (char_status == 'done') {
      addClass(config.para_letters[char_index], 'done')
      removeClass(config.para_letters[char_index], 'letter-active')
      if (config.para_letters[char_index + 1]) {
        addClass(config.para_letters[char_index + 1], 'letter-active')
        KeyboardI.activeKeyboardKey(char_index + 1, gameObj)
      }
    } else if (char_status == 'error') {
      addClass(config.para_letters[char_index], 'error')
      removeClass(config.para_letters[char_index], 'letter-active')
      if (config.para_letters[char_index + 1]) {
        addClass(config.para_letters[char_index + 1], 'letter-active')
        KeyboardI.activeKeyboardKey(char_index + 1, gameObj)
      }
    }
    UI.scrollToActiveLetter()
  }

  // (remove the activation from the current key) (add the activation to the previous key): 1 1 0 >> 1 0 0
  static letterBack(currChar_index, toChar_index, gameObj) {
    if (currChar_index < 0 || toChar_index < 0) return
    removeClass(config.para_letters[currChar_index], 'letter-active') // remove currentChar active
    if (hasClass(config.para_letters[toChar_index], 'done')) {
      // if toChar done
      removeClass(config.para_letters[toChar_index], 'done') // remove toChar done
      addClass(config.para_letters[toChar_index], 'letter-active') // add toChar active
      if (config.para_letters[currChar_index + 1])
        if (hasClass(config.para_letters[currChar_index + 1], 'letter-active'))
          removeClass(config.para_letters[currChar_index + 1], 'letter-active')
    } else if (hasClass(config.para_letters[toChar_index], 'error')) {
      // if toChar error
      removeClass(config.para_letters[toChar_index], 'error') // remove toChar error
      addClass(config.para_letters[toChar_index], 'letter-active') // add toChar active
      if (config.para_letters[currChar_index + 1])
        if (hasClass(config.para_letters[currChar_index + 1], 'letter-active'))
          removeClass(config.para_letters[currChar_index + 1], 'letter-active')
    }
    KeyboardI.activeKeyboardKey(toChar_index, gameObj)
  }

  // --------------- visible keyboard (active animation) functions ---------------
  // (play the error audio sound) (if not audio only >> add the class) for error click press
  static clickError(el, className, audOnly = false) {
    if (!audOnly && el && className) addClass(el, className)
    let pressKeyAud = new Audio(Game.err_click)
    playAudio(pressKeyAud, false)
  }
}
