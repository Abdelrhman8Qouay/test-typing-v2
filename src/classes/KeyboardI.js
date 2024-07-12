//======================== import what need it ========================
import { addClass, removeClass, capitalizeFirstChar } from '../utils'

// ======================== Keyboard Interface ========================
export class KeyboardI {
  static charToKeyCodeMap = {
    a: 'KeyA',
    b: 'KeyB',
    c: 'KeyC',
    d: 'KeyD',
    e: 'KeyE',
    f: 'KeyF',
    g: 'KeyG',
    h: 'KeyH',
    i: 'KeyI',
    j: 'KeyJ',
    k: 'KeyK',
    l: 'KeyL',
    m: 'KeyM',
    n: 'KeyN',
    o: 'KeyO',
    p: 'KeyP',
    q: 'KeyQ',
    r: 'KeyR',
    s: 'KeyS',
    t: 'KeyT',
    u: 'KeyU',
    v: 'KeyV',
    w: 'KeyW',
    x: 'KeyX',
    y: 'KeyY',
    z: 'KeyZ',
    A: 'KeyA',
    B: 'KeyB',
    C: 'KeyC',
    D: 'KeyD',
    E: 'KeyE',
    F: 'KeyF',
    G: 'KeyG',
    H: 'KeyH',
    I: 'KeyI',
    J: 'KeyJ',
    K: 'KeyK',
    L: 'KeyL',
    M: 'KeyM',
    N: 'KeyN',
    O: 'KeyO',
    P: 'KeyP',
    Q: 'KeyQ',
    R: 'KeyR',
    S: 'KeyS',
    T: 'KeyT',
    U: 'KeyU',
    V: 'KeyV',
    W: 'KeyW',
    X: 'KeyX',
    Y: 'KeyY',
    Z: 'KeyZ',
    0: 'Digit0',
    1: 'Digit1',
    2: 'Digit2',
    3: 'Digit3',
    4: 'Digit4',
    5: 'Digit5',
    6: 'Digit6',
    7: 'Digit7',
    8: 'Digit8',
    9: 'Digit9',
    ' ': 'Space',
    '!': 'Digit1',
    '@': 'Digit2',
    '#': 'Digit3',
    $: 'Digit4',
    '%': 'Digit5',
    '^': 'Digit6',
    '&': 'Digit7',
    '*': 'Digit8',
    '(': 'Digit9',
    ')': 'Digit0',
    '-': 'Minus',
    _: 'Minus',
    '=': 'Equal',
    '+': 'Equal',
    '[': 'BracketLeft',
    '{': 'BracketLeft',
    ']': 'BracketRight',
    '}': 'BracketRight',
    '\\': 'Backslash',
    '|': 'Backslash',
    ';': 'Semicolon',
    ':': 'Semicolon',
    "'": 'Quote',
    '"': 'Quote',
    ',': 'Comma',
    '<': 'Comma',
    '.': 'Period',
    '>': 'Period',
    '/': 'Slash',
    '?': 'Slash',
    '`': 'Backquote',
    '~': 'Backquote',
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    Enter: 'Enter',
    Tab: 'Tab',
    Backspace: 'Backspace',
    Delete: 'Delete',
    Home: 'Home',
    End: 'End',
    PageUp: 'PageUp',
    PageDown: 'PageDown',
    Escape: 'Escape',
    Insert: 'Insert',
    CapsLock: 'CapsLock',
    Control: 'Control',
    Shift: 'Shift',
    Alt: 'Alt',
    Meta: 'Meta',
    ContextMenu: 'ContextMenu',
    NumLock: 'NumLock',
    ScrollLock: 'ScrollLock',
    Pause: 'Pause',
    PrintScreen: 'PrintScreen',
    F1: 'F1',
    F2: 'F2',
    F3: 'F3',
    F4: 'F4',
    F5: 'F5',
    F6: 'F6',
    F7: 'F7',
    F8: 'F8',
    F9: 'F9',
    F10: 'F10',
    F11: 'F11',
    F12: 'F12'
    // Add more keys if needed
  }

  constructor() {}

  // activate the keys of (keyboard animation interface)
  static activeKeyboardKey(char_index, gameObj) {
    // remove the active class from the keys (on keyboard animation)
    KeyboardI.removeActiveKeys()

    // get the current key element
    var currKeyElement = document.querySelector(
      `.keyboard .keyboard-row .keyboard-key.key[data-char="${KeyboardI.getKeyCode(gameObj.current_para_content[char_index])}"]`
    )

    if (currKeyElement) {
      // add (is-active) to the currentKeyElement
      addClass(currKeyElement, 'is-active')

      // check if this key is (upper or special) character -> (activate the [shiftLeft or shiftRight] with the current char)
      if (
        (/[A-Z]/.test(gameObj.current_para_content[char_index]) ||
          // eslint-disable-next-line no-useless-escape
          /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
            gameObj.current_para_content[char_index]
          )) &&
        currKeyElement.dataset['char'] != 'Space'
      ) {
        // if this char is: uppercase or special char >>>
        // get the hand of currentKeyElement and make the first is upper
        let side = capitalizeFirstChar(currKeyElement.dataset['hand'])
        var shiftKey = document.querySelector(
          `.keyboard .keyboard-row .keyboard-key.key[data-char="Shift${side}"]`
        )
        addClass(shiftKey, 'is-active')
      }
    }
  }

  // get the key code {1 >> Digit1, ! >> Digit1}
  static getKeyCode(char) {
    return KeyboardI.charToKeyCodeMap[char] || null
  }

  // get the child that is available or null in {key element}
  static getKeyChild(keyEle, childIndex = 1) {
    if (!keyEle) return null
    let availableChild =
      keyEle.children[childIndex] || keyEle.children[1] || keyEle.children[0] || null
    return availableChild
  }

  static removeActiveKeys() {
    var activeKeyElements = document.querySelectorAll(
      '.keyboard .keyboard-row .keyboard-key.key.is-active'
    )
    activeKeyElements.forEach((el) => removeClass(el, 'is-active'))
  }
}
