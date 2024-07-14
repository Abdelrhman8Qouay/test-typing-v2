
<template>
    <div class="home">
        <div class="changerContainer">
            <div class="container content">
                <!-- Ready Page  -->
                <div class="board_box w-full h-full flex flex-col justify-center align-center" :class="{ hide: showBoard.value }">
                    <h2 class="titReady">Type Racer Game</h2>
                    <!-- Start Button -->
                    <Button id="btnStart" @click.prevent="clickBegin()" :is-button="true" txt="Begin" ico="keyboard-variant" :ico-size="22" />
                    <div class="containInfo">
                        <div class="box">
                            <h2>wpm</h2>
                            <span id="wpm" ref="wpmEle">0</span>
                        </div>
                        <div class="box">
                            <h2>acc</h2>
                            <span id="accuracy" ref="accuracyEle">0%</span>
                        </div>
                        <div class="res">
                            <div class="box">
                                <h2>words</h2>
                                <span id="words_num" ref="wordsEle">0</span>
                            </div>
                            <div class="box">
                                <h2>chars</h2>
                                <span id="chars_num" ref="charsEle">0</span>
                            </div>
                            <div class="box">
                                <h2>time</h2>
                                <span id="time_game_done" ref="gameTimeEle">0</span>
                            </div>
                        </div>
                    </div>

                    <div class="setting"></div>
                </div>

                <!-- <img src="./assets/logo.svg" width="100" height="100" alt="logo racer"> -->

                <!-- Game Page  -->
                <div class="game_box" :class="{ hide: !showBoard.value }">
                    <!-- <audio loop src="./assets/sound/earlyambirdslonecricketapril2012-23289.mp3" id="bgAudio" preload="none" style="visibility: hidden; opacity: 0"></audio> -->
                    <h2 class="tit">Type Racer game...</h2>

                    <div class="writerBox">
                        <div class="left">
                            <div class="para_container" ref="paraContainerEle"></div>
                            <input ref="typeInput" id="userInput" type="text" name="front" tabindex="0" placeholder="typing..." autocomplete="off" />
                        </div>
                        <div class="right">
                            <div class="box">
                                <h2>wpm</h2>
                                <span id="wpmLive" ref="wpmLiveTimeEle">0</span>
                            </div>
                            <div class="box">
                                <h2>acc</h2>
                                <span id="accuracyLive" ref="accLiveTimeEle">0%</span>
                            </div>
                            <div class="game_time" ref="gameLiveTimeEle">0</div>
                        </div>
                    </div>

                    <KeyboardInterface />

                    <LeavesAnimate />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
// ============ Import ============
import { ref, onMounted } from 'vue'
import LeavesAnimate from '@/components/Used/LeavesAnimate.vue'
import KeyboardInterface from '@/components/Used/KeyboardInterface.vue'
import Button from '@/components/Used/Button.vue'

import paras from '@/data/context.json'
// ============ Classes ============
import { Game } from '@/classes'

// ============ Variables ============
const paragraphs = ref(null)
const gameObj = ref(null)
const showBoard = ref(true)

// DOM elements
const paraContainerEle = ref(null)
const para_letters = ref(null)

const gameTimeEle = ref(null)
const wpmEle = ref(null)
const accuracyEle = ref(null)
const wordsEle = ref(null)
const charsEle = ref(null)

const gameLiveTimeEle = ref(null)
const wpmLiveTimeEle = ref(null)
const accLiveTimeEle = ref(null)
const typeInput = ref(null)

// ============ Process ============
onMounted(() => {
    paragraphs.value = paras
})

// ============ Functions ============
function clickBegin() {
    start(paragraphs.value, 120)
}

function start(paragraphs, game_timeout) {
    // Create new Game
    gameObj.value = new Game(paragraphs, game_timeout, {
        paraContainerEle: paraContainerEle.value,
        para_letters: para_letters.value,

        gameTimeEle: gameTimeEle.value,
        wpmEle: wpmEle.value,
        accuracyEle: accuracyEle.value,
        wordsEle: wordsEle.value,
        charsEle: charsEle.value,

        gameLiveTimeEle: gameLiveTimeEle.value,
        wpmLiveTimeEle: wpmLiveTimeEle.value,
        accLiveTimeEle: accLiveTimeEle.value,
        typeInput: typeInput.value,

        showBoard: showBoard.value
    })

    // Start the game
    gameObj.value.startGame()

    console.log(gameObj.value.current_para)
    // // main options when play {a game racer typing}  >>>> (was here before create the class of game)
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
