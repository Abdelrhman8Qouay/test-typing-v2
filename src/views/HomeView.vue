
<template>
    <div class="home">
        <div class="changerContainer">
            <div class="container content">
                <!-- Ready Page  -->
                <div class="board_box w-full h-full flex flex-col justify-center align-center" :class="!showBoard ? 'hide' : ''">
                    <h2 class="titReady">Type Racer Game</h2>
                    <!-- Start Button -->
                    <Button id="btnStart" @click.prevent="clickBegin()" :is-button="true" txt="Begin" ico="keyboard-variant" :ico-size="22" />
                    <div class="containInfo">
                        <div class="box">
                            <h2>wpm</h2>
                            <span id="wpm" ref="wpmEle">{{ wpm }}</span>
                        </div>
                        <div class="box">
                            <h2>acc</h2>
                            <span id="accuracy" ref="accuracyEle">{{ accuracy }} %</span>
                        </div>
                        <div class="res">
                            <div class="box">
                                <h2>words</h2>
                                <span id="words_num" ref="wordsEle">{{ words_done }}</span>
                            </div>
                            <div class="box">
                                <h2>chars</h2>
                                <span id="chars_num" ref="charsEle">{{ total_chars_typed }}</span>
                            </div>
                            <div class="box">
                                <h2>time</h2>
                                <span id="time_game_done" ref="gameTimeEle">{{ timeSpent }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="setting"></div>
                </div>

                <!-- Game Page  -->
                <div class="game_box" :class="showBoard ? 'hide' : ''">
                    <h2 class="tit">Type Racer game...</h2>

                    <LeavesAnimate />

                    <div class="writerBox">
                        <div class="left">
                            <div class="para_container" ref="paraContainerEle" @click="focusInput(typeInput)"></div>
                            <input
                                ref="typeInput"
                                id="userInput"
                                type="text"
                                name="front"
                                tabindex="0"
                                @keydown="(e) => keyActivated(e)"
                                @input="(e) => typing(e)"
                                placeholder="typing..."
                                autocomplete="off"
                            />
                        </div>
                        <div class="right">
                            <div class="box">
                                <h2>wpm</h2>
                                <span id="wpmLive" ref="wpmLiveTimeEle">{{ wpm }}</span>
                            </div>
                            <div class="box">
                                <h2>acc</h2>
                                <span id="accuracyLive" ref="accLiveTimeEle">{{ accuracy }} %</span>
                            </div>
                            <div class="gameLiveTime" ref="gameLiveTimeEle">{{ gameLiveTime }} Seconds</div>
                        </div>
                    </div>

                    <KeyboardInterface :char_index="keyboard_char_index" :current_para_content="current_para_content" />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
// ============ Import ============
import { ref, onMounted, computed, watch } from 'vue'
import { addClass, removeClass, hasClass, isSpaceChar, focusInput, scrollToActiveLetter, playAudio, pauseEle } from '@/utils'

import LeavesAnimate from '@/components/Used/LeavesAnimate.vue'
import KeyboardInterface from '@/components/Used/KeyboardInterface.vue'
import Button from '@/components/Used/Button.vue'

import paras from '@/data/context.json'
// ===================== Stores =====================
import { usePublicStore } from '@/stores/public'
import { useSettingStore } from '@/stores/setting'
const publicStore = usePublicStore()
const settingStore = useSettingStore()

// ===================== Variables =====================
// const gameObj = ref(null)
const paragraphs = ref(null)
const showBoard = ref(true)

// ---------------------------- Game variables
const const_time = ref(0)
const game_timeout = ref(const_time.value)
const random_para = ref(0) // random number with length of paragraphs exists
const current_para = ref(null) // get random content from data
const current_para_content = ref(null) // get the content of para
const content = ref(null) // split all context to words separate by (space)

const backgroundAudio = ref(null)

// main options when play {typing racer game}
const para_char_num = ref(0) // the total character numbers of paragraph as [index] {access on all chars in para}
const total_chars_typed = ref(0) // total characters typed {not include spaces}
const correct_chars = ref(0) // correct characters typed
const words_done = ref(0) // number of words done correctly

const event_key = ref({ code: '' /*Example: KeyE or KeyE the same */, key: '' /*Example: e or E */ })
const keyboard_char_index = ref(0)

// variables to check something
const first_type = ref(false)

// this finally get result
const wpm = ref(0)
const accuracy = ref(0)
const timeSpent = computed(() => const_time.value - game_timeout.value)
// ----------------------------
// DOM elements
const paraContainerEle = ref(null)
const para_letters = ref(null)
const typeInput = ref(null)
// live time
const gameLiveTime = ref(0)

// ===================== Functions =====================
onMounted(() => {
    paragraphs.value = paras
})

function clickBegin() {
    // Start the game
    startGame(paragraphs.value, 5 /*const_time*/)

    // console.log(publicStore.sound_click.err.src)
    playAudio(publicStore.sound_click.err, false)
    // // main options when play {a game racer typing}  >>>> (was here before create the class of game)
}

// ===================== Game Functions =====================
// start the game after create the class
function startGame(paras, const_timeout) {
    // add the options
    const_time.value = const_timeout
    game_timeout.value = const_timeout
    random_para.value = Math.floor(Math.random() * paras.length) // random number with length of paragraphs exists
    current_para.value = paras[random_para.value] // get random content from data
    content.value = current_para.value.para.split(' ')
    current_para_content.value = paras[random_para.value].para // get the content of the paragraph

    // return to default
    defaultGameInfo()

    // then add the paragraph
    addParagraph()

    // show game
    showBoard.value = false

    // play background audio
    // backgroundAudio.value = new Audio(getImageUrl(current_para.value.audio))
    // console.log(getImageUrl(current_para.value.audio))
    // playAudio(backgroundAudio.value, true)
}

// check timeout every second (when start the game) (when typing the first Character)

// ending the game
function endGame() {
    // put the result of the last game
    wpm.value = wpmCalc()
    accuracy.value = accCalc()

    // pause background audio
    if (backgroundAudio.value) {
        pauseEle(backgroundAudio.value)
    }

    // hide game
    showBoard.value = true
}

// ------------------ While Typing ------------------
function spacePressed(e, input_char_index) {
    if (!input_char_index) {
        // if input Empty >> stop add new char for {input writer}
        if (hasClass(e.target, 'error')) {
            removeClass(e.target, 'error')
        }
        e.target.value = e.target.value.slice(0, input_char_index - 1) // stop add new char for {input writer}
    } else {
        // if input not Empty >>
        if (e.target.value.trim() != content.value[words_done.value]) {
            // if input.trim(remove spaces) not= content[wordsIndex] >>>
            clickError(e.target, null, true) // make error for {input writer}
            e.target.value = e.target.value.slice(0, input_char_index - 1) // stop add new char for {input writer}
        } else {
            // if {input writer} == content[wordsIndex] >>> the space key is true then continue
            words_done.value++ // add words done
            removeClass(para_letters.value[para_char_num.value], 'letter-active') // remove active for space char
            para_char_num.value++ // from space char to first char in new word
            addClass(para_letters.value[para_char_num.value], 'letter-active') // add active for new char
            keyboard_char_index.value = para_char_num.value // activeKeyboardKey() // add active for new char on keyboard
            e.target.value = ''
            playAudio(publicStore.sound_click.click, false)

            // if ended the paragraph >> endGame
            if (!current_para_content.value[para_char_num.value] && !isSpaceChar(current_para_content.value[para_char_num.value])) {
                endGame()
            }
        }
    }
}
function backPressed(e, input_char_index) {
    if (input_char_index < 0) {
        // if {input writer} Empty >>> do nothing
        if (hasClass(e.target, 'error')) {
            removeClass(e.target, 'error')
        }
        false
    } else if (input_char_index >= 0 && !isSpaceChar(content.value[words_done.value][input_char_index - 1])) {
        // if the previous letter hasClass done >> correct_chars--
        if (hasClass(para_letters.value[para_char_num.value - 1], 'done')) {
            correct_chars.value--
        }

        // go back by classes
        letterBack(para_char_num.value, para_char_num.value - 1)
        // decrease the char_num
        para_char_num.value--
        total_chars_typed.value--

        // remove {error input} if input true || input empty
        if (content.value[words_done.value].includes(e.target.value) || !e.target.value) {
            if (!hasClass(e.target, 'error')) {
                removeClass(e.target, 'error')
            }
        }

        // play sound
        playAudio(publicStore.sound_click.click, false)
    } else {
        // go back by classes
        letterBack(para_char_num.value /*this current char_index*/, para_char_num.value - 1 /*this old char_index*/)

        // remove {error input} if input true || input empty
        if (content.value[words_done.value].includes(e.target.value) || !e.target.value) {
            if (!hasClass(e.target, 'error')) {
                removeClass(e.target, 'error')
            }
        }

        // play sound
        playAudio(publicStore.sound_click.click, false)
    }
}
function normalPressed(e, input_char_index) {
    // if input[char] == content[char]
    if (
        e.target.value[input_char_index - 1] == content.value[words_done.value][input_char_index - 1] &&
        content.value[words_done.value][input_char_index - 1].includes(e.target.value[input_char_index - 1])
    ) {
        letterActive(para_char_num.value, 'done', this)
        playAudio(publicStore.sound_click.click, false)
        para_char_num.value++ // then go next
        total_chars_typed.value++
        correct_chars.value++
        if (hasClass(e.target, 'error')) {
            removeClass(e.target, 'error')
        }
        if (!current_para_content.value[para_char_num.value] && current_para_content.value[para_char_num.value] != '&nbsp') {
            endGame()
        }
    } else {
        // else {that is meaning this char is not correct}
        if (para_letters.value[para_char_num.value - 1]) {
            // if the letter before last exists >>>
            if (hasClass(para_letters.value[para_char_num.value - 1], 'error')) {
                // if before last has error >>> stop add new char for {input type}
                clickError(null, null, true) //open audio error only
                e.target.value = e.target.value.slice(0, input_char_index - 1) // stop add new char for {input type}
            } else {
                // else >>> make error on this char
                clickError(e.target, 'error')
                letterActive(para_char_num.value, 'error') // make error on this char
                para_char_num.value++ // then go next
                total_chars_typed.value++
            }
        } else {
            // if before last is not exists >>> go next
            clickError(e.target, 'error')
            letterActive(para_char_num.value, 'error', this) // make error on this char
            para_char_num.value++ // then go next
        }
    }
}

// this process while typing in the game
function typing(e) {
    // if this char is first (add start_char) else (remove start_char)
    if (para_char_num.value > 0) {
        removeClass(para_letters.value[para_char_num.value], 'start_char')
    } else {
        addClass(para_letters.value[para_char_num.value], 'start_char')
    }

    // the default variables when click (then use it)
    let input_char_index = e.target.value.length
    // for first time typing
    if (!first_type.value) checkGameTime()
    first_type.value = true

    // Process this key
    if (event_key.value.code == 'Space') {
        // if pressed space
        spacePressed(e, input_char_index)
    } else if (event_key.value.code == 'Backspace') {
        // if delete key pressed (go back if not first char in a word)
        backPressed(e, input_char_index)
    } else {
        // else {that meaning normal key pressed
        normalPressed(e, input_char_index)
    }

    wpm.value = wpmCalc()
    accuracy.value = accCalc()
}

// --------------- Activate animations for the paragraph ---------------
// get the activated key as info(code >> KeyQ, key >> q or Q)
function keyActivated(e) {
    event_key.value.code = e.code
    event_key.value.key = e.key
}

// game interval to check the game live time second by second
function checkGameTime() {
    var game_stop = setInterval(() => {
        // info changed
        game_timeout.value--
        gameLiveTime.value = game_timeout.value
        wpm.value = wpmCalc()

        // if the time is 0 >>> endGame
        if (game_timeout.value <= 0) {
            clearInterval(game_stop)
            return endGame()
        }
    }, 1000)
}

// return words per minute (wpm)
function wpmCalc() {
    let words = para_char_num.value / 5, // use the standard definition that one word is equal to 5 characters
        time_to_minute = timeSpent.value / 60 // convert seconds to minutes // seconds(timeout) / 60
    return Math.round(words / time_to_minute) || 0 // words per minute // Math.round( wordsWrote / minutesTimeout )
}
// accuracy calculation (return the percentage of the user typing accuracy)
function accCalc() {
    let accuracy = (correct_chars.value / total_chars_typed.value) * 100 // (correctCharactersTyped / totalCharactersTyped) * 100;
    return Math.floor(accuracy) || 0
}

// activate the letter in the paragraph
function letterActive(char_index, char_status) {
    if (char_index < 0) return
    if (char_status == 'done') {
        addClass(para_letters.value[char_index], 'done')
        removeClass(para_letters.value[char_index], 'letter-active')
        if (para_letters.value[char_index + 1]) {
            addClass(para_letters.value[char_index + 1], 'letter-active')
            keyboard_char_index.value = char_index + 1 // activeKeyboardKey(char_index + 1, gameObj)
        }
    } else if (char_status == 'error') {
        addClass(para_letters.value[char_index], 'error')
        removeClass(para_letters.value[char_index], 'letter-active')
        if (para_letters.value[char_index + 1]) {
            addClass(para_letters.value[char_index + 1], 'letter-active')
            keyboard_char_index.value = char_index + 1 // activeKeyboardKey(char_index + 1, gameObj)
        }
    }
    scrollToActiveLetter(paraContainerEle.value)
}

// (remove the activation from the current key) (add the activation to the previous key): 1 1 0 >> 1 0 0
function letterBack(currChar_index, toChar_index) {
    if (currChar_index < 0 || toChar_index < 0) return

    // remove currentChar active
    removeClass(para_letters.value[currChar_index], 'letter-active')

    // check the current
    if (hasClass(para_letters.value[toChar_index], 'done')) {
        // if toChar done
        removeClass(para_letters.value[toChar_index], 'done') // remove toChar done
        addClass(para_letters.value[toChar_index], 'letter-active') // add toChar active
        if (para_letters.value[currChar_index + 1]) {
            if (hasClass(para_letters.value[currChar_index + 1], 'letter-active')) {
                removeClass(para_letters.value[currChar_index + 1], 'letter-active')
            }
        }
    } else if (hasClass(para_letters.value[toChar_index], 'error')) {
        // if toChar error
        removeClass(para_letters.value[toChar_index], 'error') // remove toChar error
        addClass(para_letters.value[toChar_index], 'letter-active') // add toChar active
        if (para_letters.value[currChar_index + 1]) {
            if (hasClass(para_letters.value[currChar_index + 1], 'letter-active')) {
                removeClass(para_letters.value[currChar_index + 1], 'letter-active')
            }
        }
    }
    keyboard_char_index.value = toChar_index // activeKeyboardKey(toChar_index, gameObj)
}

// (play the error audio sound) (if not audio only >> add the class) for error click press
function clickError(el, className, audOnly = false) {
    if (!audOnly && el && className) addClass(el, className)
    let pressKeyAud = new Audio(publicStore.sound_click.err)
    playAudio(pressKeyAud, false)
}

// ==================== Return Info
function defaultGameInfo() {
    paraContainerEle.innerHTML = ''
    gameLiveTime.value = const_time.value // live Time
    typeInput.value.value = ''
    if (hasClass(typeInput.value, 'error')) {
        removeClass(typeInput.value, 'error')
    }

    // to default
    para_char_num.value = 0 // the total character numbers of paragraph as [index] {access on all chars in para}
    total_chars_typed.value = 0 // total characters typed {not include spaces}
    correct_chars.value = 0 // correct characters typed
    words_done.value = 0 // number of words done correctly
    event_key.value = { code: '', key: '' }
    first_type.value = false
    keyboard_char_index.value = 0
}

function addParagraph() {
    // empty paragraph interface then
    paraContainerEle.value.innerHTML = ''

    // the first char added
    paraContainerEle.value.innerHTML += `<span class="letter letter-active start_char" data-char="${current_para_content.value[0]}">${current_para_content.value[0]}</span>`
    keyboard_char_index.value = 0 //KeyboardI.activeKeyboardKey(0, gameObj)

    // iterate for all chars
    for (let i = 1; i < current_para_content.value.length; i++) {
        paraContainerEle.value.innerHTML += `<span class="letter" data-char="${current_para_content.value[i]}">${current_para_content.value[i]}</span>`
    }

    // get the letters as variables
    para_letters.value = document.querySelectorAll('.game_box .writerBox .para_container .letter')
}
</script>


<style lang="scss">
@import '../assets/css/mixins';

/* Board Box Start */
.board_box {
    &.hide {
        display: none;
    }

    .containInfo {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            h2 {
                color: var(--secondary);
                @include font-custom(27px, 500, italic);
            }
            span {
                color: var(--secondary);
                @include font-custom(20px, 600);
            }
        }

        .res {
            margin-top: 2.5rem;
            @include wh-custom(100%, max-content);
            @include rounded-lg;
            padding: 15px;
            background-color: var(--background);
            color: var(--secondary);
            display: flex;
            justify-content: space-between;
            gap: 2rem;

            .box {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;

                h2 {
                    color: var(--secondary);
                    @include font-custom(27px, 500);
                }
                span {
                    color: var(--secondary);
                    @include font-custom(20px, 600);
                }
            }
        }
    }
}
/* Board Box End */

