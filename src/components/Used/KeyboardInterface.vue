
<template>
    <div class="cell js-keyboard-holder">
        <div>
            <div class="keyboard--hands keyboard--hasSettings keyboard keyboard--a keyboard--c keyboard--full">
                <!-- Keyboard Rows -->
                <div class="keyboard-row">
                    <div class="keyboard-key key key--a key-96 key--rspnsv key--duo key-126 key-96-dead start" data-char="Backquote" data-hand="left">
                        <div class="key-label">~</div>

                        <div class="key-label">`</div>
                    </div>

                    <div class="keyboard-key key key--a key-49 key--rspnsv key--duo key-33 start" data-char="Digit1" data-hand="left">
                        <div class="key-label">!</div>

                        <div class="key-label">1</div>
                    </div>

                    <div class="keyboard-key key key--a key-50 key--rspnsv key--duo key-64 afterStart" data-char="Digit2" data-hand="left">
                        <div class="key-label">@</div>

                        <div class="key-label">2</div>
                    </div>

                    <div class="keyboard-key key key--a key-51 key--rspnsv key--duo key-35 afterMid" data-char="Digit3" data-hand="left">
                        <div class="key-label">#</div>

                        <div class="key-label">3</div>
                    </div>

                    <div class="keyboard-key key key--a key-52 key--rspnsv key--duo key-36 mid" data-char="Digit4" data-hand="left">
                        <div class="key-label">$</div>

                        <div class="key-label">4</div>
                    </div>

                    <div class="keyboard-key key key--a key-53 key--rspnsv key--duo key-37 mid" data-char="Digit5" data-hand="left">
                        <div class="key-label">%</div>

                        <div class="key-label">5</div>
                    </div>

                    <div class="keyboard-key key key--a key-54 key--rspnsv key--duo key-94 mid" data-char="Digit6" data-hand="left">
                        <div class="key-label">^</div>

                        <div class="key-label">6</div>
                    </div>

                    <div class="keyboard-key key key--a key-55 key--rspnsv key--duo key-38 mid" data-char="Digit7" data-hand="right">
                        <div class="key-label">&amp;</div>

                        <div class="key-label">7</div>
                    </div>

                    <div class="keyboard-key key key--a key-56 key--rspnsv key--duo key-42 afterMid" data-char="Digit8" data-hand="right">
                        <div class="key-label">*</div>

                        <div class="key-label">8</div>
                    </div>

                    <div class="keyboard-key key key--a key-57 key--rspnsv key--duo key-40 key-170 afterStart" data-char="Digit9" data-hand="right">
                        <div class="key-label">(</div>

                        <div class="key-label">9</div>
                    </div>

                    <div class="keyboard-key key key--a key-48 key--rspnsv key--duo key-41 key-186 start" data-char="Digit0" data-hand="right">
                        <div class="key-label">)</div>

                        <div class="key-label">0</div>
                    </div>

                    <div class="keyboard-key key key--a key-45 key--rspnsv key--duo key-95 start" data-char="Minus" data-hand="right">
                        <div class="key-label">_</div>

                        <div class="key-label">-</div>
                    </div>

                    <div class="keyboard-key key key--a key-61 key--rspnsv key--duo key-43 start" data-char="Equal" data-hand="right">
                        <div class="key-label">+</div>

                        <div class="key-label">=</div>
                    </div>

                    <div class="keyboard-key key key--a key-8 key--twoWords key--special key--special-r right start" data-char="Backspace" data-hand="right" style="flex-basis: 74px">
                        <div class="key-label"><span class="key-label--0">Delete</span><span class="key-label--1">⌫</span></div>
                    </div>
                </div>

                <div class="keyboard-row">
                    <div class="keyboard-key key key--a key-9 key--twoWords key--special key--special-l left start" data-char="Tab" data-hand="left" style="flex-basis: 68px">
                        <div class="key-label"><span class="key-label--0">Tab</span><span class="key-label--1">↹</span></div>
                    </div>

                    <div class="keyboard-key key key--a key-113 key--rspnsv start" data-char="KeyQ" data-hand="left">
                        <div class="key-label">q</div>
                    </div>

                    <div class="keyboard-key key key--a key-119 key--rspnsv afterStart" data-char="KeyW" data-hand="left">
                        <div class="key-label">w</div>
                    </div>

                    <div class="keyboard-key key key--a key-101 key--rspnsv key-180-dead afterMid" data-char="KeyE" data-hand="left">
                        <div class="key-label">e</div>
                    </div>

                    <div class="keyboard-key key key--a key-114 key--rspnsv mid" data-char="KeyR" data-hand="left">
                        <div class="key-label">r</div>
                    </div>

                    <div class="keyboard-key key key--a key-116 key--rspnsv mid" data-char="KeyT" data-hand="left">
                        <div class="key-label">t</div>
                    </div>

                    <div class="keyboard-key key key--a key-121 key--rspnsv mid" data-char="KeyY" data-hand="right">
                        <div class="key-label">y</div>
                    </div>

                    <div class="keyboard-key key key--a key-117 key--rspnsv key-168-dead mid" data-char="KeyU" data-hand="right">
                        <div class="key-label">u</div>
                    </div>

                    <div class="keyboard-key key key--a key-105 key--rspnsv key-710-dead afterMid" data-char="KeyI" data-hand="right">
                        <div class="key-label">i</div>
                    </div>

                    <div class="keyboard-key key key--a key-111 key--rspnsv afterStart" data-char="KeyO" data-hand="right">
                        <div class="key-label">o</div>
                    </div>

                    <div class="keyboard-key key key--a key-112 key--rspnsv start" data-char="KeyP" data-hand="right">
                        <div class="key-label">p</div>
                    </div>

                    <div class="keyboard-key key key--a key-91 key--rspnsv key--duo key-123 start" data-char="BracketLeft" data-hand="right">
                        <div class="key-label">{</div>

                        <div class="key-label">[</div>
                    </div>

                    <div class="keyboard-key key key--a key-93 key--rspnsv key--duo key-125 start" data-char="BracketRight" data-hand="right">
                        <div class="key-label">}</div>

                        <div class="key-label">]</div>
                    </div>

                    <div class="keyboard-key key key--a key-92 key--rspnsv key--duo key-124 start" data-char="Backslash" data-hand="right" style="flex-basis: 48px">
                        <div class="key-label">|</div>

                        <div class="key-label">\</div>
                    </div>
                </div>

                <div class="keyboard-row">
                    <div class="keyboard-key key key--a key-20 key--twoWords key--special key--special-l left start" data-char="CapsLock" data-hand="left" style="flex-basis: 83px">
                        <div class="key-label"><span class="key-label--0">Caps</span><span class="key-label--1">Lock</span><span class="key-label--2">⇪</span></div>
                    </div>

                    <div class="keyboard-key key key--a key-97 key--rspnsv start" data-char="KeyA" data-hand="left">
                        <div class="key-label">a</div>
                    </div>

                    <div class="keyboard-key key key--a key-115 key--rspnsv afterStart" data-char="KeyS" data-hand="left">
                        <div class="key-label">s</div>
                    </div>

                    <div class="keyboard-key key key--a key-100 key--rspnsv afterMid" data-char="KeyD" data-hand="left">
                        <div class="key-label">d</div>
                    </div>

                    <div class="keyboard-key key key--a key-102 key--rspnsv mid" data-char="KeyF" data-hand="left">
                        <div class="key-label">f</div>
                    </div>

                    <div class="keyboard-key key key--a key-103 key--rspnsv mid" data-char="KeyG" data-hand="left">
                        <div class="key-label">g</div>
                    </div>

                    <div class="keyboard-key key key--a key-104 key--rspnsv mid" data-char="KeyH" data-hand="right">
                        <div class="key-label">h</div>
                    </div>

                    <div class="keyboard-key key key--a key-106 key--rspnsv mid" data-char="KeyJ" data-hand="right">
                        <div class="key-label">j</div>
                    </div>

                    <div class="keyboard-key key key--a key-107 key--rspnsv afterMid" data-char="KeyK" data-hand="right">
                        <div class="key-label">k</div>
                    </div>

                    <div class="keyboard-key key key--a key-108 key--rspnsv afterStart" data-char="KeyL" data-hand="right">
                        <div class="key-label">l</div>
                    </div>

                    <div class="keyboard-key key key--a key-59 key--rspnsv key--duo key-58 start" data-char="Semicolon" data-hand="right">
                        <div class="key-label">:</div>

                        <div class="key-label">;</div>
                    </div>

                    <div class="keyboard-key key key--a key-39 key--rspnsv key--duo key-34 start" data-char="Quote" data-hand="right">
                        <div class="key-label">"</div>

                        <div class="key-label">'</div>
                    </div>

                    <div class="keyboard-key key key--a key-13 key--twoWords key--special key--special-r right start" data-char="Enter" data-hand="right" style="flex-basis: 83px">
                        <div class="key-label"><span class="key-label--0">Enter</span><span class="key-label--1">⏎</span></div>
                    </div>
                </div>

                <div class="keyboard-row">
                    <div class="keyboard-key key key--a key-16 key--twoWords key--special key--special-l left start" data-char="ShiftLeft" data-hand="left" style="flex-basis: 108px">
                        <div class="key-label"><span class="key-label--0">Shift</span><span class="key-label--1">⇧</span></div>
                    </div>

                    <div class="keyboard-key key key--a key-122 key--rspnsv start" data-char="KeyZ" data-hand="left">
                        <div class="key-label">z</div>
                    </div>

                    <div class="keyboard-key key key--a key-120 key--rspnsv afterStart" data-char="KeyX" data-hand="left">
                        <div class="key-label">x</div>
                    </div>

                    <div class="keyboard-key key key--a key-99 key--rspnsv key-231 afterMid" data-char="KeyC" data-hand="left">
                        <div class="key-label">c</div>
                    </div>

                    <div class="keyboard-key key key--a key-118 key--rspnsv mid" data-char="KeyV" data-hand="left">
                        <div class="key-label">v</div>
                    </div>

                    <div class="keyboard-key key key--a key-98 key--rspnsv mid" data-char="KeyB" data-hand="left">
                        <div class="key-label">b</div>
                    </div>

                    <div class="keyboard-key key key--a key-110 key--rspnsv key-126 key-126-dead mid" data-char="KeyN" data-hand="right">
                        <div class="key-label">n</div>
                    </div>

                    <div class="keyboard-key key key--a key-109 key--rspnsv mid" data-char="KeyM" data-hand="right">
                        <div class="key-label">m</div>
                    </div>

                    <div class="keyboard-key key key--a key-44 key--rspnsv key--duo key-60 afterMid" data-char="Comma" data-hand="right">
                        <div class="key-label">&lt;</div>

                        <div class="key-label">,</div>
                    </div>

                    <div class="keyboard-key key key--a key-46 key--rspnsv key--duo key-62 afterStart" data-char="Period" data-hand="right">
                        <div class="key-label">&gt;</div>

                        <div class="key-label">.</div>
                    </div>

                    <div class="keyboard-key key key--a key-47 key--rspnsv key--duo key-63 start" data-char="Slash" data-hand="right">
                        <div class="key-label">?</div>

                        <div class="key-label">/</div>
                    </div>

                    <div class="keyboard-key key key--a key-16 key--twoWords key--special key--special-r right start" data-char="ShiftRight" data-hand="right" style="flex-basis: 108px">
                        <div class="key-label"><span class="key-label--0">⇧</span><span class="key-label--1">Shift</span></div>
                    </div>
                </div>

                <div class="keyboard-row">
                    <div class="keyboard-key key key--a key-17 key--special key--rspnsv key--special-l left start" data-char="ControlLeft" data-hand="left" style="flex-basis: 50px">
                        <div class="key-label">Ctrl</div>
                    </div>

                    <div class="keyboard-key key key--a key-157 key--special key--special-l left start" data-char="" data-hand="left" style="flex-basis: 70px">
                        <div class="key-label">Cmd</div>
                    </div>

                    <div class="keyboard-key key key--a key-18 key--special key--rspnsv key--special-l left start" data-char="AltLeft" data-hand="left" style="flex-basis: 50px">
                        <div class="key-label">Alt</div>
                    </div>

                    <div class="keyboard-key key key--a key-32 key--twoWords key--special key--special-l left mid" data-char="Space" data-hand="left" style="flex-basis: 336px">
                        <div class="key-label"><span class="key-label--0"></span><span class="key-label--1"></span></div>
                    </div>

                    <div class="keyboard-key key key--a key-18 key--special key--rspnsv key--special-r right start" data-char="AltRight" data-hand="right" style="flex-basis: 50px">
                        <div class="key-label">Alt</div>
                    </div>

                    <div class="keyboard-key key key--a key-157 key--special key--special-r right start" data-char="" data-hand="right" style="flex-basis: 70px">
                        <div class="key-label">Cmd</div>
                    </div>

                    <div class="keyboard-key key key--a key-17 key--special key--rspnsv key--special-r right start" data-char="ControlRight" data-hand="right" style="flex-basis: 50px">
                        <div class="key-label">Ctrl</div>
                    </div>
                </div>

                <!-- For Hands Animation -->
                <!-- <div class="hands js-hands  ">

                        <img class="hand hand--left js-left-hand"
                            src="https://www.typing.com/dist/student/images/hands/app_v1/left-top-row-1.png">

                        <img class="hand hand--right js-right-hand"
                            src="https://www.typing.com/dist/student/images/hands/app_v1/right-resting-hand.png">
                    </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
@import '../../assets/css/mixins';

// Keyboard Start
.cell {
    width: 100%;
    margin-top: 4rem;
    position: relative;
    z-index: 10;

    .keyboard--hasSettings {
        padding-top: 20px;
    }

    .keyboard--hands {
        margin-bottom: 33%;
    }

    .keyboard--full {
        border-radius: 20px;
        padding: 15px 15px 10px;
    }

    .keyboard--a,
    .keyboard--detail {
        background-color: rgb(30 30 30);
        border: 1px solid rgba(0, 0, 0, 0.07);
    }

    .keyboard {
        box-sizing: border-box;
        position: relative;
        z-index: 1;
    }

    .keyboard-row {
        display: flex;
        flex: 1;
        justify-content: space-between;
        margin-bottom: 5px;
        max-height: 50px;

        .key {
            line-height: 1;
            max-height: 40px;
        }

        .keyboard-key {
            flex: 1;
            flex-basis: 40px;
            margin-right: 5px;
        }

        .key--special {
            flex-direction: column;
            font-size: 12px;
        }

        // .key--a,
        // .key--b {
        //     background-color: var(--background);
        //     color: var(--secondary);
        // }

        .key--a {
            border-bottom: 1px solid #a9a9a9;
            border-top: 1px solid #fff;
        }

        .key {
            border-radius: 5px;
            box-sizing: border-box;
            position: relative;
            text-transform: uppercase;
            padding: 5px;
            .key-label {
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            }
            &.is-active {
                background-color: #3295db;
                border-color: #47a0df #3295db #2d86c5;
                .key-label {
                    color: var(--secondary);
                }
            }
            &.is-error {
                background-color: #db3232;
                border-color: #df4747 #db3232 #c52d2d;
                color: var(--secondary);
                .key-label {
                    color: var(--secondary);
                }
            }
        }

        .hands {
            position: absolute;
            height: 100%;
            left: 0;
            top: 3%;
            width: 100%;
        }
    }

    // order color
    .start {
        background-color: #000;
        .key-label {
            color: #fff;
        }
    }
    .afterStart {
        background-color: #505050;
        .key-label {
            color: #fff;
        }
    }
    .mid {
        background-color: #fff;
        .key-label {
            color: #000;
        }
    }
    .afterMid {
        background-color: #c4c4c4;
        .key-label {
            color: #000;
        }
    }
}

@media (max-width: 946px) {
    body .app .cell {
        display: none;
    }
}
// Keyboard End
</style>
