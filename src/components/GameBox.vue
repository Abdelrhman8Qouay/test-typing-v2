
<template>
    <div class="game">
        <!-- Ready Page  -->
        <transition name="fade" appear>
            <div v-if="showBoard" class="board_box w-full h-full flex gap-5 flex-col mt-5">
                <div class="w-full h-16 bg-[var(--sub)] rounded-lg"></div>
                <div class="flex justify-center items-center">
                    <GameSettings />
                </div>
            </div>
        </transition>

        <!-- Game Page  -->
        <transition name="fade" appear>
            <div class="game_box" v-if="!showBoard">
                <LeavesAnimate />

                <div class="writerBox" ref="writerBoxEle">
                    <div class="info">
                        <div class="box">
                            <h2>{{ userInfo.per.type }}</h2>
                            <span id="wpmLive" ref="wpmLiveTimeEle">{{ userInfo.per.value }}</span>
                        </div>
                        <div class="box">
                            <h2>acc</h2>
                            <span id="accuracyLive" ref="accLiveTimeEle">{{ accuracy }} %</span>
                        </div>
                        <div class="gameLiveTime text-[var(--highlight)]" ref="gameLiveTimeEle">
                            <h2>{{ game_timeout }}</h2>
                            <span id="accuracyLive" ref="accLiveTimeEle">Seconds</span>
                        </div>
                    </div>

                    <div class="game">
                        <div class="para_container" ref="paraContainerEle" @click="focusInput(typeInput)" v-html="paraContainer"></div>
                        <input
                            ref="typeInput"
                            id="userInput"
                            type="text"
                            name="front"
                            tabindex="0"
                            @keydown="(e) => keyActivated(e)"
                            @input="(e) => typing(e)"
                            placeholder="type here..."
                            autocomplete="off"
                        />
                    </div>

                    <div class="out_of_focus" ref="outOfFocusEle">
                        <div><Icon icon="mdi:cursor-default" /></div>
                        <span>Out of focus, go to the game</span>
                    </div>

                    <div class="caps_locked" ref="capsLockedEle">
                        <div><Icon icon="ic:baseline-lock" /></div>
                        <span>Caps Lock</span>
                    </div>
                </div>

                <KeyboardInterface v-if="strToBool(compo_game_setting.appearance['show keyboard'].as)" :char_index="keyboard_char_index" :current_para_content="para_content_text" />
            </div>
        </transition>

        <!-- Info Modal -->
        <transition name="fade">
            <div v-if="showModal" class="modal bg-[#0000009a] flex justify-center items-center fixed left-0 top-0 w-screen h-screen z-[12000]">
                <!-- Close Button -->
                <div class="text-[var(--highlight)] text-4xl absolute left-10 top-10 cursor-pointer" @click="showModal = false"><Icon icon="ei:close" /></div>
                <!-- Box Of Modal -->
                <div class="box w-max h-max bg-[var(--bg)] rounded-lg p-4">
                    <!-- Content here... -->
                    <div class="flex justify-around">
                        <div class="box">
                            <h2>{{ userInfo.per.type.toUpperCase() }}</h2>
                            <span id="wpm" ref="wpmEle">{{ userInfo.per.value }}</span>
                        </div>
                        <div class="box">
                            <h2>Accuracy</h2>
                            <span id="accuracy" ref="accuracyEle">{{ accuracy }} %</span>
                        </div>
                    </div>

                    <div class="res !justify-around">
                        <div class="box">
                            <h2>time</h2>
                            <span id="time_game_done" ref="gameTimeEle">{{ timeSpent }}</span>
                        </div>
                        <div class="flex gap-4">
                            <div class="box boxFull" title="total characters">
                                <h2>* /</h2>
                                <span>{{ total_chars_typed }}</span>
                            </div>
                            <div class="box" title="correct characters">
                                <h2>correct /</h2>
                                <span>{{ correct_chars }}</span>
                            </div>
                            <div class="box" title="words typed">
                                <h2>words</h2>
                                <span id="words_num" ref="wordsEle">{{ words_done }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<script setup>
// ============ Import ============
import { ref, onMounted, computed, watch, nextTick, onUnmounted, onBeforeUnmount } from 'vue'

import { Icon } from '@iconify/vue'

import { addClass, removeClass, hasClass, isSpaceChar, focusInput, playAudio, pauseEle, playClick } from '@/utils'
import { calculateTypingMetrics, strToBool, isCapsLockActive, scrollToActiveLetter } from '@/utils'

import GameSettings from '@/components/Main/GameSettings.vue'
import LeavesAnimate from '@/components/Used/LeavesAnimate.vue'
import KeyboardInterface from '@/components/Used/KeyboardInterface.vue'
import Button from '@/components/Used/Button.vue'

import paras from '@/data/context.json'
// ===================== Stores =====================
import { storeToRefs } from 'pinia'
import { usePublicStore, useGameStore, useSettingStore } from '@/stores'
const { game_state, curr_game_state, compo_game_setting } = storeToRefs(useSettingStore())
const { userInfo, soundVolume, soundOnClick, soundOnError } = storeToRefs(useGameStore())

watch(curr_game_state, async (newVal) => {
    new nextTick()
    clickBegin()
})

// ===================== Variables =====================
const paragraphs = ref(null)
const showBoard = ref(true)
const showModal = ref(true)
const backgroundAudio = ref(null)

// ---------------------------- Game variables
// paragraph variables
const const_time = ref(curr_game_state.value)
const game_timeout = ref(const_time.value)
const random_para = ref(0) // random number with length of paragraphs exists
const current_para = ref(null) // get random content from data
const para_content_text = ref(null) // get the content of para
const splittedContent = ref(null) // split all context to words separate by (space)

// main options when play {typing racer game}
const para_char_num = ref(0) // the total character numbers of paragraph as [index] {access on all chars in para}
const total_chars_typed = ref(0) // total characters typed {not include spaces}
const correct_chars = ref(0) // correct characters typed
const words_done = ref(0) // number of words done correctly

const event_key = ref({ code: '' /*Example: KeyE or KeyE the same */, key: '' /*Example: e or E */ })
const keyboard_char_index = ref(null) // (null) >> that to watch when change to a number
const game_stop = ref(null) // contains the interval function to control this
// variables to check something
const first_type = ref(false)
// this finally get result
const accuracy = ref(0)
const timeSpent = computed(() => const_time.value - game_timeout.value)
// ----------------------------
// DOM elements
const writerBoxEle = ref(null) // to control the element
const paraContainer = ref('') // that to fill the html
const paraContainerEle = ref(null) // to control the element
const para_letters = ref(null) // all paragraph characters (one by one)
const typeInput = ref(null) // {input writer}

const outOfFocusEle = ref(null)
const capsLockedEle = ref(null)

// ===================== Functions =====================
// when mounted
onMounted(() => {
    try {
        paragraphs.value = paras
        // clickBegin()
    } catch (err) {
        console.log('Mounted Page Error: ' + err)
    }
})

// before leave the component
onBeforeUnmount(() => endGame())

// Start the game
const clickBegin = () => {
    startGame(paragraphs.value, curr_game_state.value /*const_time*/)
}

// ===================== Game Functions =====================
// ------------------ Start & End game ------------------
function startGame(paras, const_timeout) {
    // add the options
    const_time.value = const_timeout
    game_timeout.value = const_timeout
    random_para.value = Math.floor(Math.random() * paras.length) // random number with length of paragraphs exists
    current_para.value = paras[random_para.value] // get random content from data
    splittedContent.value = current_para.value.para.split(' ')
    para_content_text.value = paras[random_para.value].para // get the content of the paragraph

    // show game
    showBoard.value = false

    // return to default
    defaultGameInfo()

    // then add the paragraph
    addParagraph()

    // to check user focus
    if (strToBool(compo_game_setting.value['hide elements']['out of focus warning'].as)) {
        window.addEventListener('click', (e) => UserFocus(e))
    }

    // to check Caps Lock
    if (strToBool(compo_game_setting.value['hide elements']['caps lock warning'].as)) {
        document.addEventListener('keydown', (e) => CapsLockWarn(e))
    }

    // play background audio
    // backgroundAudio.value = new Audio(getImageUrl(current_para.value.audio))
    // console.log(getImageUrl(current_para.value.audio))
    // playAudio(backgroundAudio.value, true)
}
// ending the game
function endGame() {
    clearInterval(game_stop.value)

    // put the result of the last game
    setUserInfo()

    // pause background audio
    if (backgroundAudio.value) {
        pauseEle(backgroundAudio.value)
    }

    // remove the event listener
    if (strToBool(compo_game_setting.value['hide elements']['out of focus warning'].as)) {
        window.removeEventListener('click', (e) => UserFocus(e))
    }

    // to check Caps Lock
    if (strToBool(compo_game_setting.value['hide elements']['caps lock warning'].as)) {
        document.removeEventListener('keydown', (e) => CapsLockWarn(e))
    }

    // hide game
    showBoard.value = true

    // show modal info
    showModal.value = true
}

// ------------------ While Typing ------------------
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

    console.log('correct: ' + correct_chars.value + ' total: ' + total_chars_typed.value)

    userInfo.value.per.value = calculateTypingMetrics(para_char_num.value, timeSpent.value)[userInfo.value.per.type]
    accuracy.value = accCalc()
}
function spacePressed(e, input_char_index) {
    let inputEle = e.target
    // if input Empty >> stop add new char for {input writer}
    if (!input_char_index) {
        if (hasClass(inputEle, 'error')) {
            removeClass(inputEle, 'error')
        }

        // stop add new char for {input writer}
        inputEle.value = inputEle.value.slice(0, input_char_index - 1)

        // if input not Empty >>
    } else {
        // if input not= content[currWords] >>>
        if (inputEle.value.trim() != splittedContent.value[words_done.value]) {
            // make error for {input writer}
            clickError(inputEle, null, true)

            // stop add new char for {input writer}
            inputEle.value = inputEle.value.slice(0, input_char_index - 1)

            // if expert or master (user) >>> endGame
            let diff = compo_game_setting.value['behavior']['test difficulty'].as
            if (diff == 'expert' || diff == 'master') {
                endGame()
                return
            }

            // if input == content[currWord] >>> continue
        } else {
            // add words done
            words_done.value++

            // if ended the paragraph >> endGame
            if (words_done.value > splittedContent.value.length) {
                endGame()
                return
            }

            removeClass(para_letters.value[para_char_num.value], 'letter-active') // remove active for space char
            // from space char to first char in new word
            para_char_num.value++
            // add active for new char
            addClass(para_letters.value[para_char_num.value], 'letter-active')

            // activeKeyboardKey() // add active for new char on keyboard
            keyboard_char_index.value = para_char_num.value

            inputEle.value = ''
            playClick(soundOnClick.value, soundVolume.value)
        }
    }
}
function backPressed(e, input_char_index) {
    let inputEle = e.target
    if (input_char_index < 0) {
        // if {input writer} Empty >>> do nothing
        if (hasClass(inputEle, 'error')) {
            removeClass(inputEle, 'error')
        }
        false
    } else if (input_char_index >= 0 && !isSpaceChar(splittedContent.value[words_done.value][input_char_index - 1])) {
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
        if (splittedContent.value[words_done.value].includes(inputEle.value) || !inputEle.value) {
            if (!hasClass(inputEle, 'error')) {
                removeClass(inputEle, 'error')
            }
        }

        // play sound
        playClick(soundOnClick.value, soundVolume.value)
    } else {
        // go back by classes
        letterBack(para_char_num.value /*this current char_index*/, para_char_num.value - 1 /*this old char_index*/)

        // remove {error input} if input true || input empty
        if (splittedContent.value[words_done.value].includes(e.target.value) || !e.target.value) {
            if (!hasClass(e.target, 'error')) {
                removeClass(e.target, 'error')
            }
        }

        // play sound
        playClick(soundOnClick.value, soundVolume.value)
    }
}
function normalPressed(e, input_char_index) {
    let inputEle = e.target
    // if input[char] == content[char]
    if (inputEle.value[input_char_index - 1] == splittedContent.value[words_done.value][input_char_index - 1]) {
        // before move to the next
        letterActive(para_char_num.value, 'done', this)
        playClick(soundOnClick.value, soundVolume.value)

        // then go next
        para_char_num.value++
        total_chars_typed.value++
        correct_chars.value++
        if (hasClass(inputEle, 'error')) {
            removeClass(inputEle, 'error')
        }

        // if (last character) >>> endGame
        if (para_char_num.value > para_content_text.value.length) {
            endGame()
            return
        }

        // else {that is meaning this char is incorrect}
    } else {
        // if incorrect stop (on) >>>
        let incStop = compo_game_setting.value['behavior']['incorrect stop'].as
        if (strToBool(incStop)) {
            // if the letter before last exists >>>
            if (para_letters.value[para_char_num.value - 1]) {
                // if before last has error >>> stop add new char for {input type}
                if (hasClass(para_letters.value[para_char_num.value - 1], 'error')) {
                    clickError(null, null, true) //open audio error only
                    inputEle.value = inputEle.value.slice(0, input_char_index - 1) // stop add new char for {input type}
                    // else >>> make error on this char
                } else {
                    continueErr()
                }
                // if before last is not exists >>> go next
            } else {
                continueErr()
            }
        } else {
            continueErr()
        }

        function continueErr() {
            // make all operations
            clickError(inputEle, 'error')
            letterActive(para_char_num.value, 'error')

            // then go next
            para_char_num.value++
            total_chars_typed.value++
        }

        // if master (user) >>> endGame
        let diff = compo_game_setting.value['behavior']['test difficulty'].as
        if (diff == 'master') {
            endGame()
            return
        }
    }
}