/* Writer Box Start */
.game_box {
    background: var(--main);
    padding: 1.4rem;
}

.writerBox {
    position: relative;
    @include wh-custom(100%, max-content);
    @include rounded;
    user-select: none;
    padding: 1rem;
    z-index: 20;
    display: flex;
    flex-direction: row;
    gap: 1.5rem;

    .left {
        padding: 1.2rem;
        width: 70%;
        .para_container {
            white-space: break-spaces;
            overflow: auto;
            height: max-content;

            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            .letter {
                color: rgb(104 104 104 / 95%);
                font-size: 25px;
                @include margin-custom-lr(1px, 1px);
                @include padding-custom-lr(1px, 1px);
                position: relative;
                &.error {
                    background: rgba(255, 0, 0, 0.57);
                    color: rgba(108, 0, 0, 0.95);
                    @include rounded;
                }
                &.done {
                    background: rgb(64 255 0 / 57%);
                    color: rgba(15, 58, 0, 0.95);
                    @include rounded;
                }
                &.letter-active {
                    color: rgba(25, 177, 243, 0.9);
                    &::before {
                        content: '';
                        @include wh-custom(112%, 2px);
                        background: rgba(25, 177, 243, 0.9);
                        position: absolute;
                        left: -12%;
                        top: 99%;
                        animation: hideShow 1.5s ease-out infinite;
                    }
                }

                &.start_char {
                    &::after {
                        content: 'Start here';
                        position: absolute;
                        left: -50%;
                        bottom: 100%;
                        background: dimgrey;
                        color: #fff;
                        padding: 7px;
                        @include wh-custom(max-content, max-content);
                        @include rounded-lg;
                        font-family: sans-serif;
                        @include font-custom(14px, 400);

                        opacity: 1;
                        transition: all 0.3s;
                    }
                }
                &::after {
                    opacity: 0;
                }
            }
        }
        @keyframes hideShow {
            0% {
                opacity: 0;
            }
            40% {
                opacity: 1;
            }
            60% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        #userInput {
            display: block;
            @include font-custom(25px, 600);
            color: black;
            margin-top: 2rem;
            padding: 0.5rem 1rem;
            @include wh-custom(100%, max-content);

            &.error {
                background-color: rgba(251, 26, 26, 0.65);
            }
        }

        .game_time {
            text-align: end;
            font-size: 16px;
            font-weight: 400;
            color: #fff;
        }
    }

    .right {
        width: 30%;
        .box {
            color: var(--secondary);
            @include font-custom(25px, 600);
            @include flex-center-col;
        }
    }
}
/* Writer Box End */
</style>
