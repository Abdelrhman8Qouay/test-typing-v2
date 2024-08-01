
<template>
    <div class="home">
        <div class="changerContainer container">
            <div class="game">
                <!-- Ready Page  -->
                <transition name="fade" appear>
                    <div v-if="showBoard" class="board_box w-full h-full flex gap-5 flex-col mt-5">
                        <div v-if="userInfo.per.value" class="w-full h-max bg-[var(--sub)] p-5 rounded-lg flex flex-col justify-center items-start">
                            <Button
                                class="!bg-[var(--main)] !text-[var(--bg)] w-max"
                                @click.prevent="showModal = true"
                                :is-button="true"
                                txt="Show Information"
                                ico="material-symbols-light:chat-info-outline-rounded"
                                :ico-size="22"
                            />
                            <span class="text-[var(--main)] font-bold text-lg">Open the (Information modal) for the last test.</span>
                        </div>
                        <div class="bg-[var(--sub)] p-5 flex justify-center items-center rounded-lg">
                            <GameSettings />
                        </div>

                        <div class="bg-[var(--sub)] p-5 flex flex-col gap-2 rounded-lg">
                            <h2 class="text-3xl text-[var(--highlight)] font-semibold">FAQs</h2>
                            <settingDropper :def-open="false" class="bg-[var(--bg)]" v-for="(set, i) in faqs" :key="i" :tit="set.tit">
                                <p class="text-md text-[var(--main)] font-extralight mt-2 m-4" v-html="set.par"></p>
                            </settingDropper>
                        </div>
                    </div>
                </transition>

                <!-- Game Page  -->
                <transition name="fade" appear>
                    <div class="game_box" v-if="!showBoard">
                        <LeavesAnimate v-if="strToBool(compo_game_setting.appearance.leaves.as)" />

                        <div class="writerBox" ref="writerBoxEle">
                            <div class="info flex flex-col gap-2">
                                <div class="top flex gap-2">
                                    <div class="box">
                                        <h2>{{ userInfo.per.type }}</h2>
                                        <span id="wpmLive" ref="wpmLiveTimeEle">{{ userInfo.per.value }}</span>
                                    </div>
                                    <div class="box">
                                        <h2>acc</h2>
                                        <span id="accuracyLive" ref="accLiveTimeEle">{{ userInfo.accuracy }} %</span>
                                    </div>
                                    <div class="gameLiveTime text-[var(--highlight)]" ref="gameLiveTimeEle">
                                        <h2>{{ game_is_timer ? timeSpent : game_timeout }}</h2>
                                        <span id="accuracyLive" ref="accLiveTimeEle">Seconds</span>
                                    </div>
                                </div>

                                <div class="down flex gap-2">
                                    <div
                                        class="card bg-[var(--highlight)] px-3 p-1 h-max flex flex-col gap-1 justify-center items-center"
                                        v-for="(it, i) in [
                                            {
                                                head: 'Total',
                                                val: total_letters_record || 0
                                            },
                                            {
                                                head: 'Correct',
                                                val: correct_letters_record || 0
                                            },
                                            {
                                                head: 'Words',
                                                val: words_done || 0
                                            }
                                        ]"
                                        :key="i"
                                    >
                                        <h2 class="text-[var(--bg)] text-base font-medium">{{ it.head }}</h2>
                                        <span class="text-black text-lg font-bold">{{ it.val }}</span>
                                        <div class="w-[1px] h-full bg-[var(--bg)]"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="game">
                                <!-- Para Container -->
                                <div class="para_container" ref="paraContainerEle" @click="focusInput(inputWriter)">
                                    <span v-for="(letter, i) in para_content_text" :key="i" class="letter" :data-char="letter">{{ letter }}</span>
                                </div>

                                <!-- User Input Typing -->
                                <input
                                    ref="inputWriter"
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
                            <!-- Out Of Focus -->
                            <div class="out_of_focus" ref="outOfFocusEle">
                                <div><Icon icon="mdi:cursor-default" /></div>
                                <span>Out of focus, go to the game</span>
                            </div>
                            <!-- Caps Lock  -->
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
                    <div v-if="showModal" class="modal bg-[#0000009a] flex justify-center items-center fixed left-0 top-0 w-screen h-screen z-[12000]" @click.self="showModal = false">
                        <!-- Box Of Modal -->
                        <div class="box w-max h-max p-4 bg-[#e9e9e9] rounded-lg relative">
                            <!-- Content here... -->
                            <div class="containing flex gap-3">
                                <div class="imagine w-[25vw] z-10">
                                    <!-- <img class="w-full h-full object-contain" src="@/assets/images/china_morning.jpg" alt="Imagine Yourself" /> -->
                                    <Icon :icon="userInfo.are.icon" class="w-full h-full" :color="getCssColorVar('--static-main-color')" />
                                </div>
                                <div class="info flex flex-col gap-2 w-[25vw] z-10">
                                    <div class="w-full h-max">
                                        <h2 class="text-black text-lg max-lg:text-base font-bold">Are You {{ userInfo.are.name }}!</h2>
                                        <p class="text-black text-base max-lg:text-sm font-light">{{ userInfo.are.msg || 'Some errors in this message!!' }}</p>
                                    </div>

                                    <div class="cards flex flex-wrap gap-3 p-2">
                                        <div
                                            class="card bg-[var(--static-main-color)] px-3 p-1 max-lg:p-[1px] max-lg:px-1 h-max flex flex-col gap-1 justify-center items-center"
                                            v-for="(it, i) in [
                                                {
                                                    head: 'time',
                                                    val: game_is_timer ? timeSpent : game_timeout + ' sec' || 0 + ' sec'
                                                },
                                                {
                                                    head: 'total',
                                                    val: total_letters_record || 0
                                                },
                                                {
                                                    head: 'correct',
                                                    val: correct_letters_record || 0
                                                },
                                                {
                                                    head: 'words',
                                                    val: words_done || 0
                                                }
                                            ]"
                                            :key="i"
                                        >
                                            <h2 class="text-white text-base font-medium">{{ it.head }}</h2>
                                            <span class="text-white text-lg font-bold">{{ it.val }}</span>
                                            <div class="w-[1px] h-full bg-white"></div>
                                        </div>
                                        <div
                                            class="mat flex flex-col gap-1 justify-center items-center"
                                            v-for="(it, i) in [
                                                {
                                                    head: userInfo.per.type.toUpperCase(),
                                                    val: userInfo.per.value || 0
                                                },
                                                {
                                                    head: 'Accuracy',
                                                    val: userInfo.accuracy + ' %' || 0 + ' %'
                                                }
                                            ]"
                                            :key="i"
                                        >
                                            <h2 class="text-black text-base font-medium">{{ it.head }}</h2>
                                            <span class="text-black text-lg font-bold">{{ it.val }}</span>
                                            <div class="w-[1px] h-full bg-black"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="btn flex justify-center mt-10">
                                <Button class="!bg-[var(--static-main-color)] !text-white w-max" @click.prevent="startGame()" :is-button="true" txt="Try Again" ico="" :ico-size="22" />
                            </div>
                        </div>
                    </div>
                </transition>

                <div class="w-full h-max flex justify-center items-center mt-10">
                    <div class="flex flex-col gap-2">
                        <div class="text-[var(--text)] text-sm flex justify-center items-center gap-1">
                            <div class="bg-[var(--sub)] rounded px-2 py-1 text-[var(--text)]">{{ compo_game_setting.behavior['quick restart'].as }}</div>
                            key - restart test
                        </div>
                        <!-- <div class="text-[var(--text)] text-sm">
                            <div class="bg-[var(--sub)] rounded-md px-2 py-1 text-[var(--text)]">{{ compo_game_setting.behavior['quick restart'].as }}</div>
                            restart test
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
// ============ Import ============
import { ref, onMounted, computed, watch, nextTick, onBeforeUnmount } from 'vue'