// --------------- Process the game info ---------------
// game interval to check the game live time second by second
function checkGameTime() {
    game_stop.value = setInterval(() => {
        // info changed
        gameLiveTime.value = --game_timeout.value
        userInfo.value.time = gameLiveTime.value
        userInfo.value.per.value = calculateTypingMetrics(para_char_num.value, timeSpent.value)[userInfo.value.per.type]

        // if the time is 0 >>> endGame
        if (game_timeout.value <= 0) {
            clearInterval(game_stop.value)
            return endGame()
        }
    }, 1000)
}

// accuracy calculation (return the percentage of the user typing accuracy)
function accCalc() {
    let accuracy = (correct_chars.value / total_chars_typed.value) * 100 // (correctCharactersTyped / totalCharactersTyped) * 100;
    return Math.floor(accuracy) || 0
}

// --------------- Activate animations for the paragraph ---------------
// get the activated key as info(code >> KeyQ, key >> q or Q)
function keyActivated(e) {
    event_key.value.code = e.code
    event_key.value.key = e.key
}

function UserFocus(e) {
    let curr = e.target
    if (curr == typeInput.value || curr == paraContainerEle.value || curr == outOfFocusEle.value) {
        focusInput(typeInput.value)
        if (hasClass(writerBoxEle.value, 'out_of_focus')) removeClass(writerBoxEle.value, 'out_of_focus')
    } else {
        if (!hasClass(writerBoxEle.value, 'out_of_focus')) addClass(writerBoxEle.value, 'out_of_focus')
    }
}

