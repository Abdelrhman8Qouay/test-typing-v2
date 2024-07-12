// ======================== all variables ========================
export const config = {
  // main vars (exists always)
  app: document.querySelector('.app'),
  changerContainer: document.querySelector('.changerContainer'),

  // ------- {before ready} -------
  // vars
  boardBox: document.querySelector('.board_box'),
  btnStart: document.getElementById('btnStart'),
  // Info
  gameTimeEle: document.getElementById('time_game_done'),
  wordsEle: document.getElementById('words_num'),
  charsEle: document.getElementById('chars_num'),
  wpmEle: document.getElementById('wpm'),
  accuracyEle: document.getElementById('accuracy'),

  // ------- {game begin} -------
  // vars
  gameBox: document.querySelector('.game_box'),
  writerBox: document.querySelector('.game_box .writerBox'),
  backgroundAudio: document.getElementById('bgAudio'),
  paraContainerEle: document.querySelector('.game_box .writerBox .para_container'),
  typeInput: document.querySelector('.game_box .writerBox #userInput'),
  // Game Info
  gameLiveTime: document.querySelector('.game_box .writerBox .game_time'),
  wpmLiveTime: document.getElementById('wpmLive'),
  accLiveTime: document.getElementById('accuracyLive'),
  para_letters: [],

  // ------- keyboard vars -------
  all_keyboard_keys: document.querySelectorAll('.keyboard .keyboard-row .keyboard-key.key')
}