import { Icon } from '@iconify/vue'

import { addClass, removeClass, hasClass, isSpaceChar, focusInput, playAudio, pauseEle, playClick, getCssColorVar, fetchData, accCalc } from '@/utils'
import { calculateTypingMetrics, strToBool, isCapsLockActive, scrollToActiveLetter } from '@/utils'

import GameSettings from '@/components/Main/GameSettings.vue'
import LeavesAnimate from '@/components/Used/LeavesAnimate.vue'
import KeyboardInterface from '@/components/Used/KeyboardInterface.vue'
import Button from '@/components/Used/Button.vue'
import SettingDropper from '@/components/SettingDropper.vue'

// ===================== Stores =====================
import { storeToRefs } from 'pinia'
import { useGameStore, useSettingStore } from '@/stores'
const { game_state, compo_game_setting } = storeToRefs(useSettingStore())
const { userInfo, soundVolume, soundOnClick, soundOnError } = storeToRefs(useGameStore())

const faqs = [
    {
        tit: 'How do I increase my typing speed?',
        par: 'There are two ways to type faster: The best way to increase typing speed is to learn to type the correct way. “Touch typing” means you are able to type with all 10 fingers instead of using a “hunt and peck” method of typing. You can learn how to touch type with Typing.com’s free typing lessons. The second way you can learn to type faster is by playing typing games. Keyboard games like Nitro Type can help you practice your typing speed and increase your words per minute score.'
    },
    {
        tit: 'How fast should I type?',
        par: `The ideal typing speeds by age are as follows:<br />
<br />Elementary school (Grades 3–5): 8–15 WPM
<br />Middle school (Grades 6–8): 12–25 WPM<br />High school (Grades 9–12): 20–35 WPM<br />College/Adult: 50 WPM`
    },
    {
        tit: 'How is typing speed measured?',
        par: `Typing speed is measured by the number of words you can type correctly in a set amount of time. A “word” is equivalent to five keystrokes. During a test, both speed and accuracy are measured. You will receive a number that indicates your average words per minute (WPM) and a percentage that indicates your accuracy. When you complete a 1-minute, 3-minute, or 5-minute timed typing test, you will be able to print out a certificate.`
    },
    {
        tit: 'Why is it important to take a typing speed test?',
        par: `Taking a typing speed test establishes your average typing speed (WPM) and accuracy, which is an important baseline to know so you can increase speed and improve accuracy with practice. Periodically taking typing speed tests can help you track your progress and measure improvement. You even can use your WPM score from the typing test on your resume to highlight your administrative skills!`
    }
]