function CapsLockWarn(e) {
    if (isCapsLockActive(e)) {
        if (!hasClass(writerBoxEle.value, 'caps_lock_active')) addClass(writerBoxEle.value, 'caps_lock_active')
    } else {
        if (hasClass(writerBoxEle.value, 'caps_lock_active')) removeClass(writerBoxEle.value, 'caps_lock_active')
    }
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
    playClick(soundOnError.value, soundVolume.value)
}

// --------------- Info game ---------------
function defaultGameInfo() {
    paraContainerEle.value.scrollLeft = 0
    paraContainer.value = ''

    let spans = document.querySelectorAll('.writerBox .para_container .letter')
    spans.forEach((s) => {
        if (hasClass(s, 'done')) removeClass(s, 'done')
        if (hasClass(s, 'error')) removeClass(s, 'error')
    })

    if (game_stop.value) clearInterval(game_stop.value)
    gameLiveTime.value = const_time.value // live Time
    typeInput.value.value = ''
    if (hasClass(typeInput.value, 'error')) removeClass(typeInput.value, 'error')

    // to default
    para_char_num.value = 0 // the total character numbers of paragraph as [index] {access on all chars in para}
    total_chars_typed.value = 0 // total characters typed {not include spaces}
    correct_chars.value = 0 // correct characters typed
    words_done.value = 0 // number of words done correctly
    event_key.value = { code: '', key: '' }
    first_type.value = false
    keyboard_char_index.value = 5

    setUserInfo(true)
}

function setUserInfo(to_default = false) {
    if (to_default) {
        userInfo.value.per.value = 0
        accuracy.value = 0
        userInfo.value.accuracy = accuracy.value
        userInfo.value.are = 'turtle'
        userInfo.value.correct = 0
        userInfo.value.total = 0
        userInfo.value.time = 0
        return
    }
    userInfo.value.per.value = calculateTypingMetrics(para_char_num.value, timeSpent.value)[userInfo.value.per.type]
    accuracy.value = accCalc()
    userInfo.value.time = timeSpent.value
    userInfo.value.accuracy = accuracy.value
    userInfo.value.correct = correct_chars.value
    userInfo.value.total = total_chars_typed.value
    const nicknames = [
        { maxSpeed: 10, nickname: 'sloth', message: 'You are a sloth, take it slow.' },
        { maxSpeed: 20, nickname: 'turtle', message: 'You are a turtle, steady and sure.' },
        { maxSpeed: 30, nickname: 'cheetah', message: 'You are a cheetah, blazing fast!' },
        { maxSpeed: 40, nickname: 'eagle', message: 'You are an eagle, soaring high!' },
        { maxSpeed: 50, nickname: 'octopus', message: 'You are an octopus, amazing multitasking!' },
        { maxSpeed: Infinity, nickname: 'lightning', message: 'You are lightning, blazing ahead!' }
    ]
    const { nickname, message } = nicknames.find((n) => userInfo.value.per.value <= n.maxSpeed)
    userInfo.value.are = nickname
}