watch(game_state.value, async (newVal) => {
    new nextTick()
    startGame()
})

// ===================== Variables =====================
const paragraphs = ref(null)
const showBoard = ref(true)
const showModal = ref(false)
const backgroundAudio = ref(null)
const para_api = `https://baconipsum.com/api/?type=all-meat&paras=3`

// ---------------------------- Game variables
// paragraph variables
const para_content_text = ref(null) // get the content of para
const splittedContent = ref(null) // split all context to words separate by (space)

// main options when play {typing racer game}
const const_time = ref(0) // constant time (reference)
const para_char_num = ref(0) // the total character numbers of paragraph as [index] {access on all chars in para}
const total_letters_record = ref(0) // total letters typed {not include spaces}
const correct_letters_record = ref(0) // correct letters typed
const words_done = ref(0) // number of words done

const event_key = ref({ code: '' /*Example: KeyE or KeyE the same */, key: '' /*Example: e or E */ })
const keyboard_char_index = ref(null) // (null) >> that to watch when change to a number
const game_stop = ref(null) // contains the interval function to control this
// variables to check something
const first_type = ref(false)
const game_is_timer = ref(true)
// this finally get result
const game_timeout = ref(const_time.value)
const timeSpent = computed(() => const_time.value - game_timeout.value)

// ----------------------------
// DOM elements
const writerBoxEle = ref(null) // to control the element
const paraContainerEle = ref(null) // to control the element
const para_letters = ref(null) // all paragraph characters (one by one)
const inputWriter = ref(null) // {input writer}

const outOfFocusEle = ref(null)
const capsLockedEle = ref(null)

// ===================== Functions =====================
// before leave the component
onBeforeUnmount(() => endGame())