async function addParagraph() {
    // empty paragraph interface then
    paraContainer.value = ''

    // the first char added
    paraContainer.value += `<span class="letter letter-active start_char" data-char="${para_content_text.value[0]}">${para_content_text.value[0]}</span>`
    keyboard_char_index.value = 0 //KeyboardI.activeKeyboardKey(0, gameObj)

    // iterate for all chars
    for (let i = 1; i < para_content_text.value.length; i++) {
        paraContainer.value += `<span class="letter" data-char="${para_content_text.value[i]}">${para_content_text.value[i]}</span>`
    }

    await nextTick()

    // get the letters as variables
    para_letters.value = paraContainerEle.value.querySelectorAll('.game_box .writerBox .para_container .letter')
}
</script>


<style lang="scss">
@import '../assets/css/mixins';

/* Board Box Start */
.modal {
    .res {
        margin-top: 2.5rem;
        @include wh-custom(100%, max-content);
        @include rounded-lg;
        display: flex;
        justify-content: space-between;

        .box {
            @include flex-custom(column, nowrap, space-between, center);

            h2 {
                color: var(--text);
                @include font-custom(22px, 500);
            }
            span {
                color: var(--main);
                @include font-custom(27px, 600);
            }
        }

        .boxFull {
            @include flex-center-col;
            border-radius: 6px;
            background: var(--sub);
            padding: 2px 12px;

            h2 {
                color: var(--text);
                @include font-custom(22px, 500);
            }
            span {
                color: var(--main);
                @include font-custom(27px, 600);
            }
        }
    }
}
/* Board Box End */

/* Writer Box Start */
.game_box {
    // background: var(--main);
    padding: 1.4rem;
}

.writerBox {
    position: relative;
    @include wh-custom(100%, max-content);
    @include rounded;
    user-select: none;
    padding: 1rem;
    z-index: 20;

    .game {
        padding: 1.2rem;
        .para_container {
            white-space: break-spaces;
            overflow: hidden;
            height: max-content;

            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            .letter {
                color: var(--text);
                font-size: 25px;
                @include margin-custom-lr(1px, 1px);
                @include padding-custom-lr(1px, 1px);
                position: relative;
                &.error {
                    background: var(--error);
                    color: var(--error-extra);
                    @include rounded;
                }
                &.done {
                    background: var(--highlight);
                    color: var(--sub);
                    @include rounded;
                }
                &.letter-active {
                    color: var(--text);
                    &::before {
                        content: '';
                        @include wh-custom(112%, 2px);
                        background: var(--main);
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
            border: unset;
            outline: none;
            @include wh-custom(100%, max-content);
            border-radius: 6px;
            font-size: 25px;
            font-weight: 600;

            box-shadow: 0 4px 8px var(--sub);
            margin-top: 2rem;
            padding: 0.5rem 1rem;
            color: var(--main);
            background-color: var(--text);
            &.error {
                background-color: var(--error-extra);
            }
            &::placeholder {
                color: var(--sub);
                font-size: large;
                font-weight: 400;
            }
        }
    }

    .info {
        @include flex-center;
        gap: 1rem;

        .gameLiveTime {
            @include flex-center-col;
            border: 4px solid var(--highlight);
            background: var(--text);
            border-radius: 50%;
            padding: 1rem;
            h2 {
                color: var(--sub);
                font-size: 20px;
                font-weight: 500;
            }
            span {
                color: var(--main);
                font-size: 20px;
                font-weight: 500;
            }
        }
        .box {
            @include flex-center-col;
            background: var(--text);
            border-radius: 6px;
            padding: 6px 1rem;
            h2 {
                color: var(--sub);
                @include font-custom(22px, 500);
                font-size: 22px;
                font-weight: 500;
            }
            span {
                color: var(--main);
                font-size: 22px;
                font-weight: 500;
            }
        }
    }

    .out_of_focus {
        color: var(--highlight);
        backdrop-filter: blur(4px);
        background: var(--bg);
        filter: opacity(0.8);

        position: absolute;
        left: 0;
        top: 0;
        @include wh-full;
        @include flex-center;
        font-size: 20px;
        font-weight: 300;
        z-index: 1000;

        transition: all var(--hover-trans);
        visibility: hidden;
        opacity: 0;
    }
    &.out_of_focus .out_of_focus {
        visibility: visible;
        opacity: 1;
    }

    .caps_locked {
        background: var(--highlight);
        color: var(--bg);
        padding: 4px 8px;
        border-radius: 6px;

        position: absolute;
        left: 50%;
        top: 10%;
        @include wh-max;
        @include flex-center;
        font-size: 20px;
        font-weight: 600;
        z-index: 2000;

        transition: all var(--hover-trans);
        visibility: hidden;
        opacity: 0;
    }
    &.caps_lock_active .caps_locked {
        visibility: visible;
        opacity: 1;
    }
}
/* Writer Box End */

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