// ===================== Game Functions =====================
// ------------------ Start & End game ------------------
async function startGame() {
    try {
        // get all paragraphs first
        const res = await fetchData(para_api)
        paragraphs.value = res

        // handle all options
        getHandledPara(paragraphs.value)

        // then show game
        showBoard.value = false
        showModal.value = false

        // then return to default
        defaultGameInfo()

        // then add the paragraph
        addParagraph()

        // to check user focus
        if (strToBool(compo_game_setting.value['hide elements']['out of focus warning'].as)) {
            window.addEventListener('click', (e) => UserFocus(e))
        }

        document.addEventListener('keydown', (e) => {
            // to check Caps Lock
            if (strToBool(compo_game_setting.value['hide elements']['caps lock warning'].as)) {
                CapsLockWarn(e)
            }

            // to check Quick restart
            const currQRestartKey = compo_game_setting.value['behavior']['quick restart'].as
            if (strToBool(currQRestartKey, true)) {
                // if not 'off'
                QuickRestart(e, currQRestartKey)
            }
        })

        // play background audio
        // backgroundAudio.value = new Audio(getImageUrl(current_para.value.audio))
        // console.log(getImageUrl(current_para.value.audio))
        // playAudio(backgroundAudio.value, true)
    } catch (err) {
        console.log('Game Start Error: ' + err)
    }
}
// ending the game
function endGame() {
    // stop game interval
    clearInterval(game_stop.value)

    // put the result of the last game
    setUserInfo()

    // remove the event listener
    if (strToBool(compo_game_setting.value['hide elements']['out of focus warning'].as)) {
        window.removeEventListener('click', (e) => UserFocus(e))
    }

    document.removeEventListener('keydown', (e) => {
        // to check Caps Lock
        if (strToBool(compo_game_setting.value['hide elements']['caps lock warning'].as)) {
            CapsLockWarn(e)
        }

        // to check Quick restart
        const currQRestartKey = compo_game_setting.value['behavior']['quick restart'].as
        if (strToBool(currQRestartKey, true)) {
            // if not 'off'
            QuickRestart(e, currQRestartKey)
        }
    })

    // hide game
    showBoard.value = true

    // show modal info
    showModal.value = true
}

function getHandledPara(paras) {
    // random number with length of paragraphs exists
    const randomParaIndex = Math.floor(Math.random() * paras.length)
    const valueSetPlaced = game_state.value.setting

    // (return to default) (get the content of the paragraph)
    const wordsArray = paras[randomParaIndex].split(' ') || []
    splittedContent.value = []
    para_content_text.value = ''
    game_timeout.value = 0

    // check (setting type) of the game
    if (game_state.value.type == 'quote' || game_state.value.type == 'words') {
        // stop timer operation
        game_is_timer.value = false
        game_timeout.value = 0
        const_time.value = 0
        // to get words until (numberOfWords)
        let numberOfWords = game_state.value.type == 'quote' ? useSettingStore().setting_of_paras.quote.got[valueSetPlaced] : valueSetPlaced
        splittedContent.value = wordsArray.slice(0, numberOfWords)
    } else {
        // enter timer operation
        game_is_timer.value = true
        game_timeout.value = valueSetPlaced
        const_time.value = valueSetPlaced
        // without any slice for the words
        splittedContent.value = wordsArray
    }
    para_content_text.value = splittedContent.value.join(' ') || ''
}

// ------------------ While Typing ------------------
// this process while typing in the game
function typing(e) {
    const letter_index = para_char_num.value,
        input_char_index = e.target.value.length

    // if this char is first (add start_char) else (remove start_char)
    if (letter_index > 0) {
        removeClass(para_letters.value[letter_index], 'start_char')
    } else {
        addClass(para_letters.value[letter_index], 'start_char')
    }

    // for first time typing
    if (!first_type.value) checkGameTime(game_is_timer.value)
    first_type.value = true

    // Process this key
    if (event_key.value.code == 'Space') {
        // if pressed space
        spacePressed(e, input_char_index)
    } else if (event_key.value.code == 'Backspace') {
        // if delete key pressed (go back if not first letter in a word)
        backPressed(e, input_char_index)
    } else {
        // else {that meaning normal key pressed
        normalPressed(e, input_char_index)
    }

    if (game_is_timer.value) {
        userInfo.value.per.value = calculateTypingMetrics(letter_index, timeSpent.value)[userInfo.value.per.type]
    } else userInfo.value.per.value = calculateTypingMetrics(letter_index, game_timeout.value)[userInfo.value.per.type]
    userInfo.value.accuracy = accCalc(correct_letters_record.value, total_letters_record.value)

    console.log('curr_letter_Index: ' + para_char_num.value + ' words: ' + words_done.value + ' para_content_text: ' + para_content_text.value.length)
}

function spacePressed(e, input_char_index) {
    const inputEle = e.target
    // if input Empty >> stop add new char for {input writer}
    if (!input_char_index) {
        if (hasClass(inputEle, 'error')) {
            removeClass(inputEle, 'error')
        }

        // stop add new char for {input writer}
        inputEle.value = inputEle.value.slice(0, input_char_index - 1)

        // if input not Empty >>
    } else {
        // // if (stop on error) is word >>> stop continue rest words
        // const incStop = compo_game_setting.value['behavior']['incorrect stop'].as
        //     if (diff == 'expert' || diff == 'master') {
        //         endGame()
        //         return
        //     }

        // if input not= content[currWords] >>>
        if (inputEle.value.trim() != splittedContent.value[words_done.value]) {
            // make error for {input writer}
            clickError(inputEle, null, true)

            // stop add new char for {input writer}
            inputEle.value = inputEle.value.slice(0, input_char_index - 1)

            // if expert or master (user) >>> endGame
            const diff = compo_game_setting.value['behavior']['test difficulty'].as
            if (diff == 'expert' || diff == 'master') {
                endGame()
                return
            }

            // if input == content[currWord] >>> continue
        } else {
            // add words done
            words_done.value++

            // if ended the paragraph >> endGame
            if (words_done.value > splittedContent.value.length - 1 || para_char_num.value == para_content_text.value.length - 1) {
                endGame()
                return
            }

            // remove active for space letter
            removeClass(para_letters.value[para_char_num.value], 'letter-active')
            // from space letter to first letter in new word
            para_char_num.value++
            // add active for new letter
            addClass(para_letters.value[para_char_num.value], 'letter-active')

            // activeKeyboardKey() // add active for new letter on keyboard
            keyboard_char_index.value = para_char_num.value

            inputEle.value = ''
            playClick(soundOnClick.value, soundVolume.value)
        }
    }
}
function backPressed(e, input_char_index) {
    const inputEle = e.target
    if (input_char_index < 0) {
        // if {input writer} Empty >>> do nothing
        if (hasClass(inputEle, 'error')) {
            removeClass(inputEle, 'error')
        }
        false
    } else if (input_char_index >= 0 && !isSpaceChar(splittedContent.value[words_done.value][input_char_index - 1])) {
        // if the previous letter hasClass done >> correct_chars--
        if (hasClass(para_letters.value[para_char_num.value - 1], 'done')) {
            correct_letters_record.value--
        }

        // go back by classes
        letterBack(para_char_num.value, para_char_num.value - 1)
        // decrease the char_num
        para_char_num.value--
        total_letters_record.value--

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
    const inputEle = e.target
    // if input[char] == content[char]
    if (inputEle.value[input_char_index - 1] == splittedContent.value[words_done.value][input_char_index - 1]) {
        // before move to the next
        letterActive(para_char_num.value, 'done', this)
        playClick(soundOnClick.value, soundVolume.value)

        // then go next
        para_char_num.value++
        total_letters_record.value++
        correct_letters_record.value++
        if (hasClass(inputEle, 'error')) {
            removeClass(inputEle, 'error')
        }

        // if (last character) >>> endGame
        if (para_char_num.value == para_content_text.value.length) {
            words_done.value++
            endGame()
            return
        }

        // else {that is meaning this letter is incorrect}
    } else {
        // if incorrect stop (on) >>>
        let incStop = compo_game_setting.value['behavior']['incorrect stop'].as
        if (strToBool(incStop)) {
            // if the letter before last exists >>>
            if (para_letters.value[para_char_num.value - 1]) {
                // if before last has error >>> stop add new letter for {input type}
                if (hasClass(para_letters.value[para_char_num.value - 1], 'error')) {
                    clickError(null, null, true) //open audio error only
                    inputEle.value = inputEle.value.slice(0, input_char_index - 1) // stop add new letter for {input type}
                    // else >>> make error on this letter
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
            total_letters_record.value++
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
function checkGameTime(isTimer) {
    if (isTimer) {
        game_stop.value = setInterval(() => {
            // info changed
            game_timeout.value--
            userInfo.value.per.value = calculateTypingMetrics(para_char_num.value, timeSpent.value)[userInfo.value.per.type]

            // if the time is 0 >>> endGame
            if (game_timeout.value <= 0) {
                clearInterval(game_stop.value)
                return endGame()
            }
        }, 1000)
    } else {
        game_stop.value = setInterval(() => {
            // info changed
            game_timeout.value++
            userInfo.value.per.value = calculateTypingMetrics(para_char_num.value, game_timeout.value)[userInfo.value.per.type]
        }, 1000)
    }
}

// --------------- Activate animations for the paragraph ---------------
// get the activated key as info(code >> KeyQ, key >> q or Q)
function keyActivated(e) {
    event_key.value.code = e.code
    event_key.value.key = e.key
}

function UserFocus(e) {
    if (!e.target || !writerBoxEle.value || !outOfFocusEle.value || !paraContainerEle.value || !inputWriter.value) return
    let curr = e.target
    if (curr == inputWriter.value || curr == paraContainerEle.value || curr == outOfFocusEle.value) {
        focusInput(inputWriter.value)
        if (hasClass(writerBoxEle.value, 'out_of_focus')) removeClass(writerBoxEle.value, 'out_of_focus')
    } else {
        if (!hasClass(writerBoxEle.value, 'out_of_focus')) addClass(writerBoxEle.value, 'out_of_focus')
    }
}

function QuickRestart(e, restart_key) {
    if (!e.target || !writerBoxEle.value || !paraContainerEle.value || !inputWriter.value) return
    const map = { tab: 'Tab', enter: 'Enter', esc: 'Escape' }
    const curr_key = map[restart_key]

    console.log(e.code, e.key, curr_key)
    if (e.code == curr_key || e.key == curr_key) {
        endGame()
        return
    }
}

function CapsLockWarn(e) {
    if (!e.target || !writerBoxEle.value || !outOfFocusEle.value || !paraContainerEle.value || !inputWriter.value) return
    if (isCapsLockActive(e)) {
        if (!hasClass(writerBoxEle.value, 'caps_lock_active')) addClass(writerBoxEle.value, 'caps_lock_active')
    } else {
        if (hasClass(writerBoxEle.value, 'caps_lock_active')) removeClass(writerBoxEle.value, 'caps_lock_active')
    }
}

// activate the letter in the paragraph
function letterActive(char_index, char_status /* 'done' or 'error' */) {
    if (char_index < 0) return
    const curr_letter = para_letters.value[char_index],
        curr_plus_letter = para_letters.value[char_index + 1]

    // add current status for the current letter
    addClass(curr_letter, char_status)

    // add next letter active
    removeClass(curr_letter, 'letter-active')
    if (curr_plus_letter) {
        addClass(curr_plus_letter, 'letter-active')
        keyboard_char_index.value = char_index + 1 // activeKeyboardKey(char_index + 1, gameObj)
    }

    // scroll the container to next letter activated
    scrollToActiveLetter(paraContainerEle.value)
}

// (remove the activation from the current key) (add the activation to the previous key): 1 1 0 >> 1 0 0
function letterBack(curr_index, next_index) {
    if (curr_index < 0 || next_index < 0) return
    const curr_letter = para_letters.value[curr_index],
        curr_plus_letter = para_letters.value[curr_index + 1],
        next_letter = para_letters.value[next_index]

    // remove current letter active
    removeClass(curr_letter, 'letter-active')

    // check the next letter
    if (hasClass(next_letter, 'done')) {
        removeClass(next_letter, 'done') // remove next letter done
    } else if (hasClass(next_letter, 'error')) {
        removeClass(next_letter, 'error') // remove next letter error
    }

    // add next letter active
    addClass(next_letter, 'letter-active')
    if (curr_plus_letter) {
        if (hasClass(curr_plus_letter, 'letter-active')) {
            removeClass(curr_plus_letter, 'letter-active')
        }
    }

    // transfer the keyboard to next active
    keyboard_char_index.value = next_index // activeKeyboardKey(toChar_index, gameObj)
}

// (play the error audio sound) (if not audio only >> add the class) for error click press
function clickError(el, className, audOnly = false) {
    if (!audOnly && el && className) addClass(el, className)
    playClick(soundOnError.value, soundVolume.value)
}

// --------------- Info game ---------------
async function defaultGameInfo() {
    // wait until DOMContentEnd
    await nextTick()

    // all of options and rest to >> default
    paraContainerEle.value.scrollLeft = 0

    let spans = document.querySelectorAll('.writerBox .para_container .letter')
    spans.forEach((s) => {
        if (hasClass(s, 'done')) removeClass(s, 'done')
        if (hasClass(s, 'error')) removeClass(s, 'error')
    })

    if (game_stop.value) clearInterval(game_stop.value)

    inputWriter.value.value = ''
    if (hasClass(inputWriter.value, 'error')) removeClass(inputWriter.value, 'error')

    para_char_num.value = 0 // the total character numbers of paragraph as [index] {access on all chars in para}
    total_letters_record.value = 0 // total characters typed {not include spaces}
    correct_letters_record.value = 0 // correct characters typed
    words_done.value = 0 // number of words done correctly
    event_key.value = { code: '', key: '' }
    first_type.value = false
    keyboard_char_index.value = 0

    setUserInfo(true)
}

async function addParagraph() {
    // // the first char added
    keyboard_char_index.value = 0 //KeyboardI.activeKeyboardKey(0, gameObj)

    // wait until DOMContentEnd
    await nextTick()

    // get the letters as variables
    para_letters.value = paraContainerEle.value.querySelectorAll('.game_box .writerBox .para_container .letter')
}

function setUserInfo(to_default = false) {
    const nicknames = useGameStore().user_nicknames
    if (to_default) {
        userInfo.value.per.value = 0
        userInfo.value.accuracy = 0
        userInfo.value.letters.correct = 0
        userInfo.value.letters.total = 0
        userInfo.value.letters.words = 0
        userInfo.value.time = 0
        console.log(nicknames)
        fillAre(nicknames[0].nickname, nicknames[0].messages, nicknames[0].icon)
        return
    }

    if (game_is_timer.value) {
        userInfo.value.per.value = calculateTypingMetrics(para_char_num.value, timeSpent.value)[userInfo.value.per.type]
        userInfo.value.time = timeSpent.value
    } else {
        userInfo.value.per.value = calculateTypingMetrics(para_char_num.value, game_timeout.value)[userInfo.value.per.type]
        userInfo.value.time = game_timeout.value
    }
    userInfo.value.accuracy = accCalc(correct_letters_record.value, total_letters_record.value)

    userInfo.value.letters.correct = correct_letters_record.value
    userInfo.value.letters.total = total_letters_record.value
    userInfo.value.letters.words = words_done.value

    // handle the user result
    const result = nicknames.find((n) => userInfo.value.per.value <= n.maxSpeed)
    if (result) {
        const { nickname, messages, icon } = result
        fillAre(nickname, messages, icon)
    } else {
        // Handle the case where no matching nickname is found >> (put the first nickname)
        fillAre(nicknames[0].nickname, nicknames[0].messages, nicknames[0].icon)
    }

    function fillAre(nick, msg, icon) {
        userInfo.value.are.name = nick
        userInfo.value.are.msg = getRandomMessage(msg)
        userInfo.value.are.icon = icon
    }

    function getRandomMessage(messages) {
        const randomIndex = Math.floor(Math.random() * messages.length)
        return messages[randomIndex]
    }
}
</script>



<style lang="scss">
@import '../assets/css/mixins';

// Active Transition Move
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

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

// Count Animation
.counter {
    opacity: 0;
    transition: opacity 1s ease-in-out;
    &.animate {
        animation: count 1s ease forwards;
    }
}
@keyframes count {
    from {
        transform: scale(0.5);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>

